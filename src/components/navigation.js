export function renderNavigation(currentRoute = 'home') {
  return `
    <header class="main-header">
      <div class="container nav-container">
        <a href="#home" class="nav-logo" data-route="home">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-evergreen);">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
          <span>BelikHub</span>
        </a>

        <nav>
          <ul class="nav-links">
            <li>
              <a href="#home" class="nav-link ${currentRoute === 'home' ? 'active' : ''}" data-route="home">Home</a>
            </li>
            <li class="nav-item-dropdown">
              <a href="#solutions" class="nav-link ${currentRoute.startsWith('solutions') ? 'active' : ''}" data-route="solutions">
                Solutions ▾
              </a>
              <div class="nav-dropdown-menu">
                <a href="#solutions-sense" class="dropdown-item" data-route="solutions-sense">
                  <div class="dropdown-item-title">Belik Sense</div>
                  <div class="dropdown-item-desc">Pemantauan debit offline & satelit Sentinel-2</div>
                </a>
                <a href="#solutions-conservation" class="dropdown-item" data-route="solutions-conservation">
                  <div class="dropdown-item-title">Conservation Services</div>
                  <div class="dropdown-item-desc">Restorasi bentang alam & tata kelola retribusi</div>
                </a>
              </div>
            </li>
            <li>
              <a href="#projects" class="nav-link ${currentRoute === 'projects' ? 'active' : ''}" data-route="projects">Projects</a>
            </li>
            <li>
              <a href="#about" class="nav-link ${currentRoute === 'about' ? 'active' : ''}" data-route="about">About</a>
            </li>
          </ul>
        </nav>

        <div class="nav-cta">
          <button class="btn btn-secondary" id="nav-btn-open-portal" style="padding: 0.6rem 1.1rem; font-size: 0.8125rem;">
            ⚡ Buka Portal Demo
          </button>
          <a href="#partner" class="btn btn-primary" data-route="partner" style="padding: 0.6rem 1.25rem; font-size: 0.8125rem;">
            Partner with us
          </a>
        </div>
      </div>
    </header>
  `;
}

export function mountNavigation(container, onNavigate) {
  if (!container) return;

  function render(route) {
    container.innerHTML = renderNavigation(route);
    attachListeners();
  }

  function attachListeners() {
    container.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        const route = link.getAttribute('data-route');
        if (onNavigate) {
          onNavigate(route);
        }
      });
    });

    const openPortalBtn = container.querySelector('#nav-btn-open-portal');
    if (openPortalBtn) {
      openPortalBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('belikhub:open-role', { detail: { role: 'warga' } }));
      });
    }
  }

  render('home');
  return { render };
}
