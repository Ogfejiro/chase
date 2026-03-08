"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    // Dynamically import AOS so it only runs client-side
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        once: false,       // re-animate every time element enters viewport (up & down)
        mirror: true,      // fade OUT when scrolling away, fade IN when coming back
        easing: "ease-out-cubic",
        offset: 80,
        delay: 0,
      });
    });
  }, []);

  return null;
}