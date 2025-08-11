document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  mobileToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    this.querySelector("i").classList.toggle("fa-bars");
    this.querySelector("i").classList.toggle("fa-times");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileToggle.querySelector("i").classList.add("fa-bars");
      mobileToggle.querySelector("i").classList.remove("fa-times");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const homeSection = document.getElementById("home");
    const homeSectionHeight = homeSection.offsetHeight;

    if (this.window.scrollY > homeSectionHeight - 80) {
      // When scrolled past home section
      navbar.style.backgroundColor = "white";
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0, 0.1)";
    } else {
      // When in home section
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";
    }
  });

  // Form submission
  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert("Thank you for your enquiry! We will get back to you soon.");
      this.reset();
    });
  }

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Add shadow to navbar on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });
});

// Project Sliders
document.querySelectorAll(".project-slider").forEach((slider) => {
  const container = slider.querySelector(".slider-container");
  const slides = slider.querySelectorAll(".slide");
  const prevBtn = slider.querySelector(".prev-slide");
  const nextBtn = slider.querySelector(".next-slide");
  const dotsContainer = slider.querySelector(".slide-dots");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = slider.querySelectorAll(".dot");

  // Update slider position
  function updateSlider() {
    container.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlider();
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-advance slides (optional)
  let slideInterval = setInterval(nextSlide, 5000);

  slider.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
});
