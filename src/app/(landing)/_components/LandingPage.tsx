'use client'; 

import React, { useRef } from "react";
import type { FC } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useMouseParallax from "@/hooks/useMouseParallax";
import BottomBar from "./BottomBar";
import CharacterSection from "./CharacterSection";
import HeroText from "./HeroText";
import CardSection from "./CardSection";
import Navbar from "@/components/Navbar";
import Features from "./FeaturesSection";
import PrizeKingdomsSection from "./PrizeKingdomsSection";


const LandingPage: FC = () => {
  const mainRef = useRef<HTMLDivElement>(null!); 
  
  useMouseParallax(mainRef);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();
    
    // Initial state setup
    gsap.set([".sky", ".bg", ".character", ".text"], { 
      opacity: 0,
      scale: 1.5 
    });

    // Set up section transition
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".character-to-prize-trigger",
        start: "center center",
        end: "bottom top",
        scrub: 1,
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          // Fade in the transition elements
          gsap.to(".transition-from", {
            opacity: 1,
            duration: 1
          });
          
          // Reveal the prize section background
          gsap.to(".transition-bg", {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut"
          });
        },
        onLeaveBack: () => {
          // Reverse the transition when scrolling back
          gsap.to([".transition-from", ".transition-bg"], {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          });
        }
      }
    });

    // Add floating particles effect during transition
    gsap.to(".animate-float", {
      y: -30,
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Create a dynamic entry sequence
    tl.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 1.5,
      ease: "expo.out",
    })
    .to(".sky", {
      opacity: 1,
      scale: 1.1,
      rotate: 0,
      duration: 1.2,
      ease: "power2.inOut",
    }, "-=1.2")
    .to(".bg", {
      opacity: 1,
      scale: 1.1,
      rotate: 0,
      duration: 1.2,
      ease: "power2.inOut",
    }, "-=1")
    .to(".character", {
      opacity: 1,
      scale: 0.7,
      x: "-50%",
      bottom: "-20%",
      rotate: 0,
      duration: 1.5,
      ease: "back.out(1.2)",
    }, "-=0.8")
    .to(".text", {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: "back.out(1.4)",
    }, "-=1");

    // Add parallax effect on scroll
    gsap.to([".sky", ".bg"], {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".landing",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Add floating animation to character
    gsap.to(".character", {
      y: "20px",
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div className="main w-full rotate-[-8deg] scale-[1.5]" ref={mainRef}>
      <div className="landing overflow-hidden relative w-full h-screen bg-black">
        <Navbar />

        <div className="imagesdiv relative overflow-hidden w-full h-screen">
          <img
            className="absolute sky scale-[1.3] rotate-[-15deg] top-0 left-0 w-full h-full object-cover"
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
      <div className="relative">
        {/* Transition overlay */}
        <div className="transition-overlay fixed inset-0 bg-black pointer-events-none z-50 opacity-0"></div>
        
        <CharacterSection />
        
        {/* Transition background */}
        <div className="transition-bg fixed inset-0 bg-gradient-to-b from-yellow-500/20 to-black opacity-0 pointer-events-none"></div>
        
        <PrizeKingdomsSection />
      </div>
    </div>
  );
};

export default LandingPage;
