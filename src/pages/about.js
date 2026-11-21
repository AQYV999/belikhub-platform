export function renderAboutPage() {
  return `
    <main class="page-about">
      <section class="section" style="background-color: var(--color-beige); padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container" style="max-width: 880px;">
          <span class="eyebrow">Our Mission & Origins</span>
          <h1>About BelikHub</h1>
          <p class="lead" style="margin-top: 1.5rem;">
            Protecting the ecosystems that sustain our water.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container" style="max-width: 880px;">
          <div style="display: flex; flex-direction: column; gap: 2.5rem; font-size: 1.125rem; line-height: 1.7; color: var(--color-charcoal);">
            <div>
              <h2 style="margin-bottom: 1rem;">The Challenge in the Highlands of Batang</h2>
              <p>
                In the mountain villages of Kecamatan Blado (such as Desa Bismo and Desa Wonomerto), mountain springs—known locally as <em>belik</em>—are the lifeblood of rural communities and provide vital raw water supplies to PDAM Kabupaten Batang.
              </p>
              <p style="margin-top: 1rem;">
                However, deforestation on steep recharge slopes, uncontrolled sedimentation, and climate variability have caused seasonal discharge volatility. Furthermore, community pipe maintenance contributions are often collected manually via informal paper notebooks, resulting in payment arrears, insufficient maintenance reserves, and days-long delays when transmission pipes fracture in rugged ravines.
              </p>
            </div>

            <div style="padding: 2.5rem; background: var(--color-beige); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
              <span class="eyebrow">Conrad Challenge 2026 Initiative</span>
              <h3 style="margin-top: 0.5rem; margin-bottom: 1rem;">Innovating for Community Water Security</h3>
              <p style="font-size: 1rem; color: var(--color-charcoal);">
                BelikHub was engineered as a Conrad Challenge submission in partnership with <strong>PDAM Kabupaten Batang</strong>. The platform bridges the gap between hardware hydrologic observation and community financial transparency.
              </p>
              <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                <div>
                  <strong style="color: var(--color-evergreen); font-size: 1.25rem; display: block;">Data-Driven</strong>
                  <span style="font-size: 0.875rem; color: var(--color-muted);">Low-cost offline ESP32 flow logging paired with Sentinel-2 NDVI canopy observations.</span>
                </div>
                <div>
                  <strong style="color: var(--color-evergreen); font-size: 1.25rem; display: block;">Community-Led</strong>
                  <span style="font-size: 0.875rem; color: var(--color-muted);">Transparent retribution passes for BUMDes Tirta to secure predictable repair funds.</span>
                </div>
                <div>
                  <strong style="color: var(--color-evergreen); font-size: 1.25rem; display: block;">Collaborative</strong>
                  <span style="font-size: 0.875rem; color: var(--color-muted);">Linking residents, volunteer conservation patrols, CSR donors, and municipal PDAM engineers.</span>
                </div>
              </div>
            </div>

            <div>
              <h2 style="margin-bottom: 1rem;">Our Guiding Principles</h2>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 1.25rem;">
                <li style="display: flex; gap: 1rem;">
                  <span style="font-size: 1.5rem; color: var(--color-evergreen); font-weight: 300;">01</span>
                  <div>
                    <strong>We understand water through empirical ground reality.</strong>
                    <p style="font-size: 0.9375rem; color: var(--color-muted); margin-top: 0.25rem;">We build technology suited for mountain topographies: offline-first, solar-powered, and resilient.</p>
                  </div>
                </li>
                <li style="display: flex; gap: 1rem;">
                  <span style="font-size: 1.5rem; color: var(--color-evergreen); font-weight: 300;">02</span>
                  <div>
                    <strong>We support restoration of the ecosystems surrounding water sources.</strong>
                    <p style="font-size: 0.9375rem; color: var(--color-muted); margin-top: 0.25rem;">Conserving water requires safeguarding root systems, preventing landslides, and maintaining vegetative infiltration zones.</p>
                  </div>
                </li>
                <li style="display: flex; gap: 1rem;">
                  <span style="font-size: 1.5rem; color: var(--color-evergreen); font-weight: 300;">03</span>
                  <div>
                    <strong>We build sustainable, transparent partnerships.</strong>
                    <p style="font-size: 0.9375rem; color: var(--color-muted); margin-top: 0.25rem;">Every rupiah of community retribution and corporate CSR funding is tied to verifiable field milestones.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}
