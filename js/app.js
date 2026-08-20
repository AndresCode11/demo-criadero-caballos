import { initCatalog } from './modules/catalog.js';
import { initPedigree } from './modules/pedigree.js';
import { initCourses } from './modules/courses.js';
import { initTimeline } from './modules/timeline.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initCatalog();
  initPedigree();
  initCourses();
  initTimeline();
  setupNavigation();
  setupCounters();
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

  // Header background transition on scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('shadow-xl', 'bg-[#1e222a]/95');
    } else {
      header?.classList.remove('shadow-xl', 'bg-[#1e222a]/95');
    }
  });
}

function setupCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        let count = 0;
        const speed = target / 40;
        const update = () => {
          count += speed;
          if (count < target) {
            entry.target.innerText = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            entry.target.innerText = target;
          }
        };
        update();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
