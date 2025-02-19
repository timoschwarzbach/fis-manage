import { type FormType } from "~/app/sequence/[id]/form";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Slide } from "~/components/form/slide/preview";
import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/form";

export function PreviewCarousel({
  form,
  setApi,
}: {
  form: FormType;
  setApi: (api: CarouselApi) => void;
}) {
  return (
    <Carousel
      className="w-full max-w-full"
      setApi={setApi}
      opts={{ containScroll: false }}
    >
      <CarouselContent>
        <FormField
          control={form.control}
          name="slides"
          render={({ field }) => (
            <>
              {field.value.map((_, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <div className="p-1">
                    <Slide form={form} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </>
          )}
        />
        <CarouselItem key="newslide" className="basis-1/2">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-video flex-col items-center justify-center space-y-4">
                {form.getValues("slides").length === -0 && (
                  <span>no slides in this sequence</span>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    form.setValue("slides", [
                      ...form.getValues("slides"),
                      {
                        bottom: { visible: false, title: "", description: "" },
                      },
                    ])
                  }
                >
                  create a new slide
                </Button>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious type="button" />
      <CarouselNext type="button" />
    </Carousel>
  );
}
