import { initAnimations } from './modules/animations.js';

// State for Tuition Calculator
let selectedPeriod = 1; // 1, 3, 6, 12 months
let studentCategory = 'ninos';

const BASE_MONTHLY_RATE = 280000;
const REGISTRATION_FEE = 250000; // Matrícula Anual

const PERIOD_CONFIG = {
  1: { months: 1, discount: 0, label: '1 Mes', desc: 'Plan 1 Mes: 4 clases agendadas en el horario a tarifa mensual base.' },
  3: { months: 3, discount: 0.05, label: '3 Meses', desc: 'Plan Trimestral: 12 clases agendadas en el horario con 5% de descuento mensual.' },
  6: { months: 6, discount: 0.10, label: '6 Meses', desc: 'Plan Semestral: 24 clases agendadas en el horario con 10% de descuento mensual.' },
  12: { months: 12, discount: 0.15, label: '12 Meses', desc: 'Plan Anual: 48 clases agendadas en el horario con 15% de descuento mensual.' }
};

// Age Profile Data
const ageProfiles = {
  ninos: {
    title: "Formación Infantil & Semillero Ecuestre",
    subtitle: "Iniciación lúdica, confianza y postura desde temprana edad",
    description: "Para niños desde los 2 años. Desarrollamos la psicomotricidad, equilibrio, respeto animal y serenidad a través de dinámicas respetuosas con el caballo.",
    bulletPoints: [
      "Acercamiento seguro y familiarización sin miedo.",
      "Desarrollo de postura natural, equilibrio sobre la montura y coordinación motriz.",
      "Acompañamiento personalizado 1 a 1 en las primeras sesiones.",
      "Ejemplares de temperamento noble y seguro garantizados."
    ],
    recommendedLevel: "Nivel 1 – Iniciación",
    scheduleHint: "Fines de semana o tardes entre semana (1 hora por sesión)"
  },
  jovenes: {
    title: "Desarrollo Juvenil & Técnica de Rienda",
    subtitle: "Disciplina, precisión motriz y conexión de binomio",
    description: "Diseñado para jóvenes en etapa formativa. Fortalece el carácter, la constancia y la técnica en los aires del caballo criollo colombiano y la monta clásica.",
    bulletPoints: [
      "Uso refinado de ayudas de pierna, asiento, mirada y rienda.",
      "Independencia de manos y suavidad de contacto con la embocadura.",
      "Control de ritmo, compás y cadencia en pista.",
      "Fomento de la responsabilidad en el cuidado y ensillado del ejemplar."
    ],
    recommendedLevel: "Nivel 2 y 3 – Formación & Perfeccionamiento",
    scheduleHint: "Horarios flexibles adaptados a jornadas escolares"
  },
  adultos: {
    title: "Adultos: Iniciación, Recreación o Maestría",
    subtitle: "Superación de temores, postura ergonómica y desconexión total",
    description: "Nunca es tarde para comenzar. Programa diseñado para adultos que desean aprender desde cero con absoluta calma y seguridad, o jinetes que buscan perfeccionar su estilo.",
    bulletPoints: [
      "Ambiente tranquilo y sin presiones en picaderos cubiertos.",
      "Mejora de la postura corporal, fortalecimiento del core y alivio del estrés.",
      "Comprensión profunda de la etología y psicología equina.",
      "Opción recreativa o de proyección técnica avanzada."
    ],
    recommendedLevel: "Personalizado según experiencia previa",
    scheduleHint: "Clases personalizadas de lunes a sábado"
  },
  competencia: {
    title: "Jinetes de Competencia & Alto Rendimiento",
    subtitle: "Preparación técnica, ritmo de pista y finura en juzgamiento",
    description: "Para jinetes y amazonas que proyectan su participación en válidas y campeonatos de chalanería. Pulido milimétrico de figuras, transiciones y presentación de pista.",
    bulletPoints: [
      "Técnica de presentación en serpentinas, ochos y líneas rectas.",
      "Manejo de la presión en pista y concentración del binomio.",
      "Entrenamiento intensivo en pista reglamentaria de chalanería.",
      "Planes especializados cotizados de forma personalizada."
    ],
    recommendedLevel: "Nivel 4 – Competencia",
    scheduleHint: "Plan de entrenamiento de alta intensidad"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupAgeTabs();
  setupCalculator();
  setupFaqAccordion();
  initAnimations();
});

// 1. Navigation Setup
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
}

