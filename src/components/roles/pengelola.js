import { getStore, updateStore } from '../../store.js';

export function renderPengelolaView() {
  const state = getStore();
  const fin = state.villageFinances;

  return `
    <div class="role-view pengelola-view container" style="padding-top: 1.5rem; padding-bottom: 4rem; max-width: 960px;">
      
      <!-- Apple Health Top Header -->
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="pulsing-dot emerald"></span>
          <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-emerald);">
            BUMDes Tirta • Desa Bismo
          </span>
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; margin: 0; color: var(--apple-text-primary);">
          Tata Kelola Kas Air
        </h1>
        <p style="font-size: 0.9375rem; color: var(--apple-text-secondary); margin-top: 0.25rem;">
          Unit Usaha Pengelolaan Air Bersih Komunitas • Kec. Blado, Batang
        </p>
      </div>

      <!-- Hero Macro Metric Cards (Apple Health Highlights) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        
        <!-- Collection Rate -->
        <div class="apple-inset-group" style="padding: 1.25rem 1.5rem; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-text-secondary);">
              Collection Rate
            </span>
            <span class="pulsing-dot emerald"></span>
          </div>
          <div class="apple-stat-big" style="color: var(--apple-emerald); margin: 0.35rem 0;">
            ${fin.collectionRate}<span class="unit">%</span>
          </div>
          <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
            Target desa: &gt;80% • Tertagih bulan ini
          </div>
        </div>

        <!-- Uang Terkumpul -->
        <div class="apple-inset-group" style="padding: 1.25rem 1.5rem; margin-bottom: 0;">
          <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-text-secondary);">
            Penerimaan / Target
          </span>
          <div class="apple-stat-big" style="font-size: 1.85rem; margin: 0.35rem 0;">
            Rp ${(fin.totalCollected).toLocaleString('id-ID')}
          </div>
          <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
            dari total target Rp ${(fin.totalTarget).toLocaleString('id-ID')} (380 KK)
          </div>
        </div>

        <!-- Saldo Kas Pemeliharaan -->
        <div class="apple-inset-group" style="padding: 1.25rem 1.5rem; margin-bottom: 0;">
          <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-text-secondary);">
            Dana Darurat Pipa
          </span>
          <div class="apple-stat-big" style="font-size: 1.85rem; color: var(--apple-text-primary); margin: 0.35rem 0;">
            Rp ${(fin.maintenanceFundBalance).toLocaleString('id-ID')}
          </div>
          <div style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
            Cadangan operasional pipa & sedimentasi
          </div>
        </div>

      </div>

      <!-- Two Columns: Single-hand Meter Entry & Conservation Progress -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 1.5rem;">
        
        <!-- Column 1: Meter Reading & Direct Collection -->
        <div>
          <div class="apple-section-header">Pencatatan Meteran Warga</div>
          <div class="apple-inset-group">
            <form id="form-meter-reading" onsubmit="event.preventDefault();" style="padding: 1.25rem 1.5rem;">
              <div style="font-size: 0.875rem; color: var(--apple-text-secondary); margin-bottom: 1.25rem; line-height: 1.45;">
                Catat pembacaan meter kubikasi (m³) fisik bulanan untuk menerbitkan tagihan resmi secara otomatis.
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="meter-resident-select" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Kepala Keluarga / ID Sambungan
                </label>
                <select id="meter-resident-select" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                  <option value="Bapak Slamet Raharjo (BSM-8921)">Bapak Slamet Raharjo — BSM-8921 (RT 01)</option>
                  <option value="Ibu Siti Aminah (BSM-8922)">Ibu Siti Aminah — BSM-8922 (RT 01)</option>
                  <option value="Bapak Joko Wahyudi (BSM-8923)">Bapak Joko Wahyudi — BSM-8923 (RT 02)</option>
                  <option value="Bapak Suwarno (BSM-8924)">Bapak Suwarno — BSM-8924 (RT 02)</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
                <div>
                  <label for="input-meter-m3" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                    Angka Meter (m³)
                  </label>
                  <input type="number" id="input-meter-m3" class="form-input" value="18" min="1" max="100" style="border-radius: 10px; font-variant-numeric: tabular-nums;" required>
                </div>
                <div>
                  <label for="input-pay-type" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                    Metode Bayar
                  </label>
                  <select id="input-pay-type" class="form-select" style="font-size: 0.875rem; border-radius: 10px;">
                    <option value="Tunai">Bayar Tunai</option>
                    <option value="Tagihan QRIS">Tagihan QRIS</option>
                  </select>
                </div>
              </div>

              <button type="submit" id="btn-save-meter" class="apple-button-primary" style="width: 100%;">
                Simpan & Terbitkan Tagihan
              </button>
            </form>
          </div>

          <!-- Quick Tap Inset List: Status Warga -->
          <div class="apple-section-header">Status Sambungan Rumah (Bismo RT 01 & 02)</div>
          <div class="apple-inset-group">
            <div class="apple-cell">
              <div>
                <div style="font-weight: 600; font-size: 0.9375rem; color: var(--apple-text-primary);">
                  Bapak Slamet Raharjo
                </div>
                <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin-top: 2px;">
                  BSM-8921 • 16 m³
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <span class="pulsing-dot emerald"></span>
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--apple-emerald);">Lunas QRIS</span>
              </div>
            </div>

            <div class="apple-cell">
              <div>
                <div style="font-weight: 600; font-size: 0.9375rem; color: var(--apple-text-primary);">
                  Ibu Siti Aminah
                </div>
                <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin-top: 2px;">
                  BSM-8922 • 14 m³ • Rp 20.000
                </div>
              </div>
              <button class="apple-button-secondary btn-cash-collect" style="padding: 0.45rem 0.85rem; font-size: 0.8125rem;" onclick="alert('Penerimaan bayar tunai Rp 20.000 dari Ibu Siti Aminah berhasil dicatat! Kas desa bertambah.')">
                Catat Tunai
              </button>
            </div>

            <div class="apple-cell">
              <div>
                <div style="font-weight: 600; font-size: 0.9375rem; color: var(--apple-text-primary);">
                  Bapak Joko Wahyudi
                </div>
                <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin-top: 2px;">
                  BSM-8923 • 15 m³ • Rp 20.000
                </div>
              </div>
              <button class="apple-button-secondary btn-cash-collect" style="padding: 0.45rem 0.85rem; font-size: 0.8125rem;" onclick="alert('Penerimaan bayar tunai Rp 20.000 dari Bapak Joko Wahyudi berhasil dicatat! Kas desa bertambah.')">
                Catat Tunai
              </button>
            </div>
          </div>
        </div>

        <!-- Column 2: Conservation Publishing & Timeline -->
        <div>
          <div class="apple-section-header">Publikasi Progres Fisik</div>
          <div class="apple-inset-group">
            <form id="form-conservation-progress" onsubmit="event.preventDefault();" style="padding: 1.25rem 1.5rem;">
              <div style="font-size: 0.875rem; color: var(--apple-text-secondary); margin-bottom: 1.25rem; line-height: 1.45;">
                Unggah dokumentasi fisik (penanaman bibit/bronjong batu) agar langsung muncul di timeline donatur dan audit admin.
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="progress-campaign-select" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Program Restorasi Sasaran
                </label>
                <select id="progress-campaign-select" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                  <option value="camp_001">Restorasi Hulu Tuk Bismo (1.000 Pohon Beringin)</option>
                  <option value="camp_002">Pembangunan Bak Penangkap & Bronjong Tuk Silumut</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="progress-activity-title" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Judul Aktivitas Kegiatan
                </label>
                <input type="text" id="progress-activity-title" class="form-input" placeholder="Contoh: Pemasangan bronjong penahan longsor..." style="border-radius: 10px;" required>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="progress-activity-desc" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Catatan Dokumentasi Lapangan
                </label>
                <textarea id="progress-activity-desc" class="form-textarea" rows="3" placeholder="Jelaskan progres pekerjaan fisik yang telah diselesaikan..." style="border-radius: 10px;" required></textarea>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Foto Dokumentasi Fisik
                </label>
                <input type="file" id="progress-photo" class="form-input" accept="image/*" style="font-size: 0.8125rem; border-radius: 10px;">
              </div>

              <button type="submit" id="btn-publish-progress" class="apple-button-primary" style="width: 100%;">
                Publikasikan ke Timeline
              </button>
            </form>
          </div>

          <!-- Timeline Updates Inset Group -->
          <div class="apple-section-header">Dokumentasi Terbit Terkini</div>
          <div class="apple-inset-group">
            ${state.campaigns[0].timelineUpdates.map(u => `
              <div class="apple-cell" style="flex-direction: column; align-items: flex-start; gap: 0.35rem;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: baseline;">
                  <span style="font-weight: 600; font-size: 0.9375rem; color: var(--apple-text-primary);">${u.title}</span>
                  <span style="font-size: 0.75rem; color: var(--apple-text-secondary);">${u.date}</span>
                </div>
                <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); line-height: 1.45;">
                  ${u.note}
                </div>
              </div>
            `).join('')}
          </div>
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
        maintenanceFundBalance: isCash ? state.villageFinances.maintenanceFundBalance + amount : state.villageFinances.maintenanceFundBalance,
        collectionRate: Math.min(100, Math.round(((state.villageFinances.totalCollected + (isCash ? amount : 0)) / state.villageFinances.totalTarget) * 100))
      };

      updateStore({ villageFinances: fin });
      alert(`Pencatatan meteran berhasil untuk ${resident} (${m3} m³)! Tagihan Rp 20.000 telah tercatat dengan status: ${isCash ? 'Lunas Tunai' : 'Tersimpan & Siap Dibayar'}.`);
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
      alert('Dokumentasi progres fisik berhasil dipublikasikan! Muncul di Impact Timeline Donatur & Admin.');
      container.querySelector('#progress-activity-title').value = '';
      container.querySelector('#progress-activity-desc').value = '';
    });
  }
}
