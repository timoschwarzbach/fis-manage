"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { AspectSettings } from "~/components/form/aspect";
import { LocationStationDetails } from "~/components/form/location";
import { SlideSection } from "~/components/form/slide/section";
import { ActiveSettings } from "~/components/form/active";
import { api } from "~/trpc/react";
import { type Sequence } from "@prisma/client";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  active: z.boolean(),
  aspects: z.string().array(),
  locations: z
    .string()
    .array()
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
    ),
  slides: z
    .object({
      duration: z.number(),

      backgroundMediaId: z.string(),

      highlight: z.boolean(),
      title: z.string(),
      description: z.string(),
    })
    .array(),
});

export type FormType = UseFormReturn<
  z.infer<typeof FormSchema>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  z.infer<typeof FormSchema>
>;

export function SequenceForm({ sequence }: { sequence: Sequence | null }) {
  const router = useRouter();
  const createOrUpdate = api.sequences.createOrUpdate.useMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: sequence
      ? {
          active: sequence.active,
          aspects: sequence.aspects,
          locations: sequence.locations,
          slides: sequence.slides,
        }
      : {
          active: false,
          aspects: ["aspect-16-9"],
          locations: [],
          slides: [],
        },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { active, locations, slides, aspects } = data;
      await createOrUpdate.mutateAsync({
        id: sequence?.id,
        active,
        locations,
        category: "default",
        aspects,
        slides,
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
        <LocationStationDetails form={form} />
        <SlideSection form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
