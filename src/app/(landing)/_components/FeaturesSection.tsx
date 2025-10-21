'use client';

import React, { useState, useRef, useEffect } from "react";
import type { FC, ReactNode, RefObject } from "react";
import { TiLocationArrow } from "react-icons/ti";
// Assuming you have a custom font variable defined for headings
// const FONT_CLASS = "special-font"; 

// --- BentoTilt Component (Interactive Mouse Tilt Effect) ---

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt: FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentItem = itemRef.current;
    if (!currentItem) return;

    const { left, top, width, height } = currentItem.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    // Calculate tilt angle: 5 degrees max tilt
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    // Create the 3D CSS transform style
    const newTransform = `
      perspective(1000px) 
      rotateX(${tiltX}deg) 
      rotateY(${tiltY}deg) 
      scale3d(1.0, 1.0, 1.0)
    `;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    // Reset transform smoothly
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.0, 1.0, 1.0)");
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// --- BentoCard Component (Content Wrapper) ---

interface BentoCardProps {
  src?: string; // Optional video source
  title: string;
  description?: string;
  isCustomContent?: boolean; // Flag for special non-video content cards
  children?: ReactNode;
}

const BentoCard: FC<BentoCardProps> = ({ src, title, description, children }) => {
  return (
    <div className="relative size-full overflow-hidden rounded-xl">
      {/* Video Background */}
      {src && (
        <video
          src={src}
          loop
          muted
          autoPlay
          playsInline // Important for mobile performance
          className="absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white bg-black/30 backdrop-blur-[1px]">
        <div>
          {/* Using the Knight Warrior font variable */}
          <h1 className="bento-title text-4xl md:text-5xl font-[var(--font-knight-warrior)] uppercase tracking-wider">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base font-sans font-medium text-white/80">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Features Section (Main Layout) ---

const Features: FC = () => {
  return (
    // Added padding top to account for sticky Navbar
    <section id="features" className="bg-black pt-20 pb-52"> 
      {/* Section Title */}
      <h2 className="text-center text-6xl md:text-8xl text-white mb-16 font-[var(--font-knight-warrior)] uppercase tracking-wider">
        The Khel.Fun Suite
      </h2>

      <div className="container mx-auto px-4 md:px-10">
        
        {/* Row 1: Large Bento Card (Zunno) */}
        <BentoTilt className="relative mb-7 h-96 w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:shadow-yellow-500/30 transition-shadow md:h-[65vh]">
          <BentoCard
            src="/videos/feature-1.mp4"
            title="Zunno"
            description="The ultimate skill-based card game. Challenge players globally and climb the leaderboards."
          />
        </BentoTilt>

        {/* Row 2 & 3: Grid Layout */}
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-5 md:gap-7">
          
          {/* Card 2: POKER (Spanning 2 rows) */}
          <BentoTilt className="col-span-2 row-span-1 overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:shadow-yellow-500/30 transition-shadow md:col-span-1 md:row-span-2">
            <BentoCard 
              src="/videos/feature-2.mp4"
              title="POKER"
              description="Hold 'em, Omaha, and more. Experience authentic, high-stakes poker action."
            />
          </BentoTilt>

          {/* Card 3: 3-PATTI (Tall Card) */}
          <BentoTilt className="col-span-2 row-span-1 overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:shadow-yellow-500/30 transition-shadow md:col-span-1 md:row-span-1">
            <BentoCard 
              src="/videos/feature-3.mp4"
              title="3-PATTI"
              description="Fast, fun, and easy to learn. The classic Indian card game, modernized."
            />
          </BentoTilt>

          {/* Card 4: Tic Tac Toe */}
          <BentoTilt className="col-span-2 row-span-1 overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:shadow-yellow-500/30 transition-shadow md:col-span-1 md:row-span-1">
            <BentoCard 
              src="/videos/feature-4.mp4"
              title="TIC TAC TOE"
              description="A quick multiplayer classic for when you need a break."
            />
          </BentoTilt>
          
          {/* Card 5: More Coming Soon (Custom Content) */}
          <BentoTilt className="col-span-2 row-span-1 overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:shadow-yellow-500/30 transition-shadow md:col-span-1 md:row-span-1">
            <div className="flex size-full flex-col justify-between bg-violet-800 p-8">
              <h1 className="text-4xl md:text-5xl font-[var(--font-knight-warrior)] uppercase text-yellow-300">
                <span className="text-white">More</span> co<span className="text-white">m</span>ing s<span className="text-white">o</span>on!
              </h1>
              {/* Gold arrow icon */}
              <TiLocationArrow className="m-5 scale-[5] self-end text-yellow-500/70"/>
            </div>
          </BentoTilt>

          {/* Card 6: Showcase Video */}
          <BentoTilt className="col-span-2 row-span-1 overflow-hidden rounded-xl border border-white/20 shadow-2xl hover:shadow-yellow-500/30 transition-shadow md:col-span-2 md:row-span-1">
            <BentoCard
              src="/videos/feature-5.mp4"
              title="Global Competition"
              description="Play against friends and rivals worldwide for ultimate glory and rewards."
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
