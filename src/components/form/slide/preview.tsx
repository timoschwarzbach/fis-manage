import Image from "next/image";
import { FormType } from "~/app/sequence/[id]/form";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function Slide({ form, index }: { form: FormType; index: number }) {
  const slide = form.watch(`slides.${index}`);
  return <PreviewRender slide={slide} />;
}

function PreviewRender({
  slide,
}: {
  slide: {
    background?: string;
    bottom?: {
      visible?: boolean;
      background?: boolean;
      title?: string;
      description?: string;
    };
  };
}) {
  const fileQuery = api.files.getImageUrlFromId.useQuery(
    slide.background ?? "",
  );

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded bg-neutral-300">
      {fileQuery.isLoading && <Skeleton className="absolute h-full w-full" />}
      {fileQuery.data && (
        <Image
          className="absolute h-full w-full object-cover"
          src={fileQuery.data}
          alt={"Uploaded image"}
          width={400}
          height={300}
        />
      )}
      <div className="absolute flex h-full w-full flex-col">
        {/* <div className="flex h-full flex-[3] bg-transparent p-8">
          {data.badge && <img className="h-14" src={data.badge} />}
        </div> */}
        {slide.bottom?.visible && (
          <>
            <div
              data-background={slide.bottom.background}
              className="h-20 flex-1 bg-gradient-to-b from-transparent data-[background=true]:to-black/60"
            ></div>

            <div
              data-background={slide.bottom.background}
              className="flex flex-col gap-4 p-8 data-[background=true]:bg-black/60"
            >
              <span className="text-base">{slide.bottom.title}</span>
              <span className="text-lg font-bold">
                {slide.bottom.description}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
