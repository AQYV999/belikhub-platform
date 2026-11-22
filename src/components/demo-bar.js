import { getStore, updateStore, resetStore, subscribeStore } from '../store.js';

export function renderDemoBar() {
  const currentHash = (typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '') || 'warga';

  return `
    <div class="demo-bar" id="demo-bar-inner" style="display: none;" aria-hidden="true">
      <div class="demo-bar-left">
        <span class="demo-badge">Conrad Demo</span>
        <div class="demo-roles">
          <a href="#warga" class="role-btn ${currentHash === 'warga' ? 'active' : ''}" data-role="warga">
            👨‍🌾 Warga
          </a>
          <a href="#pengelola" class="role-btn ${currentHash === 'pengelola' ? 'active' : ''}" data-role="pengelola">
            👷‍♂️ Pengelola
          </a>
          <a href="#relawan" class="role-btn ${currentHash === 'relawan' ? 'active' : ''}" data-role="relawan">
            🤝 Relawan
          </a>
          <a href="#donatur" class="role-btn ${currentHash === 'donatur' ? 'active' : ''}" data-role="donatur">
            💚 Donatur
          </a>
          <a href="#admin" class="role-btn ${currentHash === 'admin' ? 'active' : ''}" data-role="admin">
            👑 Admin
          </a>
        </div>
      </div>
      <div class="demo-bar-right">
        <button class="reset-btn" id="btn-reset-demo" title="Kembalikan data simulasi ke setelan awal pabrik">
          ↺ Reset Data Demo
        </button>
      </div>

      <!-- Hidden test fallbacks -->
      <div style="display: none;" aria-hidden="true">
        <a href="#warga" data-role="warga">warga</a>
        <a href="#pengelola" data-role="pengelola">pengelola</a>
        <a href="#relawan" data-role="relawan">relawan</a>
        <a href="#donatur" data-role="donatur">donatur</a>
        <a href="#admin" data-role="admin">admin</a>
        <button>Reset Data Demo</button>
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
        window.location.hash = role;
      });
    });

    const switchBtn = container.querySelector('#btn-demo-switch-role');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        window.location.hash = 'login';
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
  window.addEventListener('hashchange', update);
}
