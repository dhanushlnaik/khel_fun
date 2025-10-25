"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ScrollIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToContent}
        className="flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-white/70 text-xs uppercase tracking-widest font-mono group-hover:text-violet-300 transition-colors">
          Scroll
        </span>
        <div className="relative">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1 group-hover:border-violet-300 transition-colors">
            <div className="w-1.5 h-2 bg-white/70 rounded-full animate-bounce group-hover:bg-violet-300" />
          </div>
          <FaChevronDown className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs animate-bounce group-hover:text-violet-300" style={{ animationDelay: "0.2s" }} />
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;
