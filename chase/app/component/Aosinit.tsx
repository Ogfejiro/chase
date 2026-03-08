"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    // Dynamically import AOS so it only runs client-side
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        once: true,        // animate only once per element
        easing: "ease-out-cubic",
        offset: 80,        // trigger 80px before element enters viewport
        delay: 0,
      });
    });
  }, []);

  return null;
}