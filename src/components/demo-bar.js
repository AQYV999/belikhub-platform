import { getStore, updateStore, resetStore, subscribeStore } from '../store.js';

export function renderDemoBar() {
  const state = getStore();
  const currentRole = state.activeRole;

  return `
    <div class="demo-bar" id="demo-bar-inner">
      <div class="demo-bar-left">
        <span class="demo-badge">Conrad Challenge Demo</span>
        <span style="opacity: 0.7; font-size: 0.75rem;" class="hide-mobile">Pilih Peran:</span>
        <div class="demo-roles">
          <button class="role-btn ${currentRole === 'warga' ? 'active' : ''}" data-role="warga">
            👨‍🌾 Warga
          </button>
          <button class="role-btn ${currentRole === 'pengelola' ? 'active' : ''}" data-role="pengelola">
            👷‍♂️ Pengelola
          </button>
          <button class="role-btn ${currentRole === 'relawan' ? 'active' : ''}" data-role="relawan">
            🤝 Relawan
          </button>
          <button class="role-btn ${currentRole === 'donatur' ? 'active' : ''}" data-role="donatur">
            💚 Donatur
          </button>
          <button class="role-btn ${currentRole === 'admin' ? 'active' : ''}" data-role="admin">
            👑 Admin
          </button>
        </div>
      </div>
      <div class="demo-bar-right">
        ${currentRole ? `<button class="role-btn" id="btn-close-role" style="background: rgba(255,255,255,0.18);">✕ Tutup Portal</button>` : ''}
        <button class="reset-btn" id="btn-reset-demo" title="Kembalikan data simulasi ke setelan awal pabrik">
          ↺ Reset Data Demo
        </button>
      </div>
    </div>
  `;
}

export function mountDemoBar(container) {
  if (!container) return;

  function update() {
    container.innerHTML = renderDemoBar();
    attachListeners();
  }

  function attachListeners() {
    const roleBtns = container.querySelectorAll('.role-btn[data-role]');
    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        updateStore({ activeRole: role });
        // dispatch custom event to open platform modal
        window.dispatchEvent(new CustomEvent('belikhub:open-role', { detail: { role } }));
      });
    });

    const closeBtn = container.querySelector('#btn-close-role');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        updateStore({ activeRole: null });
        window.dispatchEvent(new CustomEvent('belikhub:close-role'));
      });
    }

    const resetBtn = container.querySelector('#btn-reset-demo');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Kembalikan seluruh data demo ke kondisi awal?')) {
          resetStore();
          window.location.reload();
        }
      });
    }
  }

  update();
  subscribeStore(update);
}
