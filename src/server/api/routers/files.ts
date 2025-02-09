import { nanoid } from "nanoid";
import { z } from "zod";
import { createPresignedUrlToUpload, PresignedUrlProp } from "~/lib/server/minio";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const bucketName = process.env.MINIO_BUCKET_NAME!;
const expiry = 60 * 60; // 1 hour

export const filesRouter = createTRPCRouter({
  s3Presigned: publicProcedure
    .input(z.array(z.object({
      originalFileName: z.string(),
      fileSize: z.number()
    })))
    .mutation(async ({ ctx, input: files }) => {
      try {
        if (files.length === 0) {
          return {
            error: 'No files to upload'
          }
        }

        const presignedUrls = [] as PresignedUrlProp[];

        if (files.length) {
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
              });
            })
          );
        }

        console.log({ presignedUrls });

        const publicUrls = presignedUrls.map((presignedUrl) => {
          const publicUrl = `http${process.env.MINIO_SSL === "true" ? "s" : ""}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${presignedUrl.fileNameInBucket}`;
          return { ...presignedUrl, publicUrl };
        });

        console.log({ publicUrls });

        // Get the file name in bucket from the database
        const saveFilesInfo = await ctx.db.file.createMany({
          data: publicUrls.map((presignedUrl: any) => ({
            bucket: process.env.S3_BUCKET_NAME,
            fileName: presignedUrl.fileNameInBucket,
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

});
