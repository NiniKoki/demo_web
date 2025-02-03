"use strict";

/*=============== PRELOADER ===============*/
const pageLoader = document.querySelector("[data-page-loader]");

window.addEventListener("load", () => {
  // Hide preloader
  pageLoader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/*=============== COOKIE BANNER ===============*/
const cookieBanner = document.getElementById("cookieBanner");
const acceptCookiesBtn = document.getElementById("acceptCookiesBtn");

// Check localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cookiesAccepted") === "true") {
    cookieBanner.style.display = "none";
  } else {
    cookieBanner.style.display = "flex";
  }
});

acceptCookiesBtn.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "true");
  cookieBanner.style.display = "none";
});

/*=============== BURGER MENU TOGGLE ===============*/
const mobileNavbar = document.querySelector("[data-navigation]");
const navToggles = document.querySelectorAll("[data-nav-toggle]");
const overlay = document.querySelector("[data-page-overlay]");

function toggleMobileNav() {
  mobileNavbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

navToggles.forEach((toggle) => {
  toggle.addEventListener("click", toggleMobileNav);
});

/*=============== HEADER & BACK-TO-TOP ===============*/
const siteHeader = document.querySelector("[data-site-header]");
const backTopBtn = document.querySelector("[data-scroll-top]");

let lastScrollY = 0;

function controlHeader() {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScrollY) {
    // scrolling down
    siteHeader.classList.add("hide");
  } else {
    // scrolling up
    siteHeader.classList.remove("hide");
  }
  lastScrollY = currentScroll;
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    siteHeader.classList.add("active");
    backTopBtn.classList.add("active");
    controlHeader();
  } else {
    siteHeader.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/*=============== HERO SLIDER ===============*/
const bannerSlider = document.querySelector("[data-banner-slider]");
const bannerSlides = document.querySelectorAll("[data-banner-slider-item]");
const bannerPrevBtn = document.querySelector("[data-banner-prev]");
const bannerNextBtn = document.querySelector("[data-banner-next]");

let currentSlide = 0;
let lastActiveSlide = bannerSlides[0];

function updateSlidePosition() {
  lastActiveSlide.classList.remove("active");
  bannerSlides[currentSlide].classList.add("active");
  lastActiveSlide = bannerSlides[currentSlide];
}

function slideNext() {
  currentSlide = (currentSlide + 1) % bannerSlides.length;
  updateSlidePosition();
}
function slidePrev() {
  currentSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
  updateSlidePosition();
}

bannerNextBtn.addEventListener("click", slideNext);
bannerPrevBtn.addEventListener("click", slidePrev);

/* Auto-slide every 7s */
let autoSlideInterval;
function autoSlide() {
  autoSlideInterval = setInterval(slideNext, 7000);
}
/* Pause auto-slide on hover */
[bannerPrevBtn, bannerNextBtn].forEach((btn) => {
  btn.addEventListener("mouseover", () => clearInterval(autoSlideInterval));
  btn.addEventListener("mouseout", autoSlide);
});
window.addEventListener("load", autoSlide);

/*=============== PARALLAX EFFECT ===============*/
const parallaxElements = document.querySelectorAll("[data-parallax]");
window.addEventListener("mousemove", (e) => {
  let x = (e.clientX / window.innerWidth) * 10 - 5;
  let y = (e.clientY / window.innerHeight) * 10 - 5;
  // reverse
  x = x - x * 2;
  y = y - y * 2;
  parallaxElements.forEach((el) => {
    const speed = Number(el.dataset.parallaxSpeed) || 1;
    el.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
  });
});

/*=============== LOAD "CHEFS" FROM API ===============*/
const loadChefsBtn = document.getElementById("loadChefsBtn");
const chefsContainer = document.getElementById("chefsContainer");

async function loadChefs() {
  try {
    // For example, fetch 4 random users
    const response = await fetch("https://randomuser.me/api/?results=4");
    const data = await response.json();
    const users = data.results;

    // Clear existing content
    chefsContainer.innerHTML = "";

    users.forEach((user) => {
      const chefCard = document.createElement("div");
      chefCard.className = "chef-card";

      chefCard.innerHTML = `
        <img src="${user.picture.medium}" alt="Chef Photo">
        <div class="chef-name">${user.name.first} ${user.name.last}</div>
        <div class="chef-email">${user.email}</div>
        <div class="chef-country">Location: ${user.location.country}</div>
      `;
      chefsContainer.appendChild(chefCard);
    });
  } catch (err) {
    console.error("Error fetching random users:", err);
    chefsContainer.innerHTML = "<p>Failed to load chefs.</p>";
  }
}

loadChefsBtn.addEventListener("click", loadChefs);

/*=============== REGISTRATION FORM VALIDATION ===============*/
const registrationForm = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Basic required check
  if (
    !usernameInput.value.trim() ||
    !emailInput.value.trim() ||
    !passwordInput.value.trim() ||
    !phoneInput.value.trim()
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Basic phone number length check
  if (phoneInput.value.length < 7) {
    alert("Please enter a valid phone number.");
    return;
  }
  alert("Registration successful! Welcome to Flavourish!");
  registrationForm.reset();
});

/*=============== SHOW / HIDE PASSWORD ===============*/
const togglePasswordBtn = document.getElementById("togglePassword");

togglePasswordBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordBtn.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
  } else {
    passwordInput.type = "password";
    togglePasswordBtn.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
  }
});
