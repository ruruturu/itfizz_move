gsap.registerPlugin(ScrollTrigger);

var letters = document.querySelectorAll(".letter");
var stats = document.querySelectorAll(".stat");
var numbers = document.querySelectorAll(".number");

gsap.from(letters, { y: 30, opacity: 0, duration: 0.8, stagger: 0.05 });
gsap.from(stats, { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, delay: 1.2 });

numbers.forEach(function (number, i) {
  var target = Number(number.getAttribute("data-value"));
  var counter = { value: 0 };
  number.innerText = 0;

  gsap.to(counter, {
    value: target,
    duration: 1.5,
    delay: 1.2 + i * 0.2,
    ease: "power2.out",
    onUpdate: function () {
      number.innerText = Math.round(counter.value);
    }
  });
});

var timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    invalidateOnRefresh: true
  }
});

timeline.to(".car", {
  x: function () {
    return window.innerWidth + 500;
  },
  duration: 1,
  ease: "none"
}, 0);

timeline.to(".road-lines", { x: -600, duration: 1, ease: "none" }, 0);

timeline.to(letters, { color: "white", duration: 0.1, stagger: 0.05, ease: "none" }, 0.1);

timeline.to(".hint", { opacity: 0, duration: 0.1 }, 0);
