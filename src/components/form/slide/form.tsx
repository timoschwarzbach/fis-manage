import { type FormType } from "~/app/sequence/[id]/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { SlideBottomSettings } from "./bottom";
import { SlideBackgroundSettings } from "./background";

export function EditSlideContent({
  form,
  index,
  current,
}: {
  form: FormType;
  index: number;
  current: number;
}) {
  return (
    <div className="px-16" hidden={index !== current}>
      <Card>
        <CardHeader>
          <CardTitle>Slide {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <FormField
            control={form.control}
            name={`slides.${index}`}
            render={() => (
              <>
                <SlideBackgroundSettings form={form} index={index} />
                <SlideBottomSettings form={form} index={index} />
                <SlideDurationSettings form={form} index={index} />
                <Button
                  className="self-end"
                  variant="destructive"
                  onClick={() => {
                    form.setValue(
                      "slides",
                      form.getValues("slides").filter((_, i) => i !== index),
                    );
                    // todo: because the key is the index, currently re-rendering of the form is not functioning as intended
                  }}
                >
                  Delete slide
                </Button>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function SlideDurationSettings({
  form,
  index,
}: {
  form: FormType;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.duration`}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Duration</FormLabel>
              <FormDescription>
                You can specify the amount of time this slide should be shown,
                before the next slide will be displayed. If you leave the value
                empty, the system will use the default value for static slides.
                <br />
                If the slide background is a video and the duration is
                unspecified, the duration of the video will be used. Caution: Be
                aware of the consequences, if you choose to override the
                duration of a video.
              </FormDescription>
            </div>
            <FormControl>
              <Input
                type="number"
                placeholder="duration (ms)"
                {...field}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
