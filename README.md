# Memorial Núcleo Capistrano 🏆

This memorial is an interactive front-end web project created to showcase cultural trips, sports events, competitions, and historical milestones for the **Instituto Esporte e Educação (IEE)** at the Capistrano unit.

The project features a modern Bento-Grid layout with smooth card expand/collapse interactions driven by custom CSS transitions and JavaScript DOM manipulation.

## Features

- Dynamic Bento-Grid layout for organizing event categories and stages (2024–2025);
- Click-to-expand card animations revealing hidden event imagery (`.textoEscondido`);
- Automatic blur and scale focus effects on active cards (`:has(.active)`);
- External click detection to auto-close expanded cards;
- Responsive design tailored for mobile devices and desktop views (`@media min-width: 720px`);
- Custom typography integration with Google Fonts (*Inter*, *Monsieur La Doulaise*, *Allura*).

## Concepts Applied

- Semantic HTML5 structure (`<header>`, `<section>`, `<main>`, `<footer>`, `<ul>`, `<a>`);
- CSS Grid Bento layout (`display: grid`, `grid-template-columns`, `grid-area`);
- Dynamic CSS background radial gradients and custom color variables;
- Modern CSS `:has()` pseudo-class for focus/blur UI state interactions;
- JavaScript Event Listeners (click handling, event propagation with `stopPropagation()`);
- DOM element toggling and class management (`classList.add`, `classList.remove`).

## Project Structure

```text
memorial-capistrano/
├── img/
│   ├── c1.png ... c11.png  # Event card preview images
│   ├── icon.png            # Website favicon/icon
│   └── insta.png           # Social media icon
├── style.css               # Main stylesheet with layout, reset rules, and animations
├── script.js               # Interactive card toggling and click handling
├── index.html              # Main HTML document structure
└── README.md
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Inter, Monsieur La Doulaise, Allura)
- Git & GitHub

---

Project developed for **Instituto Esporte e Educação (IEE)**, focusing on interactive web design, responsive Bento-Grid layouts, and modern front-end practices.
