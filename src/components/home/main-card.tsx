"use client";

import Shorts from "../shared/video-player/shorts";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import "@/style/gradient-border.css";

export default function MainCard() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        layout
        className="p-1 signup-card rounded-xl"
      >
        <Card className="w-[60vw] h-[80vh] flex flex-row gap-8 p-8 border-0 relative z-10 bg-card">
          <div className="h-[100%] w-auto aspect-[9/16] flex flex-col justify-between items-center">
            <div className="text-3xl text-center">Today's Highlights</div>

            <div className="w-[90%] h-[90%] rounded-xl overflow-hidden">
              <Shorts src="yeungmeh__1721575276_highlight18087333004367976_v1u3sr" />
            </div>
          </div>

          <Card className="w-full h-[100%]"></Card>
        </Card>
      </motion.div>
    </div>
  );
}
