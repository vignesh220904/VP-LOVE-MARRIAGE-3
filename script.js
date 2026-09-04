/**
 * =========================================================================
 * LUXURY IVORY WAX SEAL WEDDING INVITATION - INTERACTIVE LOGIC
 * Holy Matrimony: Vikki & Pappu
 * Features: 3D Butterfly Slider & Romantic Background Music Engine
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
  initButterflySlider();
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

    // Start background music
    startWeddingMusic();

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
// SECTION 8: 3D BUTTERFLY PHOTO SLIDER
// ==========================================
let currentSlideIndex = 0;
const slides = [];

function initButterflySlider() {
  const cards = document.querySelectorAll(".slide-card");
  const dotsContainer = document.getElementById("slider-dots");
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  const sliderStage = document.getElementById("slider-stage-3d");
  const flightStage = document.getElementById("butterfly-flight-stage");
  const openLightboxBtn = document.getElementById("btn-open-lightbox");

  if (cards.length === 0) return;

  cards.forEach((card, i) => {
    slides.push(card);
    
    // Create dot
    if (dotsContainer) {
      const dot = document.createElement("span");
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    // Card click event
    card.addEventListener("click", () => {
      const cardIndex = parseInt(card.dataset.index, 10);
      if (cardIndex === currentSlideIndex) {
        // Open fullscreen lightbox if active card is clicked
        if (typeof openLightboxModal === "function") {
          openLightboxModal(cardIndex);
        }
      } else {
        goToSlide(cardIndex);
      }
    });
  });

  function updateSlidePositions(direction = "next") {
    const total = slides.length;
    const dots = document.querySelectorAll(".slider-dot");

    slides.forEach((card, i) => {
      card.classList.remove("active", "prev", "next", "hidden");
      
      const prevIdx = (currentSlideIndex - 1 + total) % total;
      const nextIdx = (currentSlideIndex + 1) % total;

      if (i === currentSlideIndex) {
        card.classList.add("active");
      } else if (i === prevIdx) {
        card.classList.add("prev");
      } else if (i === nextIdx) {
        card.classList.add("next");
      } else {
        card.classList.add("hidden");
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlideIndex);
    });

    // Trigger golden butterfly flight animation
    spawnGoldenButterflies(flightStage, direction);
  }

  function goToSlide(index, direction) {
    if (index === currentSlideIndex) return;
    const dir = direction || (index > currentSlideIndex ? "next" : "prev");
    currentSlideIndex = (index + slides.length) % slides.length;
    updateSlidePositions(dir);
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1, "next");
  }

  function prevSlide() {
    goToSlide(currentSlideIndex - 1, "prev");
  }

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  if (openLightboxBtn) {
    openLightboxBtn.addEventListener("click", () => {
      if (typeof openLightboxModal === "function") {
        openLightboxModal(currentSlideIndex);
      }
    });
  }

  // Touch & Swipe gestures
  let touchStartX = 0;
  let touchStartY = 0;

  if (sliderStage) {
    sliderStage.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    sliderStage.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextSlide(); // Swipe left -> next
        } else {
          prevSlide(); // Swipe right -> prev
        }
      }
    }, { passive: true });
  }

  // Initial render
  updateSlidePositions();
}

/**
 * Spawns fluttering golden butterflies that fly across the stage
 */
function spawnGoldenButterflies(container, direction = "next") {
  if (!container) return;

  const count = 5;
  for (let i = 0; i < count; i++) {
    const butterfly = document.createElement("div");
    butterfly.className = "gold-butterfly";

    // Golden wings
    const leftWing = document.createElement("div");
    leftWing.className = "butterfly-wing butterfly-wing-left";
    const rightWing = document.createElement("div");
    rightWing.className = "butterfly-wing butterfly-wing-right";

    butterfly.appendChild(leftWing);
    butterfly.appendChild(rightWing);

    // Random positioning & flight vectors
    const startX = 20 + Math.random() * 60; // 20% to 80% width
    const startY = 50 + Math.random() * 40; // 50% to 90% height
    const dx = (direction === "next" ? 1 : -1) * (40 + Math.random() * 90);
    const rot = (Math.random() - 0.5) * 50;

    butterfly.style.left = `${startX}%`;
    butterfly.style.top = `${startY}%`;
    butterfly.style.setProperty("--dx", `${dx}px`);
    butterfly.style.setProperty("--rot", `${rot}deg`);
    butterfly.style.animationDelay = `${i * 0.12}s`;

    container.appendChild(butterfly);

    // Remove after animation finishes
    setTimeout(() => {
      butterfly.remove();
    }, 3200);
  }
}

