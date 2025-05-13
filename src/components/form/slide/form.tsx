import { type FormType } from "~/app/sequence/[id]/form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { InfoIcon } from "lucide-react";
import { CardTitle } from "~/components/ui/card";

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
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <EditSlideContent key={index} form={form} index={index} />
    </Dialog>
  );
};

function EditSlideContent({ form, index }: { form: FormType; index: number }) {
  return (
    <DialogContent className="space-y-2">
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
            <div className="mb-4 space-x-2">
              <FormLabel className="text-base">Duration</FormLabel>
              <HoverTooltip />
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

const HoverTooltip = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <InfoIcon className="inline-block h-4 w-4 text-black" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80 space-y-4">
        <CardTitle>How does the duration of a slide work?</CardTitle>
        <div>
          You can specify the amount of time this slide should be shown, before
          the next slide will be displayed. If you leave the value empty, the
          system will use the default value for static slides.
        </div>
        <div>
          If the slide background is a video and the duration is unspecified,
          the duration of the video will be used. Caution: Be aware of the
          consequences, if you choose to override the duration of a video.
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
