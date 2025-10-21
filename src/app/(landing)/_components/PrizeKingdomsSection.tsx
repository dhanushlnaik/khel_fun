'use client';

import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Add particle animation
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
`;

const kingdoms = [
  {
    title: "Golden Empire",
    description: "Where fortunes are made and legends are born",
    image: "/kingdoms/1.png",
    prize: "₹1,00,000"
  },
  {
    title: "Diamond Dynasty",
    description: "Rule the tables with strategy and skill",
    image: "/kingdoms/2.png",
    prize: "₹50,000"
  },
  {
    title: "Royal Flush Realm",
    description: "Master the art of poker in this elite kingdom",
    image: "/kingdoms/4.png",
    prize: "₹75,000"
  }
];

const PrizeKingdomsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Simple entrance animations
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Setup floating animations for cards
    gsap.utils.toArray<HTMLElement>('.kingdom-card').forEach((card, index) => {
      // Initial fade in
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out"
        }
      );

      // Continuous floating animation
      gsap.to(card, {
        y: gsap.utils.random(-15, 15),
        rotateZ: gsap.utils.random(-2, 2),
        duration: gsap.utils.random(2, 3),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });

      // Hover animation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: gsap.utils.random(-15, 15),
          duration: 0.5,
          ease: "power2.inOut"
        });
      });
    });

      // Simple prize amount pulse animation
    gsap.to(".prize-amount", {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    // Prize amount animations
    gsap.to(".prize-amount", {
      textShadow: "0 0 20px rgba(255,215,0,0.8)",
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, []);

  return (
    <div ref={sectionRef} className="prize-section h-screen bg-black overflow-hidden relative opacity-0">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.05)_0%,rgba(0,0,0,1)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 flex flex-col min-h-screen justify-center">
        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600"
          style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
        >
          Prize Kingdoms
        </h1>

        {/* Cards Grid */}
        <div ref={cardsRef} className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {kingdoms.map((kingdom, index) => (
              <div
                key={index}
                className="kingdom-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/40 to-black/80 border border-yellow-500/30 p-1"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glowing border effect */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>

                {/* Main content container */}
                <div className="relative bg-gradient-to-br from-black/90 to-yellow-950/30 rounded-xl p-8 h-full transform-gpu transition-transform duration-500 group-hover:translate-y-[-8px]">
                  {/* Kingdom image */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                    <img
                      src={kingdom.image}
                      alt={kingdom.title}
                      className="w-full h-full object-cover object-center rounded-xl"
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <h3 
                      className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4 transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:from-yellow-200 group-hover:to-yellow-400"
                      style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
                    >
                      {kingdom.title}
                    </h3>

                    {/* Description */}
                    <p className="text-yellow-100/70 text-lg mb-8 transform-gpu transition-all duration-500 group-hover:text-yellow-100">
                      {kingdom.description}
                    </p>

                    {/* Prize amount with animated background */}
                    <div className="mt-auto">
                      <div className="prize-amount relative inline-block">
                        <span className="relative z-10 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:from-yellow-200 group-hover:to-yellow-400 transition-all duration-500">
                          {kingdom.prize}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/40 to-yellow-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Action button */}
                    <button 
                      className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl text-xl font-bold transform-gpu transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
                      style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
                    >
                      Enter Kingdom
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent transform-gpu scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent transform-gpu scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeKingdomsSection;