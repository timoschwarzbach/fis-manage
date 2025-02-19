import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function CreateSequence() {
  const router = useRouter();
  const utils = api.useUtils();
  const createSequence = api.sequences.createEmpty.useMutation({
    onSettled() {
      void utils.sequences.getAll.invalidate();
    },
  });
  return (
    <div>
      <Card className="flex aspect-video w-96 items-center justify-center">
        <Button
          disabled={createSequence.isPending}
          variant="outline"
          onClick={async () => {
            if (createSequence.isPending) return;
            const sequence = await createSequence.mutateAsync();
            router.push(`/sequence/${sequence.id}`);
          }}
        >
          New sequence
        </Button>
      </Card>
    </div>
  );
}
