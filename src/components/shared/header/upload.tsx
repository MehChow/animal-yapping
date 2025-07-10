import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UploadIcon } from "lucide-react";

export default function Upload() {
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return null;
  }

  if (session.user.role !== "admin") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-white/10 dark:text-white dark:hover:bg-white/10 cursor-pointer"
    >
      <UploadIcon className="size-4" />
    </Button>
  );
}
