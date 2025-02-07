"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

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

const FormSchema = z.object({
  aspects: z.array(z.string()),
  location: z.string(),
});

type FormType = UseFormReturn<
  {
    aspects: string[];
    location: string;
  },
  any,
  undefined
>;

export function SequenceForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      aspects: ["aspect-16-9"],
      location: "unspecified",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AspectSettings form={form} />
        <LocationSettings form={form} />
        {form.getValues("location") === "stations" && (
          <LocationStationDetails />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function AspectSettings({ form }: { form: FormType }) {
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

function LocationSettings({ form }: { form: FormType }) {
  return (
    <FormField
      control={form.control}
      name="location"
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

function LocationStationDetails() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="location-stations">Stations</Label>
      <Input id="location-stations" placeholder="Station Id" />
    </div>
  );
}
