import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function AuthBlock() {
  const { data: session, isPending } = authClient.useSession();

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const avatarSrc = session?.user?.image || "/anna.png";

  if (isPending) {
    return (
      <div className="flex items-center gap-3 w-28">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 w-28">
      <Avatar>
        <AvatarImage src={avatarSrc} />
      </Avatar>
      {!session?.user ? (
        <div
          onClick={handleGoogleLogin}
          className="hover:opacity-80 transition-all duration-300 cursor-pointer"
        >
          Login
        </div>
      ) : (
        <div
          onClick={handleLogout}
          className="hover:opacity-80 transition-all duration-300 cursor-pointer"
        >
          Logout
        </div>
      )}
    </div>
  );
}
