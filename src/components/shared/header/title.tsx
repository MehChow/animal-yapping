import Image from "next/image";
import Link from "next/link";

export default function Title() {
  return (
    <Link href="/" className="flex flex-row items-center gap-4 absolute left-8">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image src="/anna.png" alt="Animal Yapping" fill />
      </div>
      <h1 className="text-2xl font-bold">Animal Yapping</h1>
    </Link>
  );
}
