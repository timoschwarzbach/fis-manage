import { type FormType } from "~/app/sequence/[id]/form";
import { Media } from "~/components/media";
import { Card } from "~/components/ui/card";

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
  return (
    <Card className="relative aspect-video w-full overflow-hidden bg-neutral-300 text-white">
      <Media id={slide.background ?? ""} />
      <div className="absolute flex h-full w-full flex-col">
        {/* <div className="flex h-full flex-[3] bg-transparent p-8">
          {data.badge && <img className="h-14" src={data.badge} />}
        </div> */}
        {slide.bottom?.visible && (
          <>
            <div
              data-background={slide.bottom.background}
              className="flex-1 bg-gradient-to-b from-transparent data-[background=true]:to-black/60"
            ></div>

            <div
              data-background={slide.bottom.background}
              className="flex flex-col p-4 data-[background=true]:bg-black/60"
            >
              <span className="text-base">{slide.bottom.title}</span>
              <span className="text-lg font-bold">
                {slide.bottom.description}
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
