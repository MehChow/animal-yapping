"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface ShortsProps {
  src: string;
}

export default function Shorts({ src }: ShortsProps) {
  return <CldVideoPlayer width="1080" height="1920" src={src} />;
}
