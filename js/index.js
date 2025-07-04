'use strict'

/* Navigation links and hamburger menu*/

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navBar = document.querySelector(".nav-bar");
const navBarList = document.querySelector(".nav-bar ul");
const navBarLinks = document.querySelectorAll(".nav-bar a");
const currentPage = window.location.pathname;

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navBar.classList.toggle("hamburger-btn__open");

  setNavAttributes();
});

document.addEventListener("click", (e) => {
  if (
    !navBar.classList.contains("hamburger-btn__open") ||
    e.target === navBar ||
    e.target === hamburgerBtn ||
    e.target === navBarList
  )
    return;

  navBar.classList.remove("hamburger-btn__open");
  hamburgerBtn.classList.remove("active");

  setNavAttributes();
});

function setNavAttributes() {
  const navBarLinks = document.querySelectorAll(".nav-bar a");
  const navBarHasActiveClass = navBar.classList.contains("hamburger-btn__open");

  navBar.setAttribute("aria-hidden", String(!navBarHasActiveClass));
  hamburgerBtn.setAttribute("aria-expanded", String(navBarHasActiveClass));

  navBarLinks.forEach((link) => {
    link.tabIndex = navBarHasActiveClass ? 0 : -1;
  });
}

/* Show the current page */

navBarLinks.forEach((link) => {
  if (link.pathname === currentPage) {
    link.classList.add("active-link");
  }
});

/* Sticky navigation bar */

const primaryHeader = document.querySelector("#header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 580) {
    primaryHeader.classList.add("sticking");
  } else if (window.scrollY === 0) {
    primaryHeader.classList.remove("sticking");
  }
});

/* Prevent navigation transitions happening on resize */

let resizeTimeout;

window.addEventListener("resize", () => {
  navBar.classList.add("no-transition");

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    navBar.classList.remove("no-transition");
  }, 1);
});

/* Performance section scroll animation */

const blocks = document.querySelectorAll(".performance-text-block__inner-flex");

const PerformanceObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: .7,
  }
);

blocks.forEach((block) => PerformanceObserver.observe(block));

/* Portfolio Carousel */

const banner = document.querySelector('.banner');
const overlay = banner.querySelector('.banner-overlay');

const observer = new IntersectionObserver(
  ([entry]) => {
    const ratio = entry.intersectionRatio;
    const bounding = entry.boundingClientRect;

    if (ratio < 0.1 || bounding.top < -entry.target.offsetHeight / 9.5) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  },
  {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
  }
);

observer.observe(banner);

/* Testimonial Carousel */

import Glide from "https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/glide.esm.js";

const glide = new Glide(".glide", {
  type: "carousel",
  autoplay: 5000,
  hoverpause: true,
});

glide.on(["mount.after", "run"], () => {
  const slides = document.querySelectorAll(".glide__slide");
  const bullets = document.querySelectorAll(".glide__bullet");
  const currentIndex = glide.index;

  slides.forEach((slide, i) => {
    const isActive = i === currentIndex;
    slide.setAttribute("aria-hidden", !isActive);
    slide.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  bullets.forEach((bullet, i) => {
    bullet.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
  });
});

glide.mount();

/* Footer copyright-year update */

const currentYear = new Date().getFullYear();
const copyrightSymbol = "\u00A9";

document.getElementById(
  "year"
).innerHTML = `<strong>${copyrightSymbol} Copyright ${currentYear}</strong>`;

