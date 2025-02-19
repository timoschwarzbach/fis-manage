import { type FormType } from "~/app/sequence/[id]/form";
import {
  FormControl,
  FormDescription,
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
      name={`slides.${index}.bottom`}
      render={() => {
        return (
          <FormField
            control={form.control}
            name={`slides.${index}.bottom.visible`}
            render={({ field }) => {
              return (
                <FormItem className="rounded-lg border p-3 shadow-sm">
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Bottom content
                      </FormLabel>
                      <FormDescription>
                        You can overlay a title + description on the bottom of
                        the slide
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                  <div hidden={!field.value} className="space-y-4">
                    <Separator className="my-4" />
                    <TitleField form={form} index={index} />
                    <DescriptionField form={form} index={index} />
                    <BackgroundToggle form={form} index={index} />
                  </div>
                </FormItem>
              );
            }}
          />
        );
      }}
    />
  );
}

function BackgroundToggle({ form, index }: { form: FormType; index: number }) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.bottom.background`}
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
      name={`slides.${index}.bottom.title`}
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
      name={`slides.${index}.bottom.description`}
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
