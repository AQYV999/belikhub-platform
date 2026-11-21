import { getStore, updateStore } from '../../store.js';

export function renderAdminView() {
  const state = getStore();

  // Macro calculations across all 4 Batang springs
  const totalDischarge = state.springs.reduce((acc, s) => acc + s.currentDischarge, 0).toFixed(1);
  const totalHouseholds = state.springs.reduce((acc, s) => acc + (s.servedHouseholds || 0), 0);
  const avgUptime = (state.springs.reduce((acc, s) => acc + s.sensorUptime, 0) / state.springs.length).toFixed(1);

  const pendingDonations = state.donations.filter(d => d.status === 'pending');
  const pendingReports = state.reports.filter(r => r.status === 'pending');

  return `
    <div class="role-view admin-view">
      <div style="margin-bottom: 2rem;">
        <span class="eyebrow" style="color: var(--color-evergreen);">Peran: Admin (PDAM Batang & Super Administrator)</span>
        <h2>Pengawasan Makro & Audit Transparansi</h2>
        <p class="text-muted">Pengawasan agregat lintas mata air Kabupaten Batang dan otoritas verifikasi 3 jalur.</p>
      </div>

      <!-- Macro Dashboard se-Kabupaten Batang -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <div>
            <span class="eyebrow">Macro Dashboard</span>
            <h3>Ringkasan Agregat Lintas Mata Air Kabupaten Batang</h3>
          </div>
          <span style="font-size: 0.75rem; background: rgba(55,80,51,0.12); color: var(--color-evergreen); padding: 0.25rem 0.6rem; border-radius: var(--radius-full); font-weight: 600;">
            4 Titik Terkoneksi
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <div style="background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <span style="font-size: 0.8125rem; color: var(--color-muted);">Total Debit Gabungan</span>
            <div style="font-size: 1.75rem; font-weight: 700; color: var(--color-evergreen); margin: 0.25rem 0;">${totalDischarge} L/s</div>
            <span style="font-size: 0.75rem; color: var(--color-muted);">Pasokan hulu Dieng Utara</span>
          </div>

          <div style="background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <span style="font-size: 0.8125rem; color: var(--color-muted);">Total KK Terlayani</span>
            <div style="font-size: 1.75rem; font-weight: 700; color: var(--color-black); margin: 0.25rem 0;">${totalHouseholds} KK</div>
            <span style="font-size: 0.75rem; color: var(--color-muted);">Wilayah Kec. Blado & Batang</span>
          </div>

          <div style="background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <span style="font-size: 0.8125rem; color: var(--color-muted);">Rata-rata Uptime Sensor</span>
            <div style="font-size: 1.75rem; font-weight: 700; color: var(--color-black); margin: 0.25rem 0;">${avgUptime}%</div>
            <span style="font-size: 0.75rem; color: var(--color-muted);">Sistem telemetri stabil</span>
          </div>
        </div>

        <!-- Table 4 Mata Air -->
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-border); color: var(--color-muted);">
                <th style="padding: 0.75rem 0.5rem;">Mata Air</th>
                <th style="padding: 0.75rem 0.5rem;">Desa / Lokasi</th>
                <th style="padding: 0.75rem 0.5rem;">Debit Saat Ini</th>
                <th style="padding: 0.75rem 0.5rem;">Baseline</th>
                <th style="padding: 0.75rem 0.5rem;">Status Akuifer</th>
                <th style="padding: 0.75rem 0.5rem;">Uptime</th>
              </tr>
            </thead>
            <tbody>
              ${state.springs.map(s => `
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 0.75rem 0.5rem; font-weight: 600;">${s.name}</td>
                  <td style="padding: 0.75rem 0.5rem; color: var(--color-muted);">${s.village}, Kec. ${s.district}</td>
                  <td style="padding: 0.75rem 0.5rem; font-weight: 600; color: var(--color-evergreen);">${s.currentDischarge} L/s</td>
                  <td style="padding: 0.75rem 0.5rem; color: var(--color-muted);">${s.baselineDischarge} L/s</td>
                  <td style="padding: 0.75rem 0.5rem;">
                    <span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; ${s.status === 'normal' ? 'background: rgba(55,80,51,0.12); color: var(--color-evergreen);' : s.status === 'warning' ? 'background: rgba(255,189,0,0.15); color: #9A6F00;' : 'background: rgba(255,64,0,0.15); color: #CC3300;'}">
                      ${s.status}
                    </span>
                  </td>
                  <td style="padding: 0.75rem 0.5rem;">${s.sensorUptime}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pusat Antrean Verifikasi 3 Jalur -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2.5rem;">
        <span class="eyebrow" style="color: #CC3300;">Audit & Otoritas</span>
        <h3>Pusat Antrean Verifikasi (Verification Queue) 3 Jalur</h3>
        <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
          Jalur pengesahan transaksi, disposisi teknis laporan kerusakan, dan rekonsiliasi setoran BUMDes.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          
          <!-- Jalur 1: Donasi -->
          <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <strong style="font-size: 0.875rem;">Jalur 1: Donasi Masuk</strong>
              <span style="font-size: 0.75rem; background: #FFFFFF; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 600;">
                ${pendingDonations.length} Pending
              </span>
            </div>
            ${pendingDonations.length > 0 ? pendingDonations.map(d => `
              <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 0.875rem; margin-bottom: 0.75rem; font-size: 0.8125rem;">
                <div style="font-weight: 600;">${d.donorName}</div>
                <div style="color: var(--color-evergreen); font-weight: 700; margin: 0.2rem 0;">Rp ${(d.amount).toLocaleString('id-ID')} (${d.donorType})</div>
                <div style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.5rem;">Ref: ${d.referenceNo}</div>
                <button class="btn btn-primary btn-verify-donation" data-id="${d.id}" style="width: 100%; padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                  ✓ Sahkan Donasi
                </button>
              </div>
            `).join('') : `
              <p style="font-size: 0.8125rem; color: var(--color-muted);">Semua bukti transfer donasi telah diverifikasi.</p>
            `}
          </div>

          <!-- Jalur 2: Laporan Masalah -->
          <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <strong style="font-size: 0.875rem;">Jalur 2: Laporan Masalah</strong>
              <span style="font-size: 0.75rem; background: #FFFFFF; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 600;">
                ${pendingReports.length} Baru
              </span>
            </div>
            ${pendingReports.length > 0 ? pendingReports.map(r => `
              <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 0.875rem; margin-bottom: 0.75rem; font-size: 0.8125rem;">
                <div style="font-weight: 600; color: #CC3300;">${r.categoryLabel || r.reportType}</div>
                <p style="font-size: 0.75rem; color: var(--color-charcoal); margin: 0.25rem 0;">${r.description}</p>
                <div style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.5rem;">Pelapor: ${r.reporterName}</div>
                <button class="btn btn-primary btn-dispatch-report" data-id="${r.id}" style="width: 100%; padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                  ⚙ Disposisikan ke Teknisi
                </button>
              </div>
            `).join('') : `
              <p style="font-size: 0.8125rem; color: var(--color-muted);">Tidak ada antrean laporan kerusakan baru.</p>
            `}
          </div>

          <!-- Jalur 3: Rekonsiliasi Retribusi -->
          <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <strong style="font-size: 0.875rem;">Jalur 3: Rekonsiliasi Retribusi</strong>
              <span style="font-size: 0.75rem; background: rgba(55,80,51,0.15); color: var(--color-evergreen); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-weight: 600;">
                Valid
              </span>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 0.875rem; font-size: 0.8125rem;">
              <div style="font-weight: 600;">BUMDes Tirta Desa Bismo</div>
              <div style="color: var(--color-muted); font-size: 0.75rem; margin: 0.25rem 0;">Total Setoran Kas: Rp 6.460.000 (85%)</div>
              <button class="btn btn-secondary" style="width: 100%; padding: 0.35rem 0.75rem; font-size: 0.75rem; margin-top: 0.5rem;" onclick="alert('Audit buku kas BUMDes Tirta: Tidak ditemukan anomali setoran.')">
                🔍 Validasi Rekonsiliasi Kas
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Manajemen Master Data -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem;">
        <span class="eyebrow">Pengaturan Sistem</span>
        <h3>Manajemen Master Data Mata Air & Tarif</h3>
        <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
          Konfigurasi baseline hidrologi dan batasan tarif retribusi air desa.
        </p>

        <form id="form-master-data" onsubmit="event.preventDefault();" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Pilih Mata Air</label>
            <select id="master-spring-id" class="form-select">
              ${state.springs.map(s => `
                <option value="${s.id}">${s.name} (${s.village})</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Kapasitas Debit Awal / Baseline (L/s)</label>
            <input type="number" id="master-baseline" class="form-input" value="25.0" step="0.1">
          </div>

          <div class="form-group">
            <label class="form-label">Tarif Dasar Retribusi (Rp / KK / bulan)</label>
            <input type="number" id="master-tariff" class="form-input" value="20000" step="1000">
          </div>

          <div style="display: flex; align-items: flex-end; margin-bottom: 1.25rem;">
            <button type="submit" id="btn-save-master" class="btn btn-primary" style="width: 100%;">
              Perbarui Master Data
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function attachAdminListeners(container) {
  if (!container) return;

  const verifyDonationBtns = container.querySelectorAll('.btn-verify-donation');
  verifyDonationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const state = getStore();
      const donations = state.donations.map(d => {
        if (d.id === id) {
          return { ...d, status: 'verified' };
        }
        return d;
      });
      updateStore({ donations });
      alert(`Donasi [${id}] berhasil disahkan! Notifikasi dan sertifikat resmi diterbitkan.`);
    });
  });

  const dispatchBtns = container.querySelectorAll('.btn-dispatch-report');
  dispatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const state = getStore();
      const reports = state.reports.map(r => {
        if (r.id === id) {
          return { ...r, status: 'in_progress' };
        }
        return r;
      });
      updateStore({ reports });
      alert(`Laporan [${id}] berhasil didisposisikan ke tim teknisi perbaikan lapangan.`);
    });
  });

  const masterForm = container.querySelector('#form-master-data');
  if (masterForm) {
    masterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const springId = container.querySelector('#master-spring-id').value;
      const baseline = parseFloat(container.querySelector('#master-baseline').value) || 25.0;

      const state = getStore();
      const springs = state.springs.map(s => {
        if (s.id === springId) {
          return { ...s, baselineDischarge: baseline };
        }
        return s;
      });

      updateStore({ springs });
      alert('Master data mata air dan tarif dasar berhasil diperbarui!');
    });
  }
}
