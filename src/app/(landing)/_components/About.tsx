"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const cubesContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const GRID_SIZE = 4; // 4x4 grid = 16 cubes
    const cubes: HTMLDivElement[] = [];

    if (!cubesContainerRef.current) return;

    // Clear any existing cubes
    cubesContainerRef.current.innerHTML = '';

    // Create cube grid
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cube = document.createElement("div");
        cube.className = "cube-piece";
        cube.style.backgroundImage = "url(img/about.webp)";
        cube.style.backgroundSize = `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`;
        cube.style.backgroundPosition = `${(col * 100) / (GRID_SIZE - 1)}% ${(row * 100) / (GRID_SIZE - 1)}%`;
        cube.style.gridColumn = (col + 1).toString();
        cube.style.gridRow = (row + 1).toString();
        cube.style.setProperty("--row", row.toString());
        cube.style.setProperty("--col", col.toString());

        // Add data attributes for animation
        cube.dataset.row = row.toString();
        cube.dataset.col = col.toString();

        cubesContainerRef.current.appendChild(cube);
        cubes.push(cube);
      }
    }

    const isMobile = window.innerWidth < 768;

    // Set initial state for container and cubes
    gsap.set(".cube-grid-container", {
      force3D: true,
      transformPerspective: 1500,
    });

    gsap.set(cubes, {
      force3D: true,
      transformStyle: "preserve-3d",
    });

    // Main timeline with scroll trigger that PINS the entire section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-section",
        start: "top top",
        end: "+=3000",
        scrub: 1.5,
        pin: "#clip",
        pinSpacing: false,
        anticipatePin: 1,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    // Animate cubes splitting and moving
    cubes.forEach((cube) => {
      const row = parseInt(cube.dataset.row ?? "0");
      const col = parseInt(cube.dataset.col ?? "0");

      const isEven = (row + col) % 2 === 0;

      const centerRow = (GRID_SIZE - 1) / 2;
      const centerCol = (GRID_SIZE - 1) / 2;
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const angle = Math.atan2(row - centerRow, col - centerCol);
      const movementMultiplier = isEven ? 1 : -0.8;
      const xMove = Math.cos(angle) * distanceFromCenter * 50 * movementMultiplier;
      const yMove = Math.sin(angle) * distanceFromCenter * 50 * movementMultiplier;

      const rotation = isEven ? 360 : -360;
      const scale = 1 + distanceFromCenter * 0.15;
      const zMove = isEven ? 150 : -150;

      tl.to(
        cube,
        {
          x: xMove,
          y: yMove,
          z: zMove,
          rotationX: isEven ? 180 : 0,
          rotationY: rotation,
          rotationZ: isEven ? 90 : -90,
          scale,
          ease: "power2.inOut",
          opacity: 0.95,
          force3D: true,
          boxShadow: isEven
            ? "0 0 30px rgba(87, 36, 255, 0.8), 0 0 60px rgba(87, 36, 255, 0.4)"
            : "0 0 30px rgba(79, 183, 221, 0.8), 0 0 60px rgba(79, 183, 221, 0.4)",
        },
        0
      );
    });

    // Expand container while maintaining center position (happens during cube animation)
    tl.to(
      ".cube-grid-container",
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power2.inOut",
      },
      0
    );

    // Fade out cubes at the end (starts at 60% through the animation)
    tl.to(
      ".cube-piece",
      {
        opacity: 0,
        scale: 0.5,
        stagger: {
          amount: 0.3,
          from: "center",
          grid: [GRID_SIZE, GRID_SIZE],
        },
        ease: "power2.in",
      },
      0.6
    );

    // Fade out the entire container at the very end
    tl.to(
      ".cube-grid-container",
      {
        opacity: 0,
        ease: "power2.inOut",
      },
      0.9
    );

    return () => {
      cubes.forEach((cube) => cube.remove());
    };
  });

  return (
    <section id="about-section" className="relative w-screen">
    <div id="about" className="min-h-screen w-screen bg-gradient-to-b from-black via-violet-950/30 to-violet-900/20 relative overflow-hidden">
      {/* Seamless transition overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-0" />
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mb-8 pt-36 flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest text-violet-300">
            The Game
          </span>
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
        </div>

        <AnimatedTitle
          title="LIFE IS A KHEL"
          containerClass="mt-5 !text-white text-center"
        />

        <p className="max-w-2xl text-center font-circular-web text-lg text-white/80">
          Where blockchain meets arcade nostalgia. Prove your skills, earn rewards, dominate the leaderboard.
        </p>
      </div>

      <div className="h-dvh w-screen relative" id="clip">
        <div ref={cubesContainerRef} className="cube-grid-container about-image" />

        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-300/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>
    </div>
    </section>
  );
};

export default About;
