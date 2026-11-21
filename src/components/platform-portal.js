import { getStore, updateStore, subscribeStore } from '../store.js';
import { renderWargaView, attachWargaListeners } from './roles/warga.js';
import { renderPengelolaView, attachPengelolaListeners } from './roles/pengelola.js';
import { renderRelawanView, attachRelawanListeners } from './roles/relawan.js';
import { renderDonaturView, attachDonaturListeners } from './roles/donatur.js';
import { renderAdminView, attachAdminListeners } from './roles/admin.js';

export function renderRoleView(role) {
  switch (role) {
    case 'warga':
      return renderWargaView();
    case 'pengelola':
      return renderPengelolaView();
    case 'relawan':
      return renderRelawanView();
    case 'donatur':
      return renderDonaturView();
    case 'admin':
      return renderAdminView();
    default:
      return renderWargaView();
  }
}

export function renderPlatformPortal(role) {
  if (!role) return '';

  const roleTitles = {
    warga: '👨‍🌾 Portal Warga Desa (Pengguna Air)',
    pengelola: '👷‍♂️ Portal Pengelola (BUMDes Tirta)',
    relawan: '🤝 Portal Relawan (Patroli Konservasi)',
    donatur: '💚 Portal Donatur (Publik & CSR)',
    admin: '👑 Portal Administrator (PDAM Batang)'
  };

  return `
    <div class="platform-modal-overlay open" id="platform-modal-backdrop">
      <div class="platform-modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="modal-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-evergreen);">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <h3 style="font-size: 1.125rem;">${roleTitles[role] || 'Portal Interaktif BelikHub'}</h3>
          </div>
          <button class="close-btn" id="modal-close-btn" aria-label="Tutup Portal">✕</button>
        </div>
        <div class="modal-body" id="modal-body-content">
          ${renderRoleView(role)}
        </div>
      </div>
    </div>
  `;
}

export function mountPlatformPortal(container) {
  if (!container) return;

  function update() {
    const role = getStore().activeRole;
    if (!role) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = renderPlatformPortal(role);
    attachEventListeners(role);
  }

  function attachEventListeners(role) {
    const closeBtn = container.querySelector('#modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        updateStore({ activeRole: null });
      });
    }

    const backdrop = container.querySelector('#platform-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          updateStore({ activeRole: null });
        }
      });
    }

    const modalBody = container.querySelector('#modal-body-content');
    if (!modalBody) return;

    if (role === 'warga') attachWargaListeners(modalBody);
    else if (role === 'pengelola') attachPengelolaListeners(modalBody);
    else if (role === 'relawan') attachRelawanListeners(modalBody);
    else if (role === 'donatur') attachDonaturListeners(modalBody);
    else if (role === 'admin') attachAdminListeners(modalBody);
  }

  update();
  subscribeStore(update);

  window.addEventListener('belikhub:open-role', (e) => {
    updateStore({ activeRole: e.detail.role });
  });

  window.addEventListener('belikhub:close-role', () => {
    updateStore({ activeRole: null });
  });
}
