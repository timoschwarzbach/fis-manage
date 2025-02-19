"use client";
import { api } from "~/trpc/react";
import { type Sequence } from "@prisma/client";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";

export function DeleteSequenceButton({ sequence }: { sequence: Sequence }) {
  const deleteSequence = api.sequences.delete.useMutation({
    async onMutate(deletedId) {
      await utils.sequences.getAll.cancel();
      const prevData = utils.sequences.getAll.getData();
      utils.sequences.getAll.setData(undefined, (old) =>
        old?.filter((val) => val.id != deletedId),
      );
      return { prevData };
    },
    onError(err, deletedId, ctx) {
      utils.sequences.getAll.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      void utils.sequences.getAll.invalidate();
    },
  });
  const utils = api.useUtils();
  const { toast } = useToast();
  return (
    <Button
      className="absolute right-2 top-2 hidden group-hover:block"
      variant="destructive"
      onClick={async (e) => {
        e.preventDefault();
        const success = await deleteSequence.mutateAsync(sequence.id, {
          onSuccess(input) {
            if (input.active) {
              void utils.sequences.getActive.invalidate();
            }
            void utils.sequences.getFromId.invalidate(input.id);
          },
        });
        if (success) {
          toast({
            title: "Sequence deleted",
            description: `${sequence.id} has been deleted`,
          });
        }
      }}
    >
      Delete
    </Button>
  );
}
