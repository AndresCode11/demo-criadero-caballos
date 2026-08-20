import { coursesData, instructorsData } from './data/courses.js';
import { initAnimations } from './modules/animations.js';

let selectedCourse = coursesData[0];
let includeAccommodation = false;
let includeHorseLivery = false;

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  renderCourses();
  renderInstructors();
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

function renderCourses() {
  const container = document.getElementById('academy-courses-grid');
  if (!container) return;

  container.innerHTML = coursesData.map(course => `
    <div class="glass-panel rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#c8a675]/70 transition-all duration-500 hover:shadow-2xl">
      <div>
        <div class="relative aspect-video w-full h-60 overflow-hidden bg-[#181b22]">
          <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 block">
          <span class="absolute top-3 left-3 bg-[#1e222a]/95 border border-[#c8a675]/40 text-[#ddc295] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm shadow-md">
            ${course.badge}
          </span>
          <span class="absolute bottom-3 right-3 bg-[#1e222a]/95 text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-sm shadow-md">
            ${course.duration}
          </span>
        </div>

        <div class="p-6 sm:p-8 space-y-4">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span class="text-[#ddc295] font-semibold">${course.level}</span>
            <span>${course.instructor.split('(')[0]}</span>
          </div>

          <h3 class="font-serif text-2xl text-white font-bold">${course.title}</h3>
          <p class="text-xs text-slate-300 leading-relaxed italic">${course.tagline}</p>

          <div class="space-y-2 border-t border-slate-700/50 pt-4">
            <span class="text-[11px] uppercase tracking-wider text-[#ddc295] font-semibold block">Aspectos Destacados:</span>
            <ul class="space-y-1.5">
              ${course.features.map(f => `
                <li class="flex items-start gap-2 text-xs text-slate-300">
                  <span class="material-symbols-outlined text-[#c8a675] text-sm shrink-0">check_circle</span>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="space-y-1.5 border-t border-slate-700/50 pt-4">
            <span class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Plan de Estudios:</span>
            <ul class="space-y-1 text-xs text-slate-300">
              ${course.modules.map(m => `
                <li class="flex items-start gap-2">
                  <span class="text-[#c8a675] font-bold">•</span>
                  <span>${m}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="p-6 sm:p-8 bg-[#181b22]/90 border-t border-slate-700/60 flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase text-slate-400 block">Matrícula Completa</span>
          <span class="font-serif text-2xl font-bold text-[#c8a675]">${course.price}</span>
        </div>
        <a href="contacto.html?service=cursos&course=${encodeURIComponent(course.title)}" class="bg-[#c8a675] hover:bg-[#ddc295] text-[#1e222a] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all shadow-md">
          Reservar Plaza
        </a>
      </div>
    </div>
  `).join('');
}

function renderInstructors() {
  const container = document.getElementById('instructors-grid');
  if (!container) return;

  container.innerHTML = instructorsData.map(inst => `
    <div class="glass-panel p-6 rounded-sm space-y-4 border-t-2 border-t-[#c8a675]">
      <div class="w-12 h-12 rounded-full bg-[#c8a675]/20 border border-[#c8a675] flex items-center justify-center text-[#c8a675]">
        <span class="material-symbols-outlined">person</span>
      </div>
      <div>
        <h4 class="font-serif text-xl text-white font-bold">${inst.name}</h4>
        <span class="text-xs text-[#ddc295] font-semibold block mt-0.5">${inst.role}</span>
        <span class="text-[11px] text-slate-400 block mt-1">${inst.credentials}</span>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed border-t border-slate-700/50 pt-3">
        ${inst.bio}
      </p>
    </div>
  `).join('');
}

function setupCalculator() {
  const selectCourse = document.getElementById('calc-course');
  const checkAcc = document.getElementById('addon-accommodation');
  const checkLivery = document.getElementById('addon-horse-livery');
  const totalEl = document.getElementById('calc-course-total');
  const bookBtn = document.getElementById('btn-book-course');

  if (!selectCourse) return;

  selectCourse.innerHTML = coursesData.map(c => `
    <option value="${c.id}">${c.title} (${c.price} - ${c.duration})</option>
  `).join('');

  const updateCalculations = () => {
    selectedCourse = coursesData.find(c => c.id === selectCourse.value) || coursesData[0];
    includeAccommodation = checkAcc ? checkAcc.checked : false;
    includeHorseLivery = checkLivery ? checkLivery.checked : false;

    let total = selectedCourse.priceNum;
    if (includeAccommodation) total += 1200;
    if (includeHorseLivery) total += 600;

    if (totalEl) totalEl.innerText = `€${total.toLocaleString()}`;

    if (bookBtn) {
      let addonText = [];
      if (includeAccommodation) addonText.push('Alojamiento VIP');
      if (includeHorseLivery) addonText.push('Pupilaje Box Real');
      const addonsParam = addonText.length ? `&addons=${encodeURIComponent(addonText.join(', '))}` : '';
      bookBtn.href = `contacto.html?service=cursos&course=${encodeURIComponent(selectedCourse.title)}${addonsParam}`;
    }
  };

  selectCourse.addEventListener('change', updateCalculations);
  checkAcc?.addEventListener('change', updateCalculations);
  checkLivery?.addEventListener('change', updateCalculations);

  updateCalculations();
}
