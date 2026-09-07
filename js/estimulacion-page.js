/**
 * Script interactivo para la página de Estimulación Temprana con Caballos
 * Club Ecuestre La Chucua J.C.
 */

document.addEventListener('DOMContentLoaded', () => {
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
  const freqSelect = document.getElementById('estimulacion-freq');
  const modSelect = document.getElementById('estimulacion-mod');
  const priceDisplay = document.getElementById('estimulacion-total-price');
  const summaryDetails = document.getElementById('estimulacion-summary-text');
  const ctaBtn = document.getElementById('estimulacion-cta-btn');

  function calculateTuition() {
    if (!freqSelect || !priceDisplay) return;

    const freq = freqSelect.value; // '1semana' (4 clases) or '2semana' (8 clases)
    const mod = modSelect ? modSelect.value : 'individual';

    let base = 325000;
    let descText = '4 sesiones al mes (1 clase semanal de 1 hora)';

    if (freq === '2semana') {
      base = 590000; // Descuento paquete bimensual / 2 veces por semana
      descText = '8 sesiones al mes (2 clases semanales de 1 hora) · 10% dto.';
    }

    if (mod === 'grupal') {
      base = Math.round(base * 0.85); // 15% de descuento en grupo reducido (máx 3 niños)
      descText += ' · Grupo reducido (2-3 niños)';
    } else {
      descText += ' · Atención 1 a 1 personalizada';
    }

    priceDisplay.textContent = `$${base.toLocaleString('es-CO')}`;
    if (summaryDetails) {
      summaryDetails.textContent = descText;
    }

    if (ctaBtn) {
      ctaBtn.href = `contacto.html?service=estimulacion&plan=${freq}&mod=${mod}`;
    }
  }

  freqSelect?.addEventListener('change', calculateTuition);
  modSelect?.addEventListener('change', calculateTuition);
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
