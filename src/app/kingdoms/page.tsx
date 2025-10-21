'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const kingdoms = [
  {
    title: "Golden Empire",
    description: "Where fortunes are made and legends are born",
    image: "/kingdoms/golden-empire.jpg",
    prize: "₹1,00,000"
  },
  {
    title: "Diamond Dynasty",
    description: "Rule the tables with strategy and skill",
    image: "/kingdoms/diamond-dynasty.jpg",
    prize: "₹50,000"
  },
  {
    title: "Royal Flush Realm",
    description: "Master the art of poker in this elite kingdom",
    image: "/kingdoms/royal-flush.jpg",
    prize: "₹75,000"
  },
  {
    title: "Teen Patti Paradise",
    description: "Experience the thrill of traditional card games",
    image: "/kingdoms/teen-patti.jpg",
    prize: "₹60,000"
  }
];

export default function PrizeKingdoms() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial animation for the main title
    const tl = gsap.timeline();
    tl.from(".main-title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    })
    .from(".subtitle", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=1");

    // Parallax scroll effect for the background
    gsap.to(".parallax-bg", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Floating cards animation
    const cards = gsap.utils.toArray<HTMLElement>(".kingdom-card");
    cards.forEach((card, i) => {
      // Random floating animation
      gsap.to(card as HTMLElement, {
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-5, 5),
        duration: gsap.utils.random(2, 4),
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.2
      });

      // Scroll trigger for each card
      gsap.from(card as HTMLElement, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "center center",
          scrub: 1
        },
        scale: 0.8,
        opacity: 0,
        rotateY: 45,
        transformOrigin: "center center"
      });
    });

    // Continuous rotation for the prize amounts
    gsap.to(".prize-amount", {
      rotateX: 360,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      stagger: 0.2
    });
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-black overflow-hidden">
      {/* Parallax Background */}
      <div className="parallax-bg fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.1)_0%,rgba(0,0,0,0.5)_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 
            className="main-title text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 mb-8"
            style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
          >
            Prize Kingdoms
          </h1>
          <p className="subtitle text-2xl md:text-4xl text-yellow-100/80 max-w-3xl mx-auto">
            Explore the world of limitless possibilities where every game is a chance to claim your throne
          </p>
        </div>

        {/* Kingdoms Grid */}
        <div ref={cardsRef} className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {kingdoms.map((kingdom, index) => (
              <div
                key={index}
                className="kingdom-card group relative perspective"
              >
                <div className="relative transform-style-3d transition-transform duration-1000 hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-900/40 rounded-2xl backdrop-blur-sm border border-yellow-500/30 p-8 backface-hidden">
                    <h3 className="text-4xl font-bold text-yellow-300 mb-4" style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}>
                      {kingdom.title}
                    </h3>
                    <p className="text-yellow-100/70 text-lg mb-6">
                      {kingdom.description}
                    </p>
                    <div className="prize-amount text-5xl font-bold text-yellow-400">
                      {kingdom.prize}
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 to-yellow-400/20 rounded-2xl backdrop-blur-sm border border-yellow-500/30 p-8 rotate-y-180 backface-hidden">
                    <div className="h-full flex flex-col items-center justify-center">
                      <button className="px-8 py-4 bg-yellow-500 text-black rounded-xl text-xl font-bold transform hover:scale-105 transition-transform">
                        Enter Kingdom
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}