import { getStore, updateStore } from '../store.js';

export function renderRoleLoginModal() {
  const currentRole = getStore().activeRole || 'warga';

  const roleDefinitions = [
    {
      id: 'warga',
      title: 'Warga Desa',
      icon: '👨‍🌾',
      badge: 'Pengguna Air',
      badgeColor: 'emerald',
      desc: 'Lihat telemetri debit Tuk Bismo real-time, bayar iuran retribusi QRIS Rp 20.000/KK, dan lapor kerusakan pipa.',
      action: 'Masuk sebagai Warga'
    },
    {
      id: 'pengelola',
      title: 'Pengelola BUMDes',
      icon: '👷‍♂️',
      badge: 'BUMDes Tirta',
      badgeColor: 'blue',
      desc: 'Pantau target kas desa, collection rate 85%, catat meteran kubikasi warga, dan publikasi progres konservasi.',
      action: 'Masuk sebagai Pengelola'
    },
    {
      id: 'relawan',
      title: 'Relawan Patroli',
      icon: '🤝',
      badge: 'Green Patrol Team',
      badgeColor: 'amber',
      desc: 'Inspeksi fisik hulu mata air lereng Dieng, validasi titik erosi dengan GPS Indonesia, dan upload foto patroli.',
      action: 'Masuk sebagai Relawan'
    },
    {
      id: 'donatur',
      title: 'Donatur & CSR',
      icon: '💚',
      badge: 'Mitra Restorasi',
      badgeColor: 'emerald',
      desc: 'Dukung program adopsi pohon hulu Tuk Bismo & Silumut, kalkulator donasi QRIS, dan unduh E-Sertifikat hijau.',
      action: 'Masuk sebagai Donatur'
    },
    {
      id: 'admin',
      title: 'Super Admin PDAM',
      icon: '👑',
      badge: 'PDAM Batang',
      badgeColor: 'purple',
      desc: 'Macro agregator 4 mata air Kabupaten Batang (63.2 L/s), antrean verifikasi 3 jalur, dan kalibrasi sensor IoT.',
      action: 'Masuk sebagai Admin'
    }
  ];

  return `
    <div class="role-login-modal-overlay" id="role-login-overlay">
      <div class="role-login-modal" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
        
        <!-- Header Modal -->
        <div class="login-modal-header">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
            <span class="pulsing-dot emerald"></span>
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-emerald);">
              Gerbang Otoritas BelikHub
            </span>
          </div>
          <h2 id="login-modal-title" style="font-size: clamp(1.35rem, 3vw, 1.75rem); font-weight: 800; letter-spacing: -0.025em; color: var(--apple-text-primary); margin: 0;">
            Pilih Peran Masuk
          </h2>
          <p style="font-size: 0.875rem; color: var(--apple-text-secondary); margin-top: 0.25rem;">
            Pilih hak akses portal untuk mengelola, memantau, atau berpartisipasi dalam konservasi mata air.
          </p>
          <button class="login-modal-close" id="btn-close-role-modal" aria-label="Tutup">✕</button>
        </div>

        <!-- Role Grid Cards -->
        <div class="login-roles-grid">
          ${roleDefinitions.map(role => `
            <div class="login-role-card ${currentRole === role.id ? 'active' : ''}" data-role-id="${role.id}">
              <div class="login-role-icon">${role.icon}</div>
              <div class="login-role-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--apple-text-primary); margin: 0;">
                    ${role.title}
                  </h3>
                  <span class="role-badge ${role.badgeColor}">${role.badge}</span>
                </div>
                <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); line-height: 1.45; margin: 0 0 0.85rem 0;">
                  ${role.desc}
                </p>
                <button class="apple-button-primary btn-select-role" data-target-role="${role.id}" style="width: 100%; padding: 0.55rem; font-size: 0.8125rem;">
                  ${role.action} →
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Footer Info -->
        <div class="login-modal-footer">
          <span>Mode Demo Conrad Challenge • Perpindahan peran tanpa kata sandi</span>
        </div>

      </div>
    </div>
  `;
}

export function mountRoleLoginModal(container, onRoleSelected) {
  if (!container) return;

  function open() {
    container.innerHTML = renderRoleLoginModal();
    attachListeners();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    container.innerHTML = '';
    document.body.style.overflow = '';
  }

  function attachListeners() {
    const closeBtn = container.querySelector('#btn-close-role-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    const overlay = container.querySelector('#role-login-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
    }

    // Role select buttons
    container.querySelectorAll('.btn-select-role, .login-role-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const role = btn.dataset.targetRole || btn.dataset.roleId;
        if (role) {
          updateStore({ activeRole: role });
          window.location.hash = role;
          if (onRoleSelected) onRoleSelected(role);
          close();
        }
      });
    });
  }

  // Global listener for opening role login modal
  window.addEventListener('belikhub:open-role-login', open);

  return { open, close };
}
