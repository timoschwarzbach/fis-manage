import { api } from "~/trpc/server";
import { UploadFile } from "./upload";
import { Card } from "~/components/ui/card";
import { MediaItem } from "./item";

export default async function MediaPage() {
  const files = await api.files.getAll();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        <span>{files.length} files</span>
        <UploadFile />
      </div>
      <div className="flex flex-row flex-wrap items-stretch gap-4">
        {files.length === 0 && <div>No files uploaded yet</div>}
        {files.map((file) => (
          <MediaItem key={file.id} file={file} />
        ))}
        <UploadFileAsItem />
      </div>
    </div>
  );
}

function UploadFileAsItem() {
  return (
    <Card className="mb-20 flex aspect-video w-96 items-center justify-center">
      <span>Upload new file</span>
    </Card>
  );
  return (
    <div className="flex w-96 flex-col gap-4 rounded-lg p-2 pb-4 transition hover:bg-neutral-100">
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-300">
        + Icon here
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <UploadFile />
      </div>
    </div>
  );
}
