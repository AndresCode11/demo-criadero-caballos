/**
 * Script interactivo para Cabalgata Ecológica en Tabio
 * Club Ecuestre La Chucua J.C.
 */
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();

  // 1. Header scroll effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });

  // 2. Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Interactive Pricing & Booking Calculator
  const paxInput = document.getElementById('cabalgata-pax');
  const paxValueDisplay = document.getElementById('cabalgata-pax-val');
  const totalPriceDisplay = document.getElementById('cabalgata-total-price');
  const perPersonDisplay = document.getElementById('cabalgata-per-person-price');
  const summaryBreakdown = document.getElementById('cabalgata-summary-breakdown');
  const reserveBtn = document.getElementById('cabalgata-reserve-btn');
  const whatsappBtn = document.getElementById('cabalgata-whatsapp-btn');

  function calculateCabalgata() {
    if (!paxInput || !totalPriceDisplay) return;

    const pax = parseInt(paxInput.value, 10) || 2;
    if (paxValueDisplay) paxValueDisplay.textContent = `${pax} ${pax === 1 ? 'persona' : 'personas'}`;

    const basePerPerson = 220000; // Tarifa estándar $220.000 COP por persona (3 horas)
    const totalPrice = basePerPerson * pax;

    totalPriceDisplay.textContent = `$${totalPrice.toLocaleString('es-CO')}`;
    if (perPersonDisplay) {
      perPersonDisplay.textContent = `$${basePerPerson.toLocaleString('es-CO')} / persona`;
    }

    if (summaryBreakdown) {
      summaryBreakdown.textContent = `${pax} participantes · 3 horas de recorrido guiado · Caballo manso y seguro`;
    }

    // Update reservation links
    const serviceParams = `service=turismo&exp=Cabalgata%20Ecologica%20Tabio&pax=${pax}`;
    if (reserveBtn) {
      reserveBtn.href = `contacto.html?${serviceParams}`;
    }

    if (whatsappBtn) {
      const waMsg = encodeURIComponent(
        `Hola Club Ecuestre La Chucua J.C. Deseo reservar la Cabalgata Ecológica en Tabio para ${pax} personas (3 horas de recorrido guiado). Total estimado: $${totalPrice.toLocaleString('es-CO')} COP.`
      );
      whatsappBtn.href = `https://wa.me/573000000000?text=${waMsg}`;
    }
  }

  paxInput?.addEventListener('input', calculateCabalgata);
  calculateCabalgata();

  // 4. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question?.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      faqItems.forEach(otherItem => {
        otherItem.querySelector('.faq-answer')?.classList.add('hidden');
        otherItem.querySelector('.faq-icon')?.classList.remove('rotate-180');
      });

      if (!isOpen) {
        answer?.classList.remove('hidden');
        icon?.classList.add('rotate-180');
      }
    });
  });
});
