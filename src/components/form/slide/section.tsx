import React from "react";
import { FormType } from "~/app/sequence/[id]/form";
import { FormField, FormLabel } from "~/components/ui/form";
import { PreviewCarousel } from "./carousel";
import { EditSlideContent } from "./form";
import { CarouselApi } from "~/components/ui/carousel";

export function SlideSection({ form }: { form: FormType }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
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
      <FormField
        control={form.control}
        name="slides"
        render={({ field }) => (
          <>
            {field.value.map((_, index) => (
              <EditSlideContent
                key={index} // random uuid instead?
                form={form}
                index={index}
                current={current}
              />
            ))}
          </>
        )}
      />
      {form.getValues("slides").length <= current && (
        <div className="h-96">todo: proper spacer to keep hight</div>
      )}
    </div>
  );
}
