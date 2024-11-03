// Import GSAP
import gsap from "gsap";

// Animate the page in with a full-screen banner
export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");

  if (bannerOne) {
    const tl = gsap.timeline();
    tl.set(bannerOne, { yPercent: -100 })
      .to(bannerOne, { yPercent: 0, duration: 1, ease: "power1.out" }) // Slide in
      .to(bannerOne, { yPercent: 100, duration: 0, ease: "power1.out" }, "+=2"); // Pause for 3 seconds then slide out
  }
};

// Animate the page out when navigating to a new page
export const animatePageOut = (href, router) => {
  const bannerOne = document.getElementById("banner-1");

  if (bannerOne) {
    const tl = gsap.timeline();
    tl.set(bannerOne, { yPercent: 100 }) // Ensure it starts in view
      .to(bannerOne, { yPercent: 0, duration: 1, ease: "power1.out" }) // Slide in
      .to(bannerOne, { yPercent: -100, duration: 2, ease: "power2.in", delay: 2, onComplete: () => {
        router(href); // Navigate after the animation
      } }); // Pause for 3 seconds before translating out
  }
};
