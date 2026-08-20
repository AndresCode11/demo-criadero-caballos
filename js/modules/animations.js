/* ==========================================================================
   Equine Heritage - GSAP & Lenis Smooth Scroll & Staggered Fade-In Transitions
   ========================================================================== */

export function initAnimations() {
  if (typeof gsap === 'undefined') return;

  // Register ScrollTrigger plugin if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 2. Initial Page & Hero Staggered Fade-In Animation
  animatePageEntrance();

  // 3. Smooth Section-Level Transitions on Scroll
  animateSectionTransitions();

  // 4. Stat Counter Numbers Animation
  animateCounters();
}

export function refreshAnimations() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
}

function animatePageEntrance() {
  // Animate Header with smooth downward fade
  const header = document.getElementById('main-header');
  if (header) {
    gsap.from(header, {
      y: -20,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });

    // Scroll listener to toggle reduced opacity at top vs. solid opacity on scroll
    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Run immediately on load
  }

  // Animate Hero Content with elegant staggered fade-in
  const heroSection = document.querySelector('#hero, main > section:first-of-type');
  if (heroSection) {
    const elementsToFade = heroSection.querySelectorAll('h1, p, .inline-flex, .flex-wrap, .glass-panel');
    if (elementsToFade.length > 0) {
      gsap.from(elementsToFade, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
        clearProps: 'all',
      });
    }
  }
}

function animateSectionTransitions() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Animate each section container smoothly on scroll
  const sections = document.querySelectorAll('main > section');
  sections.forEach((section, index) => {
    // Skip the hero section as it is handled by animatePageEntrance
    if (index === 0 || section.id === 'hero') return;

    const container = section.querySelector('.max-w-7xl, .max-w-5xl, .max-w-4xl') || section;
    
    gsap.from(container, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 35,
      opacity: 0,
      duration: 0.95,
      ease: 'power3.out',
      clearProps: 'all',
    });
  });
}

function animateCounters() {
  if (typeof ScrollTrigger === 'undefined') return;

  const counters = document.querySelectorAll('.stat-counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
    if (!target) return;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          innerText: target,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: 'power2.out',
        });
      }
    });
  });
}
