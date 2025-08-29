/* ---------------------------
   script.js
   Guru Creations Portfolio
   Handles smooth scroll, contact modal, lightbox previews
   --------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = a.getAttribute("href");
      if (!target || target === "#") return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", target);
    });
  });

  // Contact Modal
  const floatBtn = document.getElementById("floatContact");
  const modal = document.getElementById("modalBackdrop");
  const cancel = document.getElementById("cf-cancel");
  const send = document.getElementById("cf-send");

  function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  floatBtn.addEventListener("click", openModal);
  cancel.addEventListener("click", closeModal);
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) closeModal();
  });

  send.addEventListener("click", () => {
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const msg = document.getElementById("cf-message").value.trim();

    if (!name || !email || !msg) {
      alert("Please fill in your name, email, and a message.");
      return;
    }

    // Demo only: you'd need a backend or form service to actually send
    alert("Message ready to send (demo only). Use Netlify Forms, Formspree, or a backend to deliver.");
    document.getElementById("cf-name").value = "";
    document.getElementById("cf-email").value = "";
    document.getElementById("cf-message").value = "";
    closeModal();
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lbContent = document.getElementById("lightboxContent");
  const lbClose = document.getElementById("lb-close");

  document.querySelectorAll(".project-card .thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const projectTitle = thumb.closest(".project-card").getAttribute("data-full");
      openLightbox(projectTitle, thumb.querySelector("img")?.src);
    });
  });

  function openLightbox(title, imgSrc) {
    lbContent.innerHTML = `
      <h3 style="margin-top:0; margin-bottom:8px; color:white">${title}</h3>
      ${imgSrc ? `<img src="${imgSrc}" alt="${title} preview" />` : `<p style="color:var(--muted)">No preview available</p>`}
    `;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lbContent.innerHTML = "";
  }

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (ev) => {
    if (ev.target === lightbox) closeLightbox();
  });
});
// ===== Hero Background Slideshow =====
const heroSection = document.querySelector(".hero");

// Array of background images
const heroImages = [
  "asset/guru.jpg",          // profile photo
  "images/gallery-photo1.jpg", 
  "images/gallery-photo2.jpg"
];

let heroIndex = 0;

function changeHeroBackground() {
  heroIndex = (heroIndex + 1) % heroImages.length;
  heroSection.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  heroSection.style.backgroundSize = "cover";
  heroSection.style.backgroundPosition = "center";
}

// Change every 10 seconds
setInterval(changeHeroBackground, 10000);
// Lightbox
const overlay = document.getElementById("lightboxOverlay");
const lbImg = document.getElementById("lightboxImg");
const lbVideo = document.getElementById("lightboxVideo");
const closeBtn = document.querySelector(".lightbox-close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

let galleryItems = [];
let currentIndex = 0;

document.querySelectorAll("[data-lightbox]").forEach((link, i) => {
  link.addEventListener("click", e => {
    e.preventDefault();
    galleryItems = [...document.querySelectorAll(`[data-lightbox="${link.dataset.lightbox}"]`)];
    currentIndex = galleryItems.indexOf(link);
    openLightbox(galleryItems[currentIndex].getAttribute("href"));
  });
});

function openLightbox(src) {
  overlay.style.display = "block";
  if (src.endsWith(".mp4")) {
    lbImg.style.display = "none";
    lbVideo.style.display = "block";
    lbVideo.src = src;
    lbVideo.play();
  } else {
    lbVideo.style.display = "none";
    lbImg.style.display = "block";
    lbImg.src = src;
  }
}

function closeLightbox() {
  overlay.style.display = "none";
  lbImg.src = "";
  lbVideo.src = "";
  lbVideo.pause();
}

function showNext(step) {
  currentIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
  openLightbox(galleryItems[currentIndex].getAttribute("href"));
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", () => showNext(1));
prevBtn.addEventListener("click", () => showNext(-1));

window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext(1);
  if (e.key === "ArrowLeft") showNext(-1);
});
