/**
 * =========================================================================
 * LUXURY IVORY WAX SEAL WEDDING INVITATION - INTERACTIVE LOGIC
 * Holy Matrimony: Vikki & Pappu
 * =========================================================================
 */

// ==========================================
// CONFIGURATION OBJECT
// ==========================================
const weddingConfig = {
  groomName: "Vikki",
  brideName: "Pappu",
  weddingDate: "2027-06-23T16:30:00",
  weddingDateDisplay: {
    day: "23",
    month: "JUNE",
    year: "2027"
  },
  dayName: "WEDNESDAY",
  ceremonyTime: "4:30 PM NUPTIAL SERVICE",
  venueName: "M Weddings & Conventions",
  venueAddress: "Vanagaram Main Rd, Rajankuppam, Vanagaram, Chennai, Tamil Nadu 600095",
  mapUrl: "https://maps.google.com/?q=M+Weddings+and+Conventions+Chennai",
  whatsappPhone: "919499912508",
  dressCode: "Elegant Christian Wedding Formal / Suits, Gowns & Pastel Traditional Attire.",
  message: "Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres. Love never fails.",
  groomFamily: "Son of Mr. & Mrs. Edward Victor",
  brideFamily: "Daughter of Mr. & Mrs. Joseph Samuel",
  locationShort: "M WEDDINGS & CONVENTIONS, CHENNAI"
};

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  populateConfigData();
  initEnvelopeExperience();
  initDateRevealCanvas();
  initCountdown();
  initScrollAnimations();
  initGalleryLightbox();
  initNavigation();
  initAudioPlayer();
  initWishesForm();
  initCalendarGenerator();
});

// ==========================================
// POPULATE DATA FROM CONFIG
// ==========================================
function populateConfigData() {
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("hero-groom-name", weddingConfig.groomName);
  setText("hero-bride-name", weddingConfig.brideName);
  setText("hero-date-pill", `${weddingConfig.weddingDateDisplay.month} ${weddingConfig.weddingDateDisplay.day}, ${weddingConfig.weddingDateDisplay.year}`);
  setText("hero-city-pill", weddingConfig.locationShort);

  setText("reveal-day-name", weddingConfig.dayName);
  setText("reveal-day-number", weddingConfig.weddingDateDisplay.day);
  setText("reveal-month-name", weddingConfig.weddingDateDisplay.month);
  setText("reveal-year-number", weddingConfig.weddingDateDisplay.year);
  setText("reveal-ceremony-time", weddingConfig.ceremonyTime);

  setText("couple-groom-name", weddingConfig.groomName);
  setText("couple-groom-family", weddingConfig.groomFamily);
  setText("couple-bride-name", weddingConfig.brideName);
  setText("couple-bride-family", weddingConfig.brideFamily);

  setText("wedding-quote-text", weddingConfig.message);
  setText("venue-name", weddingConfig.venueName);
  setText("venue-address", weddingConfig.venueAddress);
  setText("venue-date-val", `${weddingConfig.weddingDateDisplay.month} ${weddingConfig.weddingDateDisplay.day}, ${weddingConfig.weddingDateDisplay.year}`);
  setText("venue-time-val", weddingConfig.ceremonyTime);

  const mapsBtn = document.getElementById("btn-maps");
  if (mapsBtn) mapsBtn.href = weddingConfig.mapUrl;

  setText("dress-code-text", weddingConfig.dressCode);
  setText("closing-couple-names", `${weddingConfig.groomName} & ${weddingConfig.brideName}`);
}

