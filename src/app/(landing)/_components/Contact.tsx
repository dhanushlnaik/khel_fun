"use client";

import { useRef, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => {
  return (
    <div className={clipClass}>
      <img src={src} alt="Contact decoration" />
    </div>
  );
};

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate decorative images
      imagesRef.current.forEach((img, i) => {
        if (img) {
          gsap.from(img, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
            opacity: 0,
            x: i % 2 === 0 ? -100 : 100,
            rotation: i % 2 === 0 ? -15 : 15,
          });
        }
      });

      // Pulsing glow effect
      gsap.to(".contact-glow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        scale: 1.2,
        opacity: 0.8,
        yoyo: true,
        repeat: -1,
        duration: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="contact" className="my-20 min-h-96 w-screen px-10 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="contact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-violet-400/40 rounded-full animate-float" />
        <div className="absolute top-[50%] right-[20%] w-3 h-3 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-violet-300/40 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="relative rounded-2xl bg-gradient-to-br from-black via-violet-950/20 to-black py-24 text-blue-50 sm:overflow-hidden border border-violet-500/20 shadow-2xl shadow-violet-500/10">
        {/* Left side decorative images */}
        <div 
          ref={(el) => { if (el) imagesRef.current[0] = el; }}
          className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96"
        >
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* Right side swordman images */}
        <div 
          ref={(el) => { if (el) imagesRef.current[1] = el; }}
          className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80"
        >
          <ImageClipBox
            src="img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center text-center">
          <AnimatedTitle
            title="let's b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="GG IRL" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
