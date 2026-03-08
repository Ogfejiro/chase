"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        once: false,
        mirror: true,
        easing: "ease-out-cubic",
        offset: 60,
        delay: 0,
      });
    });

    // AOS doesn't always re-check on scroll up — this forces it
    const handleScroll = () => {
      import("aos").then((AOS) => {
        AOS.default.refresh();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}