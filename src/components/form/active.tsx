import { FormType } from "~/app/sequence/[id]/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";

export function ActiveSettings({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="active"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Active</FormLabel>
            <FormDescription>
              This controls whether the sequence should be available in the
              vehicles. This is useful if you want to create drafts and activate
              them in the future.
            </FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
