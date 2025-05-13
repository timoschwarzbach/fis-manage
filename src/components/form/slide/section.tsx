import React from "react";
import { type FormType } from "~/app/sequence/[id]/form";
import { FormLabel } from "~/components/ui/form";
import { PreviewCarousel } from "./carousel";

export function SlideSection({ form }: { form: FormType }) {
  return (
    <div className="flex flex-col space-y-8">
      <FormLabel className="text-base">Slides</FormLabel>
      <div className="w-full px-16">
        <PreviewCarousel form={form} />
      </div>
    </div>
  );
}
