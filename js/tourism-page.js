import { tourismExperiences, safetyPoints } from './data/tourism.js';
import { initAnimations } from './modules/animations.js';

let selectedExperience = tourismExperiences[0];
let adultCount = 2;
let childCount = 1;

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  renderExperiences();
  renderSafety();
  setupCalculator();
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
}

function renderExperiences() {
  const container = document.getElementById('tourism-experiences-grid');
  if (!container) return;

  container.innerHTML = tourismExperiences.map(exp => `
    <div class="glass-panel rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#c8a675]/60 transition-all duration-500 hover:shadow-2xl">
      <div>
        <div class="relative aspect-video w-full h-60 overflow-hidden bg-[#181b22]">
          <img src="${exp.image}" alt="${exp.title}" class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 block">
          <span class="absolute top-3 left-3 bg-[#1e222a]/95 border border-[#c8a675]/40 text-[#ddc295] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm shadow-md">
            ${exp.badge}
          </span>
          <span class="absolute bottom-3 right-3 bg-[#1e222a]/95 text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-sm shadow-md">
            ${exp.duration}
          </span>
        </div>

        <div class="p-6 sm:p-8 space-y-4">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span class="text-[#ddc295] font-semibold">${exp.age}</span>
            <span>${exp.level}</span>
          </div>

          <h3 class="font-serif text-2xl text-white font-bold">${exp.title}</h3>
          <p class="text-xs text-slate-300 leading-relaxed italic">${exp.tagline}</p>

          <ul class="space-y-2 border-t border-slate-700/50 pt-4">
            ${exp.highlights.map(h => `
              <li class="flex items-start gap-2 text-xs text-slate-300">
                <span class="material-symbols-outlined text-[#c8a675] text-sm shrink-0">check_circle</span>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="p-6 sm:p-8 bg-[#181b22]/90 border-t border-slate-700/60 flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase text-slate-400 block">Desde</span>
          <span class="font-serif text-2xl font-bold text-[#c8a675]">€${exp.childPrice > 0 ? exp.childPrice : exp.adultPrice}</span>
          <span class="text-[10px] text-slate-400">/ persona</span>
        </div>
        <a href="contacto.html?service=turismo&exp=${encodeURIComponent(exp.title)}" class="bg-[#c8a675] hover:bg-[#ddc295] text-[#1e222a] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all shadow-md">
          Reservar Cupo
        </a>
      </div>
    </div>
  `).join('');
}

function renderSafety() {
  const container = document.getElementById('safety-grid');
  if (!container) return;

  container.innerHTML = safetyPoints.map(p => `
    <div class="glass-panel p-6 rounded-sm text-center space-y-3 border-t-2 border-t-[#c8a675]">
      <span class="material-symbols-outlined text-[#c8a675] text-4xl">${p.icon}</span>
      <h4 class="font-serif text-base text-white font-semibold">${p.title}</h4>
      <p class="text-xs text-slate-300 leading-relaxed">${p.description}</p>
    </div>
  `).join('');
}

function setupCalculator() {
  const selectExp = document.getElementById('calc-experience');
  const adultUnitPrice = document.getElementById('adult-unit-price');
  const childUnitPrice = document.getElementById('child-unit-price');
  const countAdultsEl = document.getElementById('count-adults');
  const countChildrenEl = document.getElementById('count-children');
  const totalPriceEl = document.getElementById('calc-total-price');
  const bookBtn = document.getElementById('btn-book-calculated');

  if (!selectExp) return;

  selectExp.innerHTML = tourismExperiences.map(e => `
    <option value="${e.id}">${e.title} (€${e.adultPrice} Ad. / €${e.childPrice} Niño)</option>
  `).join('');

  const updateCalculations = () => {
    selectedExperience = tourismExperiences.find(e => e.id === selectExp.value) || tourismExperiences[0];
    
    if (adultUnitPrice) adultUnitPrice.innerText = `€${selectedExperience.adultPrice} / pers.`;
    if (childUnitPrice) childUnitPrice.innerText = `€${selectedExperience.childPrice} / pers.`;
    if (countAdultsEl) countAdultsEl.innerText = adultCount;
    if (countChildrenEl) countChildrenEl.innerText = childCount;

    const total = (adultCount * selectedExperience.adultPrice) + (childCount * selectedExperience.childPrice);
    if (totalPriceEl) totalPriceEl.innerText = `€${total}`;

    if (bookBtn) {
      bookBtn.href = `contacto.html?service=turismo&exp=${encodeURIComponent(selectedExperience.title)}&adults=${adultCount}&children=${childCount}`;
    }
  };

  selectExp.addEventListener('change', updateCalculations);

  document.getElementById('btn-plus-adults')?.addEventListener('click', () => {
    adultCount++;
    updateCalculations();
  });

  document.getElementById('btn-minus-adults')?.addEventListener('click', () => {
    if (adultCount > 1) {
      adultCount--;
      updateCalculations();
    }
  });

  document.getElementById('btn-plus-children')?.addEventListener('click', () => {
    childCount++;
    updateCalculations();
  });

  document.getElementById('btn-minus-children')?.addEventListener('click', () => {
    if (childCount > 0) {
      childCount--;
      updateCalculations();
    }
  });

  updateCalculations();
}
