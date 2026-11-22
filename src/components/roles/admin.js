import { getStore, updateStore } from '../../store.js';

export function renderAdminView(activeSubTab = 'ringkasan') {
  const state = getStore();

  // Macro calculations across all 4 Batang springs
  const totalDischarge = state.springs.reduce((acc, s) => acc + s.currentDischarge, 0).toFixed(1);
  const totalHouseholds = state.springs.reduce((acc, s) => acc + (s.servedHouseholds || 0), 0);
  const avgUptime = (state.springs.reduce((acc, s) => acc + s.sensorUptime, 0) / state.springs.length).toFixed(1);

  const pendingDonations = state.donations.filter(d => d.status === 'pending');
  const pendingReports = state.reports.filter(r => r.status === 'pending');

  return `
    <div class="role-view admin-view container" style="padding-top: 1.5rem; padding-bottom: 5rem; max-width: 960px;">
      
      <!-- Apple Health Top Header -->
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="pulsing-dot emerald"></span>
          <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-emerald);">
            Super Admin • PDAM Batang
          </span>
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; margin: 0; color: var(--apple-text-primary);">
          Macro Dashboard & Pusat Otoritas
        </h1>
        <p style="font-size: 0.9375rem; color: var(--apple-text-secondary); margin-top: 0.25rem;">
          Ringkasan Agregat Lintas Mata Air Kabupaten Batang • Verifikasi Laporan & Transaksi Donasi
        </p>
      </div>

      <!-- Role Sub-Tabs Header (Visible on Desktop / Web) -->
      <div class="desktop-subtabs-bar">
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'ringkasan' ? 'active' : ''}" data-target-subtab="ringkasan">
          ⚡ Ringkasan
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'verifikasi' ? 'active' : ''}" data-target-subtab="verifikasi">
          ✅ Verifikasi
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'kelola' ? 'active' : ''}" data-target-subtab="kelola">
          🛡️ Kelola
        </button>
        <button type="button" class="desktop-subtab-btn ${activeSubTab === 'profil' ? 'active' : ''}" data-target-subtab="profil">
          👤 Profil
        </button>
      </div>

      <!-- TAB 1: RINGKASAN -->
      <div class="subtab-panel ${activeSubTab === 'ringkasan' ? 'active' : ''}" id="admin-tab-ringkasan">
        <!-- Macro Metric Highlights (Apple Health Style) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="apple-inset-group" style="padding: 1.25rem 1.5rem; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-text-secondary);">
                Total Debit Gabungan
              </span>
              <span class="pulsing-dot emerald"></span>
            </div>
            <div class="apple-stat-big" style="color: var(--apple-emerald); margin: 0.35rem 0;">
              ${totalDischarge}<span class="unit">L/s</span>
            </div>
            <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
              Pasokan 4 mata air lereng Dieng Utara
            </div>
          </div>

          <div class="apple-inset-group" style="padding: 1.25rem 1.5rem; margin-bottom: 0;">
            <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-text-secondary);">
              KK Terlayani
            </span>
            <div class="apple-stat-big" style="margin: 0.35rem 0;">
              ${totalHouseholds}<span class="unit">KK</span>
            </div>
            <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
              Tersebar di 4 desa Kec. Blado
            </div>
          </div>

          <div class="apple-inset-group" style="padding: 1.25rem 1.5rem; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-text-secondary);">
                Uptime Sensor IoT
              </span>
              <span class="pulsing-dot emerald"></span>
            </div>
            <div class="apple-stat-big" style="color: var(--apple-text-primary); margin: 0.35rem 0;">
              ${avgUptime}<span class="unit">%</span>
            </div>
            <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
              Rata-rata keandalan telemetri solar
            </div>
          </div>
        </div>

        <!-- Spring Table as Inset Group -->
        <div class="apple-section-header">Status Mata Air Se-Kabupaten Batang</div>
        <div class="apple-inset-group" style="overflow-x: auto; margin-bottom: 2.5rem;">
          <div style="min-width: 600px;">
            ${state.springs.map((s, idx) => `
              <div class="apple-cell" style="display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr; align-items: center;">
                <div>
                  <div style="font-weight: 700; font-size: 0.9375rem; color: var(--apple-text-primary);">${s.name}</div>
                  <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin-top: 2px;">${s.village}, Kec. ${s.district}</div>
                </div>
                <div>
                  <div class="apple-stat-big" style="font-size: 1.15rem; color: var(--apple-emerald);">
                    ${s.currentDischarge} <span style="font-size: 0.75rem; color: var(--apple-text-secondary);">L/s</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--apple-text-tertiary);">Base: ${s.baselineDischarge} L/s</div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span class="pulsing-dot ${s.status === 'normal' ? 'emerald' : s.status === 'warning' ? 'amber' : 'rose'}"></span>
                  <span style="font-size: 0.75rem; font-weight: 600; text-transform: capitalize; color: var(--apple-text-primary);">
                    ${s.status}
                  </span>
                </div>
                <div style="text-align: right; font-size: 0.8125rem; font-weight: 600; color: var(--apple-text-secondary); font-variant-numeric: tabular-nums;">
                  ${s.sensorUptime}% Uptime
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- TAB 2: VERIFIKASI -->
      <div class="subtab-panel ${activeSubTab === 'verifikasi' ? 'active' : ''}" id="admin-tab-verifikasi">
        <div class="apple-section-header">Pusat Antrean Verifikasi Otoritas</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
          
          <!-- Lane 1: Verifikasi Donasi -->
          <div>
            <div class="apple-section-header" style="display: flex; justify-content: space-between; align-items: baseline;">
              <span>1. Bukti Donasi CSR & Individu</span>
              <span style="font-size: 0.75rem; font-weight: 500; text-transform: none; color: var(--apple-text-secondary);">
                ${pendingDonations.length} Pending
              </span>
            </div>

            <div class="apple-inset-group">
              ${pendingDonations.length === 0 ? `
                <div class="apple-cell" style="justify-content: center; color: var(--apple-text-secondary); font-size: 0.875rem; padding: 2rem;">
                  Semua donasi telah diverifikasi ✓
                </div>
              ` : pendingDonations.map(d => {
                const channel = (d.paymentChannel || d.paymentMethod || d.referenceNo || 'QRIS').toUpperCase();
                const dateStr = d.timestamp || d.date ? new Date(d.timestamp || d.date).toLocaleDateString('id-ID') : 'Hari ini';
                return `
                <div class="apple-cell" style="flex-direction: column; align-items: flex-start; gap: 0.5rem;">
                  <div style="display: flex; justify-content: space-between; width: 100%; align-items: baseline;">
                    <span style="font-weight: 600; font-size: 0.9375rem; color: var(--apple-text-primary);">${d.donorName}</span>
                    <span style="font-weight: 700; font-size: 0.9375rem; color: var(--apple-emerald); font-variant-numeric: tabular-nums;">
                      Rp ${(d.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                    Kanal / Ref: ${channel} • ${dateStr}
                  </div>
                  <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: 0.35rem;">
                    <button class="apple-button-primary btn-approve-donation" data-id="${d.id}" style="flex: 1; padding: 0.45rem; font-size: 0.8125rem;">
                      Verifikasi Lunas
                    </button>
                    <button class="apple-button-secondary btn-reject-donation" data-id="${d.id}" style="padding: 0.45rem 0.85rem; font-size: 0.8125rem; color: #E11D48;">
                      Tolak
                    </button>
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

          <!-- Lane 2: Verifikasi Laporan Lapangan -->
          <div>
            <div class="apple-section-header" style="display: flex; justify-content: space-between; align-items: baseline;">
              <span>2. Disposisi Laporan Patroli</span>
              <span style="font-size: 0.75rem; font-weight: 500; text-transform: none; color: var(--apple-text-secondary);">
                ${pendingReports.length} Menunggu Disposisi
              </span>
            </div>

            <div class="apple-inset-group">
              ${pendingReports.length === 0 ? `
                <div class="apple-cell" style="justify-content: center; color: var(--apple-text-secondary); font-size: 0.875rem; padding: 2rem;">
                  Semua laporan telah ditindaklanjuti ✓
                </div>
              ` : pendingReports.map(r => {
                const coords = r.coordinates || r.location || { lat: -7.0652, lng: 109.8451 };
                const title = r.title || r.categoryLabel || r.type || 'Laporan Temuan';
                const reporter = r.reporterName || r.submittedBy || 'Petugas / Warga';
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

                  <div style="font-size: 0.75rem; color: var(--apple-text-tertiary);">
                    📍 GPS: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)} • Oleh: ${reporter}
                  </div>

                  <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: 0.35rem;">
                    <button class="apple-button-primary btn-dispatch-report" data-id="${r.id}" style="flex: 1; padding: 0.45rem; font-size: 0.8125rem;">
                      Disposisi Tim Teknis
                    </button>
                    <button class="apple-button-secondary btn-close-report" data-id="${r.id}" style="padding: 0.45rem 0.85rem; font-size: 0.8125rem;">
                      Selesai
                    </button>
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>

        </div>
      </div>

      <!-- TAB 3: KELOLA (MASTER DATA) -->
      <div class="subtab-panel ${activeSubTab === 'kelola' ? 'active' : ''}" id="admin-tab-kelola">
        <div class="apple-section-header">Konfigurasi Master Data Mata Air</div>
        <div class="apple-inset-group">
          <form id="form-spring-config" onsubmit="event.preventDefault();" style="padding: 1.25rem 1.5rem;">
            <div style="font-size: 0.875rem; color: var(--apple-text-secondary); margin-bottom: 1.25rem; line-height: 1.45;">
              Sesuaikan ambang batas debit aman & kalibrasi sensor telemetri langsung ke memori kontrol Batang.
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="admin-spring-select" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                Pilih Mata Air
              </label>
              <select id="admin-spring-select" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                ${state.springs.map(s => `
                  <option value="${s.id}">${s.name} (${s.village})</option>
                `).join('')}
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div>
                <label for="admin-baseline" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Baseline Debit (L/s)
                </label>
                <input type="number" step="0.1" id="admin-baseline" class="form-input" value="25.0" style="border-radius: 10px; font-variant-numeric: tabular-nums;" required>
              </div>
              <div>
                <label for="admin-status" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Status Override
                </label>
                <select id="admin-status" class="form-select" style="font-size: 0.875rem; border-radius: 10px;">
                  <option value="normal">Normal</option>
                  <option value="warning">Peringatan</option>
                  <option value="critical">Kritis</option>
                </select>
              </div>
            </div>

            <button type="submit" id="btn-save-spring-config" class="apple-button-primary" style="width: 100%;">
              Simpan Kalibrasi Mata Air
            </button>
          </form>
        </div>
      </div>

      <!-- TAB 4: PROFIL -->
      <div class="subtab-panel ${activeSubTab === 'profil' ? 'active' : ''}" id="admin-tab-profil">
        <div class="apple-section-header">Profil Super Administrator PDAM Batang</div>
        <div class="apple-inset-group">
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Nama Pejabat Otoritas</span>
            <strong>Ir. Bambang Trihatmojo, M.T.</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Jabatan / Divisi</span>
            <strong>Kepala Bidang Distribusi & Konservasi PDAM Batang</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">ID Otoritas Pegawai</span>
            <strong>ADM-PDAM-0199</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Wilayah Kerja</span>
            <strong>Kabupaten Batang (Kec. Blado, Bandar, Reban)</strong>
          </div>
          <div class="apple-cell">
            <span style="color: var(--apple-text-secondary);">Akses Tingkat Sistem</span>
            <strong style="color: var(--apple-emerald);">Super Admin (Full Read & Write Access)</strong>
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

export function attachAdminListeners(container) {
  if (!container) return;

  // Desktop subtab switcher
  container.querySelectorAll('.desktop-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubTab = btn.dataset.targetSubtab;
      window.dispatchEvent(new CustomEvent('belikhub:subtab-change', { detail: { subtab: targetSubTab } }));
    });
  });

  // Verifikasi Donasi: Approve
  container.querySelectorAll('.btn-approve-donation').forEach(btn => {
    btn.addEventListener('click', () => {
      const donationId = btn.dataset.id;
      const state = getStore();
      const donations = state.donations.map(d => {
        if (d.id === donationId) {
          return { ...d, status: 'verified', verifiedAt: new Date().toISOString() };
        }
        return d;
      });
      updateStore({ donations });
      alert(`Donasi ${donationId} berhasil diverifikasi lunas.`);
    });
  });

  // Verifikasi Donasi: Reject
  container.querySelectorAll('.btn-reject-donation').forEach(btn => {
    btn.addEventListener('click', () => {
      const donationId = btn.dataset.id;
      const state = getStore();
      const donations = state.donations.filter(d => d.id !== donationId);
      updateStore({ donations });
      alert(`Donasi ${donationId} ditolak dan dihapus dari antrean.`);
    });
  });

  // Disposisi Laporan Patroli
  container.querySelectorAll('.btn-dispatch-report').forEach(btn => {
    btn.addEventListener('click', () => {
      const reportId = btn.dataset.id;
      const state = getStore();
      const reports = state.reports.map(r => {
        if (r.id === reportId) {
          return { ...r, status: 'investigating' };
        }
        return r;
      });
      updateStore({ reports });
      alert(`Laporan ${reportId} telah didisposisikan ke tim teknis darurat.`);
    });
  });

  // Selesai Laporan Patroli
  container.querySelectorAll('.btn-close-report').forEach(btn => {
    btn.addEventListener('click', () => {
      const reportId = btn.dataset.id;
      const state = getStore();
      const reports = state.reports.map(r => {
        if (r.id === reportId) {
          return { ...r, status: 'resolved' };
        }
        return r;
      });
      updateStore({ reports });
      alert(`Laporan ${reportId} telah ditandai selesai.`);
    });
  });

  // Save Spring Configuration
  const formConfig = container.querySelector('#form-spring-config');
  if (formConfig) {
    formConfig.addEventListener('submit', (e) => {
      e.preventDefault();
      const springId = container.querySelector('#admin-spring-select').value;
      const baseline = parseFloat(container.querySelector('#admin-baseline').value) || 25.0;
      const status = container.querySelector('#admin-status').value;

      const state = getStore();
      const springs = state.springs.map(s => {
        if (s.id === springId) {
          return { ...s, baselineDischarge: baseline, status };
        }
        return s;
      });

      updateStore({ springs });
      alert(`Kalibrasi mata air ${springId} berhasil disimpan.`);
    });
  }
}