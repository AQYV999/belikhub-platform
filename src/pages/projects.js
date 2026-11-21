export function renderProjectsPage() {
  return `
    <main class="page-projects">
      <section class="section" style="background-color: var(--color-beige); padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container" style="max-width: 880px;">
          <span class="eyebrow">Portfolio & Field Sites</span>
          <h1>Projects</h1>
          <p class="lead" style="margin-top: 1.5rem;">
            Documenting verified spring conservation initiatives across the northern Dieng-Prau mountain watershed in Batang Regency.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="projects-grid">
            <!-- Project 1: Tuk Bismo -->
            <div class="project-card">
              <img src="/assets/images/home-homes.webp" alt="Tuk Bismo Spring Landscape" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="project-badge">Pilot project — ongoing</span>
                  <span style="font-size: 0.75rem; color: var(--color-muted);">1,420 mdpl</span>
                </div>
                <h3>Tuk Bismo</h3>
                <p style="font-size: 0.875rem; color: var(--color-charcoal); font-weight: 500;">
                  Desa Bismo, Kecamatan Blado, Kabupaten Batang
                </p>
                <p class="text-muted" style="font-size: 0.875rem;">
                  <strong>Conservation Focus:</strong> Reboisasi sabuk hijau 1.000 bibit Ficus & Vetiver, pembangunan rorak penahan limpasan air hujan, dan instalasi prototype flow logging Belik Sense.
                </p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.8125rem; display: flex; justify-content: space-between;">
                  <span>Baseline: <strong>25.0 L/s</strong></span>
                  <span>Current: <strong>24.5 L/s</strong></span>
                  <span>Beneficiaries: <strong>380 KK</strong></span>
                </div>
              </div>
            </div>

            <!-- Project 2: Tuk Silumut -->
            <div class="project-card">
              <img src="/assets/images/home-multifamily.webp" alt="Tuk Silumut Spring Landscape" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="project-badge">Pilot project — ongoing</span>
                  <span style="font-size: 0.75rem; color: var(--color-muted);">1,280 mdpl</span>
                </div>
                <h3>Tuk Silumut</h3>
                <p style="font-size: 0.875rem; color: var(--color-charcoal); font-weight: 500;">
                  Desa Wonomerto, Kecamatan Blado, Kabupaten Batang
                </p>
                <p class="text-muted" style="font-size: 0.875rem;">
                  <strong>Conservation Focus:</strong> Pembangunan bronjong batu kawat penahan longsor, pembersihan bak penangkap sedimentasi pasir, dan sosialisasi retribusi digital warga.
                </p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.8125rem; display: flex; justify-content: space-between;">
                  <span>Baseline: <strong>20.0 L/s</strong></span>
                  <span>Current: <strong>18.2 L/s</strong></span>
                  <span>Beneficiaries: <strong>295 KK</strong></span>
                </div>
              </div>
            </div>

            <!-- Project 3: Tuk Luwung -->
            <div class="project-card">
              <img src="/assets/images/home-adus.webp" alt="Tuk Luwung Spring Landscape" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="project-badge" style="background: rgba(255,189,0,0.15); color: #9A6F00;">Pilot project — planned</span>
                  <span style="font-size: 0.75rem; color: var(--color-muted);">1,350 mdpl</span>
                </div>
                <h3>Tuk Luwung</h3>
                <p style="font-size: 0.875rem; color: var(--color-charcoal); font-weight: 500;">
                  Desa Bismo, Kecamatan Blado, Kabupaten Batang
                </p>
                <p class="text-muted" style="font-size: 0.875rem;">
                  <strong>Conservation Focus:</strong> Restorasi vegetasi tegakan bambu petung hulu dan pemetaan transmisi pipa gravitasi sepanjang 3,2 km yang rentan patah akibat pergeseran tanah.
                </p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.8125rem; display: flex; justify-content: space-between;">
                  <span>Baseline: <strong>16.0 L/s</strong></span>
                  <span>Current: <strong>12.0 L/s</strong></span>
                  <span>Beneficiaries: <strong>185 KK</strong></span>
                </div>
              </div>
            </div>

            <!-- Project 4: Tuk Kalisari -->
            <div class="project-card">
              <img src="/assets/images/community.webp" alt="Tuk Kalisari Spring Landscape" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="project-badge" style="background: rgba(255,64,0,0.15); color: #CC3300;">Pilot project — planned</span>
                  <span style="font-size: 0.75rem; color: var(--color-muted);">1,560 mdpl</span>
                </div>
                <h3>Tuk Kalisari</h3>
                <p style="font-size: 0.875rem; color: var(--color-charcoal); font-weight: 500;">
                  Desa Gerlang, Kecamatan Blado, Kabupaten Batang
                </p>
                <p class="text-muted" style="font-size: 0.875rem;">
                  <strong>Conservation Focus:</strong> Pemulihan daerah tangkapan kritis akibat intensitas pertanian kentang lereng terjal, mitigasi pencemaran pestisida, dan pembentukan BUMDes Tirta Gerlang.
                </p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.8125rem; display: flex; justify-content: space-between;">
                  <span>Baseline: <strong>14.0 L/s</strong></span>
                  <span>Current: <strong>8.5 L/s</strong></span>
                  <span>Beneficiaries: <strong>210 KK</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}
