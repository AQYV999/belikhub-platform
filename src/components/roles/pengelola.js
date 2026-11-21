import { getStore, updateStore } from '../../store.js';

export function renderPengelolaView() {
  const state = getStore();
  const fin = state.villageFinances;

  return `
    <div class="role-view pengelola-view">
      <div style="margin-bottom: 2rem;">
        <span class="eyebrow" style="color: var(--color-evergreen);">Peran: Pengelola (BUMDes Tirta Desa Bismo)</span>
        <h2>Dashboard Operasional & Kas Air Desa</h2>
        <p class="text-muted">Memastikan tata kelola jaringan air tertib, iuran transparan, dan pemeliharaan terjaga.</p>
      </div>

      <!-- KPI Metrics Iuran Desa -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem;">
          <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase;">Collection Rate</span>
          <div style="font-size: 2rem; font-weight: 700; color: var(--color-evergreen); margin: 0.25rem 0;">${fin.collectionRate}%</div>
          <p style="font-size: 0.75rem; color: var(--color-muted);">85% Tertagih Bulan Ini (Target >80%)</p>
        </div>

        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem;">
          <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase;">Uang Terkumpul / Target</span>
          <div style="font-size: 1.5rem; font-weight: 600; color: var(--color-black); margin: 0.25rem 0;">
            Rp ${(fin.totalCollected).toLocaleString('id-ID')}
          </div>
          <p style="font-size: 0.75rem; color: var(--color-muted);">dari target Rp ${(fin.totalTarget).toLocaleString('id-ID')}</p>
        </div>

        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem;">
          <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase;">Saldo Kas Pemeliharaan Pipa</span>
          <div style="font-size: 1.75rem; font-weight: 700; color: var(--color-evergreen); margin: 0.25rem 0;">
            Rp ${(fin.maintenanceFundBalance).toLocaleString('id-ID')}
          </div>
          <p style="font-size: 0.75rem; color: var(--color-muted);">Siap untuk dana darurat pipa & sedimentasi</p>
        </div>
      </div>

      <!-- Two Column: Meter Reading & Conservation Update -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        
        <!-- Meter Reading & Cash Collection -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <span class="eyebrow">Pencatatan Meteran & Bayar Tunai</span>
          <h3>Pencatatan Meteran Air Warga</h3>
          <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
            Input kubikasi bulanan warga & tandai pembayaran tunai langsung di kantor desa.
          </p>

          <form id="form-meter-reading" onsubmit="event.preventDefault();" style="margin-bottom: 1.5rem; background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-sm);">
            <div class="form-group">
              <label class="form-label">Nama Kepala Keluarga / ID Sambungan</label>
              <select id="meter-resident-select" class="form-select">
                <option value="Bapak Slamet Raharjo (BSM-8921)">Bapak Slamet Raharjo — BSM-8921</option>
                <option value="Ibu Siti Aminah (BSM-8922)">Ibu Siti Aminah — BSM-8922</option>
                <option value="Bapak Joko Wahyudi (BSM-8923)">Bapak Joko Wahyudi — BSM-8923</option>
                <option value="Bapak Suwarno (BSM-8924)">Bapak Suwarno — BSM-8924</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Angka Meter (m³)</label>
                <input type="number" id="input-meter-m3" class="form-input" value="18" min="1" max="100" required>
              </div>
              <div class="form-group">
                <label class="form-label">Metode Pembayaran</label>
                <select id="input-pay-type" class="form-select">
                  <option value="Tunai">Bayar Tunai di Kantor</option>
                  <option value="Tagihan QRIS">Terbitkan Tagihan QRIS</option>
                </select>
              </div>
            </div>

            <button type="submit" id="btn-save-meter" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
              Simpan & Auto-Generate Tagihan
            </button>
          </form>

          <!-- List KK Terdata Terkini -->
          <div style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem;">
            Daftar Sambungan Warga (Sampel Bismo)
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem;">
              <div>
                <strong>Bapak Slamet Raharjo</strong> <span style="color: var(--color-muted);">(BSM-8921)</span>
                <div style="font-size: 0.75rem; color: var(--color-muted);">Pemakaian: 16 m³</div>
              </div>
              <span style="color: var(--color-evergreen); font-weight: 600;">Lunas (QRIS)</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem;">
              <div>
                <strong>Ibu Siti Aminah</strong> <span style="color: var(--color-muted);">(BSM-8922)</span>
                <div style="font-size: 0.75rem; color: var(--color-muted);">Pemakaian: 14 m³</div>
              </div>
              <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="alert('Tagihan Ibu Siti Aminah (Rp 20.000) ditandai Lunas Tunai!')">
                Catat Bayar Tunai
              </button>
            </div>
          </div>
        </div>

        <!-- Publikasi Progres Konservasi Lapangan -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <span class="eyebrow" style="color: var(--color-evergreen);">Publikasi Lapangan</span>
          <h3>Progres Konservasi Fisik</h3>
          <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
            Unggah dokumentasi kegiatan pemulihan mata air agar transparan bagi donatur & admin.
          </p>

          <form id="form-conservation-progress" onsubmit="event.preventDefault();" style="margin-bottom: 1.5rem;">
            <div class="form-group">
              <label class="form-label">Nama Proyek / Kampanye</label>
              <select id="progress-campaign-select" class="form-select">
                <option value="camp_001">Restorasi Hulu Tuk Bismo (1.000 Pohon Beringin)</option>
                <option value="camp_002">Pembangunan Bak Penangkap Tuk Silumut</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Judul Aktivitas</label>
              <input type="text" id="progress-activity-title" class="form-input" placeholder="Contoh: Pemasangan bronjong penahan longsor di hulu..." required>
            </div>

            <div class="form-group">
              <label class="form-label">Catatan Dokumentasi</label>
              <textarea id="progress-activity-desc" class="form-textarea" rows="2" placeholder="Jelaskan progres pekerjaan fisik hari ini..." required></textarea>
            </div>

            <button type="submit" id="btn-publish-progress" class="btn btn-primary" style="width: 100%;">
              Publikasi Dokumentasi ke Timeline
            </button>
          </form>

          <!-- Timeline Preview -->
          <div style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem;">
            Dokumentasi Terbaru di Lapangan
          </div>
          ${state.campaigns[0].timelineUpdates.map(u => `
            <div style="background: var(--color-beige); border-radius: var(--radius-sm); padding: 0.875rem; margin-bottom: 0.5rem; font-size: 0.8125rem;">
              <div style="display: flex; justify-content: space-between; font-weight: 600;">
                <span>${u.title}</span>
                <span style="color: var(--color-muted); font-size: 0.75rem;">${u.date}</span>
              </div>
              <p style="color: var(--color-muted); font-size: 0.75rem; margin-top: 0.25rem;">${u.note}</p>
            </div>
          `).join('')}
        </div>

      </div>
    </div>
  `;
}

