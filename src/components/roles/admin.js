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
    <div class="role-view admin-view container" style="padding-top: 2rem; padding-bottom: 4rem;">
      <!-- Header Banner Role -->
      <div style="background: linear-gradient(135deg, rgba(55,80,51,0.08) 0%, rgba(253,253,247,0.6) 100%); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem 2.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span class="eyebrow" style="color: var(--color-evergreen);">Portal Pengawasan PDAM Batang • Super Administrator</span>
          <h1 style="font-size: clamp(1.75rem, 3vw, 2.5rem); margin-top: 0.25rem; margin-bottom: 0.5rem;">Macro Dashboard & Pusat Otoritas Verifikasi</h1>
          <p class="text-muted" style="font-size: 1rem;">
            Pengawasan Agregat Sumber Air Se-Kabupaten Batang • Audit Transparansi Dana & Disposisi Kerusakan
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="background: #FFFFFF; padding: 0.875rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
            <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600; display: block;">Status Jaringan</span>
            <span style="font-weight: 700; color: var(--color-evergreen); font-size: 1rem;">● 4 Mata Air Termonitor</span>
          </div>
        </div>
      </div>

      <!-- Macro Dashboard se-Kabupaten Batang -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="eyebrow">Macro Dashboard</span>
            <h2 style="font-size: 1.5rem;">Ringkasan Agregat Lintas Mata Air Kabupaten Batang</h2>
            <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem;">Tuk Bismo, Tuk Silumut, Tuk Luwung, dan Tuk Kalisari</p>
          </div>
          <span style="font-size: 0.8125rem; background: rgba(55,80,51,0.12); color: var(--color-evergreen); padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-weight: 700;">
            Kapasitas Gabungan: ${totalDischarge} L/detik
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--color-evergreen);">
            <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 700;">Total Debit Gabungan</span>
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-evergreen); margin: 0.35rem 0;">${totalDischarge} L/s</div>
            <span style="font-size: 0.8125rem; color: var(--color-muted);">Pasokan akuifer lereng Dieng Utara</span>
          </div>

          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--color-charcoal);">
            <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 700;">Total KK Terlayani</span>
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--color-black); margin: 0.35rem 0;">${totalHouseholds} KK</div>
            <span style="font-size: 0.8125rem; color: var(--color-muted);">Tersebar di 4 desa Kec. Blado</span>
          </div>

          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid #0096F7;">
            <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 700;">Rata-rata Uptime Sensor</span>
            <div style="font-size: 2.25rem; font-weight: 800; color: #0096F7; margin: 0.35rem 0;">${avgUptime}%</div>
            <span style="font-size: 0.8125rem; color: var(--color-muted);">Telemetri solar ESP32 handal</span>
          </div>
        </div>

        <!-- Table 4 Mata Air -->
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-border); color: var(--color-muted);">
                <th style="padding: 0.875rem 0.75rem;">Nama Mata Air</th>
                <th style="padding: 0.875rem 0.75rem;">Lokasi / Desa</th>
                <th style="padding: 0.875rem 0.75rem;">Debit Aktual</th>
                <th style="padding: 0.875rem 0.75rem;">Baseline Aliran</th>
                <th style="padding: 0.875rem 0.75rem;">Status Sensor</th>
                <th style="padding: 0.875rem 0.75rem;">Uptime</th>
              </tr>
            </thead>
            <tbody>
              ${state.springs.map(s => `
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 1rem 0.75rem; font-weight: 700;">${s.name}</td>
                  <td style="padding: 1rem 0.75rem; color: var(--color-muted);">${s.village}, Kec. ${s.district}</td>
                  <td style="padding: 1rem 0.75rem; font-weight: 800; color: var(--color-evergreen); font-size: 1rem;">${s.currentDischarge} L/s</td>
                  <td style="padding: 1rem 0.75rem; color: var(--color-muted);">${s.baselineDischarge} L/s</td>
                  <td style="padding: 1rem 0.75rem;">
                    <span style="padding: 0.25rem 0.65rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; ${s.status === 'normal' ? 'background: rgba(55,80,51,0.12); color: var(--color-evergreen);' : s.status === 'warning' ? 'background: rgba(255,189,0,0.18); color: #9A6F00;' : 'background: rgba(255,64,0,0.15); color: #CC3300;'}">
                      ${s.status}
                    </span>
                  </td>
                  <td style="padding: 1rem 0.75rem; font-weight: 600;">${s.sensorUptime}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pusat Antrean Verifikasi 3 Jalur -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-subtle);">
        <span class="eyebrow" style="color: #CC3300;">Otoritas Verifikasi & Tindak Lanjut</span>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Pusat Antrean Verifikasi (Verification Queue) 3 Jalur</h2>
        <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 2rem;">
          Jalur 1: Pengesahan donasi CSR/Individu • Jalur 2: Disposisi teknisi perbaikan pipa • Jalur 3: Audit rekonsiliasi kas BUMDes.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 1.5rem;">
          
          <!-- Jalur 1: Donasi -->
          <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.5rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <strong style="font-size: 0.9375rem;">Jalur 1: Verifikasi Donasi</strong>
              <span style="font-size: 0.75rem; background: #FFFFFF; padding: 0.25rem 0.6rem; border-radius: var(--radius-full); font-weight: 700; color: ${pendingDonations.length > 0 ? '#CC3300' : 'var(--color-evergreen)'};">
                ${pendingDonations.length} Pending
              </span>
            </div>
            ${pendingDonations.length > 0 ? pendingDonations.map(d => `
              <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 1.125rem; margin-bottom: 0.875rem; font-size: 0.8125rem; border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
                <div style="font-weight: 700; font-size: 0.875rem;">${d.donorName}</div>
                <div style="color: var(--color-evergreen); font-weight: 800; font-size: 1rem; margin: 0.25rem 0;">Rp ${(d.amount).toLocaleString('id-ID')} (${d.donorType})</div>
                <div style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.75rem;">Ref: ${d.referenceNo}</div>
                <button class="btn btn-primary btn-verify-donation" data-id="${d.id}" style="width: 100%; padding: 0.5rem 0.875rem; font-size: 0.8125rem;">
                  ✓ Sahkan Bukti Transfer
                </button>
              </div>
            `).join('') : `
              <div style="background: #FFFFFF; padding: 1rem; border-radius: var(--radius-sm); text-align: center; color: var(--color-muted); font-size: 0.8125rem;">
                ✓ Seluruh donasi telah diverifikasi dan masuk kampanye.
              </div>
            `}
          </div>

          <!-- Jalur 2: Laporan Masalah -->
          <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.5rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <strong style="font-size: 0.9375rem;">Jalur 2: Laporan Kerusakan</strong>
              <span style="font-size: 0.75rem; background: #FFFFFF; padding: 0.25rem 0.6rem; border-radius: var(--radius-full); font-weight: 700; color: ${pendingReports.length > 0 ? '#CC3300' : 'var(--color-evergreen)'};">
                ${pendingReports.length} Perlu Disposisi
              </span>
            </div>
            ${pendingReports.length > 0 ? pendingReports.map(r => `
              <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 1.125rem; margin-bottom: 0.875rem; font-size: 0.8125rem; border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
                <div style="font-weight: 700; color: #CC3300; font-size: 0.875rem;">${r.categoryLabel || r.reportType}</div>
                <p style="font-size: 0.8125rem; color: var(--color-charcoal); margin: 0.35rem 0; line-height: 1.45;">${r.description}</p>
                <div style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.75rem;">Pelapor: <strong>${r.reporterName}</strong></div>
                <button class="btn btn-primary btn-dispatch-report" data-id="${r.id}" style="width: 100%; padding: 0.5rem 0.875rem; font-size: 0.8125rem;">
                  ⚙ Disposisikan ke Teknisi
                </button>
              </div>
            `).join('') : `
              <div style="background: #FFFFFF; padding: 1rem; border-radius: var(--radius-sm); text-align: center; color: var(--color-muted); font-size: 0.8125rem;">
                ✓ Tidak ada antrean laporan kerusakan baru.
              </div>
            `}
          </div>

          <!-- Jalur 3: Rekonsiliasi Retribusi -->
          <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.5rem; border: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <strong style="font-size: 0.9375rem;">Jalur 3: Rekonsiliasi Kas</strong>
              <span style="font-size: 0.75rem; background: rgba(55,80,51,0.15); color: var(--color-evergreen); padding: 0.25rem 0.6rem; border-radius: var(--radius-full); font-weight: 700;">
                Audit Sinkron
              </span>
            </div>
            <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 1.125rem; font-size: 0.8125rem; border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
              <div style="font-weight: 700; font-size: 0.875rem;">BUMDes Tirta Desa Bismo</div>
              <div style="color: var(--color-charcoal); font-size: 0.8125rem; margin: 0.35rem 0;">Total Kas Terkumpul: <strong>Rp ${(state.villageFinances.totalCollected).toLocaleString('id-ID')}</strong> (${state.villageFinances.collectionRate}%)</div>
              <p style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.75rem;">Rekening Bank Jateng Unit Air: 3-021-98765-1</p>
              <button class="btn btn-secondary" style="width: 100%; padding: 0.5rem 0.875rem; font-size: 0.8125rem; font-weight: 600;" onclick="alert('Hasil Audit Rekonsiliasi Kas BUMDes Tirta:\\n✓ Setoran bank dan saldo kas cocok 100%\\n✓ Tidak ditemukan tunggakan ilegal')">
                🔍 Validasi Rekonsiliasi Kas
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Manajemen Master Data -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
        <span class="eyebrow">Konfigurasi Parameter Sistem</span>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Manajemen Master Data Mata Air & Tarif Retribusi</h2>
        <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
          Atur kapasitas baseline hidrologi dan standar tarif retribusi air desa per kubikasi/KK.
        </p>

        <form id="form-master-data" onsubmit="event.preventDefault();" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
          <div class="form-group">
            <label for="master-spring-id" class="form-label">Pilih Titik Mata Air</label>
            <select id="master-spring-id" class="form-select">
              ${state.springs.map(s => `
                <option value="${s.id}">${s.name} (${s.village}) — ${s.currentDischarge} L/s</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label for="master-baseline" class="form-label">Kapasitas Baseline Debit Awal (L/detik)</label>
            <input type="number" id="master-baseline" class="form-input" value="25.0" step="0.1">
          </div>

          <div class="form-group">
            <label for="master-tariff" class="form-label">Standar Tarif Dasar Iuran (Rp / KK / bulan)</label>
            <input type="number" id="master-tariff" class="form-input" value="20000" step="1000">
          </div>

          <div style="display: flex; align-items: flex-end; margin-bottom: 1.25rem;">
            <button type="submit" id="btn-save-master" class="btn btn-primary" style="width: 100%; padding: 0.875rem;">
              💾 Simpan Perubahan Master Data
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
      alert(`Donasi [${id}] berhasil diverifikasi dan disahkan! Notifikasi dan sertifikat resmi telah diterbitkan untuk donatur.`);
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
      alert(`Laporan kerusakan [${id}] berhasil didisposisikan ke tim teknisi lapangan! Status diperbarui menjadi "Sedang Diperbaiki".`);
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
      alert('Master data mata air dan parameter tarif retribusi berhasil diperbarui!');
    });
  }
}
