import { type File } from "@prisma/client";
import { useEffect, useState } from "react";
import { type FormType } from "~/app/sequence/[id]/form";
import { Media } from "~/components/media";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function SlideBackgroundSettings({
  form,
  index,
}: {
  form: FormType;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`slides.${index}.backgroundMediaId`}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <BackgroundSelectSheet
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function BackgroundSelectSheet({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (...event: unknown[]) => void;
}) {
  const getFiles = api.files.getAll.useQuery();
  const [selected, setSelected] = useState(value ?? "");

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-row items-center gap-2">
          <Button variant="outline" type="button">
            {value ? "Change background" : "Select a background"}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Select background</SheetTitle>
          <SheetDescription>Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="w-full pr-4">
          <div className="grid gap-2">
            {!getFiles.data && (
              <Skeleton className="aspect-video w-full rounded" />
            )}
            {getFiles.data?.length === 0 && <div>No files uploaded yet</div>}
            {getFiles.data?.map((file) => (
              <MediaItem
                key={file.id}
                file={file}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              onClick={() => {
                onChange(selected);
              }}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function MediaItem({
  file,
  selected,
  setSelected,
}: {
  file: File;
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div
      onClick={() => setSelected(file.id)}
      data-selected={file.id === selected}
      className="m-1 rounded outline-2 outline-offset-1 data-[selected=true]:outline"
    >
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300">
        <Media id={file.id} />
      </div>
    </div>
  );
}
