/**
 * Script interactivo para Cabalgata Ecológica en Tabio
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

  // 3. Interactive Pricing & Booking Calculator
  const paxInput = document.getElementById('cabalgata-pax');
  const paxValueDisplay = document.getElementById('cabalgata-pax-val');
  const horseTypeSelect = document.getElementById('cabalgata-horse-type');
  const addRefrigerio = document.getElementById('add-refrigerio');
  const addAlmuerzo = document.getElementById('add-almuerzo');
  const addPicnic = document.getElementById('add-picnic');
  
  const totalPriceDisplay = document.getElementById('cabalgata-total-price');
  const perPersonDisplay = document.getElementById('cabalgata-per-person-price');
  const summaryBreakdown = document.getElementById('cabalgata-summary-breakdown');
  const reserveBtn = document.getElementById('cabalgata-reserve-btn');
  const whatsappBtn = document.getElementById('cabalgata-whatsapp-btn');

  function calculateCabalgata() {
    if (!paxInput || !totalPriceDisplay) return;

    const pax = parseInt(paxInput.value, 10) || 2;
    if (paxValueDisplay) paxValueDisplay.textContent = `${pax} ${pax === 1 ? 'persona' : 'personas'}`;

    let basePerPerson = 150000; // Paquete básico $150.000 COP
    let horseExtra = 0;
    let horseName = 'Caballo manso y dócil básico';

    if (horseTypeSelect && horseTypeSelect.value === 'especial') {
      horseExtra = 70000;
      horseName = 'Caballo especial de alta genética/entrenamiento';
    }

    let foodExtra = 0;
    const extrasList = [];

    if (addRefrigerio && addRefrigerio.checked) {
      foodExtra += 25000;
      extrasList.push('Refrigerio campestre');
    }
    if (addAlmuerzo && addAlmuerzo.checked) {
      foodExtra += 45000;
      extrasList.push('Almuerzo tradicional');
    }
    if (addPicnic && addPicnic.checked) {
      foodExtra += 65000;
      extrasList.push('Picnic gourmet');
    }

    const pricePerPerson = basePerPerson + horseExtra + foodExtra;
    const totalPrice = pricePerPerson * pax;

    totalPriceDisplay.textContent = `$${totalPrice.toLocaleString('es-CO')}`;
    if (perPersonDisplay) {
      perPersonDisplay.textContent = `$${pricePerPerson.toLocaleString('es-CO')} / persona`;
    }

    if (summaryBreakdown) {
      let breakdownText = `${pax} participantes · 3 horas de recorrido guiado · ${horseName}`;
      if (extrasList.length > 0) {
        breakdownText += ` + ${extrasList.join(', ')}`;
      }
      summaryBreakdown.textContent = breakdownText;
    }

    // Update reservation links
    const serviceParams = `service=turismo&exp=Cabalgata%20Ecologica%20Tabio&pax=${pax}&horse=${horseTypeSelect ? horseTypeSelect.value : 'basico'}&addons=${encodeURIComponent(extrasList.join(', '))}`;
    if (reserveBtn) {
      reserveBtn.href = `contacto.html?${serviceParams}`;
    }

    if (whatsappBtn) {
      const waMsg = encodeURIComponent(
        `Hola Club Ecuestre La Chucua J.C. Deseo reservar la Cabalgata Ecológica en Tabio para ${pax} personas (${horseName}). Extras: ${extrasList.join(', ') || 'Ninguno'}. Total estimado: $${totalPrice.toLocaleString('es-CO')} COP.`
      );
      whatsappBtn.href = `https://wa.me/573000000000?text=${waMsg}`;
    }
  }

  paxInput?.addEventListener('input', calculateCabalgata);
  horseTypeSelect?.addEventListener('change', calculateCabalgata);
  addRefrigerio?.addEventListener('change', calculateCabalgata);
  addAlmuerzo?.addEventListener('change', calculateCabalgata);
  addPicnic?.addEventListener('change', calculateCabalgata);

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
