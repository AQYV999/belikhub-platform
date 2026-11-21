import { getStore, updateStore, validateIndonesiaCoordinates } from '../../store.js';

export function renderRelawanView() {
  const state = getStore();

  return `
    <div class="role-view relawan-view container" style="padding-top: 1.5rem; padding-bottom: 4rem; max-width: 960px;">
      
      <!-- Apple Health Top Header -->
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="pulsing-dot emerald"></span>
          <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-emerald);">
            Green Patrol Team • Hulu Tuk Bismo & Silumut
          </span>
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; margin: 0; color: var(--apple-text-primary);">
          Patroli Ekologis
        </h1>
        <p style="font-size: 0.9375rem; color: var(--apple-text-secondary); margin-top: 0.25rem;">
          Inspeksi Fisik Jalur Pipa Gravitasi, Erosi Lereng & Pemetaan Lapangan Batang
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 1.5rem;">
        
        <!-- Column 1: Form Laporan Lapangan Resmi -->
        <div>
          <div class="apple-section-header">Formulir Teknis Patroli</div>
          <div class="apple-inset-group">
            <form id="form-relawan-inspection" onsubmit="event.preventDefault();" style="padding: 1.25rem 1.5rem;">
              <div style="font-size: 0.875rem; color: var(--apple-text-secondary); margin-bottom: 1.25rem; line-height: 1.45;">
                Pilih kategori laporan temuan dengan verifikasi koordinat GPS Indonesia & unggah bukti foto lapangan.
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="relawan-report-type" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Tipe Laporan Lapangan Resmi
                </label>
                <select id="relawan-report-type" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                  <option value="Kebocoran Pipa Transmisi Hulu">1. Kebocoran Pipa Transmisi Hulu</option>
                  <option value="Ancaman Longsor / Sedimentasi Sumber Air">2. Ancaman Longsor / Sedimentasi Sumber Air</option>
                  <option value="Pencemaran Sampah / Kekeruhan Aliran">3. Pencemaran Sampah / Kekeruhan Aliran</option>
                  <option value="Kegiatan Penanaman Pohon Konservasi">4. Kegiatan Penanaman Pohon Konservasi</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="relawan-severity" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Tingkat Urgensi Temuan
                </label>
                <select id="relawan-severity" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                  <option value="mendesak">Mendesak (Risiko debit terputus &lt; 24 jam)</option>
                  <option value="sedang" selected>Sedang (Jadwal perbaikan mingguan)</option>
                  <option value="rendah">Rendah (Pemantauan rutin vegetasi)</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Koordinat GPS Lapangan (Indonesia)
                </label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <div>
                    <label for="relawan-lat" style="font-size: 0.75rem; color: var(--apple-text-tertiary); display: block; margin-bottom: 0.2rem;">Latitude (-11.5 s/d 6.5)</label>
                    <input type="number" step="0.0001" id="relawan-lat" class="form-input" value="-7.0652" style="border-radius: 10px; font-variant-numeric: tabular-nums;" required>
                  </div>
                  <div>
                    <label for="relawan-lng" style="font-size: 0.75rem; color: var(--apple-text-tertiary); display: block; margin-bottom: 0.2rem;">Longitude (94.0 s/d 141.5)</label>
                    <input type="number" step="0.0001" id="relawan-lng" class="form-input" value="109.8451" style="border-radius: 10px; font-variant-numeric: tabular-nums;" required>
                  </div>
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="relawan-desc" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Deskripsi Temuan Lapangan
                </label>
                <textarea id="relawan-desc" class="form-textarea" rows="3" placeholder="Contoh: Dinding tebing penahan bronjong Tuk Silumut tergerus hujan deras sepanjang 4 meter..." style="border-radius: 10px;" required></textarea>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Foto Bukti Patroli
                </label>
                <input type="file" id="relawan-photo" class="form-input" accept="image/*" style="font-size: 0.8125rem; border-radius: 10px;">
              </div>

              <button type="submit" id="btn-submit-relawan" class="apple-button-primary" style="width: 100%;">
                Kirim Laporan Resmi Patroli
              </button>
            </form>
          </div>
        </div>

        <!-- Column 2: Backlog & Riwayat Patroli -->
        <div>
          <div class="apple-section-header" style="display: flex; justify-content: space-between; align-items: baseline;">
            <span>Backlog Laporan Lapangan</span>
            <span style="font-size: 0.75rem; font-weight: 500; text-transform: none; color: var(--apple-text-secondary);">
              ${state.reports.length} Laporan Aktif
            </span>
          </div>

          <div class="apple-inset-group">
            ${state.reports.map(r => {
              const coords = r.coordinates || r.location || { lat: -7.0652, lng: 109.8451 };
              const title = r.title || r.categoryLabel || r.type || 'Laporan Patroli';
              const reporter = r.reporterName || r.submittedBy || 'Relawan / Warga';
              return `
              <div class="apple-cell" style="flex-direction: column; align-items: flex-start; gap: 0.5rem;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                  <span style="font-weight: 600; font-size: 0.9375rem; color: var(--apple-text-primary);">${title}</span>
                  <div style="display: flex; align-items: center; gap: 0.35rem;">
                    <span class="pulsing-dot ${r.severity === 'mendesak' ? 'rose' : r.severity === 'sedang' ? 'amber' : 'emerald'}"></span>
                    <span style="font-size: 0.75rem; font-weight: 600; text-transform: capitalize; color: ${r.severity === 'mendesak' ? '#E11D48' : r.severity === 'sedang' ? '#D97706' : 'var(--apple-emerald)'};">
                      ${r.severity}
                    </span>
                  </div>
                </div>

                <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); line-height: 1.45;">
                  ${r.description}
                </div>

                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; font-size: 0.75rem; color: var(--apple-text-tertiary); margin-top: 0.25rem;">
                  <span>📍 GPS: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}</span>
                  <span style="font-weight: 500; text-transform: uppercase;">Oleh: ${reporter}</span>
                </div>
              </div>
            `}).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachRelawanListeners(container) {
  if (!container) return;

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
        type: type,
        title: type,
        description: desc,
        severity: severity,
        location: { lat, lng },
        photo: '/assets/images/home-adus.webp',
        status: 'pending',
        timestamp: new Date().toISOString(),
        submittedBy: 'Relawan Patroli Bismo'
      };

      updateStore({
        reports: [newReport, ...state.reports]
      });

      alert('Laporan patroli lapangan resmi berhasil dikirim! Laporan masuk ke antrean verifikasi Admin PDAM Batang.');
      container.querySelector('#relawan-desc').value = '';
    });
  }
}
