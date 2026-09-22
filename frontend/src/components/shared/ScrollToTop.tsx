import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useSmoothScroll();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, lenis]);

  return null;
}
