'use client'; 

import React, { useRef } from "react";
import type { FC } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useMouseParallax from "@/hooks/useMouseParallax";
import BottomBar from "./BottomBar";
import CharacterSection from "./CharacterSection";
import HeroText from "./HeroText";
import CardSection from "./CardSection";
import Navbar from "@/components/Navbar";
import Features from "./FeaturesSection";


const LandingPage: FC = () => {
  const mainRef = useRef<HTMLDivElement>(null!); 
  
  useMouseParallax(mainRef);

  useGSAP(() => {
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1, 
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    // Animate the main character image
    gsap.to(".character", {
      scale: 0.8,
      x: "-50%",
      bottom: "-25%", // Adjusted to push the image further down and hide the gap
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
  }, []);

  return (
    <div className="main w-full rotate-[-10deg] scale-[1.7]" ref={mainRef}>
      <div className="landing overflow-hidden relative w-full h-screen bg-black">
        <Navbar />

        <div className="imagesdiv relative overflow-hidden w-full h-screen">
          <img
            className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
            src="./sky.png"
            alt="Sky background"
          />
          <img
            className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
            src="./bg.png"
            alt="Main background"
          />
          <HeroText />
          <img
            // Increased initial bottom offset to ensure it starts fully off-screen
            className="absolute character -bottom-[100%] left-1/2 -translate-x-1/2 scale-[1.5] rotate-[-20deg]"
            src="./girl.png"
            alt="Main character"
          />
        </div>
        <BottomBar />
      </div>
      <CharacterSection />
      <Features/>
    </div>
  );
};

export default LandingPage;
