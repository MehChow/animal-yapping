"use client";

import { ModeToggle } from "../../mode-toggle";
import AuthBlock from "./auth-block";
import Title from "./title";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between px-8 backdrop-blur-3xl">
      <Title />
      <AuthBlock />
      <ModeToggle />
    </header>
  );
}
