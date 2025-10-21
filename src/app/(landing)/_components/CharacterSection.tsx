'use client';

import React, { useRef, useEffect } from "react";
import type { FC } from "react";
import type { HeroTextContent } from "@/content/heroText"; 
import heroText from "@/content/heroText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CharacterSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        toggleActions: "play reverse play reverse"
      }
    });

    // Enhanced card entrance animation
    tl.from(cardRef.current, {
      xPercent: -100,
      rotateY: 45,
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: "power2.out"
    })
    .to(cardRef.current, {
      rotateY: -15,
      scale: 1.1,
      duration: 2,
      ease: "none"
    });

    // Improved text animations with better timing
    const texts = gsap.utils.toArray<HTMLElement>(".hero-text");
    texts.forEach((text, i) => {
      gsap.from(text as HTMLElement, {
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play complete none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power4.out"
      });
    });

    // Continuous floating animation
    const floatingTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    floatingTl
      .to(cardRef.current, {
        y: "-20px",
        duration: 2,
        ease: "sine.inOut"
      })
      .to(cardRef.current, {
        y: "20px",
        duration: 2,
        ease: "sine.inOut"
      });

    // Mouse movement effect for the card
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      
      gsap.to(cardRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={sectionRef} className="character-to-prize-trigger w-full h-screen flex items-center justify-center bg-black overflow-hidden perspective">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"></div>
      <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* 3D Card Section */}
        <div className="w-full md:w-1/3 relative perspective">
          <div 
            ref={cardRef}
            className="relative w-full max-w-md mx-auto aspect-[3/4] transform-style-3d scale-75"
          >
            <div className="card-face absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl shadow-2xl overflow-hidden border-2 border-yellow-300/30">
              <img
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
                src="./teenpatti.png"
                alt="Character illustration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}>
                    TEEN PATTI
                  </h3>
                  <p className="text-white/80">Master the art of the cards</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-yellow-500/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 text-white space-y-6">
          <h1 className="hero-text text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}>
            {heroText.heading1}
          </h1>
          <h2 className="hero-text text-5xl md:text-7xl font-bold text-yellow-500/80" style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}>
            {heroText.heading2}
          </h2>
          {(heroText as HeroTextContent).paragraphs.map((para, i) => (
            <p key={i} className="hero-text text-xl text-gray-300 font-light leading-relaxed">
              {para}
            </p>
          ))}
          <button className="hero-text bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 px-12 py-6 rounded-xl text-black text-2xl font-bold transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/50">
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}
export default CharacterSection;