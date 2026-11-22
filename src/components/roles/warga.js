import { getStore, updateStore } from '../../store.js';

export function renderWargaView(activeSubTab = 'retribusi') {
  const state = getStore();
  const spring = state.springs.find(s => s.id === 'sp_bismo') || state.springs[0];
  const user = state.currentUser;
  const currentBill = state.bills.find(b => b.period === 'November 2026') || state.bills[0];

  return `
    <div class="role-view warga-view container" style="padding-top: 1.5rem; padding-bottom: 5rem;">
      
      <!-- Role Sub-Tabs Header (Visible on Desktop / Web) -->
      <div class="desktop-subtabs-bar">
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'retribusi' ? 'active' : ''}" data-target-subtab="retribusi">
          💳 Retribusi
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'mata-air' ? 'active' : ''}" data-target-subtab="mata-air">
          💧 Mata Air
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'laporan' ? 'active' : ''}" data-target-subtab="laporan">
          📝 Laporan
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'profil' ? 'active' : ''}" data-target-subtab="profil">
          👤 Profil
        </button>
      </div>

      <!-- TAB 1: RETRIBUSI -->
      <div class="subtab-panel ${activeSubTab === 'retribusi' ? 'active' : ''}" id="warga-tab-retribusi">
        <div class="apple-section-header">Digital Pass Retribusi Air & Pembayaran Warga</div>
        <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span style="font-size: 0.75rem; color: var(--apple-text-secondary); text-transform: uppercase; font-weight: 700;">Periode Iuran</span>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--apple-text-primary); margin-top: 2px;">${currentBill.period}</div>
              <span style="font-size: 0.8125rem; color: var(--apple-text-secondary);">${currentBill.usageM3 || 16} m³ kubikasi terpakai bulan ini</span>
            </div>
            <div style="text-align: right;">
              <div class="apple-stat-big" style="font-size: 2rem;">Rp ${(currentBill.amount).toLocaleString('id-ID')}</div>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-full); ${currentBill.status === 'paid' ? 'background: var(--apple-emerald-surface); color: var(--apple-emerald);' : 'background: var(--apple-rose-subtle); color: var(--apple-rose);'}">
                ${currentBill.status === 'paid' ? '✓ Lunas Terbayar' : '● Belum Lunas'}
              </span>
            </div>
          </div>

          ${currentBill.status !== 'paid' ? `
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--apple-hairline); text-align: center;">
              <span style="font-size: 0.8125rem; font-weight: 600; color: var(--apple-text-secondary); display: block; margin-bottom: 0.75rem;">Scan QRIS Resmi BUMDes Desa Bismo:</span>
              <div style="display: inline-block; background: #FFFFFF; padding: 0.75rem; border-radius: 12px; border: 1px solid var(--apple-hairline); box-shadow: var(--shadow-subtle); margin-bottom: 1rem;">
                <div style="width: 140px; height: 140px; background: #0F172A; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #FFFFFF; padding: 0.5rem;">
                  <span style="font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.25rem;">QRIS RETRIBUSI</span>
                  <div style="width: 80px; height: 80px; background: #FFFFFF; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 4px;">
                    <div style="background: #000;"></div><div style="background: #FFF;"></div><div style="background: #000;"></div>
                    <div style="background: #FFF;"></div><div style="background: #000;"></div><div style="background: #FFF;"></div>
                    <div style="background: #000;"></div><div style="background: #FFF;"></div><div style="background: #000;"></div>
                  </div>
                  <span style="font-size: 0.6rem; color: #94A3B8; margin-top: 0.25rem;">NMID: ID102938481</span>
                </div>
              </div>
              <div>
                <button type="button" id="btn-pay-qris" class="apple-button-primary" style="width: 100%; max-width: 320px; margin: 0 auto; padding: 0.85rem; font-size: 0.9375rem;">
                  💳 Konfirmasi Bayar QRIS (Rp 20.000)
                </button>
              </div>
            </div>
          ` : `
            <div style="margin-top: 1.5rem; padding: 1rem; background: var(--apple-emerald-surface); border-radius: 12px; display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.5rem;">✅</span>
              <div>
                <strong style="color: var(--apple-emerald); font-size: 0.875rem; display: block;">Iuran Terverifikasi Lunas</strong>
                <span style="font-size: 0.75rem; color: var(--apple-text-secondary);">Dibayar melalui ${currentBill.paymentMethod || 'QRIS'} pada ${new Date(currentBill.paidAt || Date.now()).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          `}
        </div>

        <!-- Riwayat Pembayaran -->
        <div class="apple-section-header">Riwayat Pembayaran Sebelumnya</div>
        <div class="apple-inset-group">
          ${state.bills.map(b => `
            <div class="apple-cell">
              <div>
                <div style="font-weight: 600; font-size: 0.9375rem;">${b.period}</div>
                <div style="font-size: 0.75rem; color: var(--apple-text-secondary); margin-top: 2px;">
                  ${b.paymentMethod || 'Menunggu Pembayaran'}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 700; font-size: 0.9375rem; font-variant-numeric: tabular-nums;">Rp ${(b.amount).toLocaleString('id-ID')}</div>
                <span style="font-size: 0.6875rem; font-weight: 700; color: ${b.status === 'paid' ? 'var(--apple-emerald)' : 'var(--apple-rose)'};">
                  ${b.status === 'paid' ? 'LUNAS' : 'BELUM BAYAR'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 2: MATA AIR -->
      <div class="subtab-panel ${activeSubTab === 'mata-air' ? 'active' : ''}" id="warga-tab-mata-air">
        <div class="apple-section-header">Telemetri Real-Time Sumber Air</div>
        <div class="apple-inset-group" style="padding: 2rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <span class="pulsing-dot emerald" style="display: inline-block; vertical-align: middle; margin-right: 6px;"></span>
              <strong style="font-size: 1.15rem; color: var(--apple-text-primary);">${spring.name}</strong>
            </div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--apple-emerald); background: var(--apple-emerald-surface); padding: 0.25rem 0.65rem; border-radius: 9999px;">
              ${spring.sensorUptime}% Uptime
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.25rem;">
            <div class="apple-inset-group" style="padding: 1rem; margin-bottom: 0;">
              <span style="font-size: 0.75rem; color: var(--apple-text-secondary); font-weight: 600; text-transform: uppercase;">Debit Aliran</span>
              <div class="apple-stat-big" style="color: var(--apple-emerald); font-size: 1.85rem; margin: 0.25rem 0;">
                ${spring.currentDischarge} <span style="font-size: 0.875rem; color: var(--apple-text-secondary);">L/s</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--apple-text-muted);">Baseline ${spring.baselineDischarge} L/s</span>
            </div>

            <div class="apple-inset-group" style="padding: 1rem; margin-bottom: 0;">
              <span style="font-size: 0.75rem; color: var(--apple-text-secondary); font-weight: 600; text-transform: uppercase;">Kapasitas Akuifer</span>
              <div class="apple-stat-big" style="font-size: 1.85rem; margin: 0.25rem 0;">
                ${spring.capacityPercent}<span style="font-size: 0.875rem; color: var(--apple-text-secondary);">%</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--apple-text-muted);">Resapan lereng stabil</span>
            </div>

            <div class="apple-inset-group" style="padding: 1rem; margin-bottom: 0;">
              <span style="font-size: 0.75rem; color: var(--apple-text-secondary); font-weight: 600; text-transform: uppercase;">Penerima Manfaat</span>
              <div class="apple-stat-big" style="font-size: 1.85rem; margin: 0.25rem 0;">
                ${spring.servedHouseholds} <span style="font-size: 0.875rem; color: var(--apple-text-secondary);">KK</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--apple-text-muted);">Elevasi ${spring.elevation}</span>
            </div>
          </div>
        </div>

        <!-- Daftar Mata Air Lain di Batang -->
        <div class="apple-section-header">Jaringan Mata Air Terhubung</div>
        <div class="apple-inset-group">
          ${state.springs.map(s => `
            <div class="apple-cell">
              <div>
                <strong style="font-size: 0.9375rem; display: block;">${s.name}</strong>
                <span style="font-size: 0.75rem; color: var(--apple-text-secondary);">${s.village}, Kec. ${s.district}</span>
              </div>
              <div style="text-align: right;">
                <span style="font-weight: 800; font-size: 1rem; color: var(--apple-emerald); font-variant-numeric: tabular-nums;">${s.currentDischarge} L/s</span>
                <span style="display: block; font-size: 0.6875rem; color: var(--apple-text-muted);">${s.sensorUptime}% aktif</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 3: LAPORAN -->
      <div class="subtab-panel ${activeSubTab === 'laporan' ? 'active' : ''}" id="warga-tab-laporan">
        <div class="apple-section-header">Lapor Kerusakan & Pipa Bocor</div>
        <div class="apple-inset-group" style="padding: 1.5rem; margin-bottom: 1.5rem;">
          <form id="form-warga-report" onsubmit="event.preventDefault();">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="warga-report-category" class="form-label" style="font-size: 0.8125rem;">Kategori Masalah</label>
              <select id="warga-report-category" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                <option value="kebocoran">Kebocoran Pipa Transmisi Hulu</option>
                <option value="kotor">Air Keruh / Kotor / Berbau</option>
                <option value="mati">Debit Air Mati / Tidak Mengalir</option>
                <option value="meteran">Meteran Rusak / Bocor</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label for="warga-report-desc" class="form-label" style="font-size: 0.8125rem;">Deskripsi Lokasi & Kerusakan</label>
              <textarea id="warga-report-desc" class="form-textarea" rows="3" placeholder="Contoh: Pipa transmisi retak di lereng kebun teh RT 02, air menyembur..." style="border-radius: 10px;" required></textarea>
            </div>

            <button type="submit" class="apple-button-primary" style="width: 100%; padding: 0.75rem;">
              🚀 Kirim Laporan ke Relawan & Pengelola
            </button>
          </form>
        </div>

        <!-- Daftar Laporan Saya -->
        <div class="apple-section-header">Riwayat Laporan Kerusakan</div>
        <div class="apple-inset-group">
          ${state.reports.map(r => `
            <div class="apple-cell">
              <div>
                <strong style="font-size: 0.9375rem; display: block;">${r.categoryLabel || r.reportType}</strong>
                <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin: 2px 0 4px 0;">${r.description}</p>
                <span style="font-size: 0.6875rem; color: var(--apple-text-muted);">Dilaporkan ${new Date(r.createdAt || Date.now()).toLocaleDateString('id-ID')}</span>
              </div>
              <span style="font-size: 0.6875rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 9999px; text-transform: uppercase; ${r.status === 'resolved' ? 'background: var(--apple-emerald-surface); color: var(--apple-emerald);' : 'background: var(--apple-amber-subtle); color: var(--apple-amber);'}">
                ${r.status === 'resolved' ? 'Selesai' : 'Diproses'}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 4: PROFIL -->
      <div class="subtab-panel ${activeSubTab === 'profil' ? 'active' : ''}" id="warga-tab-profil">
        <div class="apple-section-header">Profil Pengguna & Sambungan Rumah</div>
        <div class="apple-inset-group">
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Nama Kepala Keluarga</span>
            <strong>${user.name}</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Nomor Kartu Keluarga (KK)</span>
            <strong>${user.householdId}</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">ID Sambungan Meteran</span>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <strong>${user.linkedMeterCode}</strong>
              <button type="button" class="apple-button-secondary" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;">Tautkan Kode Meter</button>
            </div>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Wilayah Domisili</span>
            <strong>${user.village}</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Nomor Telepon</span>
            <strong>${user.phone || '0812-3456-7890'}</strong>
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

export function attachWargaListeners(container) {
  if (!container) return;

  // Desktop subtab switcher
  container.querySelectorAll('.desktop-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubTab = btn.dataset.targetSubtab;
      window.dispatchEvent(new CustomEvent('belikhub:subtab-change', { detail: { subtab: targetSubTab } }));
    });
  });

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
