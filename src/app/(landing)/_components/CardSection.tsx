'use client';

import React from "react";
import type { FC } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CardSection: FC = () => {
    // GSAP animation for staggered card entry
    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".card-section",
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Fancy heading animation with split text effect
        timeline.from(".card-heading", {
            duration: 1.2,
            opacity: 0,
            y: 100,
            rotate: 5,
            skewX: 15,
            ease: "back.out(1.7)",
        });

        // Enhanced card animations
        timeline.fromTo(".card-item",
            {
                opacity: 0,
                y: 100,
                scale: 0.8,
                rotateY: 45,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.8)",
                stagger: {
                    each: 0.2,
                    from: "center",
                },
            },
            "-=0.5"
        );

        // Add hover animations for cards
        gsap.utils.toArray<HTMLElement>(".card-item").forEach((card) => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.3,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    ease: "power2.out"
                });
                gsap.to(card.querySelector(".card-icon"), {
                    scale: 1.2,
                    rotate: 360,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    duration: 0.5,
                    ease: "power2.inOut"
                });
                gsap.to(card.querySelector(".card-icon"), {
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });
        });
    }, []);

    const cards = [
        { title: "PLAY", text: "Engage in thrilling experiences and discover endless fun. Dive into a world designed for ultimate enjoyment." },
        { title: "WIN", text: "Compete for exclusive rewards, climb global leaderboards, and achieve victory in challenging environments." },
        { title: "EARN", text: "Convert your achievements and in-game success into real-world value and future profits effortlessly." }
    ];

    return (
        <div className="card-section w-full py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl"></div>
                </div>
                
                {/* Main Heading with glowing effect */}
                <h2 
                    className="card-heading text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300 text-center mb-16 uppercase tracking-widest relative" 
                    style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
                >
                    PLAY. WIN. EARN.
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 blur-xl opacity-50"></div>
                </h2>
                
                {/* Cards Container with enhanced styling */}
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch relative z-10">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            className="card-item group flex flex-col items-center bg-gray-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl transition-all w-full md:w-1/3 border border-yellow-500/20 hover:border-yellow-500"
                        >
                            {/* Enhanced icon container with glow effect */}
                            <div className="card-icon relative h-40 w-full mb-6 flex items-center justify-center">
                                <div className="absolute inset-0 bg-yellow-500/5 rounded-2xl transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-500"></div>
                                <div className="relative">
                                    <span className="flex items-center justify-center text-white text-5xl font-bold border-2 border-yellow-500/50 p-8 rounded-2xl bg-gray-700/80 shadow-xl backdrop-blur-sm transform group-hover:scale-110 transition-all duration-500">
                                        {card.title.charAt(0)}
                                    </span>
                                    <div className="absolute -inset-4 bg-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>

                            <h3 
                                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300 mb-4 uppercase" 
                                style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
                            >
                                {card.title}
                            </h3>
                            <p className="text-gray-300 text-center text-lg flex-grow">
                                {card.text}
                            </p>
                            
                            {/* Hover indicator */}
                            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardSection;
