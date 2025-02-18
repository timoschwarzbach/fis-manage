"use client";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { type File } from "@prisma/client";

export function DeleteFileButton({ file }: { file: File }) {
  const utils = api.useUtils();
  const deleteFile = api.files.delete.useMutation({
    async onMutate(deletedId) {
      await utils.files.getAll.cancel();
      const prevData = utils.files.getAll.getData();
      utils.files.getAll.setData(undefined, (old) =>
        old?.filter((val) => val.id != deletedId),
      );
      return { prevData };
    },
    onError(err, deletedId, ctx) {
      utils.files.getAll.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      utils.files.getAll.invalidate();
    },
  });
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
