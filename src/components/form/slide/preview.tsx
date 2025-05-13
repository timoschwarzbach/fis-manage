import { type FormType } from "~/app/sequence/[id]/form";
import { Media } from "~/components/media";
import { Card } from "~/components/ui/card";
import { type Slide } from "~/lib/types";
import { EditSlideOverlay } from "./form";
import { DeleteSlideAlert } from "./delete";

export function Slide({ form, index }: { form: FormType; index: number }) {
  const slide = form.watch(`slides.${index}`);
  return (
    <div className="relative">
      <PreviewRender slide={slide} />
      <div className="absolute right-4 top-4 flex flex-row-reverse gap-2">
        <DeleteSlideAlert form={form} index={index} />
        <EditSlideOverlay form={form} index={index} />
      </div>
    </div>
  );
}

export function PreviewRender({ slide }: { slide: Slide }) {
  return (
    <Card className="relative aspect-video w-full overflow-hidden bg-neutral-300 text-white">
      <Media id={slide.backgroundMediaId} />
      <div className="absolute top-0 flex h-full w-full flex-col">
        <div
          data-background={slide.highlight}
          className="flex-1 bg-gradient-to-b from-transparent data-[background=true]:to-black/60"
        />
        <div
          data-background={slide.highlight}
          className="flex flex-col p-4 data-[background=true]:bg-black/60"
        >
          <span className="text-base">{slide.title}</span>
          <span className="text-lg font-bold">{slide.description}</span>
        </div>
      </div>
    </Card>
  );
}
