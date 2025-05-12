import { type FormType } from "~/app/sequence/[id]/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";

export function SlideBottomSettings({
  form,
  index,
}: {
  form: FormType;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}`}
      render={() => {
        return (
          <div className="space-y-4">
            <Separator className="my-4" />
            <TitleField form={form} index={index} />
            <DescriptionField form={form} index={index} />
            <BackgroundToggle form={form} index={index} />
          </div>
        );
      }}
    />
  );
}

function BackgroundToggle({ form, index }: { form: FormType; index: number }) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.highlight`}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
              <FormLabel>
                Transparent Background (to improve ledgebility)
              </FormLabel>
            </div>
          </FormItem>
        );
      }}
    />
  );
}

function TitleField({ form, index }: { form: FormType; index: number }) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.title`}
      defaultValue=""
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function DescriptionField({ form, index }: { form: FormType; index: number }) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.description`}
      defaultValue=""
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
