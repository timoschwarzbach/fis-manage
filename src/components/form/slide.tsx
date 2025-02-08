import { FormType } from "~/app/sequence/[id]/form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  FormLabel,
  FormDescription,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function Slide({ form, index }: { form: FormType; index: number }) {
  return (
    <Card>
      <CardContent className="flex flex-col space-y-8 p-2">
        <FormItem className="flex flex-col">
          <FormLabel className="text-base">Preview</FormLabel>
          <div className="mb-4 aspect-video w-full rounded bg-neutral-300" />
        </FormItem>
        <EditSlideContent form={form} index={index} />
        <Button className="self-end" variant="destructive">
          Delete slide
        </Button>
      </CardContent>
    </Card>
  );
}

function EditSlideContent({ form, index }: { form: FormType; index: number }) {
  return (
    <>
      <SlideBackgroundSettings form={form} index={index} />
      <SlideDurationSettings form={form} index={index} />
    </>
  );
}

function SlideBackgroundSettings({
  form,
  index,
}: {
  form: FormType;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.background`}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Background</FormLabel>
              <FormDescription>
                Choose a static image or a video as a background
              </FormDescription>
            </div>
            <FormControl>
              <Input
                placeholder="not yet implemented: paste id here"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
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
