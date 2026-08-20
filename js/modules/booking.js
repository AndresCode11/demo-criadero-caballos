import { showToast } from './toasts.js';

export function initBooking() {
  const form = document.getElementById('vip-inquiry-form');
  const modal = document.getElementById('booking-confirmation-modal');
  const closeBtn = document.getElementById('close-booking-modal');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('inquiry-name').value;
      const email = document.getElementById('inquiry-email').value;
      const phone = document.getElementById('inquiry-phone').value;
      const service = document.getElementById('inquiry-service').value;
      const date = document.getElementById('inquiry-date').value;
      const notes = document.getElementById('inquiry-notes').value;

      if (!name || !email) {
        showToast('Por favor ingrese su nombre y correo electrónico', 'error');
        return;
      }

      // Populate confirmation modal
      const detailsContainer = document.getElementById('booking-summary-details');
      if (detailsContainer) {
        detailsContainer.innerHTML = `
          <div class="space-y-2 text-sm text-[#d0c5af]">
            <p><strong class="text-[#e2e2e8]">Cliente:</strong> ${name}</p>
            <p><strong class="text-[#e2e2e8]">Contacto:</strong> ${email} ${phone ? `| ${phone}` : ''}</p>
            <p><strong class="text-[#e2e2e8]">Servicio:</strong> ${service.toUpperCase()}</p>
            ${date ? `<p><strong class="text-[#e2e2e8]">Fecha Estimada:</strong> ${date}</p>` : ''}
            ${notes ? `<p><strong class="text-[#e2e2e8]">Detalles / Notas:</strong> ${notes}</p>` : ''}
          </div>
        `;
      }

      if (modal) modal.classList.remove('hidden');
      form.reset();
      showToast('Solicitud privada enviada exitosamente a la conserjería');
    });
  }
}
