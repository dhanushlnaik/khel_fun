
import React, { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import gsap from "gsap";
// NOTE: useWindowScroll is expected to be provided by the 'react-use' library.
import { useWindowScroll } from "react-use"; 
// NOTE: TiLocationArrow is expected to be provided by 'react-icons/ti'.
import { TiLocationArrow } from "react-icons/ti"; 
import Button from "./Button";

const navItems = ["ZUNNO", "3-PATTI", "POKER", "About", "Contact"];

const Navbar: FC = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for audio and navigation container, typed for clarity
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    const audio = audioElementRef.current;
    if (audio) {
      if (isAudioPlaying) {
        audio.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audio.pause();
      }
    }
  }, [isAudioPlaying]);

  // Manage scroll-based visibility, floating class, and progress
  useEffect(() => {
    const container = navContainerRef.current;
    if (!container) return;

    // Calculate scroll progress
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (currentScrollY / windowHeight) * 100;
    setScrollProgress(progress);

    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      container.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      container.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      container.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // GSAP animation for showing/hiding the navbar
  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isNavVisible]);

  // Animate progress bar
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: scrollProgress / 100,
        duration: 0.2,
        ease: "none",
      });
    }
  }, [scrollProgress]);

  return (
    <div
      ref={navContainerRef}
      // Added background and styling for a premium, fixed look
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6 "
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        
        <nav className="flex size-full items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl hover:shadow-violet-500/20 transition-shadow duration-300">
          
          {/* Logo and product button */}
          <div className="flex items-center gap-7">
            {/* Using KHEL.FUN as the main logo text */}
             <h3 
              className="text-2xl leading-none text-white uppercase font-black tracking-widest"
              style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }}
            >
              KHEL.FUN
            </h3>

            <Button
              id="product-button"
              title="KHILADI"
              rightIcon={<TiLocationArrow className="text-xl"/>}
              containerClass="bg-yellow-500 hover:bg-yellow-400 text-black md:flex hidden items-center justify-center gap-1 px-3 py-1.5"
            />
          </div>

          {/* Navigation links and audio button */}
          <div className="flex h-full items-center">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  // Custom styling for nav links
                  className="text-white text-sm font-semibold opacity-70 transition-opacity duration-200 hover:opacity-100"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Indicator Button */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 group focus:outline-none"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                // Assuming audio/loop.mp3 is in the public directory
                src="/audio/loop.mp3"
                loop
                // Muted attribute allows autoplay in some browsers, but will be toggled on click anyway.
                muted={!isAudioPlaying}
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line w-1 h-3 bg-white transition-colors duration-100 ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
              <span className="ml-2 text-white text-sm">
                {isAudioPlaying ? "MUTE" : "PLAY"}
              </span>
            </button>
          </div>
        </nav>
      </header>
      {/* Required for GSAP animation target, placed here for reference */}
      <style>{`
        /* Styles for the audio visualizer lines */
        .indicator-line {
          transform-origin: bottom;
          /* Base animation definition */
          animation: bar-wave 0.6s ease-in-out infinite alternate;
          opacity: 0.5;
        }

        .indicator-line.active {
          opacity: 1;
        }

        /* Pause animation when not active */
        .indicator-line:not(.active) {
          animation-play-state: paused;
          transform: scaleY(1); /* Ensure it stays at base height when paused */
        }

        /* Keyframes for the bar animation (pulsing) */
        @keyframes bar-wave {
          0% {
            transform: scaleY(0.4);
          }
          100% {
            transform: scaleY(2);
          }
        }

        /* Style for when the navbar is floating (e.g., has a background color) */
        .floating-nav header {
          /* You can add extra styles here if needed, but the main styling is on the <nav> element */
        }
      `}</style>
    </div>
  );
};

export default Navbar;
