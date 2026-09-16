import { horsesData } from '../data/horses.js';

let currentHorseIndex = 0;
let currentMediaType = 'photos'; // 'photos' | 'video' | 'pedigree'
let activePhotoIndex = 0;
let activeVideoIndex = 0;

export function initHorseShowcase(containerId = 'horse-showcase-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderShowcase(container);
  setupLightbox();
}

function getFeaturedHorses() {
  return horsesData.filter(h => ['esperada-valencia', 'valentina-mariana', 'venus-rancho'].includes(h.id));
}

function renderShowcase(container) {
  const featured = getFeaturedHorses();
  const currentHorse = featured[currentHorseIndex] || featured[0];

  container.innerHTML = `
    <div class="space-y-10">
      <!-- Selector de Caballos (Pestañas Superiores) -->
      <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 border-b border-slate-700/60 pb-8">
        ${featured.map((horse, idx) => {
          const isActive = idx === currentHorseIndex;
          return `
            <button data-horse-index="${idx}" class="horse-tab-btn group relative flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 text-left ${
              isActive 
                ? 'bg-gradient-to-r from-[#2b323f] to-[#222832] border-[#c8a675] shadow-lg shadow-[#c8a675]/10' 
                : 'bg-[#181b22]/90 border-slate-700/70 hover:border-[#c8a675]/50 hover:bg-[#222832]'
            }">
              <div class="w-12 h-12 rounded-lg overflow-hidden border ${isActive ? 'border-[#c8a675]' : 'border-slate-700'} shrink-0 relative">
                <img src="${horse.coverImage}" alt="${horse.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#c8a675] text-[#1e222a]' : 'bg-slate-800 text-[#ddc295] border border-slate-700'
                  }">${horse.modalityCode}</span>
                  <span class="text-xs text-slate-400 font-medium">${horse.color}</span>
                </div>
                <h3 class="font-serif text-sm sm:text-base font-semibold ${isActive ? 'text-[#ddc295]' : 'text-slate-200 group-hover:text-white'}">
                  ${horse.name}
                </h3>
              </div>
              ${isActive ? '<span class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c8a675] rotate-45"></span>' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Escenario Principal: Grid de 2 Columnas (Media a la izquierda, Ficha a la derecha) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        <!-- Columna Multimedia (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Sub-pestañas de tipo de medio: Fotos / Video / Genealogía -->
          <div class="flex items-center justify-between bg-[#181b22] p-1.5 rounded-xl border border-slate-700/60">
            <div class="flex items-center gap-1">
              <button data-media-type="photos" class="media-tab-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                currentMediaType === 'photos' 
                  ? 'bg-[#c8a675] text-[#1e222a] font-bold shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-[#222832]'
              }">
                <span class="material-symbols-outlined text-sm">photo_camera</span>
                <span>Fotos (${currentHorse.images.length})</span>
              </button>

              <button data-media-type="video" class="media-tab-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                currentMediaType === 'video' 
                  ? 'bg-[#c8a675] text-[#1e222a] font-bold shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-[#222832]'
              }">
                <span class="material-symbols-outlined text-sm">play_circle</span>
                <span>Video ${currentHorse.videos.length > 0 ? `(${currentHorse.videos.length})` : ''}</span>
              </button>

              <button data-media-type="pedigree" class="media-tab-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                currentMediaType === 'pedigree' 
                  ? 'bg-[#c8a675] text-[#1e222a] font-bold shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-[#222832]'
              }">
                <span class="material-symbols-outlined text-sm">account_tree</span>
                <span>Genealogía</span>
              </button>
            </div>

            <!-- Botón Zoom / Pantalla completa -->
            <button id="btn-open-lightbox" title="Ampliar pantalla completa" class="p-2 rounded-lg bg-[#222832] text-slate-300 hover:text-[#ddc295] hover:bg-[#2b323f] border border-slate-700/50 transition-colors">
              <span class="material-symbols-outlined text-base">fullscreen</span>
            </button>
          </div>

          <!-- Contenedor Dinámico del Medio Activo -->
          <div class="relative bg-[#181b22] border border-[#c8a675]/30 rounded-2xl overflow-hidden shadow-2xl min-h-[420px] flex flex-col justify-center">
            ${renderActiveMediaContent(currentHorse)}
          </div>

          <!-- Barra de Miniaturas (solo si está en modo fotos y hay más de 1 imagen) -->
          ${currentMediaType === 'photos' && currentHorse.images.length > 1 ? `
            <div class="flex items-center gap-3 overflow-x-auto pb-2">
              ${currentHorse.images.map((imgSrc, i) => `
                <button data-photo-idx="${i}" class="photo-thumb-btn relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  i === activePhotoIndex ? 'border-[#c8a675] scale-105 shadow-md' : 'border-slate-700 opacity-60 hover:opacity-100'
                }">
                  <img src="${imgSrc}" alt="${currentHorse.name} foto ${i+1}" class="w-full h-full object-cover">
                </button>
              `).join('')}
            </div>
          ` : ''}

          <!-- Selector de videos (si hay más de 1 video en modo video) -->
          ${currentMediaType === 'video' && currentHorse.videos.length > 1 ? `
            <div class="flex items-center gap-2">
              ${currentHorse.videos.map((vid, idx) => `
                <button data-video-idx="${idx}" class="video-select-btn px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  idx === activeVideoIndex 
                    ? 'bg-[#c8a675]/20 border-[#c8a675] text-[#ddc295]' 
                    : 'bg-[#181b22] border-slate-700 text-slate-400 hover:text-slate-200'
                }">
                  Video ${idx + 1}: ${vid.title || 'En pista'}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Columna Ficha y Descripción (5 cols) -->
        <div class="lg:col-span-5 space-y-6 bg-[#222832]/70 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-8 rounded-2xl shadow-xl">
          
          <div>
            <div class="flex items-center justify-between gap-3 mb-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8a675]/15 border border-[#c8a675]/40 text-[#ddc295] text-[11px] font-bold uppercase tracking-wider">
                <span class="w-2 h-2 rounded-full bg-[#c8a675] animate-pulse"></span>
                ${currentHorse.modality}
              </span>
              <span class="text-xs text-slate-400">${currentHorse.birthYear} • Nacimiento</span>
            </div>
            
            <h2 class="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight mb-2">
              ${currentHorse.name}
            </h2>
            <p class="text-xs uppercase tracking-widest text-[#c8a675] font-semibold mb-4">
              ${currentHorse.title}
            </p>
            <p class="text-sm text-slate-300 leading-relaxed">
              ${currentHorse.description}
            </p>
          </div>

          <!-- Métricas clave -->
          <div class="grid grid-cols-3 gap-2.5 py-4 border-y border-slate-700/60">
            <div class="bg-[#181b22] p-3 rounded-lg border border-slate-800 text-center">
              <span class="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Alzada</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-100">${currentHorse.height}</span>
            </div>
            <div class="bg-[#181b22] p-3 rounded-lg border border-slate-800 text-center">
              <span class="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Capa</span>
              <span class="text-xs sm:text-sm font-semibold text-slate-100">${currentHorse.color}</span>
            </div>
            <div class="bg-[#181b22] p-3 rounded-lg border border-slate-800 text-center">
              <span class="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Carpeta</span>
              <span class="text-xs sm:text-sm font-mono text-[#ddc295] font-semibold">/${currentHorse.folder}</span>
            </div>
          </div>

          <!-- Ascendencia Inmediata (Padre & Madre) -->
          <div class="space-y-2">
            <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Linaje Directo</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="bg-[#181b22]/90 p-3 rounded-lg border border-[#c8a675]/30">
                <span class="text-[9px] uppercase tracking-wider text-[#c8a675] font-bold block">Padre</span>
                <span class="font-semibold text-white block mt-0.5">${currentHorse.pedigree.father.name}</span>
                <span class="text-[10px] text-slate-400">Abuelo: ${currentHorse.pedigree.father.paternalGrandfather}</span>
              </div>
              <div class="bg-[#181b22]/90 p-3 rounded-lg border border-[#c8a675]/30">
                <span class="text-[9px] uppercase tracking-wider text-[#c8a675] font-bold block">Madre</span>
                <span class="font-semibold text-white block mt-0.5">${currentHorse.pedigree.mother.name}</span>
                <span class="text-[10px] text-slate-400">Abuelo: ${currentHorse.pedigree.mother.maternalGrandfather}</span>
              </div>
            </div>
          </div>

          <!-- Destacados / Premios -->
          <div class="space-y-2">
            <span class="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Cualidades y Méritos</span>
            <ul class="space-y-1.5 text-xs text-slate-300">
              ${currentHorse.awards.map(award => `
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#c8a675] text-base shrink-0">verified</span>
                  <span>${award}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Botones de Acción -->
          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <a href="${currentHorse.slug}.html" class="flex-1 text-center bg-gradient-to-r from-[#c8a675] to-[#ddc295] text-[#1e222a] font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">visibility</span>
              <span>Ver Página de ${currentHorse.shortName}</span>
            </a>
            <a href="contacto.html?service=genetica&horse=${currentHorse.slug}" class="px-4 py-3.5 rounded-xl border border-[#c8a675]/40 text-[#ddc295] hover:bg-[#c8a675]/10 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-base">mail</span>
              <span>Consultar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  attachShowcaseEvents(container, currentHorse);
}

function renderActiveMediaContent(horse) {
  if (currentMediaType === 'photos') {
    const activePhoto = horse.images[activePhotoIndex] || horse.coverImage;
    return `
      <div class="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black/40 overflow-hidden flex items-center justify-center group cursor-pointer" id="active-photo-viewer">
        <img src="${activePhoto}" alt="${horse.name}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-[#181b22] via-transparent to-transparent opacity-60"></div>
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
          <span class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            ${horse.name} • Foto ${activePhotoIndex + 1} de ${horse.images.length}
          </span>
          <span class="flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:text-[#ddc295]">
            <span class="material-symbols-outlined text-sm">zoom_in</span> Ampliar
          </span>
        </div>
      </div>
    `;
  }

  if (currentMediaType === 'video') {
    if (!horse.videos || horse.videos.length === 0) {
      return `
        <div class="p-12 text-center space-y-4 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full bg-[#222832] border border-[#c8a675]/40 flex items-center justify-center mx-auto text-[#c8a675]">
            <span class="material-symbols-outlined text-3xl">videocam</span>
          </div>
          <h4 class="font-serif text-xl text-white">Video de ${horse.shortName}</h4>
          <p class="text-xs text-slate-300 leading-relaxed">
            El archivo de video para este ejemplar está siendo procesado o estará disponible próximamente en su carpeta <span class="font-mono text-[#ddc295]">/assets/images/${horse.folder}/</span>.
          </p>
          <a href="contacto.html?service=video&horse=${horse.slug}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#222832] border border-[#c8a675]/50 text-xs text-[#ddc295] font-semibold hover:bg-[#c8a675] hover:text-[#1e222a] transition-all">
            <span class="material-symbols-outlined text-sm">chat</span>
            <span>Solicitar Video Privado por WhatsApp</span>
          </a>
        </div>
      `;
    }

    const currentVideo = horse.videos[activeVideoIndex] || horse.videos[0];
    return `
      <div class="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black flex flex-col justify-center">
        <video 
          id="horse-video-player"
          controls 
          playsinline 
          preload="metadata"
          class="w-full h-full object-contain max-h-[500px]"
          poster="${currentVideo.poster || ''}"
          src="${currentVideo.src}#t=0.1">
          Tu navegador no soporta reproducción de video HTML5.
        </video>
        ${currentVideo.desc ? `
          <div class="p-3 bg-[#181b22] border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span class="font-medium text-white">${currentVideo.title || horse.name}</span>
            <span class="text-slate-400">${currentVideo.desc}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  if (currentMediaType === 'pedigree') {
    return `
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span class="text-[10px] uppercase tracking-widest text-[#c8a675] font-bold block">Ficha Genealógica Registrada</span>
            <h4 class="font-serif text-xl text-white">${horse.name}</h4>
          </div>
          <button id="btn-pedigree-full" class="flex items-center gap-1 text-xs text-[#ddc295] hover:underline font-semibold">
            <span class="material-symbols-outlined text-base">fullscreen</span>
            <span>Ver Ficha Completa</span>
          </button>
        </div>

        <div class="relative bg-black/40 rounded-xl overflow-hidden border border-slate-800 max-h-[380px] flex items-center justify-center cursor-pointer group" id="pedigree-image-viewer">
          <img src="${horse.genealogyImage}" alt="Genealogía de ${horse.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
            <span class="material-symbols-outlined text-xl text-[#c8a675]">zoom_in</span>
            <span>Clic para abrir en alta resolución</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-[#222832] p-3 rounded-lg border border-slate-800">
            <span class="text-[10px] uppercase text-[#c8a675] font-bold block">Ascendencia Paterna (Sire)</span>
            <p class="font-semibold text-slate-200 mt-1">${horse.pedigree.father.name}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">Nieto de ${horse.pedigree.father.paternalGrandfather}</p>
          </div>
          <div class="bg-[#222832] p-3 rounded-lg border border-slate-800">
            <span class="text-[10px] uppercase text-[#c8a675] font-bold block">Ascendencia Materna (Dam)</span>
            <p class="font-semibold text-slate-200 mt-1">${horse.pedigree.mother.name}</p>
            <p class="text-[10px] text-slate-400 mt-0.5">Nieto de ${horse.pedigree.mother.maternalGrandfather}</p>
          </div>
        </div>
      </div>
    `;
  }
}

function attachShowcaseEvents(container, currentHorse) {
  // Cambio de caballo
  container.querySelectorAll('.horse-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-horse-index'), 10);
      if (idx !== currentHorseIndex) {
        currentHorseIndex = idx;
        activePhotoIndex = 0;
        activeVideoIndex = 0;
        renderShowcase(container);
      }
    });
  });

  // Cambio de tipo de medio (fotos / video / genealogia)
  container.querySelectorAll('.media-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMediaType = btn.getAttribute('data-media-type');
      renderShowcase(container);
    });
  });

  // Cambio de foto en miniaturas
  container.querySelectorAll('.photo-thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activePhotoIndex = parseInt(btn.getAttribute('data-photo-idx'), 10);
      renderShowcase(container);
    });
  });

  // Cambio de video en selector
  container.querySelectorAll('.video-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeVideoIndex = parseInt(btn.getAttribute('data-video-idx'), 10);
      renderShowcase(container);
    });
  });

  // Click en foto para lightbox
  const photoViewer = container.querySelector('#active-photo-viewer');
  if (photoViewer) {
    photoViewer.addEventListener('click', () => {
      const activePhoto = currentHorse.images[activePhotoIndex] || currentHorse.coverImage;
      openLightbox(activePhoto, `${currentHorse.name} - Fotografía`);
    });
  }

  // Click en genealogía para lightbox
  const pedigreeViewer = container.querySelector('#pedigree-image-viewer');
  const pedigreeFullBtn = container.querySelector('#btn-pedigree-full');
  const viewPedigreeAction = container.querySelector('[data-action="view-pedigree-full"]');

  const openPedigreeInLightbox = () => {
    openLightbox(currentHorse.genealogyImage, `Árbol Genealógico y Certificación - ${currentHorse.name}`);
  };

  if (pedigreeViewer) pedigreeViewer.addEventListener('click', openPedigreeInLightbox);
  if (pedigreeFullBtn) pedigreeFullBtn.addEventListener('click', openPedigreeInLightbox);
  if (viewPedigreeAction) {
    viewPedigreeAction.addEventListener('click', () => {
      currentMediaType = 'pedigree';
      renderShowcase(container);
    });
  }

  // Botón superior de pantalla completa
  const btnLightbox = container.querySelector('#btn-open-lightbox');
  if (btnLightbox) {
    btnLightbox.addEventListener('click', () => {
      if (currentMediaType === 'pedigree') {
        openPedigreeInLightbox();
      } else if (currentMediaType === 'photos') {
        const activePhoto = currentHorse.images[activePhotoIndex] || currentHorse.coverImage;
        openLightbox(activePhoto, `${currentHorse.name} - Fotografía`);
      } else if (currentMediaType === 'video') {
        const vid = container.querySelector('#horse-video-player');
        if (vid && vid.requestFullscreen) {
          vid.requestFullscreen();
        }
      }
    });
  }
}

function setupLightbox() {
  if (document.getElementById('horse-media-lightbox')) return;

  const lightbox = document.createElement('div');
  lightbox.id = 'horse-media-lightbox';
  lightbox.className = 'fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4 transition-all duration-300';
  lightbox.innerHTML = `
    <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
      <div class="w-full flex items-center justify-between pb-3 text-white border-b border-white/10 mb-3">
        <h4 id="lightbox-title" class="font-serif text-lg text-[#ddc295]"></h4>
        <button id="lightbox-close-btn" class="p-2 rounded-full hover:bg-white/10 text-white transition-colors" aria-label="Cerrar">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>
      <div class="relative w-full overflow-auto flex items-center justify-center rounded-xl bg-[#111317] border border-[#c8a675]/30 p-2">
        <img id="lightbox-image" src="" alt="Vista ampliada" class="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl">
      </div>
    </div>
  `;

  document.body.appendChild(lightbox);

  const closeBtn = lightbox.querySelector('#lightbox-close-btn');
  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

export function openLightbox(src, title = '') {
  const lightbox = document.getElementById('horse-media-lightbox');
  const img = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  if (!lightbox || !img) return;

  img.src = src;
  if (titleEl) titleEl.textContent = title;
  lightbox.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

export function closeLightbox() {
  const lightbox = document.getElementById('horse-media-lightbox');
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}
