import { useEffect, RefObject } from "react";
import gsap from "gsap";

export default function useMouseParallax(
    // Type the ref as a RefObject holding an HTMLDivElement
    ref: RefObject<HTMLDivElement>
): void {
    
    useEffect(() => {
        if (!ref.current) return;
        
        const container = ref.current;

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate movement based on mouse position
            const xMove = (e.clientX / window.innerWidth - 0.5) * 40; 

            // Apply parallax effect with different multipliers for depth illusion
            gsap.to(".main .text", { x: `${xMove * 0.4}%`, duration: 0.5 });
            gsap.to(".sky", { x: xMove, duration: 0.5 });
            gsap.to(".bg", { x: xMove * 1.7, duration: 0.5 });
        };

        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
        };
        
    }, [ref]);
}