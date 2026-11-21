import { test } from 'node:test';
import assert from 'node:assert';
import { getStore, updateStore, resetStore } from '../src/store.js';
import { renderWargaView } from '../src/components/roles/warga.js';
import { renderPengelolaView } from '../src/components/roles/pengelola.js';
import { renderRelawanView } from '../src/components/roles/relawan.js';
import { renderDonaturView } from '../src/components/roles/donatur.js';
import { renderAdminView } from '../src/components/roles/admin.js';
import { renderPlatformPortal } from '../src/components/platform-portal.js';

test('Task 8: 5-Role Platform views, interactive actions, and cross-role state reactivity', () => {
  resetStore();

  // Test Warga View
  const wargaHtml = renderWargaView();
  assert.ok(wargaHtml.includes('Tuk Bismo'), 'Warga view must show live spring telemetry');
  assert.ok(wargaHtml.includes('Digital Pass'), 'Warga view must show Digital Pass Retribusi');
  assert.ok(wargaHtml.includes('Lapor Kerusakan'), 'Warga view must show Damage Report form');
  assert.ok(wargaHtml.includes('Tautkan'), 'Warga view must show Link Meter code feature');

  // Test Pengelola View
  const pengelolaHtml = renderPengelolaView();
  assert.ok(pengelolaHtml.includes('Collection Rate'), 'Pengelola view must show Collection Rate KPI');
  assert.ok(pengelolaHtml.includes('Saldo Kas'), 'Pengelola view must show Maintenance Fund balance');
  assert.ok(pengelolaHtml.includes('Pencatatan Meteran'), 'Pengelola view must show Meter Reading form');
  assert.ok(pengelolaHtml.includes('Bayar Tunai'), 'Pengelola view must show Cash Collection option');

  // Test Relawan View
  const relawanHtml = renderRelawanView();
  assert.ok(relawanHtml.includes('Kebocoran Pipa Transmisi Hulu'), 'Relawan view must support leak inspection');
  assert.ok(relawanHtml.includes('Ancaman Longsor'), 'Relawan view must support landslide inspection');
  assert.ok(relawanHtml.includes('Pencemaran Sampah'), 'Relawan view must support pollution inspection');
  assert.ok(relawanHtml.includes('Penanaman Pohon'), 'Relawan view must support tree planting report');
  assert.ok(relawanHtml.includes('Koordinat GPS'), 'Relawan view must validate GPS');

  // Test Donatur View
  const donaturHtml = renderDonaturView();
  assert.ok(donaturHtml.includes('Kampanye'), 'Donatur view must show campaigns');
  assert.ok(donaturHtml.includes('Checkout') || donaturHtml.includes('Donasi'), 'Donatur view must show donation checkout');
  assert.ok(donaturHtml.includes('Impact Timeline') || donaturHtml.includes('Garis Waktu Dampak'), 'Donatur view must show impact timeline');
  assert.ok(donaturHtml.includes('Sertifikat'), 'Donatur view must show certificate receipt');

  // Test Admin View
  const adminHtml = renderAdminView();
  assert.ok(adminHtml.includes('Macro Dashboard') || adminHtml.includes('Agregat Lintas Mata Air'), 'Admin view must show macro aggregator');
  assert.ok(adminHtml.includes('Verifikasi'), 'Admin view must show Verification Queue');
  assert.ok(adminHtml.includes('Master Data'), 'Admin view must show Master Data management');

  // Test Cross-Role Reactivity
  const state = getStore();
  const initialReportsCount = state.reports.length;
  const newReport = {
    id: 'rep_test_999',
    reporterName: 'Warga Bismo Test',
    reportType: 'kebocoran',
    categoryLabel: 'Kebocoran Pipa Transmisi Hulu',
    description: 'Pipa bocor dekat belik',
    coordinates: { lat: -7.065, lng: 109.845 },
    severity: 'mendesak',
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  updateStore({ reports: [newReport, ...state.reports] });
  assert.strictEqual(getStore().reports.length, initialReportsCount + 1, 'New report should be stored');

  const portalHtml = renderPlatformPortal('admin');
  assert.ok(portalHtml.includes('rep_test_999') || portalHtml.includes('Warga Bismo Test'), 'Admin portal should immediately show new report in queue');
});
