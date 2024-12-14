import { gsap } from "gsap";

if (typeof window !== "undefined") {
  gsap.defaults({
    overwrite: "auto",
  });
}

export { gsap };
