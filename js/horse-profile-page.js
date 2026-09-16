import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupHeroGallery();
  setupVideoSection();
  setupLightbox();
  setupSmoothScroll();
  initAnimations();
});

function setupNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('bg-[#111317]/95', 'shadow-2xl', 'border-b', 'border-[#c8a675]/30');
      header?.classList.remove('bg-[#111317]/80');
    } else {
      header?.classList.remove('bg-[#111317]/95', 'shadow-2xl', 'border-b', 'border-[#c8a675]/30');
      header?.classList.add('bg-[#111317]/80');
    }
  });
}

function setupHeroGallery() {
  const mainImg = document.getElementById('hero-main-image');
  const mainImgWrapper = document.getElementById('hero-image-wrapper');
  const thumbBtns = Array.from(document.querySelectorAll('.hero-thumb-btn'));
  const prevBtn = document.getElementById('thumb-prev-btn');
  const nextBtn = document.getElementById('thumb-next-btn');
  const openAllBtn = document.getElementById('open-all-photos-btn');

  let currentIndex = 0;

  function setActiveThumb(index) {
    if (thumbBtns.length === 0 || index < 0 || index >= thumbBtns.length) return;
    currentIndex = index;
    const btn = thumbBtns[index];
    const src = btn.getAttribute('data-hero-src');
    const title = btn.getAttribute('data-hero-title') || 'Fotografía de Ejemplar';

    if (mainImg && src) {
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
        if (mainImgWrapper) {
          mainImgWrapper.setAttribute('data-lightbox-src', src);
          mainImgWrapper.setAttribute('data-lightbox-title', title);
        }
      }, 150);

      thumbBtns.forEach((b, i) => {
        if (i === index) {
          b.classList.remove('border-transparent', 'opacity-60');
          b.classList.add('border-[#c8a675]', 'opacity-100', 'scale-105');
        } else {
          b.classList.remove('border-[#c8a675]', 'opacity-100', 'scale-105');
          b.classList.add('border-transparent', 'opacity-60');
        }
      });
    }
  }

  thumbBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => setActiveThumb(idx));
  });

  prevBtn?.addEventListener('click', () => {
    const nextIdx = (currentIndex - 1 + thumbBtns.length) % thumbBtns.length;
    setActiveThumb(nextIdx);
  });

  nextBtn?.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % thumbBtns.length;
    setActiveThumb(nextIdx);
  });

  openAllBtn?.addEventListener('click', () => {
    const activeSrc = mainImg?.src || thumbBtns[0]?.getAttribute('data-hero-src');
    if (activeSrc) {
      triggerLightbox(activeSrc, 'Galería Fotográfica Oficial');
    }
  });
}

function setupVideoSection() {
  const player = document.getElementById('horse-video-player');
  const videoCards = document.querySelectorAll('.video-preview-card');
  const videoModal = document.getElementById('video-theater-modal');
  const modalPlayer = document.getElementById('modal-video-player');
  const modalClose = document.getElementById('modal-video-close');
  const activeTitle = document.getElementById('active-video-title');
  const activeDesc = document.getElementById('active-video-desc');

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video-src');
      const poster = card.getAttribute('data-video-poster');
      const title = card.getAttribute('data-video-title') || 'Video en Acción';
      const desc = card.getAttribute('data-video-desc') || '';

      if (modalPlayer && videoModal && src) {
        if (poster) modalPlayer.poster = poster;
        modalPlayer.src = src;
        videoModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        modalPlayer.play().catch(() => {});
      } else if (player && src) {
        if (poster) player.poster = poster;
        player.src = src;
        if (activeTitle) activeTitle.textContent = title;
        if (activeDesc) activeDesc.textContent = desc;
        player.play().catch(() => {});
        player.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  const closeVideoModal = () => {
    if (modalPlayer) modalPlayer.pause();
    videoModal?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  modalClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && !videoModal.classList.contains('hidden')) {
      closeVideoModal();
    }
  });
}

function triggerLightbox(src, title) {
  const lightbox = document.getElementById('horse-media-lightbox');
  const img = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');

  if (lightbox && img && src) {
    img.src = src;
    if (titleEl) titleEl.textContent = title || 'Vista Ampliada';
    lightbox.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function setupLightbox() {
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-src]');
  const lightbox = document.getElementById('horse-media-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!lightbox) return;

  lightboxTriggers.forEach(trig => {
    trig.addEventListener('click', (e) => {
      // Prevent if clicked a button inside wrapper
      if (e.target.closest('button')) return;
      const src = trig.getAttribute('data-lightbox-src');
      const title = trig.getAttribute('data-lightbox-title') || 'Vista Ampliada';
      if (src) triggerLightbox(src, title);
    });
  });

  const close = () => {
    lightbox.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      close();
    }
  });
}

function setupSmoothScroll() {
  const scrollBtns = document.querySelectorAll('.scroll-to-btn');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
