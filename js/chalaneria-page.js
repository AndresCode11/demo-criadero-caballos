import { initAnimations } from './modules/animations.js';

// State for Tuition Calculator
let selectedFrequency = 'semanal'; // 'semanal' (4 clases) or 'intensivo' (8 clases)
let addBiomechanicalAnalysis = false;
let studentCategory = 'ninos';

const PRICING = {
  semanal: 325000,
  intensivo: 600000,
  biomechanicsAddon: 120000
};

// Age Profile Data
const ageProfiles = {
  ninos: {
    title: "Formación Infantil & Semillero Ecuestre",
    subtitle: "Iniciación lúdica, confianza y postura desde temprana edad",
    description: "Para niños desde los 4 años. Desarrollamos la psicomotricidad, equilibrio, respeto animal y serenidad a través de dinámicas respetuosas con el caballo.",
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
  const freqOptions = document.querySelectorAll('.freq-option');
  const addonBio = document.getElementById('addon-biomechanics');
  const totalPriceEl = document.getElementById('calc-total-price');
  const totalDescEl = document.getElementById('calc-total-desc');
  const ctaBtn = document.getElementById('calc-cta-btn');

  function updateCalculation() {
    let total = PRICING[selectedFrequency];
    let descriptionText = '';

    if (selectedFrequency === 'semanal') {
      descriptionText = 'Plan Mensual Estándar: 4 clases de 1 hora (1 por semana).';
    } else {
      descriptionText = 'Plan Intensivo: 8 clases de 1 hora (2 por semana con descuento).';
    }

    if (addBiomechanicalAnalysis) {
      total += PRICING.biomechanicsAddon;
      descriptionText += ' + Evaluación Biomecánica Digital en Video.';
    }

    // Format COP
    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(total);

    if (totalPriceEl) totalPriceEl.innerText = formatted;
    if (totalDescEl) totalDescEl.innerText = descriptionText;

    if (ctaBtn) {
      const targetUrl = `contacto.html?service=chalaneria&plan=${selectedFrequency}&total=${total}&addonBio=${addBiomechanicalAnalysis}`;
      ctaBtn.setAttribute('href', targetUrl);
    }
  }

  freqOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      freqOptions.forEach(o => {
        o.classList.remove('border-[#c8a675]', 'bg-[#2b323f]', 'text-white');
        o.classList.add('border-slate-700', 'bg-[#181b22]', 'text-slate-400');
      });
      opt.classList.add('border-[#c8a675]', 'bg-[#2b323f]', 'text-white');
      opt.classList.remove('border-slate-700', 'bg-[#181b22]', 'text-slate-400');

      selectedFrequency = opt.getAttribute('data-freq') || 'semanal';
      updateCalculation();
    });
  });

  if (addonBio) {
    addonBio.addEventListener('change', (e) => {
      addBiomechanicalAnalysis = e.target.checked;
      updateCalculation();
    });
  }

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