export function attachPengelolaListeners(container) {
  if (!container) return;

  const meterForm = container.querySelector('#form-meter-reading');
  if (meterForm) {
    meterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const resident = container.querySelector('#meter-resident-select').value;
      const m3 = Number(container.querySelector('#input-meter-m3').value) || 15;
      const payType = container.querySelector('#input-pay-type').value;

      const state = getStore();
      const amount = 20000;
      const isCash = payType.includes('Tunai');

      const fin = {
        ...state.villageFinances,
        totalCollected: isCash ? state.villageFinances.totalCollected + amount : state.villageFinances.totalCollected,
        maintenanceFundBalance: isCash ? state.villageFinances.maintenanceFundBalance + amount : state.villageFinances.maintenanceFundBalance
      };

      updateStore({ villageFinances: fin });
      alert(`Pencatatan berhasil untuk ${resident}! Tagihan Rp 20.000 (${m3} m³) telah dibuat dengan status: ${isCash ? 'Lunas Tunai' : 'Menunggu Bayar'}.`);
    });
  }

  const progForm = container.querySelector('#form-conservation-progress');
  if (progForm) {
    progForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const campId = container.querySelector('#progress-campaign-select').value;
      const title = container.querySelector('#progress-activity-title').value.trim();
      const desc = container.querySelector('#progress-activity-desc').value.trim();

      const state = getStore();
      const campaigns = state.campaigns.map(c => {
        if (c.id === campId) {
          const newUpdate = {
            date: 'Hari Ini (21 Nov 2026)',
            title: title,
            photo: '/assets/images/home-adus.webp',
            note: desc
          };
          return {
            ...c,
            timelineUpdates: [newUpdate, ...c.timelineUpdates]
          };
        }
        return c;
      });

      updateStore({ campaigns });
      alert('Dokumentasi progres berhasil dipublikasikan ke Garis Waktu Dampak!');
      container.querySelector('#progress-activity-title').value = '';
      container.querySelector('#progress-activity-desc').value = '';
    });
  }
}
