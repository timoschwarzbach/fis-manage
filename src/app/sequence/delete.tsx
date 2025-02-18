"use client";
import { api } from "~/trpc/react";
import { type Sequence } from "@prisma/client";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";

export function DeleteSequenceButton({ sequence }: { sequence: Sequence }) {
  const deleteSequence = api.sequences.delete.useMutation();
  const { toast } = useToast();
  return (
    <Button
      className="absolute right-2 top-2 hidden group-hover:block"
      variant="destructive"
      onClick={async () => {
        const success = await deleteSequence.mutateAsync(sequence.id);
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
