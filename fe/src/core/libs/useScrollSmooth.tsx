import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap-trial";

type LenisOptions = {
  duration: number;
  wheelMultiplier: number;
  lerp: number;
};

export const useScrollSmooth = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.5,
      lerp: 0.05,
    });

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (scroll <= 500) {
        (lenis as any).options = {
          ...(lenis as any).options,
          duration: 3.5,
          wheelMultiplier: 0.5,
          lerp: 0.05,
        };
      } else {
        (lenis as any).options = {
          ...(lenis as any).options,
          duration: 1.2,
          wheelMultiplier: 1,
          lerp: 0.1,
        };
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
};
