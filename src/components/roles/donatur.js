import { getStore, updateStore } from '../../store.js';

export function renderDonaturView() {
  const state = getStore();

  return `
    <div class="role-view donatur-view">
      <div style="margin-bottom: 2rem;">
        <span class="eyebrow" style="color: var(--color-evergreen);">Peran: Donatur (Publik & Program CSR Perusahaan)</span>
        <h2>Katalog Kampanye & Transparansi Dampak</h2>
        <p class="text-muted">Mendanai restorasi hulu mata air Batang dengan transparansi dokumentasi berkala dan sertifikat digital.</p>
      </div>

      <!-- Campaign Explorer -->
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1.25rem;">Katalog Kampanye Konservasi Aktif</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem;">
          ${state.campaigns.map(c => `
            <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column;">
              <img src="/assets/images/community.webp" alt="${c.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;" loading="lazy">
              <div style="padding: 1.75rem; display: flex; flex-direction: column; flex: 1;">
                <span class="project-badge" style="margin-bottom: 0.75rem;">Status: ${c.status === 'active' ? 'Aktif' : 'Tercapai'} • Sisa ${c.daysLeft} Hari</span>
                <h4 style="font-size: 1.125rem; font-weight: 600; line-height: 1.35; margin-bottom: 0.5rem;">${c.title}</h4>
                <p class="text-muted" style="font-size: 0.8125rem; margin-bottom: 1.25rem;">${c.description}</p>

                <!-- Progress Bar -->
                <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-border);">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.4rem;">
                    <strong>Rp ${(c.collectedAmount).toLocaleString('id-ID')}</strong>
                    <span style="color: var(--color-muted);">dari target Rp ${(c.targetAmount).toLocaleString('id-ID')}</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: var(--color-beige); border-radius: var(--radius-full); overflow: hidden;">
                    <div style="width: ${c.progressPercent}%; height: 100%; background: var(--color-evergreen); border-radius: var(--radius-full);"></div>
                  </div>
                  <div style="text-align: right; font-size: 0.75rem; color: var(--color-muted); margin-top: 0.35rem;">
                    ${c.progressPercent}% Terkumpul
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Two Column: Donation Form & Impact Timeline -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        
        <!-- Form Donasi & Checkout -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <span class="eyebrow">Checkout Donasi</span>
          <h3>Formulir Donasi Konservasi</h3>
          <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.5rem;">
            Dukungan dana Anda langsung disalurkan untuk bibit pohon dan perbaikan bak tangkap air.
          </p>

          <form id="form-donate" onsubmit="event.preventDefault();">
            <div class="form-group">
              <label class="form-label">Pilih Program Restorasi</label>
              <select id="donate-campaign" class="form-select">
                ${state.campaigns.map(c => `
                  <option value="${c.id}">${c.title}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Tipe Donatur</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.8125rem; cursor: pointer;">
                  <input type="radio" name="donor-type" value="individu" checked> Individu
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.8125rem; cursor: pointer;">
                  <input type="radio" name="donor-type" value="csr"> CSR Perusahaan
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Nama Donatur / Instansi</label>
              <input type="text" id="donate-name" class="form-input" placeholder="Nama Anda / Perusahaan" required>
            </div>

            <div class="form-group">
              <label class="form-label">Pilih Nominal Instan</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 0.75rem;">
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="25000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 25.000</button>
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="50000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 50.000</button>
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="100000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 100.000</button>
                <button type="button" class="btn btn-secondary btn-nominal" data-amount="500000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 500.000</button>
              </div>
              <input type="number" id="donate-custom-amount" class="form-input" placeholder="Atau nominal bebas (min. Rp 10.000)" min="10000" step="5000" required value="100000">
            </div>

            <div class="form-group">
              <label class="form-label">Metode Penyaluran</label>
              <select id="donate-payment-method" class="form-select">
                <option value="QRIS">QRIS Dinamis (Instan)</option>
                <option value="Transfer">Transfer Bank PDAM / Rekening Konservasi</option>
              </select>
            </div>

            <button type="submit" id="btn-submit-donation" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
              Lanjut ke Pembayaran & Dapatkan Sertifikat
            </button>
          </form>
        </div>

        <!-- Impact Timeline & Sertifikat Kontribusi Hijau -->
        <div>
          <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem;">
            <span class="eyebrow" style="color: var(--color-evergreen);">Garis Waktu Dampak</span>
            <h3>Impact Timeline Transparan</h3>
            <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.25rem; margin-bottom: 1.25rem;">
              Dokumentasi foto berkala dari realisasi bibit pohon & perbaikan fisik yang didanai donatur.
            </p>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${state.campaigns[0].timelineUpdates.map(t => `
                <div style="display: flex; gap: 1rem; background: var(--color-beige); padding: 1rem; border-radius: var(--radius-sm);">
                  <div style="min-width: 70px; text-align: center;">
                    <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-evergreen); display: block;">${t.date}</span>
                    <span style="font-size: 1.25rem;">🌱</span>
                  </div>
                  <div>
                    <h5 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.25rem;">${t.title}</h5>
                    <p style="font-size: 0.75rem; color: var(--color-muted);">${t.note}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Sertifikat Kontribusi Hijau Preview -->
          <div style="background: #FFFFFF; border: 2px solid var(--color-evergreen); border-radius: var(--radius-md); padding: 1.75rem; text-align: center;">
            <span style="font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-evergreen);">Digital Green Certificate</span>
            <h4 style="margin: 0.5rem 0; font-size: 1.125rem;">Sertifikat Pelestarian Ekosistem Air</h4>
            <p style="font-size: 0.8125rem; color: var(--color-muted); margin-bottom: 1rem;">
              Diterbitkan atas kolaborasi BelikHub dan PDAM Kabupaten Batang untuk pelestarian Tuk Bismo.
            </p>
            <div style="padding: 1rem; background: var(--color-beige); border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.8125rem; font-weight: 500;">
              No. Seri Sertifikat: <strong>BLK-CERT-2026-BATANG</strong>
            </div>
            <button class="btn btn-secondary" style="font-size: 0.8125rem; width: 100%;" onclick="alert('Mengunduh Sertifikat Kontribusi Hijau (PDF)...')">
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
      alert(`Terima kasih atas donasi sebesar Rp ${amount.toLocaleString('id-ID')} dari ${name}! Bukti transfer telah masuk ke Pusat Antrean Verifikasi Admin.`);
      container.querySelector('#donate-name').value = '';
    });
  }
}
