import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const useAnimation = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-quart",
      once: true,
      mirror: false
    });
  }, []);
};

export const aos = {
  fadeUp: "fade-up",
  fadeRight: "fade-right",
  fadeLeft: "fade-left",
  zoomIn: "zoom-in",
  slideLeft: "slide-left",
  slideUp: "fade-up",
  fadeDown: "fade-down",
  fadeIn: "fade-in",
} as const;
