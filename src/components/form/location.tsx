import { type FormType } from "~/app/sequence/[id]/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Pill } from "../ui/pill";

export function LocationStationDetails({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="locations"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Stations</FormLabel>
          <FormDescription>
            ℹ️ Content is only displayed when vehicle is approaching the station
            <br />
            Format: [stationid1],[stationid2],[...]
          </FormDescription>
          <FormControl>
            <Input
              placeholder="station id's"
              {...field}
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  field.onChange();
                  return;
                }
                field.onChange(
                  e.target.value.split(",").map((station) => station.trim()),
                );
              }}
            />
          </FormControl>
          <FormMessage />
          <div className="flex flex-row flex-wrap gap-1">
            {Array.from(
              new Set(field.value?.filter((station) => station.trim() !== "")),
            ).map((station) => (
              <Pill key={station}>{station}</Pill>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}
