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
  // Get the form and modal elements
  const enquiryForm = document.getElementById("enquiryForm");
  const statusModal = document.getElementById("statusModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const closeBtn = statusModal.querySelector(".close-btn");

  // Function to show the modal with custom content
  function showStatusModal(isSuccess) {
    if (isSuccess) {
      modalTitle.textContent = "Success! 🎉";
      modalMessage.textContent =
        "Thank you for your enquiry! We have received your message and will get back to you shortly.";
      statusModal.querySelector(".modal-content").classList.remove("error");
      statusModal.querySelector(".modal-content").classList.add("success");
    } else {
      modalTitle.textContent = "Error! 😔";
      modalMessage.textContent =
        "Oops! Something went wrong while submitting your form. Please try again or contact us directly.";
      statusModal.querySelector(".modal-content").classList.remove("success");
      statusModal.querySelector(".modal-content").classList.add("error");
    }

    statusModal.style.display = "flex";
    setTimeout(() => statusModal.classList.add("show"), 10);

    // Auto-hide the modal after 5 seconds
    setTimeout(() => {
      hideStatusModal();
    }, 5000);
  }

  // Function to hide the modal
  function hideStatusModal() {
    statusModal.classList.remove("show");
    setTimeout(() => (statusModal.style.display = "none"), 300);
  }

  // Event listeners for closing the modal
  closeBtn.onclick = function () {
    hideStatusModal();
  };

  window.onclick = function (event) {
    if (event.target === statusModal) {
      hideStatusModal();
    }
  };

  // Handle form submission
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get the form data
      const formData = new FormData(enquiryForm);

      // Netlify requires the form name in the data
      const data = new URLSearchParams(formData);

      // Show a temporary loading state if needed (optional)
      // For now, we'll proceed directly to submission

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            showStatusModal(true); // Show success modal
            enquiryForm.reset();
          } else {
            showStatusModal(false); // Show error modal
          }
        })
        .catch((error) => {
          console.error("Form submission error:", error);
          showStatusModal(false); // Show error modal on network failure
        });
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

// Pop up model for project section
// Get the modal
const modal = document.getElementById("demoModal");
const contactBtn = modal.querySelector(".modal-contact-btn");

// Get all "View Demo" buttons
const demoButtons = document.querySelectorAll(
  '.projects-grid a.project-link[href="#"]'
);

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close-btn")[0];

// Function to show the modal
function showModal() {
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
}

// Function to hide the modal
function hideModal() {
  modal.classList.remove("show");
  setTimeout(() => (modal.style.display = "none"), 300);
}

// When the user clicks on a button with href="#", open the modal
demoButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    showModal();
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  hideModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    hideModal();
  }
};

// Smooth scroll to contact section when modal button is clicked
contactBtn.addEventListener("click", function (event) {
  hideModal();
});