// 2. Age Profile Interactive Tabs
function setupAgeTabs() {
  const tabButtons = document.querySelectorAll('.age-tab-btn');
  const displayContainer = document.getElementById('age-profile-display');
  if (!displayContainer) return;

  function renderProfile(key) {
    const profile = ageProfiles[key];
    if (!profile) return;

    displayContainer.innerHTML = `
      <div class="space-y-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a675]/15 border border-[#c8a675]/30 text-[#ddc295] text-[10px] uppercase font-bold tracking-widest">
            <span class="material-symbols-outlined text-sm">workspace_premium</span>
            ${profile.recommendedLevel}
          </div>
          <h3 class="font-serif text-2xl sm:text-3xl text-white font-bold">${profile.title}</h3>
          <p class="text-xs uppercase tracking-wider text-[#c8a675] font-semibold">${profile.subtitle}</p>
        </div>

        <p class="text-sm text-slate-300 leading-relaxed">${profile.description}</p>

        <div class="space-y-3 border-t border-slate-700/60 pt-5">
          <span class="text-xs uppercase tracking-widest text-slate-300 font-bold block">Puntos Clave del Proceso:</span>
          <ul class="space-y-2.5">
            ${profile.bulletPoints.map(point => `
              <li class="flex items-start gap-3 text-xs text-slate-200">
                <span class="material-symbols-outlined text-[#c8a675] text-base shrink-0 mt-0.5">check_circle</span>
                <span>${point}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-[#181b22] border border-slate-700/60 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 text-slate-400">
            <span class="material-symbols-outlined text-[#c8a675] text-base">schedule</span>
            <span>${profile.scheduleHint}</span>
          </div>
          <a href="#calculadora-plan" class="text-[#ddc295] hover:underline font-bold text-xs flex items-center gap-1">
            Ver Planes <span class="material-symbols-outlined text-sm">arrow_downward</span>
          </a>
        </div>
      </div>
    `;

    // Highlight active button
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-profile') === key) {
        btn.classList.add('bg-[#c8a675]', 'text-[#1e222a]', 'shadow-lg');
        btn.classList.remove('bg-[#181b22]', 'text-slate-300', 'hover:text-white');
      } else {
        btn.classList.remove('bg-[#c8a675]', 'text-[#1e222a]', 'shadow-lg');
        btn.classList.add('bg-[#181b22]', 'text-slate-300', 'hover:text-white');
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-profile');
      renderProfile(key);
    });
  });

  // Initial render
  renderProfile('ninos');
}

// 3. Tuition Calculator
function setupCalculator() {
  const periodOptions = document.querySelectorAll('.period-option');
  const monthlyRateEl = document.getElementById('calc-monthly-rate');
  const summaryPeriodEl = document.getElementById('calc-summary-period');
  const totalInvestmentEl = document.getElementById('calc-total-investment');
  const summaryClassesEl = document.getElementById('calc-summary-classes');
  const savingsBox = document.getElementById('calc-savings-box');
  const savingsAmountEl = document.getElementById('calc-savings-amount');
  const discountBadge = document.getElementById('calc-discount-badge');
  const ctaBtn = document.getElementById('calc-cta-btn');

  function formatCOP(val) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  }

  function updateCalculation() {
    const cfg = PERIOD_CONFIG[selectedPeriod] || PERIOD_CONFIG[1];
    const discountedMonthly = Math.round(BASE_MONTHLY_RATE * (1 - cfg.discount));
    const totalClassesCost = discountedMonthly * cfg.months;
    const totalWithoutDiscount = BASE_MONTHLY_RATE * cfg.months;
    const totalSavings = totalWithoutDiscount - totalClassesCost;
    const totalClasses = cfg.months * 4;

    const finalTotal = totalClassesCost;
    const descriptionText = cfg.desc;

    if (monthlyRateEl) monthlyRateEl.innerText = formatCOP(discountedMonthly);
    if (summaryPeriodEl) summaryPeriodEl.innerText = cfg.label;
    if (totalInvestmentEl) totalInvestmentEl.innerText = `${formatCOP(totalClassesCost)} COP`;
    if (summaryClassesEl) summaryClassesEl.innerText = `(${totalClasses} clases agendadas en el horario)`;

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
      const targetUrl = `contacto.html?service=chalaneria&period=${selectedPeriod}&monthlyRate=${discountedMonthly}&total=${finalTotal}`;
      ctaBtn.setAttribute('href', targetUrl);
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
      updateCalculation();
    });
  });

  updateCalculation();
}

// 4. FAQ Accordions
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all others
        faqItems.forEach(other => {
          other.querySelector('.faq-content')?.classList.add('hidden');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}
