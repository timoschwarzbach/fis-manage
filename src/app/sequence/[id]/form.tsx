"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { AspectSettings } from "~/components/form/aspect";
import {
  LocationSettings,
  LocationStationDetails,
} from "~/components/form/location";
import { SlideCarousel } from "~/components/form/slide/carousel";

const FormSchema = z.object({
  aspects: z.array(z.string()),
  location: z.object({
    type: z.string(),
    stations: z
      .array(z.string())
      .refine(
        (value) => {
          return value?.every((station) => station.length > 0);
        },
        { message: "no empty stations" },
      )
      .refine(
        (value) => {
          return value?.length === new Set(value).size;
        },
        { message: "no duplicate stations" },
      )
      .optional(),
  }),
  slides: z.array(
    z.object({
      background: z.string().optional(),
      duration: z.number().optional(),
    }),
  ),
});

export type FormType = UseFormReturn<
  {
    aspects: string[];
    location: {
      type: string;
      stations?: string[];
    };
    slides: {
      background?: string;
      duration?: number;
    }[];
  },
  any,
  undefined
>;

export function SequenceForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      aspects: ["aspect-16-9"],
      location: {
        type: "unspecified",
      },
      slides: [],
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
        {form.getValues("location.type") === "stations" && (
          <LocationStationDetails form={form} />
        )}
        <SlideCarousel form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
