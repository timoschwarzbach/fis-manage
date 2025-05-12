import { type Slide } from "@prisma/client";
import { type FormType } from "~/app/sequence/[id]/form";
import { Media } from "~/components/media";
import { Card } from "~/components/ui/card";

export function Slide({ form, index }: { form: FormType; index: number }) {
  const slide = form.watch(`slides.${index}`);
  return <PreviewRender slide={slide} />;
}

function PreviewRender({ slide }: { slide: Slide }) {
  return (
    <Card className="relative aspect-video w-full overflow-hidden bg-neutral-300 text-white">
      <Media id={slide.backgroundMediaId} />
      <div className="absolute flex h-full w-full flex-col">
        {/* <div className="flex h-full flex-[3] bg-transparent p-8">
          {data.badge && <img className="h-14" src={data.badge} />}
        </div> */}
        {true && (
          <>
            <div
              data-background={slide.highlight}
              className="flex-1 bg-gradient-to-b from-transparent data-[background=true]:to-black/60"
            ></div>

            <div
              data-background={slide.highlight}
              className="flex flex-col p-4 data-[background=true]:bg-black/60"
            >
              <span className="text-base">{slide.title}</span>
              <span className="text-lg font-bold">{slide.description}</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
