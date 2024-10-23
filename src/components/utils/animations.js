import gsap from "gsap";

// Animate the page in with a full-screen banner
export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");

  if (bannerOne) {
    const tl = gsap.timeline();
    tl.set(bannerOne, { yPercent: -100})
      .to(bannerOne, { yPercent: 100, duration: 1.6, ease: "power1.out" });
  }
};

// Animate the page out when navigating to a new page
export const animatePageOut = (href, router) => {
  const bannerOne = document.getElementById("banner-1");

  if (bannerOne) {
    const tl = gsap.timeline();
    tl.set(bannerOne, { yPercent: -100 })
      .to(bannerOne, { yPercent: 100, duration: 1.6, ease: "power2.in", onComplete: () => {
        router(href); // Navigate after the animation
      } });
  }
};
