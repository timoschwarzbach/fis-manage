import React from "react";
import { type FormType } from "~/app/sequence/[id]/form";
import { FormField, FormLabel } from "~/components/ui/form";
import { PreviewCarousel } from "./carousel";
import { EditSlideContent } from "./form";
import { type CarouselApi } from "~/components/ui/carousel";

export function SlideSection({ form }: { form: FormType }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col space-y-8">
      <FormLabel className="text-base">Slides</FormLabel>
      <div className="w-full px-16">
        <PreviewCarousel form={form} setApi={setApi} />
      </div>
    </div>
  );
}
