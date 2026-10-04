/* Itzfizz – scroll-driven hero
 * 1. Split the headline into letters
 * 2. Intro animation on load (letters + stats stagger in, numbers count up)
 * 3. Scroll animation: car drives across, road slides, letters light up as it passes
 */

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Split headline ---------- */
const headline = document.querySelector(".headline");

headline.dataset.text.split(" ").forEach((word) => {
  const wordEl = document.createElement("span");
  wordEl.className = "word";
  wordEl.setAttribute("aria-hidden", "true"); // the h1 already has an aria-label

  [...word].forEach((letter) => {
    const charEl = document.createElement("span");
    charEl.className = "char";
    charEl.textContent = letter;
    wordEl.appendChild(charEl);
  });

  headline.appendChild(wordEl);
});

const chars = gsap.utils.toArray(".char");
const stats = gsap.utils.toArray(".stat");
const car = document.querySelector(".car");

/* ---------- 2. Intro animation (time-based) ---------- */
function playIntro() {
  const nums = stats.map((stat) => stat.querySelector(".num"));
  nums.forEach((num) => (num.textContent = "0"));

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  intro
    .from(chars, { y: 36, opacity: 0, duration: 0.9, stagger: 0.05 })
    .add("stats", "-=0.3")
    .from(stats, { y: 40, opacity: 0, duration: 0.8, stagger: 0.18 }, "stats");

  // count each percentage up, one after another
  nums.forEach((num, i) => {
    const counter = { value: 0 };
    intro.to(
      counter,
      {
        value: Number(num.dataset.value),
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => (num.textContent = Math.round(counter.value)),
      },
      `stats+=${i * 0.18}`
    );
  });
}

/* ---------- 3. Scroll animation (progress-based) ---------- */
function setupScroll() {
  const tl = gsap.timeline({
    defaults: { ease: "none" }, // scrubbed motion should be linear; scrub gives the smoothing
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // 1s of catch-up = the interpolation that makes it feel fluid
      invalidateOnRefresh: true, // recalculate pixel values on resize
    },
  });

  tl
    // car drives from just off-screen left to just off-screen right
    .fromTo(
      car,
      { x: () => -car.offsetWidth },
      { x: () => window.innerWidth, duration: 1 },
      0
    )
    // road lines slide the opposite way so the car feels fast
    .to(".road__lines", { x: () => -window.innerWidth * 0.9, duration: 1 }, 0)
    // letters light up left to right, roughly as the car passes under them
    .to(chars, { color: "#ffffff", duration: 0.06, stagger: { amount: 0.8 } }, 0.08)
    // soft glow drifts along, scroll hint fades out
    .to(".glow", { xPercent: 40, duration: 1 }, 0)
    .to(".hint", { autoAlpha: 0, duration: 0.08 }, 0);
}

/* ---------- Start ---------- */
if (prefersReduced) {
  // no motion: show the finished state
  gsap.set(chars, { color: "#ffffff" });
  const center = () => gsap.set(car, { x: (window.innerWidth - car.offsetWidth) / 2 });
  center();
  window.addEventListener("resize", center);
} else {
  playIntro();
  setupScroll();
}