// ==========================================
// SECTION 1: CINEMATIC ENVELOPE OPENING
// ==========================================
function initEnvelopeExperience() {
  const envelopeStage = document.getElementById("envelope-stage");
  const openingVideo = document.getElementById("opening-video");
  const dustContainer = document.getElementById("dust-particles");
  let isOpening = false;

  // Generate floating dust / warm ambient particles
  if (dustContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "dust-particle";
      const size = Math.random() * 3 + 1.5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
      dustContainer.appendChild(particle);
    }
  }

  const triggerOpening = () => {
    if (isOpening) return;
    isOpening = true;

    document.body.classList.add("opening");

    // Play video if accessible
    if (openingVideo) {
      openingVideo.currentTime = 0;
      const playPromise = openingVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("Direct video playback fallback active");
        });
      }
    }

    // Attempt background music playback on user interaction
    const audio = document.getElementById("bg-audio");
    if (audio) {
      audio.play().catch(() => {});
    }

    // Dynamic duration based on video duration or fallback
    const animationDuration = (openingVideo && !isNaN(openingVideo.duration) && openingVideo.duration > 3)
      ? Math.min(openingVideo.duration * 1000, 7500)
      : 6500;

    setTimeout(() => {
      document.body.classList.add("invitation-open");
      document.body.classList.remove("envelope-active");

      // Smooth scroll to top of invitation
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      }
    }, animationDuration);
  };

  if (envelopeStage) {
    envelopeStage.addEventListener("click", triggerOpening);
    envelopeStage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerOpening();
      }
    });
  }
}

// ==========================================
// SECTION 3: DATE REVEAL (Interactive Scratch Canvas)
// ==========================================
function initDateRevealCanvas() {
  const canvas = document.getElementById("scratch-canvas");
  const tapBtn = document.getElementById("tap-reveal-btn");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let isRevealed = false;
  let isDrawing = false;
  let scratchedPixels = 0;

  function setupCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw luxury champagne gold gradient with embossed paper texture
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#D7B56A");
    grad.addColorStop(0.3, "#F2EBDD");
    grad.addColorStop(0.6, "#B88A35");
    grad.addColorStop(1, "#806020");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle gold foil speckles
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add gold seal crest text in center
    ctx.font = "italic 16px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#4A433B";
    ctx.textAlign = "center";
    ctx.fillText("✦ Save Our Wedding Day ✦", canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.font = "500 11px 'Montserrat', sans-serif";
    ctx.fillStyle = "rgba(74, 67, 59, 0.75)";
    ctx.fillText("SCRATCH OR TAP TO UNVEIL", canvas.width / 2, canvas.height / 2 + 16);
  }

  setupCanvas();
  window.addEventListener("resize", () => {
    if (!isRevealed) setupCanvas();
  });

  function revealDate() {
    if (isRevealed) return;
    isRevealed = true;
    canvas.classList.add("revealed");
    if (tapBtn) tapBtn.classList.add("hidden");
  }

  function scratch(x, y) {
    if (isRevealed) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixels++;
    if (scratchedPixels > 25) {
      revealDate();
    }
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  window.addEventListener("mouseup", () => { isDrawing = false; });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  });

  canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, { passive: true });

  canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, { passive: true });

  window.addEventListener("touchend", () => { isDrawing = false; });

  if (tapBtn) {
    tapBtn.addEventListener("click", revealDate);
  }
}

// ==========================================
// SECTION 7: COUNTDOWN
// ==========================================
function initCountdown() {
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");
  const targetDate = new Date(weddingConfig.weddingDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = "00";
      if (cdHours) cdHours.textContent = "00";
      if (cdMinutes) cdMinutes.textContent = "00";
      if (cdSeconds) cdSeconds.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMinutes) cdMinutes.textContent = pad(minutes);
    if (cdSeconds) cdSeconds.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// SCROLL REVEAL (IntersectionObserver)
// ==========================================
function initScrollAnimations() {
  const itemsToReveal = document.querySelectorAll(".reveal-on-scroll, .timeline-item");

  if (!("IntersectionObserver" in window)) {
    itemsToReveal.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  itemsToReveal.forEach((el) => observer.observe(el));
}

// ==========================================
// SECTION 8: PHOTO GALLERY & LIGHTBOX (6 PHOTOS)
// ==========================================
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox || galleryItems.length === 0) return;

  const photos = Array.from(galleryItems).map((item) => {
    const img = item.querySelector("img");
    return {
      src: img ? img.src : "",
      alt: img ? img.alt : ""
    };
  });

  let currentIndex = 0;

  function showPhoto(index) {
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;
    currentIndex = index;

    lightboxImg.src = photos[currentIndex].src;
    lightboxImg.alt = photos[currentIndex].alt;
    lightboxCaption.textContent = `Photo ${currentIndex + 1} of ${photos.length}`;
  }

  function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showPhoto(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showPhoto(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard controls
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(currentIndex - 1);
    if (e.key === "ArrowRight") showPhoto(currentIndex + 1);
  });

  // Mobile swipe support
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) showPhoto(currentIndex - 1); // Swipe right
      else showPhoto(currentIndex + 1); // Swipe left
    }
  }, { passive: true });
}

