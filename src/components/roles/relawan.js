import { getStore, updateStore, validateIndonesiaCoordinates } from '../../store.js';

export function renderRelawanView(activeSubTab = 'mata-air') {
  const state = getStore();

  return `
    <div class="role-view relawan-view container" style="padding-top: 1.5rem; padding-bottom: 5rem;">
      
      <!-- Role Sub-Tabs Header (Visible on Desktop / Web) -->
      <div class="desktop-subtabs-bar">
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'mata-air' ? 'active' : ''}" data-target-subtab="mata-air">
          🗺️ Mata Air
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'lapor' ? 'active' : ''}" data-target-subtab="lapor">
          📷 Lapor
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'riwayat' ? 'active' : ''}" data-target-subtab="riwayat">
          ⏱️ Riwayat
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'profil' ? 'active' : ''}" data-target-subtab="profil">
          👤 Profil
        </button>
      </div>

      <!-- TAB 1: MATA AIR -->
      <div class="subtab-panel ${activeSubTab === 'mata-air' ? 'active' : ''}" id="relawan-tab-mata-air">
        <div class="apple-section-header">Peta Sebaran & Status Mata Air Lereng Dieng</div>
        <div class="apple-inset-group">
          ${state.springs.map(s => `
            <div class="apple-cell">
              <div>
                <strong style="font-size: 1rem;">${s.name}</strong>
                <div style="font-size: 0.75rem; color: var(--apple-text-secondary); margin-top: 2px;">
                  📍 ${s.village}, Kec. ${s.district} • Elevasi ${s.elevation}
                </div>
                <div style="font-size: 0.75rem; color: var(--apple-text-muted);">
                  GPS: ${s.coordinates.lat}, ${s.coordinates.lng}
                </div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 1.1rem; font-weight: 800; color: var(--apple-emerald);">${s.currentDischarge} L/s</span>
                <span style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: ${s.status === 'normal' ? 'var(--apple-emerald)' : 'var(--apple-rose)'};">
                  ● ${s.status}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 2: LAPOR -->
      <div class="subtab-panel ${activeSubTab === 'lapor' ? 'active' : ''}" id="relawan-tab-lapor">
        <div class="apple-section-header">Formulir Inspeksi Patroli Lapangan Resmi</div>
        <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 1.5rem;">
          <form id="form-relawan-inspection" onsubmit="event.preventDefault();">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="relawan-report-type" class="form-label" style="font-size: 0.8125rem;">Tipe Temuan Lapangan</label>
              <select id="relawan-report-type" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                <option value="Kebocoran Pipa Transmisi Hulu">1. Kebocoran Pipa Transmisi Hulu</option>
                <option value="Ancaman Longsor / Sedimentasi Sumber Air">2. Ancaman Longsor / Sedimentasi Sumber Air</option>
                <option value="Pencemaran Sampah / Kekeruhan Aliran">3. Pencemaran Sampah / Kekeruhan Aliran</option>
                <option value="Kegiatan Penanaman Pohon Konservasi">4. Kegiatan Penanaman Pohon Konservasi</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="relawan-severity" class="form-label" style="font-size: 0.8125rem;">Tingkat Urgensi</label>
              <select id="relawan-severity" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                <option value="mendesak">Mendesak (&lt; 24 jam)</option>
                <option value="sedang" selected>Sedang (Mingguan)</option>
                <option value="rendah">Rendah (Rutin)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" style="font-size: 0.8125rem;">Koordinat GPS Indonesia</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                <input type="number" step="0.0001" id="relawan-lat" class="form-input" value="-7.0652" style="border-radius: 10px;" required>
                <input type="number" step="0.0001" id="relawan-lng" class="form-input" value="109.8451" style="border-radius: 10px;" required>
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label for="relawan-desc" class="form-label" style="font-size: 0.8125rem;">Deskripsi Temuan Lapangan</label>
              <textarea id="relawan-desc" class="form-textarea" rows="3" placeholder="Jelaskan kondisi pipa, tebing atau debit air..." style="border-radius: 10px;" required></textarea>
            </div>

            <button type="submit" class="apple-button-primary" style="width: 100%; padding: 0.85rem;">
              🚀 Kirim Laporan Patroli Resmi
            </button>
          </form>
        </div>
      </div>

      <!-- TAB 3: RIWAYAT -->
      <div class="subtab-panel ${activeSubTab === 'riwayat' ? 'active' : ''}" id="relawan-tab-riwayat">
        <div class="apple-section-header">Riwayat Temuan & Backlog Patroli</div>
        <div class="apple-inset-group">
          ${state.reports.map(r => `
            <div class="apple-cell">
              <div>
                <strong style="font-size: 0.9375rem;">${r.title || r.categoryLabel || r.type}</strong>
                <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin: 2px 0 4px 0;">${r.description}</p>
                <span style="font-size: 0.7rem; color: var(--apple-text-muted);">
                  📍 GPS: ${(r.coordinates || r.location || {lat:-7.065, lng:109.845}).lat.toFixed(4)}, ${(r.coordinates || r.location || {lat:-7.065, lng:109.845}).lng.toFixed(4)}
                </span>
              </div>
              <span style="font-size: 0.75rem; font-weight: 700; color: ${r.severity === 'mendesak' ? 'var(--apple-rose)' : 'var(--apple-amber)'}; text-transform: uppercase;">
                ${r.severity}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 4: PROFIL -->
      <div class="subtab-panel ${activeSubTab === 'profil' ? 'active' : ''}" id="relawan-tab-profil">
        <div class="apple-section-header">Profil Relawan Konservasi</div>
        <div class="apple-inset-group">
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Nama Relawan</span>
            <strong>Rina Kartika (Relawan Batang)</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Divisi</span>
            <strong>Green Patrol Team Batang Selatan</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Wilayah Patroli</span>
            <strong>Hulu Tuk Bismo & Tuk Silumut</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Email Akun</span>
            <strong>rina.relawan@belikhub.id</strong>
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

export function attachRelawanListeners(container) {
  if (!container) return;

  container.querySelectorAll('.desktop-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubTab = btn.dataset.targetSubtab;
      window.dispatchEvent(new CustomEvent('belikhub:subtab-change', { detail: { subtab: targetSubTab } }));
    });
  });

  const form = container.querySelector('#form-relawan-inspection');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = container.querySelector('#relawan-report-type').value;
      const severity = container.querySelector('#relawan-severity').value;
      const lat = parseFloat(container.querySelector('#relawan-lat').value);
      const lng = parseFloat(container.querySelector('#relawan-lng').value);
      const desc = container.querySelector('#relawan-desc').value.trim();

      const validation = validateIndonesiaCoordinates(lat, lng);
      if (!validation.valid) {
        alert('Validasi Koordinat Gagal: ' + validation.reason);
        return;
      }

      const state = getStore();
      const newReport = {
        id: `rep_${Date.now()}`,
        source: 'relawan',
        type,
        title: type,
        description: desc,
        severity,
        coordinates: { lat, lng },
        status: 'pending',
        timestamp: new Date().toISOString(),
        submittedBy: 'Rina Kartika'
      };

      updateStore({ reports: [newReport, ...state.reports] });
      alert('Laporan patroli lapangan berhasil dikirim!');
      container.querySelector('#relawan-desc').value = '';
    });
  }
}
