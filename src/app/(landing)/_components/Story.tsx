"use client";

import { useRef, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoundedCorners from "./RoundedCorners";

gsap.registerPlugin(ScrollTrigger);

const Story: React.FC = () => {  const frameRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(".story-img-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        y: -100,
        ease: "none",
      });

      // Fade in content
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          opacity: 0,
          y: 50,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="min-h-dvh w-screen bg-black text-blue-50 relative overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-violet-400/40 rounded-full animate-float" />
        <div className="absolute top-[35%] right-[12%] w-3 h-3 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[70%] left-[15%] w-2 h-2 bg-violet-300/40 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <div className="relative size-full">
          <AnimatedTitle
            title="ONCHAIN GAMING X PROOF OF PLAY"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container max-w-4xl mx-auto">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain w-full h-auto max-h-[60vh]"
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>

        <div ref={contentRef} className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-violet-500/20">
            <h3 className="text-2xl font-zentry font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-300 mb-3">
              The Future of Gaming
            </h3>
            <p className="max-w-sm text-center font-circular-web text-violet-50 md:text-start text-lg leading-relaxed">
              Experience the perfect blend of traditional arcade fun with Blockchain transparency. Every move is recorded, every victory is verified.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-400/30 hover:bg-violet-500/30 transition-all duration-300 hover:scale-105">
                <span className="text-violet-300 font-mono text-sm">🎮 Skill-Based</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300 hover:scale-105">
                <span className="text-blue-300 font-mono text-sm">⛓️ On-Chain</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-400/30 hover:bg-violet-500/30 transition-all duration-300 hover:scale-105">
                <span className="text-violet-300 font-mono text-sm">🏆 Fair Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
