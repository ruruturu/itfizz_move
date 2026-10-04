# Itzfizz – Scroll-Driven Hero

A hero section where scrolling drives the animation: a car drives across the screen, the road slides underneath, and the headline lights up letter by letter as the car passes. Built with plain HTML, CSS and JavaScript plus GSAP.

## Run it

No build step. Open `index.html` in a browser, or run a local server:

```bash
npx serve .
```

## How it works

| Part | File | Idea |
| --- | --- | --- |
| Layout | `style.css` | `.hero` is 400vh tall (the scroll distance). `.hero__pin` is `position: sticky` so the scene stays on screen while you scroll. |
| Intro | `script.js` | A normal GSAP timeline on page load: letters rise in with a stagger, stat cards follow, numbers count up. |
| Scroll | `script.js` | A GSAP timeline linked to scroll with ScrollTrigger (`scrub: 1`). Scroll position = timeline progress, and `scrub: 1` adds the smoothing. |

Performance: only `transform` (via GSAP `x`/`y`) and `opacity` are animated for movement, so there are no layout reflows on scroll. Letter highlighting animates `color`, which only repaints. `prefers-reduced-motion` shows the finished state without motion.

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to the `main` branch.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

Submit that link plus the repository link.
