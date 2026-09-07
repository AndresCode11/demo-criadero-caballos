import { showToast } from './modules/toasts.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  setupContactNavigation();
  parseUrlParameters();
  setupContactForm();
  setupWhatsAppSync();
  initAnimations();
});

function setupContactNavigation() {
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

function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const horse = params.get('horse');
  const course = params.get('course');
  const exp = params.get('exp');
  const addons = params.get('addons');
  const pax = params.get('pax');
  const plan = params.get('plan');
  const mod = params.get('mod');

  const serviceSelect = document.getElementById('contact-service');
  const notesTextarea = document.getElementById('contact-notes');

  if (service && serviceSelect) {
    serviceSelect.value = service;
  }

  // Cabalgata pre-fill
  if ((exp || service === 'turismo') && notesTextarea && (pax || exp)) {
    let note = `Interés en: ${decodeURIComponent(exp || 'Cabalgata Ecológica en Tabio (3 horas)')}.\nParticipantes: ${pax || 2} personas.`;
    if (horse) note += `\nPreferencia de caballo: ${horse === 'especial' ? 'Caballo Especial de Alta Escuela/Genética' : 'Caballo Básico Manso'}`;
    if (addons) note += `\nServicios gastronómicos/adicionales: ${decodeURIComponent(addons)}`;
    notesTextarea.value = note;
  }

  // Estimulación temprana pre-fill
  if (service === 'estimulacion' && notesTextarea) {
    let note = `Interés en: Estimulación Temprana con Caballos (7m - 4 años).`;
    if (plan) note += `\nFrecuencia: ${plan === '2semana' ? '2 sesiones/semana (8 clases/mes)' : '1 sesión/semana (4 clases/mes - $325.000)'}`;
    if (mod) note += `\nModalidad: ${mod === 'grupal' ? 'Grupo Reducido (2-3 niños)' : 'Atención Individual (1 a 1)'}`;
    notesTextarea.value = note;
  }

  // Chalanería pre-fill
  if (service === 'chalaneria' && notesTextarea && !notesTextarea.value) {
    notesTextarea.value = 'Interés en: Escuela de Chalanería & Formación Ecuestre. Solicito información sobre horarios, niveles y proceso de inscripción.';
  }

  // Generic course or other
  if (course && notesTextarea && !notesTextarea.value) {
    notesTextarea.value = `Interés en formación: ${decodeURIComponent(course)}`;
  }
}

function setupWhatsAppSync() {
  const serviceSelect = document.getElementById('contact-service');
  const nameInput = document.getElementById('contact-name');
  const waLink = document.getElementById('contact-whatsapp-link');

  if (!waLink) return;

  function updateLink() {
    const name = nameInput?.value.trim() || '';
    const serviceLabel = serviceSelect?.options[serviceSelect.selectedIndex]?.text || 'Servicios ecuestres';
    const text = `Hola Club Ecuestre La Chucua J.C, ${name ? `mi nombre es ${name} y ` : ''}deseo solicitar información sobre: ${serviceLabel}.`;
    waLink.href = `https://wa.me/573108529410?text=${encodeURIComponent(text)}`;
  }

  serviceSelect?.addEventListener('change', updateLink);
  nameInput?.addEventListener('input', updateLink);
}

function setupContactForm() {
  const form = document.getElementById('contact-page-form');
  const modal = document.getElementById('contact-confirmation-modal');
  const closeBtn = document.getElementById('close-contact-modal');
  const detailsContainer = document.getElementById('contact-summary-details');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const serviceSelect = document.getElementById('contact-service');
      const serviceText = serviceSelect?.options[serviceSelect.selectedIndex]?.text || '';
      const notes = document.getElementById('contact-notes')?.value.trim();

      if (!name || !email || !phone) {
        showToast('Por favor complete los campos requeridos: Nombre, Teléfono y Correo', 'error');
        return;
      }

      if (detailsContainer) {
        detailsContainer.innerHTML = `
          <div class="space-y-2">
            <p><strong class="text-[#ddc295]">Nombre / Empresa:</strong> <span class="text-white font-medium">${name}</span></p>
            <p><strong class="text-[#ddc295]">Teléfono / WhatsApp:</strong> <span class="text-white font-medium">${phone}</span></p>
            <p><strong class="text-[#ddc295]">Correo:</strong> <span class="text-white font-medium">${email}</span></p>
            <p><strong class="text-[#ddc295]">Servicio de Interés:</strong> <span class="text-white font-medium">${serviceText}</span></p>
            ${notes ? `<p class="pt-2 border-t border-slate-700/80"><strong class="text-[#ddc295] block mb-1">Mensaje:</strong> <span class="text-slate-200 whitespace-pre-line">${notes}</span></p>` : ''}
          </div>
        `;
      }

      if (modal) modal.classList.remove('hidden');
      form.reset();
      showToast('¡Mensaje enviado con éxito! Nos comunicaremos contigo pronto.');
    });
  }
}
