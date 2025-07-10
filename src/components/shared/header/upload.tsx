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

export default function Upload() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return null;
  }

  // Only admins can upload
  if (session.user.role !== "admin") {
    return null;
  }

  return (
    <Dialog>
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
            <Button
              className="w-[50%] h-[8rem] relative cursor-pointer transition-all duration-300 bg-transparent hover:bg-transparent group"
              onClick={() => console.log("gg")}
            >
              <Image
                src="/minecraft.webp"
                alt="Minecraft"
                fill
                className="object-cover rounded-md opacity-100 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300"
              />
              <p className="text-center opacity-0 transition-all duration-300 text-white text-lg font-bold group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
                Minecraft
              </p>
            </Button>

            {/* Apex Legends */}
            <Button className="w-[50%] h-[8rem] relative cursor-pointer transition-all duration-300 bg-transparent hover:bg-transparent group">
              <Image
                src="/apex.jpg"
                alt="Apex Legends"
                fill
                className="object-cover rounded-md opacity-100 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300"
              />
              <p className="text-center opacity-0 transition-all duration-300 text-white text-lg font-bold group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
                Apex Legends
              </p>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
