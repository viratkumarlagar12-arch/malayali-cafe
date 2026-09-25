/* ================================================
   MALAYALI CAFE — JAVASCRIPT FUNCTIONALITY
   ================================================ */

// Configuration
const ORDER_URL = ""; // Set when ordering platform is ready

// Restaurant Info
const RESTAURANT = {
  phone: "+919691337032",
  phoneDisplay: "096913 37032",
  address: "Devappa Building, HAL Old Airport Rd, Murugeshpalya, Bengaluru"
};

// DOM Elements
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// CTA Buttons
const navOrderBtn = document.getElementById("navOrderBtn");
const navOrderBtnMobile = document.getElementById("navOrderBtnMobile");
const exploreMenuBtn = document.getElementById("exploreMenuBtn");
const orderBtn = document.getElementById("orderBtn");
const orderMainBtn = document.getElementById("orderMainBtn");
const finalOrderBtn = document.getElementById("finalOrderBtn");
const footerOrderBtn = document.getElementById("footerOrderBtn");
const orderMenuBtn = document.getElementById("orderMenuBtn");

// Menu Elements
const menuCatBtns = document.querySelectorAll(".menu-cat-btn");
const menuItems = document.querySelectorAll(".menu-row");

// Gallery Elements
const galleryBtns = document.querySelectorAll(".gallery-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

/* ================================================
   UTILITY FUNCTIONS
   ================================================ */

/**
 * Handle order button clicks
 */
function handleOrderClick() {
  if (!ORDER_URL || ORDER_URL.trim() === "") {
    alert(`Online ordering link will be available here.\n\nPlease call us:\n${RESTAURANT.phoneDisplay}`);
  } else {
    window.open(ORDER_URL, "_blank", "noopener,noreferrer");
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  menuToggle.classList.remove("active");
  navMenu.classList.remove("mobile-active");
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("mobile-active");
}

/**
 * Update active navigation based on scroll
 * Only marks sections as active if there's a corresponding navbar link
 */
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navbarSections = ["home", "about", "menu", "gallery", "reviews", "location"];
  let current = "";

  // Find the section closest to the top of the viewport
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const distance = Math.abs(sectionTop - window.scrollY);

    // Only consider sections that are in the navbar
    const sectionId = section.getAttribute("id");
    if (navbarSections.includes(sectionId) && sectionTop <= window.scrollY + 100) {
      // For sections we've scrolled past, pick the most recent one
      if (sectionTop <= window.scrollY + 100 && sectionTop > (closestSection ? closestSection.offsetTop : -Infinity)) {
        closestSection = section;
        current = sectionId;
      }
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkTarget = link.getAttribute("href").slice(1); // Remove # prefix

    // Only set active if current section matches link target
    if (linkTarget === current) {
      link.classList.add("active");
    }
  });
}

/**
 * Filter menu items
 */
function filterMenuItems(category) {
  menuItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

/**
 * Filter gallery items
 */
function filterGalleryItems(category) {
  galleryItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

/* ================================================
   EVENT LISTENERS
   ================================================ */

// Mobile menu
menuToggle?.addEventListener("click", toggleMobileMenu);

// Navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
    setTimeout(updateActiveNav, 100);
  });
});

// Order buttons
const orderButtons = [
  navOrderBtn,
  navOrderBtnMobile,
  orderBtn,
  orderMainBtn,
  finalOrderBtn,
  footerOrderBtn,
  orderMenuBtn
];

orderButtons.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", handleOrderClick);
    // Close mobile menu when mobile order button is clicked
    if (btn === navOrderBtnMobile) {
      btn.addEventListener("click", closeMobileMenu);
    }
  }
});

// Explore menu button
exploreMenuBtn?.addEventListener("click", () => {
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Menu filters
menuCatBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuCatBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterMenuItems(btn.dataset.filter);
  });
});

// Gallery filters
galleryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    galleryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterGalleryItems(btn.dataset.filter);
  });
});

// Scroll events
window.addEventListener("scroll", () => {
  updateActiveNav();
});

// Close menu on click outside
document.addEventListener("click", (e) => {
  if (!navMenu?.contains(e.target) && !menuToggle?.contains(e.target)) {
    closeMobileMenu();
  }
});

// Close menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

/* ================================================
   INITIALIZATION
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  updateActiveNav();
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  console.log("Malayali Cafe - Luxury Editorial Design loaded");
  console.log("Order URL configured:", ORDER_URL ? "Yes" : "No");
});

/* ================================================
   ACCESSIBILITY
   ================================================ */

const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      button.click();
    }
  });
});