// ==========================================
// LIGHTBOX MODAL
// ==========================================
let openLightboxModal = null;

function initGalleryLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox) return;

  const photos = Array.from(document.querySelectorAll(".slide-card img")).map((img, i) => ({
    src: img.src,
    alt: img.alt || `Photo ${i + 1}`
  }));

  let lightboxIndex = 0;

  function showPhoto(index) {
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;
    lightboxIndex = index;

    lightboxImg.src = photos[lightboxIndex].src;
    lightboxImg.alt = photos[lightboxIndex].alt;
    lightboxCaption.textContent = `Photo ${lightboxIndex + 1} of ${photos.length} • Vikki & Pappu`;
  }

  openLightboxModal = function(index) {
    showPhoto(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showPhoto(lightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showPhoto(lightboxIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(lightboxIndex - 1);
    if (e.key === "ArrowRight") showPhoto(lightboxIndex + 1);
  });
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
// ROMANTIC WEDDING BACKGROUND MUSIC ENGINE
// ==========================================
let audioContext = null;
let musicInterval = null;
let isMusicPlaying = false;

function initAudioPlayer() {
  const audioBtn = document.getElementById("audio-toggle-btn");
  if (!audioBtn) return;

  audioBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      pauseWeddingMusic();
      audioBtn.classList.add("muted");
    } else {
      startWeddingMusic();
      audioBtn.classList.remove("muted");
    }
  });
}

function startWeddingMusic() {
  if (isMusicPlaying) return;
  isMusicPlaying = true;

  const audioBtn = document.getElementById("audio-toggle-btn");
  if (audioBtn) audioBtn.classList.remove("muted");

  // Also try HTML5 audio if audio source exists
  const audioEl = document.getElementById("bg-audio");
  if (audioEl) {
    audioEl.play().catch(() => {});
  }

  // Web Audio API Polyphonic Romantic Melody Synthesizer
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) {
      audioContext = new AudioCtx();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    playWeddingHarpSequence();
  } catch (err) {
    console.log("Web audio init notice:", err);
  }
}

function pauseWeddingMusic() {
  isMusicPlaying = false;
  const audioEl = document.getElementById("bg-audio");
  if (audioEl) {
    audioEl.pause();
  }
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

/**
 * Generates an ethereal, romantic wedding harp & piano progression
 */
function playWeddingHarpSequence() {
  if (!audioContext || !isMusicPlaying) return;

  // Romantic Wedding Chord Arpeggios (Cmaj9, Am9, Fmaj9, Gsus4)
  const progressions = [
    [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj9
    [220.00, 261.63, 329.63, 392.00, 440.00], // Am7
    [174.61, 220.00, 261.63, 329.63, 349.23], // Fmaj7
    [196.00, 261.63, 293.66, 392.00, 493.88]  // Gsus4 -> G
  ];

  let chordIndex = 0;
  let noteIndex = 0;

  function playNextNote() {
    if (!isMusicPlaying || !audioContext) return;

    const currentChord = progressions[chordIndex];
    const freq = currentChord[noteIndex];

    playGentleHarpTone(freq);

    noteIndex++;
    if (noteIndex >= currentChord.length) {
      noteIndex = 0;
      chordIndex = (chordIndex + 1) % progressions.length;
    }
  }

  // Play every 420ms for gentle soothing acoustic tempo
  musicInterval = setInterval(playNextNote, 420);
}

function playGentleHarpTone(freq) {
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  // Warm soft sine-triangle timbre
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);

  // Soft low-pass filter for acoustic warmth
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

  // Envelope: Soft attack, gentle natural decay
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(now);
  osc.stop(now + 2.0);
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
