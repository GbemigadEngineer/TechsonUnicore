// Navigation toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileToggle.querySelector("i").classList.toggle("fa-bars");
  mobileToggle.querySelector("i").classList.toggle("fa-times");
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = 1;
      element.style.visibility = "visible";
    }
  });
};

// Initialize animations
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Set initial state for animated elements
document.querySelectorAll(".animate").forEach((el) => {
  el.style.opacity = 0;
  el.style.visibility = "hidden";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});
