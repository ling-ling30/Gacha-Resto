import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileState, MultiImageDropzone } from "./MultiImageDropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function AddPhotoDialog({
  restaurant_id,
}: {
  restaurant_id: Id<"restaurant">;
}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [IsSubmitting, setIsSubmitting] = useState<boolean>(false);
  const upload = useMutation(api.photo.create);

  const submitHandler = async () => {
    setIsSubmitting(true);
    if (fileStates.length > 0) {
      await Promise.all(
        fileStates.map(async (item) => {
          try {
            const res = await edgestore.publicFiles.upload({
              file: item.file as File,
            });
            await upload({ url: res.url, restaurant_id: restaurant_id });
            toast.success("Foto terupload!");
          } catch (err) {
            console.error(err);
          }
        })
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Photo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Photo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Photo */}

          <MultiImageDropzone
            value={fileStates}
            onChange={(files) => {
              setFileStates(files);
              console.log(fileStates);
            }}
            dropzoneOptions={{
              maxFiles: 6,
            }}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
