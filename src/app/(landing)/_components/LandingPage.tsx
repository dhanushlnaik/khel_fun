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
import About from "./About";
import Story from "./Story";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollIndicator from "./ScrollIndicator";
import StatsSection from "./StatsSection";


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
    ScrollTrigger.create({
      trigger: ".character-to-prize-trigger",
      start: "top top",
      end: "bottom center",
      onEnter: () => {
        gsap.to(".prize-section", {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut"
        });
      },
      onLeave: () => {
        gsap.to(".prize-section", {
          opacity: 1,
          duration: 0.5
        });
      },
      onEnterBack: () => {
        gsap.to(".prize-section", {
          opacity: 1,
          duration: 0.5
        });
      },
      onLeaveBack: () => {
        gsap.to(".prize-section", {
          opacity: 0,
          duration: 0.5
        });
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
    <div ref={mainRef} className="relative min-h-screen w-screen overflow-x-hidden">
      <ScrollIndicator />
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
      {/* Smooth section transitions */}
      <div className="relative bg-black z-10 min-h-screen">
        {/* Test visibility section */}
        
        {/* About section commented out */}
        {/* <About /> */}
        
        <Features />
        
        <StatsSection />
        
        <Story />
        
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
