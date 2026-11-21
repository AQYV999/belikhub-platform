# BelikHub Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform BelikHub into a world-class environmental technology website inspired by Samara's editorial minimalist design, complete with an interactive 5-Role Platform (Warga, Pengelola, Relawan, Donatur, Admin) and instant Demo Switcher Bar for Conrad Challenge judges.

**Architecture:** Client-side Single-Page Application (SPA) driven by Vite and Vanilla ES Modules with zero heavy framework bloat. Visual design uses Samara's exact Regola typography and CSS design tokens (`#FDFDF7`, `#375033`, `#262626`). An in-memory, reactive `store.js` backed by `localStorage` syncs all 5 roles in real time, accompanied by a deterministic "Reset Demo Data" mechanism for judges.

**Tech Stack:** HTML5 Semantic Markup, CSS Modern Variables & Container Queries, Vanilla JavaScript (ES Modules), Vite 5, Node.js test runner (`node:test`).

**Spec:** `docs/superpowers/specs/2026-11-21-belikhub-platform-design.md`

## Global Constraints

- Primary colors: Warm ivory `#FDFDF7`, Light beige `#F7F7F0`, Evergreen `#375033`, Charcoal `#262626`, Black `#111111`, Muted gray `#6B6B66`.
- Typography: Regola font family (`regola-light.woff2`, `regola-regular.woff2`, `regola-book.woff2`, `regola-medium.woff2`).
- Brand positioning: "Protecting the ecosystems that sustain our water." Never position as merely a hardware vendor.
- Honest hardware disclosures: Belik Sense prototype is strictly offline logging (ESP32, water flow meter, SD card, solar panel) with Sentinel-2 NDVI vegetation observation; no fake claims of real-time IoT cloud or direct satellite discharge measurement.
- GPS coordinates validation for Indonesia: Latitude -11.5 to 6.5, Longitude 94.0 to 141.5.
- All 5 user roles must be switchable in 1 click via the persistent top Demo Switcher Bar without page reload.

## Review Focus

1. **State mutation consistency between roles:** When Warga files a leak report, Relawan patrol list and Admin verification queue must immediately show it without reload.
2. **Deterministic demo reset:** Clicking "Reset Data Demo" must cleanly reset `localStorage` to factory seed data with no orphaned or corrupted state.
3. **GPS coordinate boundary handling:** Form submission in Relawan/Warga roles with coordinates outside Indonesia bounds must trigger a clear validation alert.
4. **Offline IoT fidelity:** Belik Sense views must clearly articulate the offline SD-logger & satellite observation model without misleading cloud IoT jargon.
5. **Mobile & tablet responsiveness:** Navigation, horizontal showcases, and platform modals must render cleanly on 375px, 768px, and 1280px+ viewports.

---

### Task 1: Environment & Asset Scaffolding
**Files:**
- Create: `package.json`, `vite.config.js`, `public/assets/fonts/*`, `public/assets/images/*`
- Test: `tests/setup.test.js`

**Interfaces:**
- Produces: Vite build & dev pipeline, font-face declarations, assets manifest.

- [ ] **Step 1: Write setup test**
  Check that Vite config and fonts are discoverable.
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Copy Regola fonts and images from extracted zip into `public/assets/` and configure `vite.config.js` and `package.json`**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add . && git commit -m "chore: scaffold vite and copy samara assets & fonts"`

---

### Task 2: Core Design System & CSS Foundation
**Files:**
- Create: `src/styles.css`
- Test: `tests/styles.test.js`

**Interfaces:**
- Produces: CSS custom properties (`--color-ivory`, `--color-evergreen`, `--color-charcoal`, `--font-regola`), utility classes, responsive grid, modal transitions, and typography scale.

- [ ] **Step 1: Write CSS token verification test**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `src/styles.css` with exact Samara tokens and Regola @font-face rules**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/styles.css tests/styles.test.js && git commit -m "feat: implement samara design system tokens and typography"`

---

### Task 3: Shared Reactive Store & Demo Data Seeder
**Files:**
- Create: `src/store.js`
- Test: `tests/store.test.js`

**Interfaces:**
- Produces: `getStore()`, `updateStore()`, `resetStore()`, `subscribeStore()`, initial seed data for Springs, Bills, Reports, Campaigns, and Donations.

- [ ] **Step 1: Write unit tests for store operations, state updates, validation, and factory reset**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `src/store.js` with reactive event dispatching and localStorage persistence**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/store.js tests/store.test.js && git commit -m "feat: implement shared reactive store and conrad demo seeder"`

---

### Task 4: Persistent Demo Switcher Bar & Global Navigation
**Files:**
- Create: `src/components/demo-bar.js`, `src/components/navigation.js`
- Test: `tests/navigation.test.js`

**Interfaces:**
- Consumes: `src/store.js`
- Produces: `renderDemoBar()`, `renderNavigation()`, active route and active role event listeners.

- [ ] **Step 1: Write tests for role switching events and navigation link routing**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `demo-bar.js` (5 roles + Reset) and `navigation.js` (Wordmark, Solutions dropdown, Projects, About, Partner CTA)**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/components/ tests/navigation.test.js && git commit -m "feat: create persistent demo switcher bar and samara navigation"`

