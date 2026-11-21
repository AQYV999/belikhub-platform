import { getStore, updateStore } from '../../store.js';

export function renderPengelolaView() {
  const state = getStore();
  const fin = state.villageFinances;

  return `
    <div class="role-view pengelola-view container" style="padding-top: 2rem; padding-bottom: 4rem;">
      <!-- Header Banner Role -->
      <div style="background: linear-gradient(135deg, rgba(55,80,51,0.08) 0%, rgba(253,253,247,0.6) 100%); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem 2.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span class="eyebrow" style="color: var(--color-evergreen);">Portal Pengelola • BUMDes Tirta Desa Bismo</span>
          <h1 style="font-size: clamp(1.75rem, 3vw, 2.5rem); margin-top: 0.25rem; margin-bottom: 0.5rem;">Dashboard Operasional & Tata Kelola Kas Air</h1>
          <p class="text-muted" style="font-size: 1rem;">
            Unit Usaha Pengelolaan Air Bersih Komunitas • Kecamatan Blado, Kabupaten Batang
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="background: #FFFFFF; padding: 0.875rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
            <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600; display: block;">Status Buku Kas</span>
            <span style="font-weight: 700; color: var(--color-evergreen); font-size: 1rem;">✓ Terbuka & Transparan</span>
          </div>
        </div>
      </div>

      <!-- KPI Metrics Iuran Desa -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-subtle); border-top: 4px solid var(--color-evergreen);">
          <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 700;">Collection Rate Iuran</span>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--color-evergreen); margin: 0.35rem 0;">${fin.collectionRate}%</div>
          <p style="font-size: 0.8125rem; color: var(--color-muted);">Persentase warga tertagih bulan ini (Target desa: >80%)</p>
        </div>

        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-subtle); border-top: 4px solid var(--color-charcoal);">
          <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 700;">Uang Terkumpul / Target</span>
          <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-black); margin: 0.35rem 0;">
            Rp ${(fin.totalCollected).toLocaleString('id-ID')}
          </div>
          <p style="font-size: 0.8125rem; color: var(--color-muted);">dari target iuran Rp ${(fin.totalTarget).toLocaleString('id-ID')} (380 KK)</p>
        </div>

        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-subtle); border-top: 4px solid #0096F7;">
          <span style="font-size: 0.8125rem; color: var(--color-muted); text-transform: uppercase; font-weight: 700;">Saldo Kas Pemeliharaan Pipa</span>
          <div style="font-size: 2rem; font-weight: 800; color: var(--color-evergreen); margin: 0.35rem 0;">
            Rp ${(fin.maintenanceFundBalance).toLocaleString('id-ID')}
          </div>
          <p style="font-size: 0.8125rem; color: var(--color-muted);">Cadangan dana darurat pipa bocor & pembersihan sedimen</p>
        </div>
      </div>

      <!-- Two Column: Meter Reading & Conservation Update -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 2rem;">
        
        <!-- Meter Reading & Cash Collection -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="eyebrow">Input Catatan Kubikasi</span>
            <span style="font-size: 0.75rem; background: var(--color-beige); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600;">Petugas Lapangan</span>
          </div>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Pencatatan Meteran Air Warga</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Masukkan pembacaan meter fisik kubikasi air bulanan dan terbitkan tagihan warga secara otomatis.
          </p>

          <form id="form-meter-reading" onsubmit="event.preventDefault();" style="margin-bottom: 2rem; background: var(--color-beige); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <div class="form-group">
              <label for="meter-resident-select" class="form-label">Kepala Keluarga / ID Sambungan</label>
              <select id="meter-resident-select" class="form-select">
                <option value="Bapak Slamet Raharjo (BSM-8921)">Bapak Slamet Raharjo — BSM-8921 (RT 01)</option>
                <option value="Ibu Siti Aminah (BSM-8922)">Ibu Siti Aminah — BSM-8922 (RT 01)</option>
                <option value="Bapak Joko Wahyudi (BSM-8923)">Bapak Joko Wahyudi — BSM-8923 (RT 02)</option>
                <option value="Bapak Suwarno (BSM-8924)">Bapak Suwarno — BSM-8924 (RT 02)</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label for="input-meter-m3" class="form-label">Angka Meter (m³)</label>
                <input type="number" id="input-meter-m3" class="form-input" value="18" min="1" max="100" required>
              </div>
              <div class="form-group">
                <label for="input-pay-type" class="form-label">Status Bayar</label>
                <select id="input-pay-type" class="form-select">
                  <option value="Tunai">Bayar Tunai di Kantor</option>
                  <option value="Tagihan QRIS">Terbitkan Tagihan QRIS</option>
                </select>
              </div>
            </div>

            <button type="submit" id="btn-save-meter" class="btn btn-primary" style="width: 100%; margin-top: 0.75rem; padding: 0.875rem;">
              💾 Simpan & Terbitkan Tagihan Resmi
            </button>
          </form>

          <!-- List KK Terdata Terkini & Cash Collection -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; color: var(--color-muted);">
              Daftar KK Sambungan Air (Bismo RT 01 & 02)
            </span>
            <span style="font-size: 0.75rem; color: var(--color-evergreen); font-weight: 600;">Status Terverifikasi</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem; border: 1px solid var(--color-border);">
              <div>
                <strong style="font-size: 0.875rem; display: block;">Bapak Slamet Raharjo</strong>
                <span style="color: var(--color-muted); font-size: 0.75rem;">ID: BSM-8921 • Pemakaian: 16 m³</span>
              </div>
              <span style="color: var(--color-evergreen); font-weight: 700; background: rgba(55,80,51,0.12); padding: 0.25rem 0.6rem; border-radius: var(--radius-full);">Lunas (QRIS)</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem; border: 1px solid var(--color-border);">
              <div>
                <strong style="font-size: 0.875rem; display: block;">Ibu Siti Aminah</strong>
                <span style="color: var(--color-muted); font-size: 0.75rem;">ID: BSM-8922 • Pemakaian: 14 m³ • Tagihan: Rp 20.000</span>
              </div>
              <button class="btn btn-secondary btn-cash-collect" style="padding: 0.4rem 0.85rem; font-size: 0.75rem; font-weight: 600;" onclick="alert('Penerimaan bayar tunai Rp 20.000 dari Ibu Siti Aminah berhasil dicatat! Kas desa bertambah.')">
                💵 Catat Bayar Tunai
              </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--color-beige); border-radius: var(--radius-sm); font-size: 0.8125rem; border: 1px solid var(--color-border);">
              <div>
                <strong style="font-size: 0.875rem; display: block;">Bapak Joko Wahyudi</strong>
                <span style="color: var(--color-muted); font-size: 0.75rem;">ID: BSM-8923 • Pemakaian: 15 m³ • Tagihan: Rp 20.000</span>
              </div>
              <button class="btn btn-secondary btn-cash-collect" style="padding: 0.4rem 0.85rem; font-size: 0.75rem; font-weight: 600;" onclick="alert('Penerimaan bayar tunai Rp 20.000 dari Bapak Joko Wahyudi berhasil dicatat! Kas desa bertambah.')">
                💵 Catat Bayar Tunai
              </button>
            </div>
          </div>
        </div>

        <!-- Publikasi Progres Konservasi Lapangan -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <span class="eyebrow" style="color: var(--color-evergreen);">Publikasi Lapangan & Transparansi</span>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Publikasi Progres Konservasi Fisik</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Unggah dokumentasi kegiatan fisik (penanaman bibit/bronjong batu) agar tampil di garis waktu dampak donatur dan admin.
          </p>

          <form id="form-conservation-progress" onsubmit="event.preventDefault();" style="margin-bottom: 2rem;">
            <div class="form-group">
              <label for="progress-campaign-select" class="form-label">Program Restorasi Sasaran</label>
              <select id="progress-campaign-select" class="form-select">
                <option value="camp_001">Restorasi Hulu Tuk Bismo (1.000 Pohon Beringin & Vetiver)</option>
                <option value="camp_002">Pembangunan Bak Penangkap & Bronjong Tuk Silumut</option>
              </select>
            </div>

            <div class="form-group">
              <label for="progress-activity-title" class="form-label">Judul Aktivitas Kegiatan</label>
              <input type="text" id="progress-activity-title" class="form-input" placeholder="Contoh: Pemasangan bronjong penahan longsor di hulu Tuk Bismo" required>
            </div>

            <div class="form-group">
              <label for="progress-activity-desc" class="form-label">Catatan Dokumentasi & Progres Lapangan</label>
              <textarea id="progress-activity-desc" class="form-textarea" rows="3" placeholder="Jelaskan progres pekerjaan fisik yang telah diselesaikan bersama warga..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Foto Dokumentasi Fisik</label>
              <input type="file" id="progress-photo" class="form-input" accept="image/*" style="font-size: 0.8125rem;">
            </div>

            <button type="submit" id="btn-publish-progress" class="btn btn-primary" style="width: 100%; padding: 0.875rem;">
              📢 Publikasikan Dokumentasi ke Garis Waktu
            </button>
          </form>

          <!-- Timeline Preview -->
          <div style="font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.75rem;">
            Dokumentasi Terbit Terkini
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${state.campaigns[0].timelineUpdates.map(u => `
              <div style="background: var(--color-beige); border-radius: var(--radius-sm); padding: 1rem; font-size: 0.8125rem; border: 1px solid var(--color-border);">
                <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 0.25rem;">
                  <span>${u.title}</span>
                  <span style="color: var(--color-muted); font-size: 0.75rem; font-weight: 500;">${u.date}</span>
                </div>
                <p style="color: var(--color-charcoal); font-size: 0.75rem; line-height: 1.45;">${u.note}</p>
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
