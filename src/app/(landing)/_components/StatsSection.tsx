"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: string;
  label: string;
  icon: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const target = parseInt(value.replace(/[^0-9]/g, ''));
    
    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 80%",
          onEnter: () => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, 30);
          },
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay,
      });
    }, itemRef);

    return () => ctx.revert();
  }, [value, delay]);

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-zentry font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-300">
        {count > 0 ? `${count}${value.replace(/[0-9]/g, '')}` : value}
      </div>
      <div className="text-violet-200/70 font-circular-web text-sm md:text-base mt-2 text-center">
        {label}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative py-20 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-6 py-2 rounded-full border border-violet-500/30 bg-violet-500/10">
            <span className="text-violet-300 font-mono text-sm uppercase tracking-widest">📊 Platform Stats</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-zentry font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 uppercase">
            By The Numbers
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatItem value="10K+" label="Active Players" icon="🎮" delay={0} />
          <StatItem value="50+" label="Games Played Daily" icon="🎯" delay={0.1} />
          <StatItem value="99%" label="Uptime" icon="⚡" delay={0.2} />
          <StatItem value="100%" label="Fair & Transparent" icon="🔒" delay={0.3} />
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-violet-200/60 font-circular-web text-lg max-w-2xl mx-auto">
            Join thousands of players experiencing the future of gaming. Every game is verified on-chain, ensuring complete transparency and fairness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
