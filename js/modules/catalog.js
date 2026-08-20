import { horsesData } from '../data/horses.js';
import { showToast } from './toasts.js';

let activeCategory = 'all';

export function initCatalog() {
  renderHorseCards();
  setupFilters();
  setupHorseModalEvents();
}

function renderHorseCards() {
  const grid = document.getElementById('stallions-grid');
  if (!grid) return;

  const filtered = activeCategory === 'all' 
    ? horsesData 
    : horsesData.filter(h => h.category === activeCategory);

  grid.innerHTML = filtered.map(horse => `
    <div class="group relative bg-[#2b323f]/80 backdrop-blur-md border border-[#c8a675]/25 hover:border-[#c8a675]/70 rounded-sm p-6 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between">
      <div>
        <div class="relative overflow-hidden rounded-sm mb-5 aspect-[16/10] bg-[#181b22]">
          <img src="${horse.image}" alt="${horse.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
          <div class="absolute inset-0 bg-gradient-to-t from-[#1e222a] via-transparent to-black/30 opacity-70"></div>
          <span class="absolute top-3 left-3 bg-[#1e222a]/90 backdrop-blur-md border border-[#c8a675]/40 text-[#ddc295] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-sm">
            ${horse.breed}
          </span>
          <button data-fav-id="${horse.id}" class="btn-fav absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1e222a]/80 backdrop-blur-md border border-[#c8a675]/30 text-slate-300 hover:text-[#ddc295] flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-sm">favorite</span>
          </button>
        </div>

        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs uppercase tracking-widest text-[#c8a675] font-semibold">${horse.discipline}</span>
          <span class="text-xs text-slate-400">${horse.height} • ${horse.birthYear}</span>
        </div>

        <h3 class="font-serif text-2xl text-white group-hover:text-[#ddc295] transition-colors mb-2">${horse.name}</h3>
        <p class="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">${horse.description}</p>

        <div class="space-y-2 mb-6 border-t border-slate-700/50 pt-4">
          <div class="flex justify-between text-xs text-slate-300">
            <span>Morfología & Estampa</span>
            <span class="text-[#ddc295] font-semibold">${horse.stats.morfologia}%</span>
          </div>
          <div class="w-full bg-[#181b22] h-1.5 rounded-full overflow-hidden">
            <div class="bg-[#c8a675] h-full" style="width: ${horse.stats.morfologia}%"></div>
          </div>
          
          <div class="flex justify-between text-xs text-slate-300 pt-1">
            <span>Nobleza & Temperamento</span>
            <span class="text-[#ddc295] font-semibold">${horse.stats.nobleza}%</span>
          </div>
          <div class="w-full bg-[#181b22] h-1.5 rounded-full overflow-hidden">
            <div class="bg-[#c8a675] h-full" style="width: ${horse.stats.nobleza}%"></div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-slate-700/60 pt-4">
        <div>
          <span class="text-[11px] uppercase tracking-wider text-slate-400 block">Canon de Salto</span>
          <span class="text-base font-serif font-bold text-[#c8a675]">${horse.studFee}</span>
        </div>
        <button data-horse-id="${horse.id}" class="btn-open-horse bg-[#343d4d] hover:bg-[#c8a675] hover:text-[#1e222a] text-slate-100 border border-slate-600 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all duration-300">
          Ver Ficha
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-open-horse').forEach(btn => {
    btn.addEventListener('click', () => {
      const horseId = btn.getAttribute('data-horse-id');
      const horse = horsesData.find(h => h.id === horseId);
      if (horse) openHorseModal(horse);
    });
  });

  grid.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('text-rose-400');
      showToast('Añadido a tus ejemplares favoritos');
    });
  });
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#c8a675]', 'text-[#1e222a]', 'font-semibold', 'border-[#c8a675]');
        b.classList.add('bg-[#2b323f]/80', 'text-slate-300', 'border-slate-700');
      });
      btn.classList.remove('bg-[#2b323f]/80', 'text-slate-300', 'border-slate-700');
      btn.classList.add('bg-[#c8a675]', 'text-[#1e222a]', 'font-semibold', 'border-[#c8a675]');

      activeCategory = btn.getAttribute('data-filter');
      renderHorseCards();
    });
  });
}

function setupHorseModalEvents() {
  const modal = document.getElementById('horse-detail-modal');
  const closeBtn = document.getElementById('close-horse-modal');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}

export function openHorseModal(horse) {
  const modal = document.getElementById('horse-detail-modal');
  const content = document.getElementById('horse-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="space-y-4">
        <div class="relative overflow-hidden rounded-sm aspect-[4/3] w-full h-72 bg-[#181b22] border border-[#c8a675]/30">
          <img src="${horse.image}" alt="${horse.name}" class="w-full h-full object-cover object-center block">
          <div class="absolute top-4 left-4 bg-[#1e222a]/95 backdrop-blur-md px-3 py-1 border border-[#c8a675]/40 text-[#ddc295] text-xs font-semibold uppercase tracking-widest rounded-sm">
            ${horse.breed}
          </div>
        </div>
        <div class="p-4 bg-[#222832]/60 border border-slate-700/50 rounded-sm">
          <h4 class="text-xs uppercase tracking-widest text-[#ddc295] mb-2 font-semibold">Palmarés & Reconocimientos</h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${horse.awards.map(a => `<li class="flex items-start gap-2"><span class="material-symbols-outlined text-[#c8a675] text-sm">verified</span>${a}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="flex flex-col justify-between">
        <div>
          <span class="text-xs uppercase tracking-widest text-[#c8a675] font-semibold">${horse.discipline}</span>
          <h2 class="font-serif text-3xl md:text-4xl text-white mt-1 mb-3">${horse.name}</h2>
          <p class="text-sm text-slate-300 leading-relaxed mb-6">${horse.description}</p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div class="p-3 bg-[#181b22] border border-slate-700/50 rounded-sm text-center">
              <span class="text-[11px] uppercase text-slate-400 block">Alzada</span>
              <span class="text-sm font-semibold text-slate-200">${horse.height}</span>
            </div>
            <div class="p-3 bg-[#181b22] border border-slate-700/50 rounded-sm text-center">
              <span class="text-[11px] uppercase text-slate-400 block">Capa</span>
              <span class="text-sm font-semibold text-slate-200">${horse.color}</span>
            </div>
            <div class="p-3 bg-[#181b22] border border-slate-700/50 rounded-sm text-center">
              <span class="text-[11px] uppercase text-slate-400 block">Año Nacimiento</span>
              <span class="text-sm font-semibold text-slate-200">${horse.birthYear}</span>
            </div>
          </div>

          <div class="space-y-3 mb-6">
            <h4 class="text-xs uppercase tracking-widest text-[#ddc295] font-semibold">Evaluación Morfofuncional</h4>
            ${Object.entries(horse.stats).map(([key, val]) => `
              <div>
                <div class="flex justify-between text-xs text-slate-300 mb-1">
                  <span class="capitalize">${key}</span>
                  <span class="text-[#ddc295] font-semibold">${val}/100</span>
                </div>
                <div class="w-full bg-[#181b22] h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#c8a675] h-full" style="width: ${val}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700/60 pt-5">
          <div>
            <span class="text-xs text-slate-400 block">Canon de Salto Reproductivo</span>
            <span class="font-serif text-2xl font-bold text-[#c8a675]">${horse.studFee}</span>
          </div>
          <a href="contacto.html?service=genetica&horse=${horse.id}" class="w-full sm:w-auto text-center bg-[#c8a675] hover:bg-[#ddc295] text-[#1e222a] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all shadow-md">
            Solicitar Dosis Genética
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}
