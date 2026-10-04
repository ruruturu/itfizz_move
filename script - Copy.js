gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const headline = document.querySelector(".headline");

headline.dataset.text.split(" ").forEach((word) => {
  const wordEl = document.createElement("span");
  wordEl.className = "word";
  wordEl.setAttribute("aria-hidden", "true");

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

function playIntro() {
  const nums = stats.map((stat) => stat.querySelector(".num"));
  nums.forEach((num) => (num.textContent = "0"));

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  intro
    .from(chars, { y: 36, opacity: 0, duration: 0.9, stagger: 0.05 })
    .add("stats", "-=0.3")
    .from(stats, { y: 40, opacity: 0, duration: 0.8, stagger: 0.18 }, "stats");

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

function setupScroll() {
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tl
    .fromTo(
      car,
      { x: () => -car.offsetWidth },
      { x: () => window.innerWidth, duration: 1 },
      0
    )
    .to(".road__lines", { x: () => -window.innerWidth * 0.9, duration: 1 }, 0)
    .to(chars, { color: "#ffffff", duration: 0.06, stagger: { amount: 0.8 } }, 0.08)
    .to(".glow", { xPercent: 40, duration: 1 }, 0)
    .to(".hint", { autoAlpha: 0, duration: 0.08 }, 0);
}

if (prefersReduced) {
  gsap.set(chars, { color: "#ffffff" });
  const center = () => gsap.set(car, { x: (window.innerWidth - car.offsetWidth) / 2 });
  center();
  window.addEventListener("resize", center);
} else {
  playIntro();
  setupScroll();
}
