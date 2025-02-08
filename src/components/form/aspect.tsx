import { FormType } from "~/app/sequence/[id]/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

const aspects = [
  {
    id: "aspect-16-9",
    label: "16:9 (wide)",
  },
  {
    id: "aspect-4-3",
    label: "4:3",
  },
] as const;

export function AspectSettings({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="aspects"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Aspect ratio</FormLabel>
            <FormDescription>
              Regardless of the aspect ratio of the media, this option controls
              on which type of display system this content can be shown
              <br />
              <Link href={"not implemented"}>more information</Link>
            </FormDescription>
          </div>
          {aspects.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="aspects"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
