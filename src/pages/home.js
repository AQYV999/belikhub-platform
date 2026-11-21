export function renderHomePage() {
  return `
    <main class="page-home">
      <!-- Section A — Hero -->
      <section class="doorway-hero">
        <div class="container">
          <div class="hero-content">
            <span class="eyebrow">Water Conservation & Watershed Restoration</span>
            <h1>Water begins long before it reaches the tap.</h1>
            <p class="lead" style="margin-top: 1.5rem;">
              Healthy water sources depend on healthy ecosystems. BelikHub brings together monitoring, local communities, and conservation to protect them.
            </p>
            <div class="hero-actions">
              <a href="#solutions" class="btn btn-primary" data-route="solutions">Explore our solutions</a>
              <a href="#partner" class="btn btn-secondary" data-route="partner">Partner with us</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section B — Solutions Showcase -->
      <section class="section">
        <div class="container">
          <div style="max-width: 600px; margin-bottom: 2rem;">
            <span class="eyebrow">Our Solutions</span>
            <h2>Two complementary approaches to water security.</h2>
          </div>

          <div class="solutions-grid">
            <!-- Card 1: Belik Sense -->
            <div class="solution-card">
              <img src="/assets/images/home-adus.webp" alt="Belik Sense Field Telemetry" class="solution-card-image" loading="lazy">
              <div class="solution-card-body">
                <span class="eyebrow">Telemetry & Earth Observation</span>
                <h3>Belik Sense</h3>
                <p>
                  Understand the condition of water sources through field measurements and satellite-based ecosystem observation.
                </p>
                <a href="#solutions-sense" class="btn btn-secondary" data-route="solutions-sense" style="align-self: flex-start;">
                  Explore Belik Sense →
                </a>
              </div>
            </div>

            <!-- Card 2: Conservation Services -->
            <div class="solution-card">
              <img src="/assets/images/community.webp" alt="Community Conservation Work" class="solution-card-image" loading="lazy">
              <div class="solution-card-body">
                <span class="eyebrow">Community & Restoration</span>
                <h3>Conservation Services</h3>
                <p>
                  Support the restoration and long-term management of the landscapes that sustain local water sources.
                </p>
                <a href="#solutions-conservation" class="btn btn-secondary" data-route="solutions-conservation" style="align-self: flex-start;">
                  Explore Conservation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section C — Brand Statement -->
      <section class="section" style="background-color: var(--color-beige); text-align: center;">
        <div class="container" style="max-width: 900px; padding: 3rem 1.5rem;">
          <h2 style="font-size: clamp(1.75rem, 3.2vw, 2.75rem); line-height: 1.3;">
            “Water conservation is not only about protecting the source. It is about protecting everything that sustains it.”
          </h2>
          <p style="margin-top: 1.5rem; color: var(--color-muted); font-size: 1.125rem;">
            BelikHub connects field hydrologic reality with community water stewardship in Batang Regency, Central Java.
          </p>
        </div>
      </section>

      <!-- Section D — How It Works -->
      <section class="section">
        <div class="container">
          <div style="max-width: 600px;">
            <span class="eyebrow">Methodology</span>
            <h2>How It Works</h2>
            <p class="lead" style="margin-top: 0.75rem;">
              A four-stage framework connecting upstream telemetry to long-term watershed resilience.
            </p>
          </div>

          <div class="how-it-works-grid">
            <div class="step-card">
              <div class="step-num">01 — Monitor</div>
              <h3>Field Data</h3>
              <p class="text-muted">Measure water flow and collect field data using offline, solar-powered data loggers at spring collection boxes.</p>
            </div>

            <div class="step-card">
              <div class="step-num">02 — Understand</div>
              <h3>Remote Sensing</h3>
              <p class="text-muted">Observe watershed vegetation conditions using satellite imagery (Sentinel-2 NDVI) to track canopy density changes.</p>
            </div>

            <div class="step-card">
              <div class="step-num">03 — Restore</div>
              <h3>Community Action</h3>
              <p class="text-muted">Support community-led ecosystem restoration and maintenance through tree planting, rorak digging, and pipe maintenance.</p>
            </div>

            <div class="step-card">
              <div class="step-num">04 — Sustain</div>
              <h3>Partnerships</h3>
              <p class="text-muted">Develop partnerships and sustainable funding mechanisms with village water councils (BUMDes Tirta) and CSR partners.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section E — Projects Showcase -->
      <section class="section" style="background-color: #FFFFFF; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: gap; margin-bottom: 2.5rem;">
            <div>
              <span class="eyebrow">Field Locations</span>
              <h2>Pilot Watersheds in Batang</h2>
            </div>
            <a href="#projects" class="btn btn-secondary" data-route="projects">View all projects →</a>
          </div>

          <div class="projects-grid">
            <div class="project-card">
              <img src="/assets/images/home-homes.webp" alt="Tuk Bismo Spring" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <span class="project-badge">Pilot project — ongoing</span>
                <h3>Tuk Bismo Watershed</h3>
                <p class="text-muted">Desa Bismo, Kecamatan Blado. Baseline discharge: 25.0 L/s serving 380 households. Reforestation focused on Ficus benjamina buffer.</p>
              </div>
            </div>

            <div class="project-card">
              <img src="/assets/images/home-multifamily.webp" alt="Tuk Silumut Spring" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <span class="project-badge">Pilot project — ongoing</span>
                <h3>Tuk Silumut Watershed</h3>
                <p class="text-muted">Desa Wonomerto, Kecamatan Blado. Baseline discharge: 20.0 L/s serving 295 households. Catchment wall stabilization and sand filtration.</p>
              </div>
            </div>

            <div class="project-card">
              <img src="/assets/images/home-adus.webp" alt="Tuk Luwung Spring" class="project-card-image" loading="lazy">
              <div class="project-card-body">
                <span class="project-badge">Pilot project — planned</span>
                <h3>Tuk Luwung Watershed</h3>
                <p class="text-muted">Desa Bismo, Kecamatan Blado. Historical 16.0 L/s spring requiring sediment trap restoration and joint pipe inspection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section F — Partnership CTA -->
      <section class="section" style="text-align: center;">
        <div class="container" style="max-width: 760px;">
          <span class="eyebrow">Collaborate With Us</span>
          <h2>Let's protect the ecosystems that sustain our water.</h2>
          <p class="lead" style="margin-top: 1rem; margin-bottom: 2rem;">
            Work with BelikHub to support water monitoring, watershed restoration, and long-term conservation in Batang and beyond.
          </p>
          <a href="#partner" class="btn btn-primary" data-route="partner" style="padding: 1rem 2.25rem;">
            Partner with us →
          </a>
        </div>
      </section>

      <!-- Section G — Footer -->
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="nav-logo" style="margin-bottom: 1rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-evergreen);">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <span>BelikHub</span>
              </div>
              <p>
                Platform Konservasi & Tata Kelola Retribusi Mata Air Komunitas. Bermitra dengan PDAM Kabupaten Batang untuk Conrad Challenge 2026.
              </p>
            </div>

            <div class="footer-col">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#solutions-sense" data-route="solutions-sense">Belik Sense</a></li>
                <li><a href="#solutions-conservation" data-route="solutions-conservation">Conservation Services</a></li>
                <li><a href="#solutions" data-route="solutions">Field Architecture</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Platform</h4>
              <ul>
                <li><a href="#projects" data-route="projects">Projects Portfolio</a></li>
                <li><a href="#about" data-route="about">About BelikHub</a></li>
                <li><a href="#partner" data-route="partner">Partner With Us</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><span>Kecamatan Blado</span></li>
                <li><span>Kabupaten Batang, Jawa Tengah</span></li>
                <li><a href="mailto:contact@belikhub.org">contact@belikhub.org</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <span>Copyright 2026 BelikHub. All rights reserved.</span>
            <span>Protecting the ecosystems that sustain our water.</span>
          </div>
        </div>
      </footer>
    </main>
  `;
}
