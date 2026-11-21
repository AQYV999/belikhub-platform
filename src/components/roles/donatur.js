import { getStore, updateStore } from '../../store.js';

export function renderDonaturView() {
  const state = getStore();

  return `
    <div class="role-view donatur-view container" style="padding-top: 2rem; padding-bottom: 4rem;">
      <!-- Header Banner Role -->
      <div style="background: linear-gradient(135deg, rgba(55,80,51,0.08) 0%, rgba(253,253,247,0.6) 100%); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem 2.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span class="eyebrow" style="color: var(--color-evergreen);">Portal Donatur & Mitra CSR • Restorasi Ekosistem Air</span>
          <h1 style="font-size: clamp(1.75rem, 3vw, 2.5rem); margin-top: 0.25rem; margin-bottom: 0.5rem;">Katalog Kampanye & Transparansi Dampak Hijau</h1>
          <p class="text-muted" style="font-size: 1rem;">
            Dukung Reboisasi Sabuk Hijau & Pembangunan Penangkap Air di Lereng Gunung Dieng Utara
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="background: #FFFFFF; padding: 0.875rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-subtle);">
            <span style="font-size: 0.75rem; color: var(--color-muted); text-transform: uppercase; font-weight: 600; display: block;">Transparansi Penyaluran</span>
            <span style="font-weight: 700; color: var(--color-evergreen); font-size: 1rem;">100% Berbasis Bukti Foto</span>
          </div>
        </div>
      </div>

      <!-- Campaign Explorer -->
      <div style="margin-bottom: 3rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="eyebrow">Program Restorasi Terbuka</span>
            <h2 style="font-size: 1.5rem;">Katalog Kampanye Konservasi</h2>
          </div>
          <span style="font-size: 0.8125rem; color: var(--color-muted);">Mitra Kolaborasi: PDAM Batang & Desa Bismo/Wonomerto</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 2rem;">
          ${state.campaigns.map(c => `
            <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--shadow-subtle);">
              <img src="${c.id === 'camp_001' ? '/assets/images/community.webp' : '/assets/images/home-multifamily.webp'}" alt="${c.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;" loading="lazy">
              <div style="padding: 2rem; display: flex; flex-direction: column; flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span class="project-badge">Status: ${c.status === 'active' ? 'Aktif' : 'Tercapai'}</span>
                  <span style="font-size: 0.75rem; color: var(--color-muted); font-weight: 600;">⏳ Sisa ${c.daysLeft} Hari</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.5rem;">${c.title}</h3>
                <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem; line-height: 1.55;">${c.description}</p>

                <!-- Progress Bar -->
                <div style="margin-top: auto; padding-top: 1.25rem; border-top: 1px solid var(--color-border);">
                  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.5rem;">
                    <strong>Rp ${(c.collectedAmount).toLocaleString('id-ID')}</strong>
                    <span style="color: var(--color-muted);">Target: Rp ${(c.targetAmount).toLocaleString('id-ID')}</span>
                  </div>
                  <div style="width: 100%; height: 10px; background: var(--color-beige); border-radius: var(--radius-full); overflow: hidden;">
                    <div style="width: ${c.progressPercent}%; height: 100%; background: var(--color-evergreen); border-radius: var(--radius-full);"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-muted); margin-top: 0.5rem;">
                    <span>${c.progressPercent}% Tercapai</span>
                    <span>Terverifikasi BUMDes Tirta</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Two Column: Donation Form & Impact Timeline -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 2rem;">
        
        <!-- Form Donasi & Checkout -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-subtle);">
          <span class="eyebrow">Checkout Donasi Langsung</span>
          <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Formulir Donasi Konservasi</h2>
          <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
            Dukungan dana Anda langsung dibelanjakan untuk bibit pohon beringin, rumput vetiver, dan perbaikan penahan longsor.
          </p>

          <form id="form-donate" onsubmit="event.preventDefault();">
            <div class="form-group">
              <label for="donate-campaign" class="form-label">Pilih Program Restorasi</label>
              <select id="donate-campaign" class="form-select">
                ${state.campaigns.map(c => `
                  <option value="${c.id}">${c.title}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Tipe Donatur</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.8125rem; cursor: pointer; background: var(--color-beige);">
                  <input type="radio" name="donor-type" value="individu" checked> Individu / Pribadi
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.8125rem; cursor: pointer; background: var(--color-beige);">
                  <input type="radio" name="donor-type" value="csr"> CSR Perusahaan
                </label>
              </div>
            </div>

            <div class="form-group">
              <label for="donate-name" class="form-label">Nama Lengkap Donatur / Nama Instansi</label>
              <input type="text" id="donate-name" class="form-input" placeholder="Contoh: PT Batang Hijau Lestari" required>
            </div>

            <div class="form-group">
              <label class="form-label">Pilih Nominal Donasi Instan</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 0.75rem;">
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="25000" style="font-size: 0.8125rem; padding: 0.6rem;">Rp 25.000</button>
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="50000" style="font-size: 0.8125rem; padding: 0.6rem;">Rp 50.000</button>
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="100000" style="font-size: 0.8125rem; padding: 0.6rem;">Rp 100.000</button>
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="500000" style="font-size: 0.8125rem; padding: 0.6rem;">Rp 500.000</button>
              </div>
              <input type="number" id="donate-custom-amount" class="form-input" placeholder="Atau nominal bebas (minimal Rp 10.000)" min="10000" step="5000" required value="100000">
            </div>

            <div class="form-group">
              <label for="donate-payment-method" class="form-label">Metode Pembayaran</label>
              <select id="donate-payment-method" class="form-select">
                <option value="QRIS">QRIS Dinamis (Verifikasi Cepat)</option>
                <option value="Transfer">Transfer Rekening Khusus Konservasi PDAM Batang</option>
              </select>
            </div>

            <button type="submit" id="btn-submit-donation" class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.875rem;">
              💚 Salurkan Donasi & Terbitkan Sertifikat
            </button>
          </form>
        </div>

        <!-- Impact Timeline & Sertifikat Kontribusi Hijau -->
        <div>
          <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-subtle);">
            <span class="eyebrow" style="color: var(--color-evergreen);">Transparansi Garis Waktu Dampak</span>
            <h2 style="font-size: 1.375rem; margin-bottom: 0.5rem;">Impact Timeline Transparan</h2>
            <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.5rem;">
              Laporan berkala foto fisik pohon yang ditanam dan perbaikan struktur bak penangkap air.
            </p>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${state.campaigns[0].timelineUpdates.map(t => `
                <div style="display: flex; gap: 1rem; background: var(--color-beige); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                  <div style="min-width: 80px; text-align: center; border-right: 1px solid var(--color-border); padding-right: 0.75rem;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-evergreen); display: block;">${t.date}</span>
                    <span style="font-size: 1.5rem;">🌱</span>
                  </div>
                  <div>
                    <h4 style="font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.25rem;">${t.title}</h4>
                    <p style="font-size: 0.8125rem; color: var(--color-charcoal); line-height: 1.45;">${t.note}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Sertifikat Kontribusi Hijau Preview -->
          <div style="background: #FFFFFF; border: 2px solid var(--color-evergreen); border-radius: var(--radius-lg); padding: 2rem; text-align: center; box-shadow: var(--shadow-subtle);">
            <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-evergreen);">Official Digital Green Certificate</span>
            <h3 style="margin: 0.5rem 0; font-size: 1.25rem;">Sertifikat Pelestarian Ekosistem Air</h3>
            <p style="font-size: 0.875rem; color: var(--color-muted); margin-bottom: 1.25rem;">
              Bukti sah partisipasi pendanaan konservasi mata air Tuk Bismo bersama BUMDes Tirta & PDAM Kabupaten Batang.
            </p>
            <div style="padding: 1.25rem; background: var(--color-beige); border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-size: 0.875rem; font-weight: 600; border: 1px dashed var(--color-evergreen);">
              No. Registrasi Hijau: <strong>BLK-CERT-2026-BATANG-098</strong>
            </div>
            <button class="btn btn-secondary" style="font-size: 0.875rem; width: 100%; padding: 0.75rem;" onclick="alert('Mengunduh Sertifikat Kontribusi Hijau Digital (PDF Resmi)...')">
              📥 Unduh Tanda Terima & Sertifikat Digital
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachDonaturListeners(container) {
  if (!container) return;

  const nominalBtns = container.querySelectorAll('.btn-nominal');
  const customInput = container.querySelector('#donate-custom-amount');
  nominalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      customInput.value = btn.getAttribute('data-amount');
    });
  });

  const form = container.querySelector('#form-donate');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#donate-name').value.trim();
      const amount = Number(customInput.value) || 50000;
      const campId = container.querySelector('#donate-campaign').value;
      const type = container.querySelector('input[name="donor-type"]:checked').value;

      if (!name) {
        alert('Mohon isi nama donatur / instansi.');
        return;
      }

      const newDonation = {
        id: 'don_' + Date.now(),
        campaignId: campId,
        donorName: name,
        donorType: type,
        amount: amount,
        status: 'pending', // goes to admin verification queue
        date: new Date().toISOString(),
        referenceNo: 'DON-' + Math.floor(100000 + Math.random() * 900000)
      };

      const state = getStore();
      const donations = [newDonation, ...state.donations];

      // Update campaign collected amount
      const campaigns = state.campaigns.map(c => {
        if (c.id === campId) {
          const col = c.collectedAmount + amount;
          const pct = Math.min(100, Math.round((col / c.targetAmount) * 100));
          return { ...c, collectedAmount: col, progressPercent: pct };
        }
        return c;
      });

      updateStore({ donations, campaigns });
      alert(`Terima kasih! Donasi sebesar Rp ${amount.toLocaleString('id-ID')} dari ${name} telah masuk ke sistem. Bukti transfer sekarang sedang menunggu pengesahan di Pusat Antrean Admin PDAM.`);
      container.querySelector('#donate-name').value = '';
    });
  }
}
