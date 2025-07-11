import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UploadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCloudinaryUpload } from "@/context/cloudinary-upload-provider";
import { useState, useEffect } from "react";

export default function Upload() {
  const { data: session } = authClient.useSession();

  const [dialogOpen, setDialogOpen] = useState(false);
  const { openUploadWidget } = useCloudinaryUpload();
  const [pendingUpload, setPendingUpload] = useState<{
    folder: string;
    game: string;
  } | null>(null);

  const handleUploadClick = (folder: string, game: string) => {
    setPendingUpload({ folder, game });
    setDialogOpen(false); // Close the dialog
  };

  useEffect(() => {
    if (!dialogOpen && pendingUpload) {
      openUploadWidget({
        ...pendingUpload,
        onSuccess: (info) => {
          // handle success
        },
      });
      setPendingUpload(null);
    }
  }, [dialogOpen, pendingUpload, openUploadWidget]);

  if (!session?.user) {
    return null;
  }

  // Only admins can upload
  if (session.user.role !== "admin") {
    return null;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="text-white hover:bg-white/10 dark:text-white dark:hover:bg-white/10 cursor-pointer p-2.5 rounded-md transition-all duration-150">
        <UploadIcon className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            What game are you uploading?
          </DialogTitle>
          <DialogDescription className="flex flex-row mt-4 justify-center gap-4">
            {/* Minecraft */}
            <UploadButton
              folder="Minecraft"
              game="Minecraft"
              image="/minecraft.webp"
              onClick={() => handleUploadClick("Minecraft", "Minecraft")}
            />

            {/* Apex Legends */}
            <UploadButton
              folder="Apex"
              game="Apex Legends"
              image="/apex.jpg"
              onClick={() => handleUploadClick("Apex", "Apex Legends")}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

interface UploadButtonProps {
  folder: string;
  game: string;
  image: string;
  onClick: () => void;
}

function UploadButton({ folder, game, image, onClick }: UploadButtonProps) {
  return (
    <Button
      className="w-[50%] h-[8rem] relative cursor-pointer transition-all duration-300 bg-transparent hover:bg-transparent group"
      onClick={onClick}
    >
      <Image
        src={image}
        alt={game}
        fill
        className="object-cover rounded-md opacity-100 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300"
      />
      <p className="text-center opacity-0 transition-all duration-300 text-white text-lg font-bold group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
        {game}
      </p>
    </Button>
  );
}
