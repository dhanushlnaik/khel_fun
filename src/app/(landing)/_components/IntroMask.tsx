'use client';

import React from "react";
import type { FC } from "react";

const IntroMask: FC = () => (
  // The outer div uses Tailwind CSS for full-screen centering
  <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <mask id="viMask">
          <rect width="100%" height="100%" fill="black" />
          
          <g className="vi-mask-group">
            <text
              x="50%"
              y="50%"
              fontSize="250"
              textAnchor="middle"
              fill="white" 
              dominantBaseline="middle"
              fontFamily="zentry"
            >
              K.F
            </text>
          </g>
        </mask>
      </defs>
      
      <image
        href="./bg.png" 
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        mask="url(#viMask)" // Applies the mask showing only the K.F area
      />
    </svg>
  </div>
);

export default IntroMask;