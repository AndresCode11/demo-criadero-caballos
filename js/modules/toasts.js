export function showToast(message, type = 'primary') {
  const container = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-sm glass-panel border ${
    type === 'primary' ? 'border-[#c8a675]/60 text-[#ddc295]' : 'border-emerald-500/60 text-emerald-300'
  } shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0`;
  
  const icon = type === 'primary' ? 'military_tech' : 'check_circle';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-xl text-[#c8a675]">${icon}</span>
    <span class="text-sm font-medium text-[#f1f5f9]">${message}</span>
  `;
  
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });
  
  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  c.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none';
  document.body.appendChild(c);
  return c;
}
