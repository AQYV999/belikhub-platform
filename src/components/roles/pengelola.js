import { getStore, updateStore } from '../../store.js';

export function renderPengelolaView(activeSubTab = 'beranda') {
  const state = getStore();
  const fin = state.villageFinances;

  return `
    <div class="role-view pengelola-view container" style="padding-top: 1.5rem; padding-bottom: 5rem;">
      
      <!-- Role Sub-Tabs Header (Visible on Desktop / Web) -->
      <div class="desktop-subtabs-bar">
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'beranda' ? 'active' : ''}" data-target-subtab="beranda">
          🏠 Beranda
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'retribusi' ? 'active' : ''}" data-target-subtab="retribusi">
          💵 Retribusi
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'revitalisasi' ? 'active' : ''}" data-target-subtab="revitalisasi">
          🌿 Revitalisasi
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'profil' ? 'active' : ''}" data-target-subtab="profil">
          👤 Profil
        </button>
      </div>

      <!-- TAB 1: BERANDA -->
      <div class="subtab-panel ${activeSubTab === 'beranda' ? 'active' : ''}" id="pengelola-tab-beranda">
        <div class="apple-section-header">Ringkasan Kas & KPI BUMDes Tirta</div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 0;">
            <span style="font-size: 0.75rem; color: var(--apple-text-secondary); text-transform: uppercase; font-weight: 700;">Collection Rate Iuran</span>
            <div class="apple-stat-big" style="color: var(--apple-emerald); font-size: 2.25rem; margin: 0.35rem 0;">
              ${fin.collectionRate}<span style="font-size: 1rem;">%</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--apple-text-muted);">Target desa: >80% (Tertagih bulan ini)</span>
          </div>

          <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 0;">
            <span style="font-size: 0.75rem; color: var(--apple-text-secondary); text-transform: uppercase; font-weight: 700;">Penerimaan / Target</span>
            <div class="apple-stat-big" style="font-size: 1.75rem; margin: 0.35rem 0;">
              Rp ${(fin.totalCollected).toLocaleString('id-ID')}
            </div>
            <span style="font-size: 0.75rem; color: var(--apple-text-muted);">dari target Rp ${(fin.totalTarget).toLocaleString('id-ID')} (380 KK)</span>
          </div>

          <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 0;">
            <span style="font-size: 0.75rem; color: var(--apple-text-secondary); text-transform: uppercase; font-weight: 700;">Saldo Kas Pemeliharaan Pipa</span>
            <div class="apple-stat-big" style="font-size: 1.75rem; color: var(--apple-text-primary); margin: 0.35rem 0;">
              Rp ${(fin.maintenanceFundBalance).toLocaleString('id-ID')}
            </div>
            <span style="font-size: 0.75rem; color: var(--apple-text-muted);">Saldo Kas Cadangan darurat pipa bocor & sedimentasi</span>
          </div>
        </div>
      </div>

      <!-- TAB 2: RETRIBUSI -->
      <div class="subtab-panel ${activeSubTab === 'retribusi' ? 'active' : ''}" id="pengelola-tab-retribusi">
        <div class="apple-section-header">Pencatatan Meteran Fisik Warga</div>
        <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 1.5rem;">
          <form id="form-meter-reading" onsubmit="event.preventDefault();">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="meter-resident-select" class="form-label" style="font-size: 0.8125rem;">Kepala Keluarga / ID Sambungan</label>
              <select id="meter-resident-select" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                <option value="Bapak Slamet Raharjo (BSM-8921)">Bapak Slamet Raharjo — BSM-8921 (RT 01)</option>
                <option value="Ibu Siti Aminah (BSM-8922)">Ibu Siti Aminah — BSM-8922 (RT 01)</option>
                <option value="Bapak Joko Wahyudi (BSM-8923)">Bapak Joko Wahyudi — BSM-8923 (RT 02)</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div>
                <label for="input-meter-m3" class="form-label" style="font-size: 0.8125rem;">Angka Meter (m³)</label>
                <input type="number" id="input-meter-m3" class="form-input" value="18" min="1" max="100" style="border-radius: 10px;" required>
              </div>
              <div>
                <label for="input-pay-type" class="form-label" style="font-size: 0.8125rem;">Metode Bayar</label>
                <select id="input-pay-type" class="form-select" style="font-size: 0.875rem; border-radius: 10px;">
                  <option value="Tunai">Bayar Tunai</option>
                  <option value="Tagihan QRIS">Tagihan QRIS</option>
                </select>
              </div>
            </div>

            <button type="submit" class="apple-button-primary" style="width: 100%; padding: 0.85rem;">
              Simpan & Terbitkan Tagihan Resmi
            </button>
          </form>
        </div>

        <div class="apple-section-header">Daftar Sambungan Warga (Bismo RT 01 & 02)</div>
        <div class="apple-inset-group">
          <div class="apple-cell">
            <div>
              <strong style="font-size: 0.9375rem;">Bapak Slamet Raharjo</strong>
              <div style="font-size: 0.75rem; color: var(--apple-text-secondary);">ID: BSM-8921 • 16 m³</div>
            </div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--apple-emerald);">Lunas (QRIS)</span>
          </div>

          <div class="apple-cell">
            <div>
              <strong style="font-size: 0.9375rem;">Ibu Siti Aminah</strong>
              <div style="font-size: 0.75rem; color: var(--apple-text-secondary);">ID: BSM-8922 • 14 m³ • Tagihan Rp 20.000</div>
            </div>
            <button class="apple-button-secondary btn-cash-collect" style="padding: 0.4rem 0.85rem; font-size: 0.8125rem;" onclick="alert('Penerimaan bayar tunai Rp 20.000 dari Ibu Siti Aminah berhasil dicatat!')">
              Catat Tunai
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 3: REVITALISASI -->
      <div class="subtab-panel ${activeSubTab === 'revitalisasi' ? 'active' : ''}" id="pengelola-tab-revitalisasi">
        <div class="apple-section-header">Publikasi Progres Pekerjaan Fisik</div>
        <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 1.5rem;">
          <form id="form-conservation-progress" onsubmit="event.preventDefault();">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="progress-campaign-select" class="form-label" style="font-size: 0.8125rem;">Program Restorasi Sasaran</label>
              <select id="progress-campaign-select" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                <option value="camp_001">Restorasi Hulu Tuk Bismo (1.000 Pohon Beringin)</option>
                <option value="camp_002">Pembangunan Bak Penangkap & Bronjong Tuk Silumut</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="progress-activity-title" class="form-label" style="font-size: 0.8125rem;">Judul Aktivitas Kegiatan</label>
              <input type="text" id="progress-activity-title" class="form-input" placeholder="Contoh: Pemasangan bronjong penahan longsor..." style="border-radius: 10px;" required>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label for="progress-activity-desc" class="form-label" style="font-size: 0.8125rem;">Catatan Dokumentasi Lapangan</label>
              <textarea id="progress-activity-desc" class="form-textarea" rows="3" placeholder="Jelaskan progres pekerjaan fisik yang telah diselesaikan..." style="border-radius: 10px;" required></textarea>
            </div>

            <button type="submit" class="apple-button-primary" style="width: 100%; padding: 0.85rem;">
              📢 Publikasikan ke Timeline Donatur
            </button>
          </form>
        </div>

        <div class="apple-section-header">Dokumentasi Terbit Terkini</div>
        <div class="apple-inset-group">
          ${state.campaigns[0].timelineUpdates.map(u => `
            <div class="apple-cell" style="flex-direction: column; align-items: flex-start; gap: 0.35rem;">
              <div style="display: flex; justify-content: space-between; width: 100%;">
                <strong style="font-size: 0.9375rem;">${u.title}</strong>
                <span style="font-size: 0.75rem; color: var(--apple-text-secondary);">${u.date}</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin: 0;">${u.note}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 4: PROFIL -->
      <div class="subtab-panel ${activeSubTab === 'profil' ? 'active' : ''}" id="pengelola-tab-profil">
        <div class="apple-section-header">Profil Pengelola BUMDes Tirta</div>
        <div class="apple-inset-group">
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Nama Pengelola</span>
            <strong>Denny (Pengelola Tuk Bismo)</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Unit Usaha</span>
            <strong>BUMDes Tirta Usaha Bersama</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Wilayah Kelola</span>
            <strong>Desa Bismo & Wonomerto, Kec. Blado</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Email Akun</span>
            <strong>denny.pengelola@belikhub.id</strong>
          </div>
        </div>

        <div style="margin-top: 1.5rem; text-align: center;">
          <a href="#login" class="apple-button-secondary" style="display: inline-block; padding: 0.65rem 1.5rem; text-decoration: none;">
            🚪 Keluar / Ganti Akun
          </a>
        </div>
      </div>

    </div>
  `;
}

export function attachPengelolaListeners(container) {
  if (!container) return;

  container.querySelectorAll('.desktop-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubTab = btn.dataset.targetSubtab;
      window.dispatchEvent(new CustomEvent('belikhub:subtab-change', { detail: { subtab: targetSubTab } }));
    });
  });

  const meterForm = container.querySelector('#form-meter-reading');
  if (meterForm) {
    meterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const resident = container.querySelector('#meter-resident-select').value;
      const m3 = Number(container.querySelector('#input-meter-m3').value) || 15;
      const payType = container.querySelector('#input-pay-type').value;

      const state = getStore();
      const amount = 20000;
      const isCash = payType.includes('Tunai');

      const fin = {
        ...state.villageFinances,
        totalCollected: isCash ? state.villageFinances.totalCollected + amount : state.villageFinances.totalCollected,
        maintenanceFundBalance: isCash ? state.villageFinances.maintenanceFundBalance + amount : state.villageFinances.maintenanceFundBalance,
        collectionRate: Math.min(100, Math.round(((state.villageFinances.totalCollected + (isCash ? amount : 0)) / state.villageFinances.totalTarget) * 100))
      };

      updateStore({ villageFinances: fin });
      alert(`Pencatatan meteran berhasil untuk ${resident} (${m3} m³)!`);
    });
  }

  const progForm = container.querySelector('#form-conservation-progress');
  if (progForm) {
    progForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const campId = container.querySelector('#progress-campaign-select').value;
      const title = container.querySelector('#progress-activity-title').value.trim();
      const desc = container.querySelector('#progress-activity-desc').value.trim();

      const state = getStore();
      const campaigns = state.campaigns.map(c => {
        if (c.id === campId) {
          return {
            ...c,
            timelineUpdates: [{ date: 'Hari Ini', title, photo: '/assets/images/home-adus.webp', note: desc }, ...c.timelineUpdates]
          };
        }
        return c;
      });

      updateStore({ campaigns });
      alert('Dokumentasi progres berhasil dipublikasikan!');
      container.querySelector('#progress-activity-title').value = '';
      container.querySelector('#progress-activity-desc').value = '';
    });
  }
}
