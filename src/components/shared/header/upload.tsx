import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UploadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCloudinaryUpload } from "@/context/cloudinary-upload-provider";
import { useState } from "react";
import { createPost } from "@/app/actions/posts";

export default function Upload() {
  const { data: session } = authClient.useSession();

  const [dialogOpen, setDialogOpen] = useState(false);
  const { openUploadWidget } = useCloudinaryUpload();

  // Step state: 1 = choose game, 2 = fill form
  const [step, setStep] = useState(1);

  // Game selection and form state
  const [selectedGame, setSelectedGame] = useState<null | {
    folder: string;
    game: string;
    image: string;
  }>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle Next from game selection
  const handleNextFromGame = () => {
    if (selectedGame) setStep(2);
  };

  // Handle Back from form
  const handleBack = () => setStep(1);

  // Handle Next from form (open Cloudinary widget)
  const handleNextFromForm = () => {
    if (!selectedGame) return;
    setIsUploading(true);
    openUploadWidget({
      folder: selectedGame.folder,
      game: selectedGame.game,
      onSuccess: async (info) => {
        await createPost({
          title,
          description,
          cloudinaryUrl: info.secure_url,
          publicId: info.public_id,
          game: selectedGame.game,
        });
        setIsUploading(false);
        setDialogOpen(false);
        setStep(1);
        setSelectedGame(null);
        setTitle("");
        setDescription("");
      },
    });
  };

  if (!session?.user || session.user.role !== "admin") {
    return null;
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          setStep(1);
          setSelectedGame(null);
          setTitle("");
          setDescription("");
        }
      }}
    >
      <DialogTrigger className="text-white hover:bg-white/10 dark:text-white dark:hover:bg-white/10 cursor-pointer p-2.5 rounded-md transition-all duration-150">
        <UploadIcon className="size-4" />
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <div className="relative w-full h-[260px] overflow-hidden">
          <div
            className={`flex flex-row w-[200%] h-full transition-transform duration-500 ease-in-out`}
            style={{
              transform: step === 1 ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            {/* Step 1: Choose Game */}
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Step 1: What game are you uploading?
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-row mt-4 justify-center gap-4 w-full">
                <UploadButton
                  folder="Minecraft"
                  game="Minecraft"
                  image="/minecraft.webp"
                  selected={selectedGame?.game === "Minecraft"}
                  onClick={() =>
                    setSelectedGame({
                      folder: "Minecraft",
                      game: "Minecraft",
                      image: "/minecraft.webp",
                    })
                  }
                />
                <UploadButton
                  folder="Apex"
                  game="Apex Legends"
                  image="/apex.jpg"
                  selected={selectedGame?.game === "Apex Legends"}
                  onClick={() =>
                    setSelectedGame({
                      folder: "Apex",
                      game: "Apex Legends",
                      image: "/apex.jpg",
                    })
                  }
                />
              </div>
              <div className="flex w-full justify-end mt-6">
                <Button
                  onClick={handleNextFromGame}
                  disabled={!selectedGame}
                  className="w-24"
                >
                  Next
                </Button>
              </div>
            </div>
            {/* Step 2: Fill Form */}
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <DialogHeader>
                <DialogTitle className="text-center">Video Details</DialogTitle>
              </DialogHeader>
              <input
                className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUploading}
              />
              <textarea
                className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
              />
              <div className="flex w-full justify-between mt-6">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  disabled={isUploading}
                  className="w-24"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextFromForm}
                  disabled={!title || isUploading}
                  className="w-32"
                >
                  {isUploading ? "Uploading..." : "Next: Upload your video"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface UploadButtonProps {
  folder: string;
  game: string;
  image: string;
  selected?: boolean;
  onClick: () => void;
}

function UploadButton({
  folder,
  game,
  image,
  selected,
  onClick,
}: UploadButtonProps) {
  return (
    <Button
      type="button"
      className={`w-[45%] h-[8rem] relative cursor-pointer transition-all duration-300 bg-transparent hover:bg-transparent group border-2 ${
        selected ? "border-primary" : "border-transparent"
      }`}
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
