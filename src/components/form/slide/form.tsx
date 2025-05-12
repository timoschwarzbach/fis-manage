import { type FormType } from "~/app/sequence/[id]/form";
import { Button } from "~/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { PreviewRender } from "./preview";

export const EditSlideOverlay = ({
  form,
  index,
}: {
  form: FormType;
  index: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-4 top-4" variant="secondary">
          Edit
        </Button>
      </DialogTrigger>
      <EditSlideContent key={index} form={form} index={index} />
    </Dialog>
  );
};

function EditSlideContent({ form, index }: { form: FormType; index: number }) {
  return (
    <DialogContent className="space-y-8">
      <DialogTitle>Slide {index + 1}</DialogTitle>
      <PreviewRender slide={form.getValues(`slides.${index}`)} />
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
    </DialogContent>
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
      defaultValue={0}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Duration</FormLabel>
              <FormDescription>
                TODO: TOOLTIP You can specify the amount of time this slide
                should be shown, before the next slide will be displayed. If you
                leave the value empty, the system will use the default value for
                static slides.
                <br />
                If the slide background is a video and the duration is
                unspecified, the duration of the video will be used. Caution: Be
                aware of the consequences, if you choose to override the
                duration of a video.
              </FormDescription>
            </div>
            <FormControl>
              <Input placeholder="duration (ms)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
