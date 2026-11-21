import { getStore, updateStore } from '../../store.js';

export function renderWargaView() {
  const state = getStore();
  const spring = state.springs.find(s => s.id === 'sp_bismo') || state.springs[0];
  const user = state.currentUser;
  const currentBill = state.bills.find(b => b.period === 'November 2026') || state.bills[0];

  return `
    <div class="role-view warga-view">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="eyebrow" style="color: var(--color-evergreen);">Peran: Warga Pengguna Air Desa</span>
          <h2>Halo, ${user.name}</h2>
          <p class="text-muted">${user.village} • Sambungan Meter: <strong>${user.linkedMeterCode}</strong></p>
        </div>
        <div style="background: var(--color-beige); padding: 0.75rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          <span style="font-size: 0.75rem; color: var(--color-muted); display: block;">ID Rumah Tangga</span>
          <span style="font-weight: 600; font-size: 0.9375rem;">${user.householdId}</span>
        </div>
      </div>

      <!-- Live Telemetry Widget -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <div>
            <span class="eyebrow">Live Telemetry Widget</span>
            <h3>Sumber Air Anda: ${spring.name}</h3>
          </div>
          <span style="background: ${spring.status === 'normal' ? 'rgba(55,80,51,0.12)' : 'rgba(255,64,0,0.12)'}; color: ${spring.status === 'normal' ? 'var(--color-evergreen)' : '#CC3300'}; padding: 0.35rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">
            Status: ${spring.status}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
          <div style="background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.8125rem; color: var(--color-muted);">Debit Aliran Saat Ini</div>
            <div style="font-size: 1.75rem; font-weight: 600; color: var(--color-evergreen); margin: 0.25rem 0;">${spring.currentDischarge} L/s</div>
            <div style="font-size: 0.75rem; color: var(--color-muted);">Baseline: ${spring.baselineDischarge} L/s</div>
          </div>

          <div style="background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.8125rem; color: var(--color-muted);">Kapasitas Akuifer</div>
            <div style="font-size: 1.75rem; font-weight: 600; color: var(--color-black); margin: 0.25rem 0;">${spring.capacityPercent}%</div>
            <div style="font-size: 0.75rem; color: var(--color-muted);">Kondisi resapan optimal</div>
          </div>

          <div style="background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.8125rem; color: var(--color-muted);">Sensor Uptime</div>
            <div style="font-size: 1.75rem; font-weight: 600; color: var(--color-black); margin: 0.25rem 0;">${spring.sensorUptime}%</div>
            <div style="font-size: 0.75rem; color: var(--color-muted);">ESP32 Solar Logger Aktif</div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout: Retribution Pass & Damage Report -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        
        <!-- Digital Pass Iuran Retribusi -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <span class="eyebrow">Tagihan & Retribusi</span>
          <h3>Digital Pass Iuran</h3>
          <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
            Pemeliharaan pipa jaringan air warga Desa Bismo.
          </p>

          <div style="border: 2px dashed ${currentBill.status === 'paid' ? 'var(--color-evergreen)' : 'rgba(255,64,0,0.5)'}; border-radius: var(--radius-md); padding: 1.5rem; background: ${currentBill.status === 'paid' ? 'rgba(55,80,51,0.03)' : 'rgba(255,64,0,0.02)'}; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase;">Periode Tagihan</span>
                <div style="font-weight: 600; font-size: 1.125rem;">${currentBill.period}</div>
              </div>
              <span style="padding: 0.25rem 0.65rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; ${currentBill.status === 'paid' ? 'background: rgba(55,80,51,0.15); color: var(--color-evergreen);' : 'background: rgba(255,64,0,0.15); color: #CC3300;'}">
                ${currentBill.status === 'paid' ? '✓ LUNAS' : '● BELUM BAYAR'}
              </span>
            </div>

            <div style="margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-muted);">Pemakaian Bulanan</span>
                <div style="font-size: 0.9375rem; font-weight: 500;">${currentBill.usageM3 || 16} m³ kubikasi</div>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--color-muted);">Total Iuran</span>
                <div style="font-size: 1.375rem; font-weight: 700; color: var(--color-black);">Rp ${(currentBill.amount).toLocaleString('id-ID')}</div>
              </div>
            </div>
          </div>

          ${currentBill.status !== 'paid' ? `
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <button class="btn btn-primary" id="btn-pay-qris" style="width: 100%;">
                📱 Bayar via QRIS / Bank Desa
              </button>
            </div>
          ` : `
            <div style="background: rgba(55,80,51,0.08); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.8125rem; color: var(--color-evergreen); display: flex; justify-content: space-between; align-items: center;">
              <span>Terbayar pada ${new Date(currentBill.paidAt || Date.now()).toLocaleDateString('id-ID')}</span>
              <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="alert('Membuka Struk Digital Resmi No: STRUK-${currentBill.id}')">Lihat Struk</button>
            </div>
          `}

          <!-- Riwayat Tagihan Lampau -->
          <div style="margin-top: 2rem;">
            <div style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem;">
              Riwayat Tagihan & Struk Digital
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${state.bills.slice(1).map(b => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem;">
                  <div>
                    <div style="font-weight: 500;">${b.period}</div>
                    <span style="color: var(--color-muted); font-size: 0.75rem;">${b.paymentMethod || 'Lunas'}</span>
                  </div>
                  <span style="font-weight: 600; color: var(--color-evergreen);">Rp ${(b.amount).toLocaleString('id-ID')}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tautkan Akun Meteran -->
          <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--color-border);">
            <div style="font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.5rem;">Tautkan ID Meteran Baru</div>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="input-link-code" placeholder="6-digit Link Code (misal: BSM-77)" class="form-input" style="font-size: 0.8125rem; padding: 0.5rem 0.75rem;">
              <button class="btn btn-secondary" id="btn-link-meter" style="padding: 0.5rem 1rem; font-size: 0.8125rem;">Tautkan</button>
            </div>
          </div>
        </div>

        <!-- Formulir Lapor Kerusakan Warga -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <span class="eyebrow" style="color: #CC3300;">Warga Report</span>
          <h3>Formulir Lapor Kerusakan</h3>
          <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
            Laporkan kendala pipa bocor atau kualitas air untuk segera ditangani petugas desa.
          </p>

          <form id="form-warga-report" onsubmit="event.preventDefault();">
            <div class="form-group">
              <label class="form-label">Kategori Masalah</label>
              <select id="warga-report-category" class="form-select">
                <option value="kebocoran">Pipa Bocor / Pecah</option>
                <option value="kotor">Air Keruh / Kotor / Berbau</option>
                <option value="mati">Debit Air Mati / Tidak Mengalir</option>
                <option value="meteran">Meteran Rusak / Bocor</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Catatan Lokasi & Deskripsi</label>
              <textarea id="warga-report-desc" class="form-textarea" rows="3" placeholder="Contoh: Pipa transmisi retak di dekat jembatan sawah RT 03, air menyembur ke tebing..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Koordinat GPS</label>
              <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="warga-report-coords" class="form-input" value="-7.0655, 109.8455" readonly style="background: var(--color-beige); font-size: 0.8125rem;">
                <button type="button" class="btn btn-secondary" style="padding: 0.5rem 0.75rem; font-size: 0.75rem;" onclick="alert('GPS Akurat Terdeteksi: -7.0655, 109.8455 (Desa Bismo)')">📍 Deteksi</button>
              </div>
            </div>

            <button type="submit" id="btn-submit-warga-report" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
              Kirim Laporan Kerusakan
            </button>
          </form>

          <!-- Tracking Status Laporan Terakhir -->
          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
            <div style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem;">
              Status Laporan Anda Terkini
            </div>
            ${state.reports.slice(0, 2).map(r => `
              <div style="background: var(--color-beige); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 0.75rem; font-size: 0.8125rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <span style="font-weight: 600;">${r.categoryLabel}</span>
                  <span style="padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-size: 0.6875rem; font-weight: 600; ${r.status === 'resolved' ? 'background: rgba(55,80,51,0.15); color: var(--color-evergreen);' : r.status === 'in_progress' ? 'background: rgba(255,189,0,0.2); color: #9A6F00;' : 'background: rgba(255,64,0,0.15); color: #CC3300;'}">
                    ${r.status === 'resolved' ? '✓ Selesai' : r.status === 'in_progress' ? '⚙ Sedang Diperbaiki' : '⏳ Menunggu Verifikasi'}
                  </span>
                </div>
                <p style="color: var(--color-muted); font-size: 0.75rem;">${r.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachWargaListeners(container) {
  if (!container) return;

  const payBtn = container.querySelector('#btn-pay-qris');
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const state = getStore();
      const bills = state.bills.map(b => {
        if (b.period === 'November 2026') {
          return {
            ...b,
            status: 'paid',
            paidAt: new Date().toISOString(),
            paymentMethod: 'QRIS Rekening Desa'
          };
        }
        return b;
      });

      // Also increment village finance collected
      const fin = {
        ...state.villageFinances,
        totalCollected: state.villageFinances.totalCollected + 20000,
        maintenanceFundBalance: state.villageFinances.maintenanceFundBalance + 20000
      };

      updateStore({ bills, villageFinances: fin });
      alert('Pembayaran Rp 20.000 via QRIS Berhasil! Struk resmi telah diterbitkan.');
    });
  }

  const linkBtn = container.querySelector('#btn-link-meter');
  if (linkBtn) {
    linkBtn.addEventListener('click', () => {
      const input = container.querySelector('#input-link-code');
      if (input && input.value.trim()) {
        const currentUser = { ...getStore().currentUser, linkedMeterCode: input.value.trim().toUpperCase() };
        updateStore({ currentUser });
        alert(`Berhasil menautkan ID Meteran: ${currentUser.linkedMeterCode}`);
        input.value = '';
      }
    });
  }

  const reportForm = container.querySelector('#form-warga-report');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const catSelect = container.querySelector('#warga-report-category');
      const descInput = container.querySelector('#warga-report-desc');
      if (!descInput.value.trim()) return;

      const categoryLabels = {
        kebocoran: 'Kebocoran Pipa Transmisi Hulu',
        kotor: 'Air Keruh / Kotor / Berbau',
        mati: 'Debit Air Mati / Tidak Mengalir',
        meteran: 'Meteran Rusak / Bocor'
      };

      const newRep = {
        id: 'rep_' + Date.now(),
        reporterName: getStore().currentUser.name,
        reportType: catSelect.value,
        categoryLabel: categoryLabels[catSelect.value] || 'Laporan Masalah',
        description: descInput.value.trim(),
        coordinates: { lat: -7.0655, lng: 109.8455 },
        severity: 'mendesak',
        status: 'pending',
        photoUrl: '/assets/images/community.webp',
        createdAt: new Date().toISOString()
      };

      const reports = [newRep, ...getStore().reports];
      updateStore({ reports });
      alert('Laporan berhasil dikirim ke Pengelola & Tim Relawan Patroli!');
      descInput.value = '';
    });
  }
}
