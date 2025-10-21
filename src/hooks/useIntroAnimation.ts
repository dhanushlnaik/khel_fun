import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Dispatch, SetStateAction } from "react";

export default function useIntroAnimation(
    // Type definition for the state setter function
    setShowContent: Dispatch<SetStateAction<boolean>>
): void {
    
    useGSAP(() => {
        const tl = gsap.timeline();
        
        // Step 1: Rotate the mask group element
        tl.to(".vi-mask-group", {
            rotate: 10,
            duration: 2,
            ease: "Power4.easeInOut",
            transformOrigin: "50% 50%", 
        })
        
        // Step 2: Scale up and fade out, starting before the rotation finishes (delay: -1.8)
        .to(".vi-mask-group", {
            scale: 10,
            duration: 2,
            delay: -1.8, 
            ease: "Expo.easeInOut",
            transformOrigin: "50% 50%",
            opacity: 0,
            
            onComplete: function () {
                // Callback to show the main content once the animation is complete
                setShowContent(true); 
            },
        });
        
    }, []); // Runs once on component mount
}