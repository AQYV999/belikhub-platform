import { getStore, updateStore } from '../../store.js';

export function renderWargaView() {
  const state = getStore();
  const spring = state.springs.find(s => s.id === 'sp_bismo') || state.springs[0];
  const user = state.currentUser;
  const currentBill = state.bills.find(b => b.period === 'November 2026') || state.bills[0];

  return `
    <div class="role-view warga-view container" style="padding-top: 1.5rem; padding-bottom: 4rem;">
      <!-- Apple Health View Header -->
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="eyebrow" style="margin-bottom: 0;">Portal Warga Desa</span>
          <span style="color: var(--apple-text-muted);">•</span>
          <span style="font-size: 0.8125rem; color: var(--apple-text-secondary);">${user.village}</span>
        </div>
        <h1 style="font-size: clamp(2rem, 3.5vw, 2.75rem); letter-spacing: -0.03em;">${user.name}</h1>
        <p class="text-muted" style="margin-top: 0.25rem;">ID Sambungan: <strong>${user.linkedMeterCode}</strong> • Kartu Keluarga: <strong>${user.householdId}</strong></p>
      </div>

      <!-- Apple Health Big Metric Hero Widget (Tuk Bismo Discharge) -->
      <div class="apple-inset-group" style="padding: 2rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.25rem;">
              <span class="pulsing-dot emerald"></span>
              <span style="font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-emerald);">Telemetri Lapangan Aktif</span>
            </div>
            <h2 style="font-size: 1.5rem; letter-spacing: -0.02em;">Sumber Air: ${spring.name}</h2>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--apple-emerald-surface); padding: 0.4rem 0.85rem; border-radius: var(--radius-full);">
            <span class="pulsing-dot emerald"></span>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--apple-emerald); text-transform: uppercase;">Sensor Normal (${spring.sensorUptime}% Uptime)</span>
          </div>
        </div>

        <!-- Big Metric Displays -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--apple-hairline);">
          <div>
            <span style="font-size: 0.8125rem; color: var(--apple-text-secondary); font-weight: 500; display: block; margin-bottom: 0.25rem;">Debit Aliran Terkini</span>
            <div class="apple-stat-big" style="color: var(--apple-emerald);">
              ${spring.currentDischarge}
              <span class="apple-stat-unit">L/detik</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--apple-text-muted); margin-top: 0.25rem; display: block;">Kapasitas baseline ${spring.baselineDischarge} L/s</span>
          </div>

          <div>
            <span style="font-size: 0.8125rem; color: var(--apple-text-secondary); font-weight: 500; display: block; margin-bottom: 0.25rem;">Kapasitas Akuifer</span>
            <div class="apple-stat-big">
              ${spring.capacityPercent}
              <span class="apple-stat-unit">%</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--apple-text-muted); margin-top: 0.25rem; display: block;">Resapan sabuk hijau stabil</span>
          </div>

          <div>
            <span style="font-size: 0.8125rem; color: var(--apple-text-secondary); font-weight: 500; display: block; margin-bottom: 0.25rem;">Cakupan Sambungan</span>
            <div class="apple-stat-big">
              ${spring.servedHouseholds}
              <span class="apple-stat-unit">KK</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--apple-text-muted); margin-top: 0.25rem; display: block;">Elevasi ${spring.elevation}</span>
          </div>
        </div>
      </div>

      <!-- Two Column Layout: Grouped Inset Style -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 2rem;">
        
        <!-- Left: Digital Pass Retribusi -->
        <div>
          <div class="apple-cell-header">Tagihan Iuran & Pembayaran</div>
          <div class="apple-inset-group">
            <div class="apple-cell" style="background: var(--apple-card);">
              <div>
                <span style="font-size: 0.75rem; color: var(--apple-text-secondary); text-transform: uppercase; font-weight: 600;">Periode Iuran</span>
                <div style="font-size: 1.125rem; font-weight: 700; color: var(--apple-text-primary);">${currentBill.period}</div>
                <span style="font-size: 0.8125rem; color: var(--apple-text-muted);">${currentBill.usageM3 || 16} m³ kubikasi terpakai</span>
              </div>
              <div style="text-align: right;">
                <div class="apple-stat-big" style="font-size: 1.75rem;">Rp ${(currentBill.amount).toLocaleString('id-ID')}</div>
                <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-full); ${currentBill.status === 'paid' ? 'background: var(--apple-emerald-surface); color: var(--apple-emerald);' : 'background: var(--apple-rose-subtle); color: var(--apple-rose);'}">
                  ${currentBill.status === 'paid' ? '✓ Lunas Terbayar' : '● Belum Lunas'}
                </span>
              </div>
            </div>

            ${currentBill.status !== 'paid' ? `
              <div style="padding: 1.5rem; text-align: center; border-bottom: 1px solid var(--apple-hairline); background: #FAFBFD;">
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--apple-text-secondary); display: block; margin-bottom: 0.75rem;">Scan QRIS Resmi Desa Bismo:</span>
                <div style="display: inline-block; background: #FFFFFF; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--apple-hairline); box-shadow: var(--shadow-subtle); margin-bottom: 0.75rem;">
                  <div style="width: 140px; height: 140px; background: #0F172A; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #FFFFFF; padding: 0.5rem;">
                    <span style="font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.25rem;">QRIS RETRIBUSI</span>
                    <div style="width: 90px; height: 90px; background: #FFFFFF; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 4px;">
                      <div style="background: #000;"></div><div style="background: #FFF;"></div><div style="background: #000;"></div>
                      <div style="background: #FFF;"></div><div style="background: #000;"></div><div style="background: #FFF;"></div>
                      <div style="background: #000;"></div><div style="background: #FFF;"></div><div style="background: #000;"></div>
                    </div>
                    <span style="font-size: 0.5625rem; margin-top: 0.25rem;">NMID: ID1020261189</span>
                  </div>
                </div>
                <p style="font-size: 0.75rem; color: var(--apple-text-muted);">Transfer Bank Jateng BUMDes: <strong>3-021-98765-1</strong></p>
                <button class="btn btn-primary" id="btn-pay-qris" style="width: 100%; margin-top: 1rem;">
                  Konfirmasi Pembayaran QRIS (Rp 20.000)
                </button>
              </div>
            ` : `
              <div class="apple-cell" style="background: var(--apple-emerald-surface);">
                <div>
                  <strong style="color: var(--apple-emerald); font-size: 0.875rem;">Tagihan Bulan Ini Sudah Lunas</strong>
                  <span style="font-size: 0.75rem; color: var(--apple-text-secondary); display: block; margin-top: 0.15rem;">
                    Dibayar pada ${new Date(currentBill.paidAt || Date.now()).toLocaleDateString('id-ID')} via ${currentBill.paymentMethod || 'QRIS'}
                  </span>
                </div>
                <button class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;" onclick="alert('Struk Resmi Retribusi Air Desa Bismo\\nNo Referensi: STRUK-${currentBill.id}\\nNominal: Rp ${(currentBill.amount).toLocaleString('id-ID')}\\nStatus: Terverifikasi BUMDes Tirta')">
                  Lihat Struk
                </button>
              </div>
            `}

            <!-- Historical Bills in Inset List -->
            <div class="apple-cell-header" style="background: var(--apple-canvas); border-top: 1px solid var(--apple-hairline); border-bottom: 1px solid var(--apple-hairline);">Riwayat Pembayaran Lampau</div>
            ${state.bills.slice(1).map(b => `
              <div class="apple-cell">
                <div>
                  <strong style="font-size: 0.875rem; display: block;">${b.period}</strong>
                  <span style="font-size: 0.75rem; color: var(--apple-text-muted);">${b.paymentMethod || 'Lunas'} • ${b.usageM3 || 15} m³</span>
                </div>
                <div style="text-align: right;">
                  <span style="font-weight: 700; color: var(--apple-emerald); font-size: 0.9375rem;">Rp ${(b.amount).toLocaleString('id-ID')}</span>
                  <span style="font-size: 0.6875rem; color: var(--apple-text-muted); display: block;">REF-${b.id}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Link Code Meteran -->
          <div class="apple-cell-header">Tautkan Akun Meteran Baru</div>
          <div class="apple-inset-group" style="padding: 1.25rem;">
            <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin-bottom: 0.75rem;">Hubungkan 6-digit Link Code yang tertera pada badan meteran air fisik.</p>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="input-link-code" placeholder="Misal: BSM-7721" class="form-input" style="font-size: 0.875rem; padding: 0.65rem 0.875rem;">
              <button class="btn btn-secondary" id="btn-link-meter" style="padding: 0.65rem 1.25rem; font-size: 0.8125rem;">Tautkan</button>
            </div>
          </div>
        </div>

        <!-- Right: Formulir Lapor Pipa Bocor & Status -->
        <div>
          <div class="apple-cell-header">Pelaporan & Penanganan Masalah</div>
          <div class="apple-inset-group" style="padding: 1.75rem;">
            <div style="margin-bottom: 1.25rem;">
              <h3 style="font-size: 1.1875rem; letter-spacing: -0.015em;">Formulir Lapor Kerusakan</h3>
              <p class="text-muted" style="font-size: 0.8125rem; margin-top: 0.2rem;">Laporan Anda diteruskan langsung ke tim teknis perbaikan pipa BUMDes Tirta.</p>
            </div>

            <form id="form-warga-report" onsubmit="event.preventDefault();">
              <div class="form-group">
                <label for="warga-report-category" class="form-label">Kategori Gangguan</label>
                <select id="warga-report-category" class="form-select">
                  <option value="kebocoran">Pipa Bocor / Pecah di Jalur Transmisi</option>
                  <option value="kotor">Air Keruh / Kotor / Berpasir</option>
                  <option value="mati">Debit Air Mati / Aliran Terhenti</option>
                  <option value="meteran">Meteran Air Rusak / Angka Tidak Berputar</option>
                </select>
              </div>

              <div class="form-group">
                <label for="warga-report-desc" class="form-label">Catatan Lokasi & Deskripsi</label>
                <textarea id="warga-report-desc" class="form-textarea" rows="3" placeholder="Sebutkan lokasi spesifik (misal: tanjakan kebun teh RT 02) dan kondisi pipa..." required></textarea>
              </div>

              <div class="form-group">
                <label for="warga-report-coords" class="form-label">Koordinat GPS Otomatis</label>
                <div style="display: flex; gap: 0.5rem;">
                  <input type="text" id="warga-report-coords" class="form-input" value="-7.0655, 109.8455" readonly style="background: var(--apple-canvas); font-size: 0.8125rem;">
                  <button type="button" class="btn btn-secondary" style="padding: 0.5rem 0.875rem; font-size: 0.75rem;" onclick="alert('GPS Akurat Terdeteksi: -7.0655, 109.8455 (Desa Bismo)')">📍 Deteksi</button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Foto Bukti (Opsional)</label>
                <input type="file" id="warga-report-photo" class="form-input" accept="image/*" style="font-size: 0.8125rem;">
              </div>

              <button type="submit" id="btn-submit-warga-report" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
                Kirim Laporan Kerusakan
              </button>
            </form>
          </div>

          <!-- Status Laporan Inset Group -->
          <div class="apple-cell-header">Status Penanganan Laporan Terkini</div>
          <div class="apple-inset-group">
            ${state.reports.slice(0, 3).map(r => `
              <div class="apple-cell" style="align-items: flex-start;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
                    <span class="pulsing-dot ${r.status === 'resolved' ? 'emerald' : r.status === 'in_progress' ? 'amber' : 'rose'}"></span>
                    <strong style="font-size: 0.875rem;">${r.categoryLabel || r.reportType}</strong>
                  </div>
                  <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); line-height: 1.4; margin-bottom: 0.35rem;">${r.description}</p>
                  <span style="font-size: 0.6875rem; color: var(--apple-text-muted);">Dilaporkan ${new Date(r.createdAt || Date.now()).toLocaleDateString('id-ID')}</span>
                </div>
                <span style="font-size: 0.6875rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: var(--radius-full); text-transform: uppercase; white-space: nowrap; ${r.status === 'resolved' ? 'background: var(--apple-emerald-surface); color: var(--apple-emerald);' : r.status === 'in_progress' ? 'background: var(--apple-amber-subtle); color: var(--apple-amber);' : 'background: var(--apple-rose-subtle); color: var(--apple-rose);'}">
                  ${r.status === 'resolved' ? 'Selesai' : r.status === 'in_progress' ? 'Dikerjakan' : 'Verifikasi'}
                </span>
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

      const newCollected = state.villageFinances.totalCollected + 20000;
      const newRate = Math.min(100, Math.round((newCollected / state.villageFinances.totalTarget) * 100));

      const fin = {
        ...state.villageFinances,
        totalCollected: newCollected,
        collectionRate: newRate,
        maintenanceFundBalance: state.villageFinances.maintenanceFundBalance + 20000
      };

      updateStore({ bills, villageFinances: fin });
      alert('Pembayaran Rp 20.000 via QRIS Berhasil! Struk resmi diterbitkan dan kas BUMDes bertambah.');
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
      alert('Laporan berhasil dikirim ke Pengelola BUMDes & Tim Relawan!');
      descInput.value = '';
    });
  }
}
