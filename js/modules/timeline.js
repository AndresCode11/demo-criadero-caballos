import { timelineData } from '../data/timeline.js';

export function initTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = `
    <div class="relative border-l border-[#c8a675]/30 ml-4 md:ml-32 space-y-12 py-6">
      ${timelineData.map((item) => `
        <div class="relative pl-8 md:pl-12 group">
          <!-- Dot -->
          <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1e222a] border-2 border-[#c8a675] group-hover:bg-[#ddc295] transition-colors shadow-lg"></div>
          
          <!-- Year Badge -->
          <span class="inline-block bg-[#2b323f] border border-[#c8a675]/40 text-[#ddc295] font-serif font-bold text-sm px-3 py-1 rounded-sm mb-2">
            ${item.year}
          </span>

          <h4 class="font-serif text-xl md:text-2xl text-white group-hover:text-[#ddc295] transition-colors mb-2">
            ${item.title}
          </h4>

          <p class="text-sm text-slate-300 leading-relaxed max-w-2xl">
            ${item.description}
          </p>
        </div>
      `).join('')}
    </div>
  `;
}
