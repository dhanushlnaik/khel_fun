import React from "react";
import type { FC } from "react";

// The FC type is used, but no 'use client' is necessary as it's a static component.
const BottomBar: FC = () => (
  // The 'btmbar' div uses Tailwind CSS for styling and gradient background
  <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
    
    {/* Scroll indicator with Remicons icon (ri-arrow-down-line) */}
    <div className="flex gap-4 items-center">
      {/* Assuming 'ri-arrow-down-line' is available via a linked CSS/font file */}
      <i className="text-4xl ri-arrow-down-line"></i>
      <h3 className="text-xl font-[Helvetica_Now_Display]">Scroll Down</h3>
    </div>
    
    {/* PS5 Logo/Image */}
    <img
      className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      src="./ps5.png"
      alt="PlayStation 5 logo" // Added descriptive alt text for accessibility
    />
  </div>
);

export default BottomBar;