---

### Task 5: Homepage Editorial Implementation
**Files:**
- Create: `src/pages/home.js`, `index.html`
- Test: `tests/home.test.js`

**Interfaces:**
- Produces: `renderHomePage()`, Sections: Hero, Solutions Showcase (Belik Sense & Conservation), Brand Statement, How It Works (01 Monitor to 04 Sustain), Projects teaser, Partnership CTA, and Footer.

- [ ] **Step 1: Write DOM structure and copy verification test for Homepage sections**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `src/pages/home.js` with authentic photography, typography-first editorial layout, and micro-interactions**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/pages/home.js index.html tests/home.test.js && git commit -m "feat: implement editorial homepage with doorway showcase"`

---

### Task 6: Dedicated Solutions Page (Belik Sense & Conservation Services)
**Files:**
- Create: `src/pages/solutions.js`
- Test: `tests/solutions.test.js`

**Interfaces:**
- Produces: `renderSolutionsPage()`, Belik Sense hardware & satellite architecture breakdown, Conservation Services community restoration model.

- [ ] **Step 1: Write tests checking accurate hardware specs (ESP32, SD card, Sentinel-2 NDVI) and absence of misleading cloud IoT claims**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `src/pages/solutions.js` with technical diagrams, workflow cards, and honest capability boundaries**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/pages/solutions.js tests/solutions.test.js && git commit -m "feat: implement solutions page with honest technical architecture"`

---

### Task 7: Projects & About Pages
**Files:**
- Create: `src/pages/projects.js`, `src/pages/about.js`
- Test: `tests/pages.test.js`

**Interfaces:**
- Produces: `renderProjectsPage()`, `renderAboutPage()`, showcases Tuk Bismo, Tuk Silumut, Tuk Luwung, Tuk Kalisari with pilot statuses, and team/PDAM Batang Conrad Challenge narrative.

- [ ] **Step 1: Write tests verifying verified project data and Conrad Challenge / PDAM Batang story content**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement `projects.js` (photographic cards, status tags) and `about.js` (editorial essay, mission, partnership details)**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/pages/ tests/pages.test.js && git commit -m "feat: implement projects portfolio and about pages"`

---

### Task 8: Interactive 5-Role Platform Portal (Conrad Challenge Demo)
**Files:**
- Create: `src/components/platform-portal.js`, `src/components/roles/warga.js`, `src/components/roles/pengelola.js`, `src/components/roles/relawan.js`, `src/components/roles/donatur.js`, `src/components/roles/admin.js`
- Test: `tests/platform.test.js`

**Interfaces:**
- Consumes: `src/store.js`
- Produces: `openPlatformModal(role)`, `renderRoleView(role)`, role-specific interactive forms:
  - Warga: Telemetri Tuk Bismo, Digital Pass Retribusi, QRIS modal, Lapor Pipa Bocor + GPS, Link Code.
  - Pengelola: KPI Collection Rate, Kas Saldo, Pencatatan Meteran & Auto-Bill, Bayar Tunai, Update Fisik Konservasi.
  - Relawan: Form Patroli 4 tipe + validasi GPS Indonesia, Prioritas Urgensi, Foto, Backlog.
  - Donatur: Katalog Kampanye + Progress bar, Form Donasi Checkout QRIS/Bank, Impact Timeline, Cetak Sertifikat Hijau.
  - Admin: Macro Dashboard se-kabupaten, 3-Lane Verification Queue (Donasi, Laporan, Retribusi), Master Data Mata Air.

- [ ] **Step 1: Write end-to-end simulation tests for all 5 roles and cross-role state reactivity**
- [ ] **Step 2: Run test to verify failure**
- [ ] **Step 3: Implement role components and interactive portal in `src/components/roles/`**
- [ ] **Step 4: Run test to verify passes**
- [ ] **Step 5: Commit**
  `git add src/components/roles/ src/components/platform-portal.js tests/platform.test.js && git commit -m "feat: implement interactive 5-role conrad challenge demo portal"`

---

### Task 9: Production Build & End-to-End Verification
**Files:**
- Modify: `index.html`, `src/main.js`
- Test: `tests/e2e.test.js`

**Interfaces:**
- Produces: Production bundle via `vite build`, automated responsiveness and link verification, verified local dev server run.

- [ ] **Step 1: Run full test suite across all modules**
- [ ] **Step 2: Execute `npm run build` with Vite and verify clean output in `dist/`**
- [ ] **Step 3: Verify all navigation links, demo switcher buttons, forms, and modals**
- [ ] **Step 4: Final commit**
  `git add . && git commit -m "chore: complete production build and verification"`