// ==========================================
// NAVIGATION & CONTROLS
// ==========================================
function initNavigation() {
  const menuBtn = document.getElementById("menu-toggle-btn");
  const navOverlay = document.getElementById("nav-overlay");
  const navCloseBtn = document.getElementById("nav-close-btn");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTopBtn = document.getElementById("back-to-top-btn");

  const openNav = () => {
    if (navOverlay) navOverlay.classList.add("active");
  };

  const closeNav = () => {
    if (navOverlay) navOverlay.classList.remove("active");
  };

  if (menuBtn) menuBtn.addEventListener("click", openNav);
  if (navCloseBtn) navCloseBtn.addEventListener("click", closeNav);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// ==========================================
// AUDIO PLAYER CONTROLLER
// ==========================================
function initAudioPlayer() {
  const audio = document.getElementById("bg-audio");
  const audioBtn = document.getElementById("audio-toggle-btn");

  if (!audio || !audioBtn) return;

  audioBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        audioBtn.classList.remove("muted");
      }).catch((err) => {
        console.log("Audio play error:", err);
      });
    } else {
      audio.pause();
      audioBtn.classList.add("muted");
    }
  });
}

// ==========================================
// SECTION 11: SEND WISHES & BLESSINGS (WHATSAPP)
// ==========================================
function initWishesForm() {
  const form = document.getElementById("wishes-form");
  const nameInput = document.getElementById("wishes-name");
  const msgInput = document.getElementById("wishes-message");
  const feedback = document.getElementById("wishes-feedback");

  if (!form || !nameInput || !msgInput) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const nameGroup = nameInput.closest(".form-group");
    const msgGroup = msgInput.closest(".form-group");

    // Name Validation
    if (!nameInput.value.trim()) {
      if (nameGroup) nameGroup.classList.add("has-error");
      nameInput.focus();
      isValid = false;
    } else {
      if (nameGroup) nameGroup.classList.remove("has-error");
    }

    // Message Validation
    if (!msgInput.value.trim()) {
      if (msgGroup) msgGroup.classList.add("has-error");
      if (isValid) msgInput.focus();
      isValid = false;
    } else {
      if (msgGroup) msgGroup.classList.remove("has-error");
    }

    if (!isValid) return;

    const senderName = nameInput.value.trim();
    const wishesText = msgInput.value.trim();

    // Format WhatsApp Message
    const formattedText = 
`✨ *Wedding Wishes for Vikki & Pappu* ✨

👤 *From:* ${senderName}
💬 *Wishes & Prayers:*
"${wishesText}"

May God bless your Holy Matrimony with abundant happiness and love! 💍💐`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${weddingConfig.whatsappPhone}&text=${encodeURIComponent(formattedText)}`;

    // Show on-screen confirmation
    if (feedback) {
      feedback.classList.add("show");
    }

    // Open WhatsApp in new tab / application
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 600);
  });
}

// ==========================================
// CALENDAR (.ICS) GENERATOR
// ==========================================
function initCalendarGenerator() {
  const calBtn = document.getElementById("btn-calendar");
  if (!calBtn) return;

  calBtn.addEventListener("click", () => {
    const title = `Holy Matrimony: ${weddingConfig.groomName} & ${weddingConfig.brideName}`;
    const description = `With joyful hearts and prayers, we invite you to celebrate the Holy Matrimony of ${weddingConfig.groomName} and ${weddingConfig.brideName}.`;
    const location = `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`;
    
    // Format: 20270623T110000Z (UTC format for June 23, 2027 04:30 PM IST)
    const startDate = "20270623T110000Z";
    const endDate = "20270623T183000Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Luxury Christian Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${weddingConfig.groomName}_${weddingConfig.brideName}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
