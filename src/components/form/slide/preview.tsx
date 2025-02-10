import Image from "next/image";
import { FormType } from "~/app/sequence/[id]/form";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function Slide({ form, index }: { form: FormType; index: number }) {
  const fileid = form.watch(`slides.${index}.background`);
  return <MediaItem fileid={fileid} />;
}

function MediaItem({ fileid }: { fileid: string | undefined }) {
  const fileQuery = api.files.getImageUrlFromId.useQuery(fileid ?? "");

  if (fileQuery.isLoading) {
    return <Skeleton className="aspect-video w-full rounded" />;
  }

  if (fileQuery.isError || !fileQuery.data) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300" />
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300">
      <Image
        className="h-full w-full object-contain"
        src={fileQuery.data}
        alt={"Uploaded image"}
        width={400}
        height={300}
      />
    </div>
  );
}
