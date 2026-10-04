# Itzfizz Scroll-Driven Hero

A hero section animation built with HTML, CSS, JavaScript and GSAP.

When the page loads, the headline letters and the statistics fade in one by one and the numbers count up. When you scroll, a car drives across the road, the road lines move, and the headline lights up letter by letter.

## Live demo

https://ruruturu.github.io/itfizz_move/

## Files

- `index.html` - page structure
- `style.css` - layout and styling
- `script.js` - GSAP animations

## How it works

- `.hero` is 400vh tall, which gives the page its scroll distance.
- `.inner` is `position: sticky`, so the hero stays on screen while you scroll.
- On load, GSAP fades the letters and stats in with a stagger and counts the numbers up.
- On scroll, GSAP ScrollTrigger links a timeline to the scroll position (`scrub: 1`), so the animation follows the scrollbar and is not time-based.
- The car and road lines move with `transform` (`x`), which keeps scrolling smooth.

## Run locally

Open `index.html` in a browser.

## Tech

HTML, CSS, JavaScript, GSAP, ScrollTrigger
