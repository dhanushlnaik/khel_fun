import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollReveal = (
  ref: RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  options: ScrollRevealOptions = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      end: options.end || 'top 20%',
      scrub: options.scrub !== undefined ? options.scrub : false,
      markers: options.markers || false,
      pin: options.pin || false,
      toggleActions: 'play none none reverse',
      onEnter: options.onEnter,
      onLeave: options.onLeave,
    };

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 50, ...animation.from },
      {
        opacity: 1,
        y: 0,
        ...animation,
        scrollTrigger: scrollTriggerConfig,
      }
    );

    return () => {
      tween.kill();
    };
  }, [ref, animation, options]);
};

export default useScrollReveal;
