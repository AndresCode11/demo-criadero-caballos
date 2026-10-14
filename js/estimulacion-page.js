/**
 * Script interactivo para la página de Estimulación Temprana con Caballos
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

  // 3. Selector de Etapas de Edad (7m - 4 años)
  const ageTabs = document.querySelectorAll('.age-tab-btn');
  const ageCards = document.querySelectorAll('.age-content-card');

  ageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetAge = tab.getAttribute('data-age');

      // Update active tab styles
      ageTabs.forEach(t => {
        t.classList.remove('active', 'bg-[#c8a675]', 'text-[#1e222a]', 'font-bold', 'border-[#c8a675]');
        t.classList.add('bg-[#222832]', 'text-slate-300', 'border-slate-700');
      });

      tab.classList.add('active', 'bg-[#c8a675]', 'text-[#1e222a]', 'font-bold', 'border-[#c8a675]');
      tab.classList.remove('bg-[#222832]', 'text-slate-300', 'border-slate-700');

      // Show matching content card
      ageCards.forEach(card => {
        if (card.getAttribute('data-age-card') === targetAge) {
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.classList.add('hidden');
          card.classList.remove('animate-fadeIn');
        }
      });
    });
  });

  // 4. Calculador / Modalidad del Plan Mensual
  const periodOptions = document.querySelectorAll('.est-period-opt');
  const monthlyRateEl = document.getElementById('estimulacion-monthly-rate');
  const summaryPeriodEl = document.getElementById('estimulacion-summary-period');
  const totalInvestmentEl = document.getElementById('estimulacion-total-investment');
  const summaryClassesEl = document.getElementById('estimulacion-summary-classes');
  const savingsBox = document.getElementById('estimulacion-savings-box');
  const savingsAmountEl = document.getElementById('estimulacion-savings-amount');
  const discountBadge = document.getElementById('estimulacion-discount-badge');
  const ctaBtn = document.getElementById('estimulacion-cta-btn');

  let selectedPeriod = 1;
  const BASE_MONTHLY_RATE = 280000;

  const PERIOD_CONFIG = {
    1: { months: 1, discount: 0, label: '1 Mes' },
    3: { months: 3, discount: 0.05, label: '3 Meses' },
    6: { months: 6, discount: 0.10, label: '6 Meses' },
    12: { months: 12, discount: 0.15, label: '12 Meses' }
  };

  function formatCOP(val) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  }

  function calculateTuition() {
    const cfg = PERIOD_CONFIG[selectedPeriod] || PERIOD_CONFIG[1];
    const discountedMonthly = Math.round(BASE_MONTHLY_RATE * (1 - cfg.discount));
    const totalClassesCost = discountedMonthly * cfg.months;
    const totalWithoutDiscount = BASE_MONTHLY_RATE * cfg.months;
    const totalSavings = totalWithoutDiscount - totalClassesCost;
    const totalSessions = cfg.months * 4;

    if (monthlyRateEl) monthlyRateEl.innerText = formatCOP(discountedMonthly);
    if (summaryPeriodEl) summaryPeriodEl.innerText = cfg.label;
    if (totalInvestmentEl) totalInvestmentEl.innerText = `${formatCOP(totalClassesCost)} COP`;
    if (summaryClassesEl) summaryClassesEl.innerText = `(${totalSessions} sesiones agendadas en el horario)`;

    if (discountBadge) {
      if (cfg.discount > 0) {
        discountBadge.innerText = `${Math.round(cfg.discount * 100)}% DCTO`;
        discountBadge.classList.remove('hidden');
      } else {
        discountBadge.classList.add('hidden');
      }
    }

    if (savingsBox && savingsAmountEl) {
      if (totalSavings > 0) {
        savingsAmountEl.innerText = `-${formatCOP(totalSavings)} COP`;
        savingsBox.classList.remove('hidden');
      } else {
        savingsBox.classList.add('hidden');
      }
    }

    if (ctaBtn) {
      ctaBtn.href = `contacto.html?service=estimulacion&period=${selectedPeriod}&monthlyRate=${discountedMonthly}&total=${totalClassesCost}`;
    }
  }

  periodOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      periodOptions.forEach(o => {
        o.classList.remove('border-[#c8a675]', 'bg-[#2b323f]', 'text-white');
        o.classList.add('border-slate-700', 'bg-[#181b22]', 'text-slate-400');
        const textSpan = o.querySelector('span:first-child');
        if (textSpan) textSpan.classList.remove('text-white');
      });

      opt.classList.add('border-[#c8a675]', 'bg-[#2b323f]', 'text-white');
      opt.classList.remove('border-slate-700', 'bg-[#181b22]', 'text-slate-400');
      const activeTextSpan = opt.querySelector('span:first-child');
      if (activeTextSpan) activeTextSpan.classList.add('text-white');

      selectedPeriod = parseInt(opt.getAttribute('data-period')) || 1;
      calculateTuition();
    });
  });

  calculateTuition();

  // 5. FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question?.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Close all others
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
