/* ============================================================
   TECHSON UNICORE — script.js
   ============================================================ */

/* === YEAR === */
document.getElementById("year").textContent = new Date().getFullYear();

/* === NAVBAR SCROLL === */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* === MOBILE DRAWER === */
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

// Create overlay and inject into body
const navOverlay = document.createElement("div");
navOverlay.className = "nav-overlay";
document.body.appendChild(navOverlay);

// Create close button and inject into drawer
const navCloseBtn = document.createElement("button");
navCloseBtn.className = "nav-close-btn";
navCloseBtn.setAttribute("aria-label", "Close menu");
navCloseBtn.innerHTML = "&times;";
navLinks.prepend(navCloseBtn);

function openDrawer() {
  navLinks.classList.add("open");
  navOverlay.classList.add("open");
  mobileToggle.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  navLinks.classList.remove("open");
  navOverlay.classList.remove("open");
  mobileToggle.classList.remove("open");
  document.body.style.overflow = "";
}

mobileToggle.addEventListener("click", () => {
  navLinks.classList.contains("open") ? closeDrawer() : openDrawer();
});

// Close button inside drawer
navCloseBtn.addEventListener("click", closeDrawer);

// Clicking overlay closes drawer
navOverlay.addEventListener("click", closeDrawer);

// Clicking any nav link closes drawer
navLinks.querySelectorAll(".nav-link, .btn-nav").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// Escape key closes drawer
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

/* === ACTIVE NAV LINK === */
const sections = document.querySelectorAll("section[id]");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
sections.forEach((s) => navObserver.observe(s));

/* === PORTFOLIO TABS === */
document.querySelectorAll(".ptab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".ptab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".portfolio-panel")
      .forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const panel = document.getElementById(`tab-${tab.dataset.tab}`);
    if (panel) panel.classList.add("active");
  });
});

/* === SCROLL REVEAL === */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const revealSelectors = [
  ".value-card",
  ".service-card",
  ".client-card-text",
  ".product-card",
  ".testi-card",
  ".news-card",
  ".mv-card",
  ".contact-method",
  ".founder-content",
];
revealSelectors.forEach((sel) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    revealObserver.observe(el);
  });
});

/* === NEWS IMAGE SLIDER === */
function initSlider(sliderEl) {
  const slides = sliderEl.querySelectorAll(".news-slide");
  const dots = sliderEl.querySelectorAll(".slider-dot");
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }
  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 4000);
  }
  function stopAuto() {
    clearInterval(timer);
  }

  sliderEl.querySelector(".slider-next")?.addEventListener("click", () => {
    stopAuto();
    goTo(current + 1);
    startAuto();
  });
  sliderEl.querySelector(".slider-prev")?.addEventListener("click", () => {
    stopAuto();
    goTo(current - 1);
    startAuto();
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      stopAuto();
      goTo(+dot.dataset.index);
      startAuto();
    });
  });
  startAuto();
}
document.querySelectorAll(".news-slider").forEach(initSlider);

/* === FORM STATUS MODAL === */
const statusModal = document.getElementById("statusModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalClose = document.getElementById("modalClose");

function showStatusModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  statusModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

modalClose?.addEventListener("click", () => {
  statusModal.classList.remove("open");
  document.body.style.overflow = "";
});
statusModal?.addEventListener("click", (e) => {
  if (e.target === statusModal) {
    statusModal.classList.remove("open");
    document.body.style.overflow = "";
  }
});

/* === CONTACT FORM === */
const enquiryForm = document.getElementById("enquiryForm");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = enquiryForm.querySelector(".form-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    try {
      const formData = new FormData(enquiryForm);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (response.ok) {
        showStatusModal(
          "Message Sent! 🎉",
          "Thank you for reaching out. We'll get back to you within 24 hours.",
        );
        enquiryForm.reset();
      } else throw new Error("error");
    } catch {
      showStatusModal(
        "Oops!",
        "Something went wrong. Please reach out directly via WhatsApp or email.",
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* === NEWSLETTER FORM === */
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector("button");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    btn.disabled = true;
    try {
      const formData = new FormData(newsletterForm);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        newsletterForm.reset();
        setTimeout(() => {
          btn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>';
          btn.disabled = false;
        }, 3000);
      }
    } catch {
      btn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>';
      btn.disabled = false;
    }
  });
}

/* === ARTICLE MODAL (Read More) === */
const articleModal = document.getElementById("articleModal");
const articleModalClose = document.getElementById("articleModalClose");

document.querySelectorAll(".news-read-more-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    articleModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeArticleModal() {
  articleModal.classList.remove("open");
  document.body.style.overflow = "";
}

articleModalClose?.addEventListener("click", closeArticleModal);
articleModal?.addEventListener("click", (e) => {
  if (e.target === articleModal) closeArticleModal();
});

document
  .querySelector(".article-contact-link")
  ?.addEventListener("click", () => {
    closeArticleModal();
  });

/* === ESC closes any modal === */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    statusModal?.classList.remove("open");
    closeArticleModal();
    document.body.style.overflow = "";
  }
});
