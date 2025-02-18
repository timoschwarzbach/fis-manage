"use client";

import { File } from "@prisma/client";
import { Media } from "~/components/media";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Pill } from "~/components/ui/pill";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

export function MediaItem({ file }: { file: File }) {
  return (
    <div className="group relative flex w-96 flex-col gap-4 pb-8">
      <Card className="aspect-video w-full overflow-hidden">
        <Media id={file.id} />
      </Card>
      <div className="flex flex-row flex-wrap gap-2">
        {file.originalName && (
          <Pill>
            {file.originalName.length > 26
              ? `${file.originalName.slice(0, 10)} . . . ${file.originalName.slice(-13)}`
              : file.originalName}
          </Pill>
        )}
        {file.size && <Pill>{bytesToHumanReadable(file.size)}</Pill>}
      </div>
      <DeleteFileButton file={file} />
    </div>
  );
}

function bytesToHumanReadable(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return `${(bytes / Math.pow(1024, i)).toFixed(0)} ${sizes[i]}`;
}

function DeleteFileButton({ file }: { file: File }) {
  const deleteFile = api.files.delete.useMutation();
  const { toast } = useToast();
  return (
    <Button
      className="absolute right-2 top-2 hidden group-hover:block"
      variant="destructive"
      onClick={async () => {
        const success = await deleteFile.mutateAsync(file.id);
        if (success) {
          toast({
            title: "File deleted",
            description: `${file.fileName} has been deleted`,
          });
        }
      }}
    >
      Delete
    </Button>
  );
}
