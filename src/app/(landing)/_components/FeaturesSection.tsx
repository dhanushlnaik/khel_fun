'use client';

import { useState, useRef, useEffect, ReactNode } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt: React.FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on mobile/touch devices
    if (isMobile || !itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setTransformStyle("");
    }
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: isMobile ? 'none' : transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src?: string;
  title: string;
  description?: string;
  players?: string;
  status?: "LIVE" | "WIP";
  link?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  src, 
  title, 
  description, 
  players = "1-4", 
  status = "LIVE", 
  link 
}) => {
  const isLive = status === "LIVE";
  const statusColor = isLive ? "border-green-400/50" : "border-yellow-400/50";
  const dotColor = isLive ? "bg-green-400" : "bg-yellow-400";
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleClick = () => {
    if (isLive && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // Prevent video autoplay issues on mobile
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay prevented - this is fine for mobile
      });
    }
  };
  
  return (
    <div className="group relative size-full">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        preload="metadata"
        onLoadedData={handleVideoLoad}
        className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        {/* Top Status Badges */}
        <div className="flex items-start justify-between">
          <div className={`flex items-center gap-2 rounded-full border ${statusColor} bg-black/50 px-3 py-1 backdrop-blur-sm`}>
            <div className={`h-2 w-2 ${isLive ? 'animate-pulse' : ''} rounded-full ${dotColor}`} />
            <span className="font-mono text-xs">{status}</span>
          </div>
          
          <div className="rounded-full border border-violet-300/50 bg-black/50 px-3 py-1 backdrop-blur-sm">
            <span className="font-mono text-xs">{players} Players</span>
          </div>
        </div>
        
        {/* Bottom Title and Description */}
        <div>
          <h1 className="bento-title special-font drop-shadow-lg">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-base">
              {description}
            </p>
          )}
          
          {/* Play Button appears on hover - different text for WIP */}
          <button 
            onClick={handleClick}
            disabled={!isLive}
            className={`mt-4 rounded-full border-2 border-white bg-violet-300 px-6 py-2 font-bold uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 ${
              isLive ? 'hover:bg-white hover:text-violet-300 cursor-pointer' : 'cursor-not-allowed opacity-70'
            }`}
          >
            {isLive ? 'Play Now →' : 'Coming Soon'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in section
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
      });

      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          opacity: 0,
          y: 50,
          scale: 0.9,
        });
      }

      // Animate cards
      gsap.utils.toArray<HTMLElement>(".bento-tilt_1, .bento-tilt_2, .zunno-glow-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
          opacity: 0,
          y: 80,
          scale: 0.95,
          rotateX: 10,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black pb-52 pt-20 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-violet-400/30 rounded-full animate-float" />
        <div className="absolute top-[40%] right-[15%] w-3 h-3 bg-blue-400/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[60%] left-[20%] w-2 h-2 bg-violet-300/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[80%] right-[25%] w-2 h-2 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
      </div>
      
      {/* Section Title */}
      <div ref={titleRef} className="relative z-10 text-center pb-16">
        <div className="inline-block mb-4 px-6 py-2 rounded-full border border-violet-500/30 bg-violet-500/10">
          <span className="text-violet-300 font-mono text-sm uppercase tracking-widest">⚔️ Game Collection</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-zentry font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 uppercase tracking-wider">
          Game Arsenal
        </h2>
        <p className="mt-4 text-violet-200/70 font-circular-web text-lg max-w-2xl mx-auto">Choose your battlefield and dominate the competition</p>
      </div>
      <div className="container mx-auto px-3 md:px-10">
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] zunno-glow-card">
          <BentoCard
            src="videos/feature-1.mp4"
            title="Zunno"
            description="Experience the thrill of traditional Zunno game on blockchain"
            players="2-4"
            status="LIVE"
            link="https://zunno.xyz"
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                <BentoCard 
                  src="videos/feature-2.mp4"
                  title="POKER"
                  description="Classic Texas Hold'em with crypto stakes - Coming Soon"
                  players="2-8"
                  status="WIP"
                />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                <BentoCard 
                  src="videos/feature-3.mp4"
                  title="3-PATTI"
                  description="Indian card game favorite with blockchain rewards - Coming Soon"
                  players="2-6"
                  status="WIP"
                />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                <BentoCard 
                  src="videos/feature-4.mp4"
                  title="TIC TAC TOE"
                  description="Quick matches, instant payouts - Coming Soon"
                  players="2"
                  status="WIP"
                />
            </BentoTilt>
        
            <BentoTilt  className="bento-tilt_2">
                <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                    <h1 className="bento-title special-font max-w-64 text-black">M<b>o</b>re co<b>m</b>ing s<b>o</b>on!</h1>

                    <TiLocationArrow className="m-5 scale-[5] self-end"/>
                </div>
            </BentoTilt>

            <BentoTilt className="bento-tilt_2">
                <video 
                 src="videos/feature-5.mp4"
                 loop
                 muted
                 autoPlay
                 className="size-full object-cover object-center"
                />
            </BentoTilt>

        </div>
      </div>
    </section>
  );
};

export default Features;
