import './styles.css';
import { mountDemoBar } from './components/demo-bar.js';
import { mountNavigation } from './components/navigation.js';
import { mountPlatformPortal } from './components/platform-portal.js';
import { renderHomePage } from './pages/home.js';
import { renderSolutionsPage } from './pages/solutions.js';
import { renderProjectsPage } from './pages/projects.js';
import { renderAboutPage } from './pages/about.js';

// Application Router
function router() {
  const hash = window.location.hash.replace(/^#/, '') || 'home';
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  if (hash === 'home' || hash === '') {
    appContainer.innerHTML = renderHomePage();
  } else if (hash.startsWith('solutions')) {
    appContainer.innerHTML = renderSolutionsPage();
    if (hash === 'solutions-sense') {
      const el = document.getElementById('belik-sense');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === 'solutions-conservation') {
      const el = document.getElementById('conservation-services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (hash === 'projects') {
    appContainer.innerHTML = renderProjectsPage();
  } else if (hash === 'about') {
    appContainer.innerHTML = renderAboutPage();
  } else if (hash === 'partner') {
    appContainer.innerHTML = `
      <main class="section" style="min-height: 80vh; display: flex; align-items: center;">
        <div class="container" style="max-width: 680px;">
          <span class="eyebrow">Institutional & Corporate Partnerships</span>
          <h1>Partner with BelikHub</h1>
          <p class="lead" style="margin-top: 1rem; margin-bottom: 2.5rem;">
            Mari berkolaborasi memulihkan ekosistem mata air di Kabupaten Batang bersama BUMDes Tirta dan PDAM Kabupaten Batang.
          </p>

          <form onsubmit="event.preventDefault(); alert('Terima kasih! Tim kemitraan BelikHub & PDAM Batang akan segera menghubungi Anda.'); window.location.hash = 'home';" style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="form-group">
              <label class="form-label">Nama Lengkap / Instansi</label>
              <input type="text" class="form-input" placeholder="Nama organisasi, instansi pemerintah, atau korporasi" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Kontak</label>
              <input type="email" class="form-input" placeholder="email@perusahaan.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Bentuk Minat Kemitraan</label>
              <select class="form-select">
                <option value="csr">Program Pendanaan CSR Reboisasi Sabuk Hijau</option>
                <option value="pdam">Kolaborasi Perumda Air Minum (PDAM)</option>
                <option value="desa">Adopsi Sistem Iuran untuk BUMDes Tirta Desa</option>
                <option value="riset">Riset Hidrologi & Conrad Challenge Advisory</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Pesan / Lokasi Sasaran</label>
              <textarea class="form-textarea" rows="3" placeholder="Sebutkan desa/mata air sasaran atau detail inisiatif yang ingin dijalankan..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 1rem 2rem; width: 100%;">
              Kirim Pengajuan Kemitraan
            </button>
          </form>
        </div>
      </main>
    `;
  } else {
    appContainer.innerHTML = renderHomePage();
  }

  // Scroll to top on route change unless hash is anchor on same page
  if (!hash.includes('-')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  mountDemoBar(document.getElementById('demo-bar-mount'));
  
  const nav = mountNavigation(document.getElementById('nav-mount'), (route) => {
    window.location.hash = route;
  });

  mountPlatformPortal(document.getElementById('portal-mount'));

  window.addEventListener('hashchange', () => {
    router();
    const currentHash = window.location.hash.replace(/^#/, '') || 'home';
    if (nav && nav.render) {
      nav.render(currentHash);
    }
  });

  router();
});
