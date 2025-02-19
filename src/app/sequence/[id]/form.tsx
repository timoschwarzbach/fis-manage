"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { AspectSettings } from "~/components/form/aspect";
import {
  LocationSettings,
  LocationStationDetails,
} from "~/components/form/location";
import { SlideSection } from "~/components/form/slide/section";
import { ActiveSettings } from "~/components/form/active";
import { api } from "~/trpc/react";
import { type Sequence } from "@prisma/client";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  active: z.boolean(),
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
      bottom: z
        .object({
          visible: z.boolean().optional(),
          background: z.boolean().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),
      duration: z
        .string()
        .refine((value) => /^\d*$/.test(value), {
          message: "must be an integer",
        })
        .optional(),
    }),
  ),
});

export type FormType = UseFormReturn<
  {
    active: boolean;
    aspects: string[];
    location: {
      type: string;
      stations?: string[];
    };
    slides: {
      background?: string;
      bottom?: {
        visible?: boolean;
        background?: boolean;
        title?: string;
        description?: string;
      };
      duration?: string;
    }[];
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  undefined
>;

export function SequenceForm({ sequence }: { sequence: Sequence | null }) {
  const router = useRouter();
  const createOrUpdate = api.sequences.createOrUpdate.useMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      active: sequence?.active ?? false,
      aspects: ["aspect-16-9"],
      location: {
        type: "unspecified",
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      slides: JSON.parse(sequence?.slides ?? "[]"),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { active, location, slides, aspects } = data;
      await createOrUpdate.mutateAsync({
        id: sequence?.id,
        active,
        locations:
          location.type === "stations" && location.stations
            ? location.stations
            : [],
        category: "default",
        aspects,
        slides: JSON.stringify(slides),
      });
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      router.push("/sequence");
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ActiveSettings form={form} />
        <AspectSettings form={form} />
        <LocationSettings form={form} />
        {form.getValues("location.type") === "stations" && (
          <LocationStationDetails form={form} />
        )}
        <SlideSection form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
