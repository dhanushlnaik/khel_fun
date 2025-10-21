'use client';

import React from "react";
import type { FC } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CardSection: FC = () => {
    // GSAP animation for staggered card entry
    useGSAP(() => {
        // Animation for the main heading text
        gsap.fromTo(".card-heading",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
        );

        // Staggered animation for the three cards
        gsap.fromTo(".card-item",
            { opacity: 0, y: 100, scale: 0.95 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 1.2, 
                ease: "power3.out",
                stagger: 0.2, // Staggered delay between each card
                delay: 0.8, // Start slightly after the main heading
            }
        );
    }, []);

    const cards = [
        { title: "PLAY", text: "Engage in thrilling experiences and discover endless fun. Dive into a world designed for ultimate enjoyment." },
        { title: "WIN", text: "Compete for exclusive rewards, climb global leaderboards, and achieve victory in challenging environments." },
        { title: "EARN", text: "Convert your achievements and in-game success into real-world value and future profits effortlessly." }
    ];

    return (
        <div className="w-full py-24 bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Heading (using the project's custom font variable) */}
                <h2 
                    className="card-heading text-6xl md:text-8xl font-black text-white text-center mb-16 uppercase tracking-widest" 
                    style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
                >
                    PLAY. WIN. EARN.
                </h2>
                
                {/* Cards Container */}
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            className="card-item flex flex-col items-center bg-gray-800 p-8 rounded-3xl shadow-2xl transition-all w-full md:w-1/3 border-t-4 border-yellow-500 hover:scale-[1.03] duration-300 cursor-pointer"
                        >
                            {/* Placeholder for the 3D images shown in the user's reference */}
                            <div className="h-40 w-full mb-6 flex items-center justify-center bg-gray-700/50 rounded-lg">
                                <span className="text-white text-5xl font-bold border-4 border-yellow-500 p-5 rounded-full bg-gray-700 shadow-xl">
                                    {card.title.charAt(0)}
                                </span>
                            </div>

                            <h3 
                                className="text-3xl font-extrabold text-yellow-500 mb-4 uppercase" 
                                style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
                            >
                                {card.title}
                            </h3>
                            <p className="text-gray-300 text-center text-lg flex-grow">
                                {card.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardSection;
