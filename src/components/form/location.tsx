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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Pill } from "../ui/pill";

const location = [
  {
    id: "unspecified",
    label: "Anywhere",
  },
  {
    id: "stations",
    label: "Specific stations",
  },
] as const;

export function LocationSettings({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="location.type"
      render={({ field }) => {
        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Location</FormLabel>
              <FormDescription>
                For certain media, it might be of interest to control the
                scenarios in which content is displayed. I believe that the only
                nessecary limitation is the upcoming station (reach out to me if
                you have more complex requirements). Hence, if you can chose to
                only display this content when the vehicle is approaching
                specified stations. This does not mean, that this content will
                defenetly be shown.
                <br />
                <Link href={"not implemented"}>more information</Link>
              </FormDescription>
            </div>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {location.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.id} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export function LocationStationDetails({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="location.stations"
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
