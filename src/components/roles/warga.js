import { getStore, updateStore } from '../../store.js';

export function renderWargaView() {
  const state = getStore();
  const spring = state.springs.find(s => s.id === 'sp_bismo') || state.springs[0];
  const user = state.currentUser;
  const currentBill = state.bills.find(b => b.period === 'November 2026') || state.bills[0];

  return `
    <div class="role-view warga-view container" style="padding-top: 2rem; padding-bottom: 4rem;">
      <!-- Header Banner Role -->
      <div style="background: linear-gradient(135deg, rgba(55,80,51,0.08) 0%, rgba(253,253,247,0.6) 100%); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem 2.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span class="eyebrow" style="color: var(--color-evergreen);">Portal Warga Desa • Sambungan Rumah Tangga</span>
          <h1 style="font-size: clamp(1.75rem, 3vw, 2.5rem); margin-top: 0.25rem; margin-bottom: 0.5rem;">Selamat Datang, ${user.name}</h1>
          <p class="text-muted" style="font-size: 1rem;">
            ${user.village} • No. Meter: <strong style="color: var(--color-black);">${user.linkedMeterCode}</strong> • ID KK: <strong>${user.householdId}</strong>
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="text-align: right; background: #FFFFFF; padding: 0.875rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
            <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600; display: block;">Status Sambungan</span>
            <span style="font-weight: 700; color: var(--color-evergreen); font-size: 1rem;">● Aktif Mengalir</span>
          </div>
        </div>
      </div>

      <!-- Live Telemetry Widget -->
      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="eyebrow">Field Telemetry Widget</span>
            <h2 style="font-size: 1.5rem;">Status Sumber Air Rumah: ${spring.name}</h2>
            <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem;">Pemantauan debit aliran dan kondisi akuifer hulu Desa Bismo</p>
          </div>
          <span style="background: ${spring.status === 'normal' ? 'rgba(55,80,51,0.12)' : 'rgba(255,64,0,0.12)'}; color: ${spring.status === 'normal' ? 'var(--color-evergreen)' : '#CC3300'}; padding: 0.4rem 1rem; border-radius: var(--radius-full); font-size: 0.8125rem; font-weight: 600; text-transform: uppercase;">
            Status Sensor: ${spring.status === 'normal' ? '✓ Normal (Aman)' : '⚠ Waspada / Terganggu'}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--color-evergreen);">
            <div style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600;">Debit Aliran Saat Ini</div>
            <div style="font-size: 2.25rem; font-weight: 700; color: var(--color-evergreen); margin: 0.35rem 0;">${spring.currentDischarge} <span style="font-size: 1.125rem; font-weight: 500;">L/detik</span></div>
            <div style="font-size: 0.8125rem; color: var(--color-muted);">Kapasitas baseline: ${spring.baselineDischarge} L/s</div>
          </div>

          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--color-charcoal);">
            <div style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600;">Persentase Kapasitas</div>
            <div style="font-size: 2.25rem; font-weight: 700; color: var(--color-black); margin: 0.35rem 0;">${spring.capacityPercent}%</div>
            <div style="font-size: 0.8125rem; color: var(--color-muted);">Akuifer stabil, resapan optimal</div>
          </div>

          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid #0096F7;">
            <div style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600;">Keandalan Sensor (Uptime)</div>
            <div style="font-size: 2.25rem; font-weight: 700; color: #0096F7; margin: 0.35rem 0;">${spring.sensorUptime}%</div>
            <div style="font-size: 0.8125rem; color: var(--color-muted);">Logger ESP32 Solar beroperasi penuh</div>
          </div>

          <div style="background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--color-muted);">
            <div style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600;">Elevasi & Cakupan</div>
            <div style="font-size: 2.25rem; font-weight: 700; color: var(--color-black); margin: 0.35rem 0;">${spring.servedHouseholds} <span style="font-size: 1.125rem; font-weight: 500;">KK</span></div>
            <div style="font-size: 0.8125rem; color: var(--color-muted);">${spring.elevation} • Desa Bismo</div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout: Retribution Pass & Damage Report -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 2rem;">
        
        <!-- Digital Pass Iuran Retribusi -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="eyebrow">Iuran Pemeliharaan Pipa</span>
            <span style="font-size: 0.75rem; background: var(--color-beige); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">BUMDes Tirta</span>
          </div>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Digital Pass Iuran Retribusi</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Tagihan transparan untuk operasional, pembersihan sedimentasi, dan perbaikan pipa air warga.
          </p>

          <div style="border: 2px dashed ${currentBill.status === 'paid' ? 'var(--color-evergreen)' : 'rgba(255,64,0,0.5)'}; border-radius: var(--radius-md); padding: 1.75rem; background: ${currentBill.status === 'paid' ? 'rgba(55,80,51,0.03)' : 'rgba(255,64,0,0.02)'}; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600;">Bulan Berjalan</span>
                <div style="font-weight: 700; font-size: 1.25rem;">${currentBill.period}</div>
              </div>
              <span style="padding: 0.35rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8125rem; font-weight: 700; ${currentBill.status === 'paid' ? 'background: rgba(55,80,51,0.15); color: var(--color-evergreen);' : 'background: rgba(255,64,0,0.15); color: #CC3300;'}">
                ${currentBill.status === 'paid' ? '✓ LUNAS' : '● BELUM BAYAR'}
              </span>
            </div>

            <div style="margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-muted); display: block;">Volume Pemakaian</span>
                <span style="font-size: 1rem; font-weight: 600;">${currentBill.usageM3 || 16} m³ kubikasi</span>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--color-muted); display: block;">Nominal Tagihan</span>
                <span style="font-size: 1.625rem; font-weight: 800; color: var(--color-black);">Rp ${(currentBill.amount).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          ${currentBill.status !== 'paid' ? `
            <div style="background: var(--color-beige); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; text-align: center;">
              <span style="font-size: 0.8125rem; color: var(--color-muted); display: block; margin-bottom: 0.75rem;">Metode Pembayaran Resmi:</span>
              <div style="display: inline-block; background: #FFFFFF; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-bottom: 0.75rem;">
                <!-- QRIS Visual Mock -->
                <div style="width: 140px; height: 140px; background: #262626; color: #FFFFFF; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 4px; padding: 0.5rem;">
                  <span style="font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.25rem;">QRIS DESA BISMO</span>
                  <div style="width: 90px; height: 90px; background: #FFFFFF; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 4px;">
                    <div style="background: #000;"></div><div style="background: #FFF;"></div><div style="background: #000;"></div>
                    <div style="background: #FFF;"></div><div style="background: #000;"></div><div style="background: #FFF;"></div>
                    <div style="background: #000;"></div><div style="background: #FFF;"></div><div style="background: #000;"></div>
                  </div>
                  <span style="font-size: 0.625rem; margin-top: 0.25rem;">NMID: ID1020261189</span>
                </div>
              </div>
              <p style="font-size: 0.75rem; color: var(--color-muted);">Atau Transfer: <strong>Bank Jateng BUMDes Tirta: 3-021-98765-1</strong></p>
            </div>

            <button class="btn btn-primary" id="btn-pay-qris" style="width: 100%; padding: 0.875rem; font-size: 0.9375rem;">
              📱 Bayar Sekarang via QRIS / Konfirmasi
            </button>
          ` : `
            <div style="background: rgba(55,80,51,0.08); padding: 1.25rem; border-radius: var(--radius-sm); font-size: 0.875rem; color: var(--color-evergreen); display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <div>
                <strong>Tagihan Lunas</strong>
                <div style="font-size: 0.75rem; color: var(--color-muted); margin-top: 0.2rem;">Terbayar pada ${new Date(currentBill.paidAt || Date.now()).toLocaleDateString('id-ID')} via ${currentBill.paymentMethod || 'QRIS'}</div>
              </div>
              <button class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;" onclick="alert('Membuka Struk Digital Resmi No: STRUK-${currentBill.id}\\nNominal: Rp ${(currentBill.amount).toLocaleString('id-ID')}\\nStatus: Terverifikasi Sistem BUMDes Tirta')">Lihat Struk</button>
            </div>
          `}

          <!-- Riwayat Tagihan Lampau -->
          <div style="margin-top: 2rem;">
            <div style="font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem;">
              Riwayat Tagihan & Struk Digital
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              ${state.bills.slice(1).map(b => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.875rem 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem;">
                  <div>
                    <div style="font-weight: 600;">${b.period}</div>
                    <span style="color: var(--color-muted); font-size: 0.75rem;">${b.paymentMethod || 'Lunas'} • ${b.usageM3 || 15} m³</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-weight: 700; color: var(--color-evergreen); display: block;">Rp ${(b.amount).toLocaleString('id-ID')}</span>
                    <span style="font-size: 0.6875rem; color: var(--color-muted);">No: REF-${b.id}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tautkan Akun Meteran -->
          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
            <div style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Tautkan ID Sambungan Meter Baru</div>
            <p style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.75rem;">Masukkan 6-digit Link Code yang tertera pada meteran fisik rumah Anda.</p>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="input-link-code" placeholder="Contoh: BSM-7721" class="form-input" style="font-size: 0.8125rem; padding: 0.6rem 0.875rem;">
              <button class="btn btn-secondary" id="btn-link-meter" style="padding: 0.6rem 1.25rem; font-size: 0.8125rem;">Tautkan</button>
            </div>
          </div>
        </div>

        <!-- Formulir Lapor Kerusakan Warga -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <span class="eyebrow" style="color: #CC3300;">Warga Report & Tanggap Cepat</span>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Formulir Lapor Kerusakan</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Laporkan gangguan aliran air, pipa transmisi pecah, atau air keruh untuk segera ditangani teknisi BUMDes.
          </p>

          <form id="form-warga-report" onsubmit="event.preventDefault();">
            <div class="form-group">
              <label for="warga-report-category" class="form-label">Kategori Masalah</label>
              <select id="warga-report-category" class="form-select">
                <option value="kebocoran">Pipa Bocor / Pecah di Jalur Transmisi</option>
                <option value="kotor">Air Keruh / Kotor / Berpasir</option>
                <option value="mati">Debit Air Mati / Aliran Tidak Mengalir</option>
                <option value="meteran">Meteran Air Rusak / Kaca Buram</option>
              </select>
            </div>

            <div class="form-group">
              <label for="warga-report-desc" class="form-label">Catatan Lokasi & Deskripsi Kendala</label>
              <textarea id="warga-report-desc" class="form-textarea" rows="3" placeholder="Contoh: Pipa PVC 2 inch retak di lereng dekat kebun teh RT 02, air menyembur deras..." required></textarea>
            </div>

            <div class="form-group">
              <label for="warga-report-coords" class="form-label">Koordinat GPS Lokasi</label>
              <div style="display: flex; gap: 0.5rem;">
                <input type="text" id="warga-report-coords" class="form-input" value="-7.0655, 109.8455" readonly style="background: var(--color-beige); font-size: 0.8125rem;">
                <button type="button" class="btn btn-secondary" style="padding: 0.5rem 0.875rem; font-size: 0.75rem;" onclick="alert('GPS Akurat Terdeteksi: -7.0655, 109.8455 (Desa Bismo, Batang)')">📍 Deteksi GPS</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Unggah Foto Bukti Kerusakan</label>
              <input type="file" id="warga-report-photo" class="form-input" accept="image/*" style="font-size: 0.8125rem;">
              <span style="font-size: 0.6875rem; color: var(--color-muted);">Format JPG, PNG (maks. 5MB)</span>
            </div>

            <button type="submit" id="btn-submit-warga-report" class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.875rem;">
              🚀 Kirim Laporan ke Petugas
            </button>
          </form>

          <!-- Tracking Status Laporan Terakhir -->
          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; color: var(--color-muted);">Status Laporan Terkini Anda</span>
              <span style="font-size: 0.75rem; color: var(--color-evergreen); font-weight: 600;">Realtime Sync</span>
            </div>
            ${state.reports.slice(0, 3).map(r => `
              <div style="background: var(--color-beige); border-radius: var(--radius-sm); padding: 1.125rem; margin-bottom: 0.75rem; font-size: 0.8125rem; border: 1px solid var(--color-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <span style="font-weight: 700; font-size: 0.875rem;">${r.categoryLabel || r.reportType}</span>
                  <span style="padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-size: 0.6875rem; font-weight: 700; ${r.status === 'resolved' ? 'background: rgba(55,80,51,0.15); color: var(--color-evergreen);' : r.status === 'in_progress' ? 'background: rgba(255,189,0,0.25); color: #9A6F00;' : 'background: rgba(255,64,0,0.15); color: #CC3300;'}">
                    ${r.status === 'resolved' ? '✓ Selesai Diperbaiki' : r.status === 'in_progress' ? '⚙ Sedang Diperbaiki' : '⏳ Menunggu Verifikasi'}
                  </span>
                </div>
                <p style="color: var(--color-charcoal); font-size: 0.8125rem; line-height: 1.45;">${r.description}</p>
                <div style="font-size: 0.6875rem; color: var(--color-muted); margin-top: 0.5rem; display: flex; justify-content: space-between;">
                  <span>ID: ${r.id}</span>
                  <span>Dilaporkan: ${new Date(r.createdAt || Date.now()).toLocaleDateString('id-ID')}</span>
                </div>
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

      // Also increment village finance collected and dynamically recalculate collectionRate
      const newCollected = state.villageFinances.totalCollected + 20000;
      const newRate = Math.min(100, Math.round((newCollected / state.villageFinances.totalTarget) * 100));

      const fin = {
        ...state.villageFinances,
        totalCollected: newCollected,
        collectionRate: newRate,
        maintenanceFundBalance: state.villageFinances.maintenanceFundBalance + 20000
      };

      updateStore({ bills, villageFinances: fin });
      alert('Pembayaran Rp 20.000 via QRIS Berhasil! Struk resmi telah diterbitkan dan saldo kas pemeliharaan BUMDes bertambah.');
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
      alert('Laporan berhasil dikirim ke Pengelola BUMDes & Tim Relawan Patroli! Antrean verifikasi bertambah di dashboard Admin.');
      descInput.value = '';
    });
  }
}
