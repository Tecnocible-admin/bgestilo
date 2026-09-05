'use strict';

const DRIVE_FOLDERS = Object.freeze({
  ninos: 'https://drive.google.com/drive/folders/1LQe-GdREHJ8wffREzfHD3pLLDyqmYuYz',
  mujer: 'https://drive.google.com/drive/folders/1ZY2HMCqSyA3fIC7TLq2Tr-MIOKY7kEXo',
  caballero: 'https://drive.google.com/drive/folders/1ZW8pbWjgVNHgqNYek2n4neNG4YgKF1D0',
  calzado: 'https://drive.google.com/drive/folders/1V9ynok766uZ2mG6xZLOSUBZKv6VMSFNR'
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const CAROUSEL_AUTOPLAY_DELAY = 5000;

document.querySelectorAll('[data-category]').forEach((card) => {
  const category = card.dataset.category;
  const link = card.querySelector('.category-card__link');
  if (link && DRIVE_FOLDERS[category]) {
    link.href = DRIVE_FOLDERS[category];
  }
});

document.querySelector('#year').textContent = String(new Date().getFullYear());

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('a[href="#contacto"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const contact = document.querySelector('#contacto');
    if (!contact) return;
    event.preventDefault();
    closeMenu();
    contact.scrollIntoView({
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
      block: 'start'
    });
    history.replaceState(null, '', '#contacto');
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const link = carousel.querySelector('.category-card__link');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const status = carousel.querySelector('[data-carousel-status]');
  let current = 0;
  let pointerStart = null;
  let dragged = false;
  let autoplayTimer = null;
  let isHovered = false;
  let hasFocus = false;
  let isInteracting = false;

  function showSlide(next, announce = true) {
    current = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', String(index !== current));
    });

    if (announce) status.textContent = `Imagen ${current + 1} de ${slides.length}`;
  }

  function stopAutoplay() {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    if (reducedMotion.matches || autoplayTimer !== null || document.hidden || isHovered || hasFocus || isInteracting) return;
    autoplayTimer = window.setInterval(() => {
      showSlide(current + 1, false);
    }, CAROUSEL_AUTOPLAY_DELAY);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => {
    showSlide(current - 1);
    restartAutoplay();
  });

  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
    showSlide(current + 1);
    restartAutoplay();
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(current - 1);
      restartAutoplay();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(current + 1);
      restartAutoplay();
    } else if (event.key === 'Home') {
      event.preventDefault();
      showSlide(0);
      restartAutoplay();
    } else if (event.key === 'End') {
      event.preventDefault();
      showSlide(slides.length - 1);
      restartAutoplay();
    }
  });

  viewport.addEventListener('pointerdown', (event) => {
    isInteracting = true;
    stopAutoplay();
    pointerStart = event.clientX;
    dragged = false;
  });

  viewport.addEventListener('pointermove', (event) => {
    if (pointerStart !== null && Math.abs(event.clientX - pointerStart) > 12) {
      dragged = true;
    }
  });

  viewport.addEventListener('pointerup', (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 45) {
      showSlide(current + (distance < 0 ? 1 : -1));
    }
    pointerStart = null;
    isInteracting = false;
    restartAutoplay();
  });

  viewport.addEventListener('pointercancel', () => {
    pointerStart = null;
    dragged = false;
    isInteracting = false;
    restartAutoplay();
  });

  link.addEventListener('click', (event) => {
    if (dragged) {
      event.preventDefault();
      dragged = false;
    }
  });

  carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoplay();
  });
  carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    startAutoplay();
  });
  carousel.addEventListener('focusin', () => {
    hasFocus = true;
    stopAutoplay();
  });
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      hasFocus = false;
      startAutoplay();
    }
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) stopAutoplay();
    else startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  showSlide(0, false);
  startAutoplay();
});
