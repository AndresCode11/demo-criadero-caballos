import { horsesData } from '../data/horses.js';

let selectedPedigreeHorseId = horsesData[0].id;

export function initPedigree() {
  setupPedigreeTabs();
  renderPedigreeTree(selectedPedigreeHorseId);
}

function setupPedigreeTabs() {
  const tabsContainer = document.getElementById('pedigree-horse-tabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = horsesData.map(h => `
    <button data-pedigree-id="${h.id}" class="pedigree-tab-btn px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
      h.id === selectedPedigreeHorseId 
        ? 'bg-[#c8a675] text-[#1e222a] border border-[#c8a675] font-bold' 
        : 'bg-[#2b323f]/80 text-slate-300 border border-slate-700 hover:border-[#c8a675]/50'
    }">
      ${h.name}
    </button>
  `).join('');

  tabsContainer.querySelectorAll('.pedigree-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedPedigreeHorseId = btn.getAttribute('data-pedigree-id');
      setupPedigreeTabs();
      renderPedigreeTree(selectedPedigreeHorseId);
    });
  });
}

function renderPedigreeTree(horseId) {
  const horse = horsesData.find(h => h.id === horseId);
  const container = document.getElementById('pedigree-tree-container');
  if (!horse || !container) return;

  container.innerHTML = `
    <div class="relative max-w-5xl mx-auto">
      <!-- Central Horse Header -->
      <div class="text-center mb-8">
        <span class="text-xs uppercase tracking-widest text-[#c8a675] font-semibold">Línea de Sangre Certificada</span>
        <h3 class="font-serif text-3xl text-white mt-1">${horse.name}</h3>
        <p class="text-sm text-slate-300">${horse.breed} • Certificado de Pureza 100%</p>
      </div>

      <!-- Pedigree Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <!-- Generation 1: Subject -->
        <div class="p-6 bg-[#222832] border-2 border-[#c8a675]/80 rounded-sm text-center shadow-xl">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-[#c8a675]/20 border border-[#c8a675] flex items-center justify-center text-[#c8a675]">
            <span class="material-symbols-outlined">pets</span>
          </div>
          <span class="text-[10px] uppercase tracking-widest text-[#ddc295] font-semibold block">Ejemplar Principal</span>
          <h4 class="font-serif text-xl text-white font-bold">${horse.name}</h4>
          <span class="text-xs text-slate-400 block mt-1">${horse.color}</span>
          <div class="mt-4 pt-3 border-t border-slate-700 text-xs text-[#ddc295] font-semibold">
            Genética Calificada SICAB
          </div>
        </div>

        <!-- Generation 2: Parents -->
        <div class="space-y-6">
          <!-- Sire / Padre -->
          <div class="p-4 bg-[#2b323f]/80 border border-[#c8a675]/30 rounded-sm relative group hover:border-[#c8a675] transition-all">
            <span class="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">Padre (Sire)</span>
            <h5 class="font-serif text-lg text-white font-semibold">${horse.pedigree.father.name}</h5>
            <span class="text-xs text-slate-300">${horse.pedigree.father.breed}</span>
          </div>

          <!-- Dam / Madre -->
          <div class="p-4 bg-[#2b323f]/80 border border-[#c8a675]/30 rounded-sm relative group hover:border-[#c8a675] transition-all">
            <span class="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">Madre (Dam)</span>
            <h5 class="font-serif text-lg text-white font-semibold">${horse.pedigree.mother.name}</h5>
            <span class="text-xs text-slate-300">${horse.pedigree.mother.breed}</span>
          </div>
        </div>

        <!-- Generation 3: Grandparents -->
        <div class="space-y-3">
          <div class="p-3 bg-[#181b22] border border-slate-700/60 rounded-sm text-xs">
            <span class="text-[9px] uppercase tracking-widest text-slate-400 block">Abuelo Paterno</span>
            <span class="font-semibold text-slate-200">${horse.pedigree.father.paternalGrandfather}</span>
          </div>
          <div class="p-3 bg-[#181b22] border border-slate-700/60 rounded-sm text-xs">
            <span class="text-[9px] uppercase tracking-widest text-slate-400 block">Abuela Paterna</span>
            <span class="font-semibold text-slate-200">${horse.pedigree.father.paternalGrandmother}</span>
          </div>
          <div class="p-3 bg-[#181b22] border border-slate-700/60 rounded-sm text-xs">
            <span class="text-[9px] uppercase tracking-widest text-slate-400 block">Abuelo Materno</span>
            <span class="font-semibold text-slate-200">${horse.pedigree.mother.maternalGrandfather}</span>
          </div>
          <div class="p-3 bg-[#181b22] border border-slate-700/60 rounded-sm text-xs">
            <span class="text-[9px] uppercase tracking-widest text-slate-400 block">Abuela Materna</span>
            <span class="font-semibold text-slate-200">${horse.pedigree.mother.maternalGrandmother}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
