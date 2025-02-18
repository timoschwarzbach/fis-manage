import { nanoid } from "nanoid";
import { z } from "zod";
import { createPresignedUrlToDownload, createPresignedUrlToUpload, deleteFileFromBucket, type PresignedUrlProp } from "~/lib/server/minio";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const bucketName = process.env.MINIO_BUCKET_NAME!;
const expiry = 60 * 60; // 1 hour

export const filesRouter = createTRPCRouter({
  upload: publicProcedure
    .input(z.array(z.object({
      originalFileName: z.string(),
      fileSize: z.number(),
      type: z.string(),
    })))
    .mutation(async ({ ctx, input: files }) => {
      try {
        if (files.length === 0) {
          return {
            error: 'No files to upload'
          }
        }

        const presignedUrls = [] as PresignedUrlProp[];

        // use Promise.all to get all the presigned urls in parallel
        await Promise.all(
          // loop through the files
          files.map(async (file) => {
            const fileName = nanoid(12);

            // get presigned url using s3 sdk
            const url = await createPresignedUrlToUpload({
              bucketName,
              fileName,
              expiry,
            });

            // add presigned url to the list
            presignedUrls.push({
              fileNameInBucket: fileName,
              originalFileName: file.originalFileName,
              fileSize: file.fileSize,
              url,
              fileType: file.type,
            });
          })
        );

        // get public urls
        const publicUrls = presignedUrls.map((presignedUrl) => {
          const publicUrl = `http${process.env.MINIO_SSL === "true" ? "s" : ""}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${presignedUrl.fileNameInBucket}`;
          return { ...presignedUrl, publicUrl };
        });

        // Get the file name in bucket from the database
        await ctx.db.file.createMany({
          data: publicUrls.map((presignedUrl) => ({
            bucket: bucketName,
            fileName: presignedUrl.fileNameInBucket,
            fileType: presignedUrl.fileType,
            originalName: presignedUrl.originalFileName,
            size: presignedUrl.fileSize,
            url: presignedUrl.publicUrl,
          })),
        });

        return presignedUrls;
      } catch (error) {
        console.error({ error });
        return {
          error: 'Internal error'
        }
      }
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.file.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  }),
  urlFromName: publicProcedure.input(z.object({
    bucketName: z.string(),
    fileName: z.string()
  })).query(async ({ input }) => {
    return await createPresignedUrlToDownload(input);
  }),
  urlFromId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const file = await ctx.db.file.findUnique({
      where: {
        id: input
      }
    })
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (!file || !file.bucket || !file.fileName) return null;
    return {
      url: await createPresignedUrlToDownload({
        bucketName: file.bucket,
        fileName: file.fileName
      }),
      type: file.fileType
    }
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const fileName = await ctx.db.file.findUnique({
      where: {
        id: input
      }
    })
    if (!fileName) return false;
    await deleteFileFromBucket({
      bucketName: "fis",
      fileName: input
    })
    await ctx.db.file.delete({
      where: {
        id: input
      }
    })
    return true;
  })
});
