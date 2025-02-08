import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormLabel, FormDescription, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Pill } from "../ui/pill";

export function Slide() {
  return (
    <Card className="w-96">
      <CardContent className="flex flex-col gap-4 p-2">
        <div className="aspect-video w-full rounded bg-neutral-300" />
        <Pill className="self-start">Duration: 5 seconds</Pill>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="self-end">
              Edit
            </Button>
          </DialogTrigger>
          <EditSlideDialogContent />
        </Dialog>
      </CardContent>
    </Card>
  );
}

function EditSlideDialogContent() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Slide</DialogTitle>
        <DialogDescription>
          Change stuff. Changes are applied together with the saving of the
          entire sequence. Simply close this window once you're done and
          continue.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-8">
        <FormItem>
          <FormLabel className="text-base">Preview</FormLabel>
          <div className="mb-4 aspect-video w-full rounded bg-neutral-300" />
        </FormItem>
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Background</FormLabel>
            <FormDescription>
              The background can be a static image, a video or a color
            </FormDescription>
          </div>
          <Input
            type="number"
            placeholder="todo: radio group + conditional file upload"
          />
        </FormItem>
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
              aware of the consequences, if you choose to override the duration
              of a video.
            </FormDescription>
          </div>
          <Input type="number" placeholder="duration (ms)" />
        </FormItem>
      </div>
    </DialogContent>
  );
}
