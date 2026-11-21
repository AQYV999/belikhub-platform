import { getStore, updateStore } from '../../store.js';

export function renderDonaturView() {
  const state = getStore();

  return `
    <div class="role-view donatur-view container" style="padding-top: 1.5rem; padding-bottom: 4rem; max-width: 960px;">
      
      <!-- Apple Health Top Header -->
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="pulsing-dot emerald"></span>
          <span style="font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--apple-emerald);">
            Mitra Konservasi & CSR • Lereng Dieng Utara
          </span>
        </div>
        <h1 style="font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; margin: 0; color: var(--apple-text-primary);">
          Restorasi Ekosistem Air
        </h1>
        <p style="font-size: 0.9375rem; color: var(--apple-text-secondary); margin-top: 0.25rem;">
          Dukung Reboisasi Sabuk Hijau & Pembangunan Penangkap Air dengan Transparansi 100%
        </p>
      </div>

      <!-- Campaign Inset Cards (Apple Health Target Style) -->
      <div class="apple-section-header">Katalog Kampanye Terbuka</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
        ${state.campaigns.map(c => `
          <div class="apple-inset-group" style="overflow: hidden; margin-bottom: 0;">
            <img src="${c.id === 'camp_001' ? '/assets/images/community.webp' : '/assets/images/home-multifamily.webp'}" alt="${c.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block;" loading="lazy">
            <div style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span class="pulsing-dot emerald"></span>
                  <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--apple-emerald);">
                    ${c.status === 'active' ? 'Aktif Berjalan' : 'Tercapai'}
                  </span>
                </div>
                <span style="font-size: 0.75rem; color: var(--apple-text-secondary); font-variant-numeric: tabular-nums;">
                  Sisa ${c.daysLeft} Hari
                </span>
              </div>

              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--apple-text-primary); margin: 0 0 0.5rem 0; line-height: 1.35;">
                ${c.title}
              </h3>
              <p style="font-size: 0.8125rem; color: var(--apple-text-secondary); line-height: 1.45; margin: 0 0 1.25rem 0;">
                ${c.description}
              </p>

              <!-- Smooth Progress Bar -->
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--apple-hairline);">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                  <div class="apple-stat-big" style="font-size: 1.35rem;">
                    Rp ${(c.collectedAmount).toLocaleString('id-ID')}
                  </div>
                  <span style="font-size: 0.75rem; color: var(--apple-text-secondary); font-variant-numeric: tabular-nums;">
                    Target Rp ${(c.targetAmount).toLocaleString('id-ID')}
                  </span>
                </div>

                <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.06); border-radius: 9999px; overflow: hidden;">
                  <div style="width: ${c.progressPercent}%; height: 100%; background: var(--apple-emerald); border-radius: 9999px; transition: width 0.5s ease;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--apple-text-tertiary); margin-top: 0.5rem;">
                  <span style="font-weight: 600; color: var(--apple-emerald); font-variant-numeric: tabular-nums;">${c.progressPercent}% Tercapai</span>
                  <span>Verifikasi BUMDes Tirta</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Two Column: Checkout & Timeline -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 1.5rem;">
        
        <!-- Form Donasi Apple-style -->
        <div>
          <div class="apple-section-header">Donasi Konservasi</div>
          <div class="apple-inset-group">
            <form id="form-donate" onsubmit="event.preventDefault();" style="padding: 1.25rem 1.5rem;">
              <div style="font-size: 0.875rem; color: var(--apple-text-secondary); margin-bottom: 1.25rem; line-height: 1.45;">
                Dukungan Anda dialokasikan langsung untuk bibit beringin, rumput vetiver, dan perbaikan penahan tebing air.
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="donate-campaign" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Program Restorasi
                </label>
                <select id="donate-campaign" class="form-select" style="font-size: 0.9375rem; border-radius: 10px;">
                  ${state.campaigns.map(c => `
                    <option value="${c.id}">${c.title}</option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Tipe Donatur
                </label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <label style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.65rem; border: 1px solid var(--apple-hairline); border-radius: 10px; font-size: 0.8125rem; font-weight: 500; cursor: pointer; background: #FFFFFF;">
                    <input type="radio" name="donor-type" value="individu" checked> Individu
                  </label>
                  <label style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.65rem; border: 1px solid var(--apple-hairline); border-radius: 10px; font-size: 0.8125rem; font-weight: 500; cursor: pointer; background: #FFFFFF;">
                    <input type="radio" name="donor-type" value="csr"> CSR Korporasi
                  </label>
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="donor-name" class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Nama Lengkap / Perusahaan
                </label>
                <input type="text" id="donor-name" class="form-input" placeholder="Nama Donatur atau Entitas CSR" style="border-radius: 10px;" required>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Nominal Donasi
                </label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.5rem;">
                  <button type="button" class="apple-button-secondary btn-quick-amount" data-amount="50000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 50 rb</button>
                  <button type="button" class="apple-button-secondary btn-quick-amount" data-amount="250000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 250 rb</button>
                  <button type="button" class="apple-button-secondary btn-quick-amount" data-amount="1000000" style="font-size: 0.8125rem; padding: 0.5rem;">Rp 1 Juta</button>
                </div>
                <input type="number" id="donor-amount" class="form-input" value="100000" min="10000" style="border-radius: 10px; font-variant-numeric: tabular-nums;" required>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-size: 0.8125rem; color: var(--apple-text-secondary);">
                  Kanal Pembayaran
                </label>
                <select id="donor-payment-channel" class="form-select" style="font-size: 0.875rem; border-radius: 10px;">
                  <option value="qris">QRIS Instan (GoPay, OVO, BCA, Livin)</option>
                  <option value="transfer">Transfer Rekening Mandiri BUMDes Tirta</option>
                </select>
              </div>

              <button type="submit" id="btn-submit-donation" class="apple-button-primary" style="width: 100%;">
                Bayar & Dapatkan Sertifikat
              </button>
            </form>
          </div>
        </div>

        <!-- Impact Timeline & Green Certificate -->
        <div>
          <div class="apple-section-header">Garis Waktu Dampak Lapangan</div>
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

          <!-- Digital Green Certificate Mockup -->
          <div class="apple-section-header" style="margin-top: 1.5rem;">Sertifikat Adopsi Pohon</div>
          <div class="apple-inset-group" style="padding: 1.5rem; text-align: center;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: rgba(5,150,105,0.1); margin-bottom: 0.75rem;">
              <span style="font-size: 1.5rem;">🌱</span>
            </div>
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--apple-text-primary); margin-bottom: 0.25rem;">
              Green Adoption Certificate
            </div>
            <div style="font-size: 0.8125rem; color: var(--apple-text-secondary); margin-bottom: 1rem;">
              Tiap donasi tercatat abadi dan terverifikasi di buku kas konservasi BUMDes Tirta Bismo.
            </div>
            <button class="apple-button-secondary" style="font-size: 0.8125rem; padding: 0.45rem 1rem;" onclick="alert('Sertifikat Digital Konservasi BelikHub diterbitkan atas nama Anda!')">
              Unduh E-Sertifikat
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachDonaturListeners(container) {
  if (!container) return;

  // Preset buttons
  const buttons = container.querySelectorAll('.btn-quick-amount');
  const amountInput = container.querySelector('#donor-amount');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (amountInput) {
        amountInput.value = btn.dataset.amount;
      }
    });
  });

  const form = container.querySelector('#form-donate');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const campaignId = container.querySelector('#donate-campaign').value;
      const donorName = container.querySelector('#donor-name').value.trim();
      const amount = Number(container.querySelector('#donor-amount').value) || 50000;
      const paymentChannel = container.querySelector('#donor-payment-channel').value;

      const state = getStore();

      // Update campaigns collected
      const campaigns = state.campaigns.map(c => {
        if (c.id === campaignId) {
          const newCollected = c.collectedAmount + amount;
          return {
            ...c,
            collectedAmount: newCollected,
            progressPercent: Math.min(100, Math.round((newCollected / c.targetAmount) * 100))
          };
        }
        return c;
      });

      // New donation transaction
      const newDonation = {
        id: `don_${Date.now()}`,
        campaignId,
        donorName,
        amount,
        paymentChannel,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      updateStore({
        campaigns,
        donations: [newDonation, ...state.donations]
      });

      alert(`Terima kasih atas donasi sebesar Rp ${amount.toLocaleString('id-ID')} untuk restorasi mata air Batang! Status kini tersimpan di antrean verifikasi.`);
    });
  }
}
