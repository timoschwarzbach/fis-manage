import { type FormType } from "~/app/sequence/[id]/form";
import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/form";
import { PreviewRender } from "./preview";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useState } from "react";

export const DeleteSlideAlert = ({
  form,
  index,
}: {
  form: FormType;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <DeleteSlide key={index} form={form} index={index} setOpen={setOpen} />
    </AlertDialog>
  );
};

function DeleteSlide({
  form,
  index,
  setOpen,
}: {
  form: FormType;
  index: number;
  setOpen: (open: boolean) => void;
}) {
  return (
    <AlertDialogContent className="space-y-2">
      <AlertDialogTitle>Delete Slide {index + 1}</AlertDialogTitle>
      <PreviewRender slide={form.getValues(`slides.${index}`)} />
      <FormField
        control={form.control}
        name={`slides.${index}`}
        render={() => (
          <div className="flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
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
              Delete
            </Button>
          </div>
        )}
      />
    </AlertDialogContent>
  );
}
