export function renderSolutionsPage() {
  return `
    <main class="page-solutions">
      <!-- Solutions Hero -->
      <section class="section" style="background-color: var(--color-beige); padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container" style="max-width: 880px;">
          <span class="eyebrow">Solutions & Technical Architecture</span>
          <h1>Understand your water source.</h1>
          <p class="lead" style="margin-top: 1.5rem;">
            Protecting mountain spring aquifers requires grounded physical measurements paired with wide-area landscape observation and community-led restoration.
          </p>
        </div>
      </section>

      <!-- Belik Sense Section -->
      <section class="section" id="belik-sense">
        <div class="container">
          <div style="max-width: 760px; margin-bottom: 3.5rem;">
            <span class="eyebrow">Hardware & Telemetry</span>
            <h2>Belik Sense</h2>
            <p class="lead" style="margin-top: 0.75rem;">
              Field-calibrated hydrologic logging combined with Sentinel-2 Earth observation to understand catchment dynamics.
            </p>
          </div>

          <!-- Hardware Architecture Grid -->
          <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(2rem, 4vw, 3.5rem); margin-bottom: 3rem;">
            <h3 style="margin-bottom: 1.5rem;">Physical System Specifications (Prototype)</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem;">
              <div style="padding: 1.5rem; background: var(--color-beige); border-radius: var(--radius-md);">
                <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-evergreen); text-transform: uppercase;">Compute & Control</div>
                <h4 style="margin: 0.5rem 0; font-size: 1.125rem;">ESP32 Microcontroller</h4>
                <p style="font-size: 0.875rem; color: var(--color-muted);">Ultra-low power deep sleep cycles with hardware interrupt counters for continuous hall-effect pulse logging.</p>
              </div>

              <div style="padding: 1.5rem; background: var(--color-beige); border-radius: var(--radius-md);">
                <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-evergreen); text-transform: uppercase;">Hydraulic Sensor</div>
                <h4 style="margin: 0.5rem 0; font-size: 1.125rem;">DN50 Brass Flow Meter</h4>
                <p style="font-size: 0.875rem; color: var(--color-muted);">In-line pulse flow meter installed at the primary spring capture box outlet, measuring 0.5 to 50 Liters/second.</p>
              </div>

              <div style="padding: 1.5rem; background: var(--color-beige); border-radius: var(--radius-md);">
                <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-evergreen); text-transform: uppercase;">Storage & Transport</div>
                <h4 style="margin: 0.5rem 0; font-size: 1.125rem;">Micro SD Card Logger</h4>
                <p style="font-size: 0.875rem; color: var(--color-muted);">Deterministic, fault-tolerant offline data logging in standard CSV format with time-stamped discharge series.</p>
              </div>

              <div style="padding: 1.5rem; background: var(--color-beige); border-radius: var(--radius-md);">
                <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-evergreen); text-transform: uppercase;">Autonomous Power</div>
                <h4 style="margin: 0.5rem 0; font-size: 1.125rem;">Solar Panel & Li-ion Pack</h4>
                <p style="font-size: 0.875rem; color: var(--color-muted);">10W Monocrystalline solar panel with MPPT charging circuit, engineered for mountain valleys with frequent mist.</p>
              </div>
            </div>

            <!-- Technical Disclosure Note -->
            <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(55, 80, 51, 0.06); border-left: 3px solid var(--color-evergreen); border-radius: 4px;">
              <strong style="color: var(--color-evergreen); display: block; margin-bottom: 0.4rem;">Scientific & Technical Integrity Statement:</strong>
              <p style="font-size: 0.875rem; color: var(--color-charcoal); line-height: 1.55;">
                The current Belik Sense prototype functions as an <strong>offline data logging system</strong>. Because deep ravines in Blado frequently lack reliable cellular signals, measurements are securely recorded locally onto SD media and synced during routine village patrol inspections. BelikHub does not make unsubstantiated claims of live cloud connectivity or automated AI diagnosis.
              </p>
            </div>
          </div>

          <!-- Satellite Observation Section -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; align-items: center; margin-top: 4rem;">
            <div>
              <span class="eyebrow">Landscape Remote Sensing</span>
              <h3>Sentinel-2 NDVI Vegetation Analysis</h3>
              <p style="margin-top: 1rem; color: var(--color-muted);">
                Ground telemetry measures water quantity at the spring orifice; satellite imagery observes the health of the recharge zone above it.
              </p>
              <ul style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; list-style: none;">
                <li style="display: flex; gap: 0.75rem;">
                  <span style="color: var(--color-evergreen); font-weight: bold;">✓</span>
                  <span><strong>Optical Bands 4 & 8:</strong> 10-meter spatial resolution monitoring of canopy cover around Tuk Bismo and Tuk Silumut.</span>
                </li>
                <li style="display: flex; gap: 0.75rem;">
                  <span style="color: var(--color-evergreen); font-weight: bold;">✓</span>
                  <span><strong>Ecosystem Observation:</strong> Detecting vegetation clearing, landslide scars, and canopy thinning before discharge drops.</span>
                </li>
                <li style="display: flex; gap: 0.75rem;">
                  <span style="color: var(--color-evergreen); font-weight: bold;">✓</span>
                  <span><strong>Honest Scope:</strong> Satellite imagery observes surface vegetation vigor; it does not measure underground aquifer depth or spring discharge directly.</span>
                </li>
              </ul>
            </div>
            <div>
              <img src="/assets/images/home-adus-2052.webp" alt="Sentinel 2 Earth Observation" style="border-radius: var(--radius-lg); border: 1px solid var(--color-border); width: 100%; aspect-ratio: 4/3; object-fit: cover;" loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <!-- Conservation Services Section -->
      <section class="section" id="conservation-services" style="background-color: #FFFFFF; border-top: 1px solid var(--color-border);">
        <div class="container">
          <div style="max-width: 760px; margin-bottom: 3.5rem;">
            <span class="eyebrow">Landscape Action & Community Stewardship</span>
            <h2>Conservation Services</h2>
            <p class="lead" style="margin-top: 0.75rem;">
              Transforming data into practical, community-managed restoration of the landscapes that feed local water supplies.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div class="step-card">
              <span class="step-num">01</span>
              <h3>Spring-Area Assessment</h3>
              <p class="text-muted">Comprehensive hydrological and geomorphological survey of spring catchment zones, georeferencing transmission routes and erosion hotspots.</p>
            </div>

            <div class="step-card">
              <span class="step-num">02</span>
              <h3>Tree Planting & Soil Bioengineering</h3>
              <p class="text-muted">Targeted reboisasi with native deep-root species (Ficus benjamina, Aren, Vetiver grass) to stabilize steep slopes and maximize aquifer recharge.</p>
            </div>

            <div class="step-card">
              <span class="step-num">03</span>
              <h3>Community Stewardship (BUMDes Tirta)</h3>
              <p class="text-muted">Empowering village water committees with digital meter recording, transparent retribution passes, and accountable maintenance funds.</p>
            </div>

            <div class="step-card">
              <span class="step-num">04</span>
              <h3>Institutional Partnerships</h3>
              <p class="text-muted">Aligning village conservation work with PDAM Kabupaten Batang and corporate CSR programs for long-term ecological and financial sustainability.</p>
            </div>
          </div>

          <div style="margin-top: 4rem; text-align: center;">
            <a href="#partner" class="btn btn-primary" data-route="partner" style="padding: 1rem 2rem;">
              Partner with BelikHub on a Watershed Project →
            </a>
          </div>
        </div>
      </section>
    </main>
  `;
}
