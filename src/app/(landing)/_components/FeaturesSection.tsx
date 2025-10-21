'use client';

import React, { useState, useRef, useEffect } from "react";
import type { FC, ReactNode, RefObject } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const timeline = gsap.timeline({ paused: true });

    timeline
      .to(card.querySelector('.card-bg'), {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(card.querySelector('.card-content'), {
        y: -20,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.6")
      .to(card.querySelector('.card-title'), {
        backgroundImage: "linear-gradient(45deg, #FFD700, #FFA500)",
        backgroundClip: "text",
        duration: 0.3
      }, "-=0.4");

    if (isHovered) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="bento-card relative size-full overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background with Gradient Overlay */}
      <div className="card-bg absolute inset-0 transform-gpu transition-transform duration-700">
        {src ? (
          <video
            src={src}
            loop
            muted
            autoPlay
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-900/40"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
      </div>
      
      {/* Enhanced Content Overlay */}
      <div className="card-content relative z-10 flex size-full flex-col justify-between p-8 text-white">
        <div className="space-y-4">
          <h1 className="card-title text-4xl md:text-5xl font-[var(--font-knight-warrior)] uppercase tracking-wider bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="card-description mt-3 max-w-64 text-sm md:text-base font-medium text-white/90 transform-gpu transition-all duration-500 group-hover:text-white">
              {description}
            </p>
          )}
        </div>
        <div className="card-footer transform-gpu translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {children}
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scaleX-0 group-hover:scaleX-100 transition-transform duration-500"></div>
    </div>
  );
};

// --- Features Section (Main Layout) ---

const Features: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Main section entrance animation
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1
      },
      backgroundColor: "rgba(0,0,0,0)",
      duration: 1
    });

    // Title animation with character split
    const titleChars = titleRef.current?.textContent?.split("") || [];
    if (titleRef.current) {
      titleRef.current.textContent = "";
      titleChars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block title-char";
        titleRef.current?.appendChild(span);
      });

      gsap.from(".title-char", {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: gsap.utils.random(-100, 100, true),
        rotateZ: gsap.utils.random(-90, 90, true),
        stagger: {
          amount: 1,
          from: "random"
        },
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      });
    }

    // Enhanced card animations
    gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play complete play reverse"
        },
        opacity: 0,
        y: 100,
        rotateX: 30,
        scale: 0.9,
        duration: 1,
        delay: i * 0.2,
        ease: "power4.out"
      });
    });
  }, []);

  return (
    // Added padding top to account for sticky Navbar
    <section ref={sectionRef} id="features" className="bg-black pt-20 pb-52 relative"> 
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-900/10 to-black opacity-50"></div>
      
      {/* Section Title */}
      <h2 
        ref={titleRef}
        className="relative z-10 text-center text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-16 font-[var(--font-knight-warrior)] uppercase tracking-wider"
      >
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
