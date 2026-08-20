import { coursesData } from '../data/courses.js';

export function initCourses() {
  const container = document.getElementById('courses-grid');
  if (!container) return;

  container.innerHTML = coursesData.map(c => `
    <div class="bg-[#2b323f]/80 backdrop-blur-md border border-[#c8a675]/25 hover:border-[#c8a675]/70 rounded-sm p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs uppercase tracking-widest text-[#ddc295] font-semibold">${c.level}</span>
          <span class="text-xs text-slate-400">${c.duration}</span>
        </div>

        <h3 class="font-serif text-2xl text-white mb-2">${c.title}</h3>
        <p class="text-xs text-slate-400 italic mb-6">Instructor: ${c.instructor}</p>

        <ul class="space-y-3 mb-8">
          ${c.features.map(f => `
            <li class="flex items-start gap-3 text-xs text-slate-300">
              <span class="material-symbols-outlined text-[#c8a675] text-sm shrink-0">check</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="border-t border-slate-700/60 pt-6 flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase text-slate-400 block">Matrícula</span>
          <span class="font-serif text-2xl font-bold text-[#c8a675]">${c.price}</span>
        </div>
        <a href="contacto.html?service=cursos&course=${encodeURIComponent(c.title)}" class="bg-[#c8a675] hover:bg-[#ddc295] text-[#1e222a] font-semibold text-xs uppercase tracking-widest px-5 py-3 rounded-sm transition-all shadow-md">
          Reservar Plaza
        </a>
      </div>
    </div>
  `).join('');
}
