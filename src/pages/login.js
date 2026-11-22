import { getStore, updateStore } from '../store.js';

export const DEMO_CREDENTIALS = {
  warga: {
    email: 'warga.bismo@belikhub.id',
    name: 'Pak Budi Santoso',
    roleLabel: 'Warga Desa Bismo',
    title: '👨‍🌾 Warga'
  },
  pengelola: {
    email: 'denny.pengelola@belikhub.id',
    name: 'Denny (Pengelola Tuk Bismo)',
    roleLabel: 'Pengelola BUMDes Tirta',
    title: '👷‍♂️ Pengelola'
  },
  relawan: {
    email: 'rina.relawan@belikhub.id',
    name: 'Rina Kartika (Relawan Batang)',
    roleLabel: 'Relawan Green Patrol',
    title: '🤝 Relawan'
  },
  donatur: {
    email: 'donatur.batang@belikhub.id',
    name: 'PT Tirta Lestari Nusantara',
    roleLabel: 'Mitra CSR Konservasi',
    title: '💚 Donatur'
  },
  admin: {
    email: 'admin@belikhub.id',
    name: 'Admin BelikHub (PDAM Batang)',
    roleLabel: 'Super Administrator',
    title: '👑 Admin'
  }
};

export function renderLoginPage() {
  const defaultUser = DEMO_CREDENTIALS.warga;

  return `
    <div class="login-page-container">
      <div class="login-wrapper">
        
        <!-- Logo Brand -->
        <div class="login-brand-header">
          <div class="login-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <h1 class="login-app-title">BelikHub</h1>
          <p class="login-app-subtitle">Platform Konservasi & Retribusi Mata Air Komunitas</p>
        </div>

        <!-- Main Login Card -->
        <div class="login-card">
          <div class="login-card-header">
            <h2 class="login-card-title">Masuk ke Akun</h2>
            <span class="login-badge-pill">Login</span>
          </div>

          <form id="form-auth-login" onsubmit="event.preventDefault();">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label for="login-email" class="login-form-label">Alamat Email</label>
              <input type="email" id="login-email" class="login-form-input" value="${defaultUser.email}" required placeholder="email@belikhub.id">
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label for="login-password" class="login-form-label">Kata Sandi</label>
              <input type="password" id="login-password" class="login-form-input" value="••••••••••" required placeholder="Masukkan kata sandi">
            </div>

            <button type="submit" id="btn-submit-login" class="login-submit-button">
              Masuk Sekarang
            </button>
          </form>

          <div class="login-register-prompt">
            Belum memiliki akun? <a href="#partner" class="login-link-accent">Daftar sekarang</a>
          </div>
        </div>

        <!-- Demo Mode Box (Matches belikhub-app.vercel.app/login amber card) -->
        <div class="login-demo-box">
          <div class="demo-box-header">
            <span class="demo-box-icon">⚡</span>
            <div>
              <h3 class="demo-box-title">Eksplorasi Tanpa Akun Live</h3>
              <p class="demo-box-desc">
                Coba langsung seluruh alur 5 peran (Warga, Pengelola, Relawan, Donatur, Admin) dengan data simulasi lokal terisolasi.
              </p>
            </div>
          </div>

          <!-- Quick 1-Click Role Switcher Pills -->
          <div class="demo-role-quick-grid">
            <button type="button" class="btn-demo-quick-role active" data-role="warga">
              👨‍🌾 Warga
            </button>
            <button type="button" class="btn-demo-quick-role" data-role="pengelola">
              👷‍♂️ Pengelola
            </button>
            <button type="button" class="btn-demo-quick-role" data-role="relawan">
              🤝 Relawan
            </button>
            <button type="button" class="btn-demo-quick-role" data-role="donatur">
              💚 Donatur
            </button>
            <button type="button" class="btn-demo-quick-role" data-role="admin">
              👑 Admin
            </button>
          </div>

          <button type="button" id="btn-enter-demo-mode" class="demo-explore-button">
            ✨ Coba Mode Demo (5 Role)
          </button>
        </div>

      </div>
    </div>
  `;
}

export function attachLoginListeners(container) {
  if (!container) return;

  let selectedRole = 'warga';
  const emailInput = container.querySelector('#login-email');
  const quickRoleButtons = container.querySelectorAll('.btn-demo-quick-role');

  quickRoleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      quickRoleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;

      const user = DEMO_CREDENTIALS[selectedRole];
      if (user && emailInput) {
        emailInput.value = user.email;
      }
    });
  });

  function performLogin(role) {
    const cred = DEMO_CREDENTIALS[role] || DEMO_CREDENTIALS.warga;
    updateStore({
      activeRole: role,
      currentUser: {
        id: `usr_${role}_01`,
        name: cred.name,
        role: role,
        village: 'Desa Bismo, Kec. Blado, Kab. Batang'
      }
    });
    window.location.hash = role;
  }

  const form = container.querySelector('#form-auth-login');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      
      // Determine role from entered email
      let matchedRole = selectedRole;
      Object.keys(DEMO_CREDENTIALS).forEach(r => {
        if (DEMO_CREDENTIALS[r].email.toLowerCase() === email) {
          matchedRole = r;
        }
      });

      performLogin(matchedRole);
    });
  }

  const demoButton = container.querySelector('#btn-enter-demo-mode');
  if (demoButton) {
    demoButton.addEventListener('click', () => {
      performLogin(selectedRole);
    });
  }
}
