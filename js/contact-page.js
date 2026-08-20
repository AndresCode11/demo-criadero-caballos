import { showToast } from './modules/toasts.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  setupContactNavigation();
  parseUrlParameters();
  setupContactForm();
  initAnimations();
});

function setupContactNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const horse = params.get('horse');
  const course = params.get('course');
  const exp = params.get('exp');
  const adults = params.get('adults');
  const children = params.get('children');
  const addons = params.get('addons');

  const serviceSelect = document.getElementById('contact-service');
  const horseSelect = document.getElementById('contact-horse');
  const notesTextarea = document.getElementById('contact-notes');

  if (service && serviceSelect) {
    serviceSelect.value = service;
  }

  if (horse && horseSelect) {
    horseSelect.value = horse;
  }

  if (course && notesTextarea) {
    let note = `Interés en matrícula del curso: ${decodeURIComponent(course)}`;
    if (addons) note += `\nServicios adicionales solicitados: ${decodeURIComponent(addons)}`;
    notesTextarea.value = note;
  }

  if (exp && notesTextarea) {
    notesTextarea.value = `Reserva de Cabalgata / Experiencia: ${decodeURIComponent(exp)}\nParticipantes: ${adults || 2} Adultos, ${children || 0} Niños.`;
  }
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

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const country = document.getElementById('contact-country').value.trim();
      const service = document.getElementById('contact-service').value;
      const horse = document.getElementById('contact-horse').value;
      const date = document.getElementById('contact-date').value;
      const notes = document.getElementById('contact-notes').value.trim();

      if (!name || !email || !phone) {
        showToast('Por favor complete los campos obligatorios (*)', 'error');
        return;
      }

      if (detailsContainer) {
        detailsContainer.innerHTML = `
          <p><strong class="text-white">Titular:</strong> ${name}</p>
          <p><strong class="text-white">Correo:</strong> ${email}</p>
          <p><strong class="text-white">Teléfono:</strong> ${phone}</p>
          ${country ? `<p><strong class="text-white">País:</strong> ${country}</p>` : ''}
          <p><strong class="text-white">Área:</strong> ${service.toUpperCase()}</p>
          ${horse !== 'general' ? `<p><strong class="text-white">Semental de Interés:</strong> ${horse.toUpperCase()}</p>` : ''}
          ${date ? `<p><strong class="text-white">Fecha Solicitada:</strong> ${date}</p>` : ''}
          ${notes ? `<p><strong class="text-white">Notas:</strong> ${notes}</p>` : ''}
        `;
      }

      if (modal) modal.classList.remove('hidden');
      form.reset();
      showToast('Solicitud enviada con éxito a la conserjería');
    });
  }
}
