import { File } from "@prisma/client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { FormType } from "~/app/sequence/[id]/form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
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
      name={`slides.${index}.background`}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Background</FormLabel>
              <FormDescription>
                Choose a static image or a video as a background
              </FormDescription>
            </div>
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
  onChange: (...event: any[]) => void;
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
          <Label className="text-base">{value ?? "Select a background"}</Label>
          <Button variant="outline" type="button">
            Open
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Select background</SheetTitle>
          <SheetDescription>Click save when you're done.</SheetDescription>
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
  if (!file.bucket || !file.fileName) {
    console.log("invalid file", file);
    return <>invalid file</>;
  }

  const url = api.files.getImageUrl.useQuery({
    bucketName: file.bucket,
    fileName: file.fileName,
  });

  if (url.isLoading) {
    return <>loading...</>;
  }

  if (url.isError || !url.data) {
    return <>error loading image</>;
  }

  return (
    <div
      onClick={() => setSelected(file.id)}
      data-selected={file.id === selected}
      className="m-1 rounded outline-2 outline-offset-1 data-[selected=true]:outline"
    >
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300">
        <Image
          className="h-full w-full object-contain"
          src={url.data}
          alt={file.fileName ?? "Uploaded image"}
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}
