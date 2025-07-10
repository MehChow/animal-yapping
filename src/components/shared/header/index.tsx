"use client";

import { ModeToggle } from "../../mode-toggle";
import AuthBlock from "./auth-block";
import NavMenu from "./nav-menu";
import Title from "./title";
import Upload from "./upload";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-center backdrop-blur-3xl">
      <Title />

      <NavMenu />

      <div className="flex items-center gap-3 absolute right-8">
        <AuthBlock />
        <Upload />
        <ModeToggle />
      </div>
    </header>
  );
}
