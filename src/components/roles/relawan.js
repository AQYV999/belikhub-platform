import { getStore, updateStore, validateIndonesiaCoordinates } from '../../store.js';

export function renderRelawanView() {
  const state = getStore();

  return `
    <div class="role-view relawan-view container" style="padding-top: 2rem; padding-bottom: 4rem;">
      <!-- Header Banner Role -->
      <div style="background: linear-gradient(135deg, rgba(55,80,51,0.08) 0%, rgba(253,253,247,0.6) 100%); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem 2.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span class="eyebrow" style="color: var(--color-evergreen);">Portal Relawan Lapangan • Green Patrol Team</span>
          <h1 style="font-size: clamp(1.75rem, 3vw, 2.5rem); margin-top: 0.25rem; margin-bottom: 0.5rem;">Inspeksi Fisik & Pemantauan Sabuk Hijau</h1>
          <p class="text-muted" style="font-size: 1rem;">
            Patroli Ekologis Jalur Pipa Gravitasi, Pemetaan Titik Erosi & Koordinasi PDAM Batang
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="background: #FFFFFF; padding: 0.875rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
            <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600; display: block;">Radius Patroli</span>
            <span style="font-weight: 700; color: var(--color-evergreen); font-size: 1rem;">Hulu Tuk Bismo & Silumut</span>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 2rem;">
        
        <!-- Form Inspeksi Lapangan Resmi -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <span class="eyebrow">Formulir Teknis Patroli</span>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Inspeksi & Laporan Lapangan Resmi</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Pilih 1 dari 4 tipe laporan dengan verifikasi koordinat GPS Indonesia & foto bukti.
          </p>

          <form id="form-relawan-inspection" onsubmit="event.preventDefault();">
            <div class="form-group">
              <label for="relawan-report-type" class="form-label">Tipe Laporan Lapangan Resmi</label>
              <select id="relawan-report-type" class="form-select">
                <option value="Kebocoran Pipa Transmisi Hulu">1. Kebocoran Pipa Transmisi Hulu</option>
                <option value="Ancaman Longsor / Sedimentasi Sumber Air">2. Ancaman Longsor / Sedimentasi Sumber Air</option>
                <option value="Pencemaran Sampah / Kekeruhan Aliran">3. Pencemaran Sampah / Kekeruhan Aliran</option>
                <option value="Kegiatan Penanaman Pohon Konservasi">4. Kegiatan Penanaman Pohon Konservasi</option>
              </select>
            </div>

            <div class="form-group">
              <label for="relawan-severity" class="form-label">Tingkat Urgensi Temuan</label>
              <select id="relawan-severity" class="form-select">
                <option value="mendesak">Mendesak (Risiko debit terputus < 24 jam)</option>
                <option value="sedang" selected>Sedang (Jadwal perbaikan reguler mingguan)</option>
                <option value="rendah">Rendah (Pemantauan rutin vegetasi)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Koordinat GPS Lapangan (Wilayah Indonesia)</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <label for="relawan-lat" style="font-size: 0.75rem; color: var(--color-muted); display: block; margin-bottom: 0.2rem;">Latitude (-11.5 s/d 6.5)</label>
                  <input type="number" step="0.0001" id="relawan-lat" class="form-input" value="-7.0652" required>
                </div>
                <div>
                  <label for="relawan-lng" style="font-size: 0.75rem; color: var(--color-muted); display: block; margin-bottom: 0.2rem;">Longitude (94.0 s/d 141.5)</label>
                  <input type="number" step="0.0001" id="relawan-lng" class="form-input" value="109.8451" required>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="relawan-desc" class="form-label">Deskripsi Teknis Temuan Lapangan</label>
              <textarea id="relawan-desc" class="form-textarea" rows="3" placeholder="Contoh: Dinding tebing penahan bak bronjong Tuk Silumut tergerus hujan deras sepanjang 4 meter, butuh penanganan kawat bronjong tambahan..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Unggah Foto Bukti Patroli</label>
              <input type="file" id="relawan-photo" class="form-input" accept="image/*" style="font-size: 0.8125rem;">
            </div>

            <button type="submit" id="btn-submit-relawan" class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.875rem;">
              🚀 Kirim Laporan Resmi Patroli
            </button>
          </form>
        </div>

        <!-- Daftar Tugas & Riwayat Patroli -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="eyebrow" style="color: var(--color-evergreen);">Daftar Tugas & Riwayat Patroli</span>
            <span style="font-size: 0.75rem; background: var(--color-beige); padding: 0.25rem 0.6rem; border-radius: var(--radius-full); font-weight: 700;">
              ${state.reports.length} Laporan Masuk
            </span>
          </div>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Backlog Laporan Lapangan</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Daftar temuan warga dan relawan yang menunggu tindakan teknis atau verifikasi di lapangan.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${state.reports.map(r => `
              <div style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; background: var(--color-beige);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                  <div>
                    <strong style="font-size: 0.9375rem; display: block;">${r.categoryLabel || r.reportType}</strong>
                    <span style="font-size: 0.75rem; color: var(--color-muted);">Pelapor: <strong>${r.reporterName}</strong></span>
                  </div>
                  <span style="padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; ${r.severity === 'mendesak' ? 'background: rgba(255,64,0,0.15); color: #CC3300;' : 'background: rgba(255,189,0,0.25); color: #9A6F00;'}">
                    Urgensi: ${r.severity}
                  </span>
                </div>

                <p style="font-size: 0.8125rem; color: var(--color-charcoal); line-height: 1.5; margin-bottom: 0.75rem;">
                  ${r.description}
                </p>

                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--color-muted); border-top: 1px solid var(--color-border); padding-top: 0.6rem;">
                  <span>📍 GPS: ${r.coordinates ? `${r.coordinates.lat}, ${r.coordinates.lng}` : '-'}</span>
                  <span style="font-weight: 700; color: ${r.status === 'resolved' ? 'var(--color-evergreen)' : r.status === 'in_progress' ? '#9A6F00' : '#CC3300'};">
                    ${r.status === 'resolved' ? '✓ Selesai' : r.status === 'in_progress' ? '⚙ Sedang Dikerjakan' : '⏳ Menunggu Verifikasi'}
                  </span>
                </div>
              </div>
            `).join('')}
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

      // Validate Indonesia GPS boundaries (-11.5 s/d 6.5, 94.0 s/d 141.5)
      if (!validateIndonesiaCoordinates(lat, lng)) {
        alert('Koordinat GPS tidak valid! Koordinat harus berada dalam wilayah geografis Indonesia (-11.5 s/d 6.5 Latitude, 94.0 s/d 141.5 Longitude).');
        return;
      }

      if (!desc) {
        alert('Mohon isi deskripsi teknis temuan.');
        return;
      }

      const newReport = {
        id: 'rep_patrol_' + Date.now(),
        reporterName: 'Relawan Patroli Batang',
        reportType: type,
        categoryLabel: type,
        description: desc,
        coordinates: { lat, lng },
        severity,
        status: 'pending',
        photoUrl: '/assets/images/home-homes.webp',
        createdAt: new Date().toISOString()
      };

      const state = getStore();
      updateStore({ reports: [newReport, ...state.reports] });
      alert('Laporan resmi patroli berhasil diserahkan! Langsung masuk ke antrean verifikasi Admin PDAM Batang.');
      container.querySelector('#relawan-desc').value = '';
    });
  }
}
