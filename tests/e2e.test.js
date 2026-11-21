import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { getStore, resetStore } from '../src/store.js';
import { renderHomePage } from '../src/pages/home.js';
import { renderSolutionsPage } from '../src/pages/solutions.js';
import { renderProjectsPage } from '../src/pages/projects.js';
import { renderAboutPage } from '../src/pages/about.js';
import { renderRoleView } from '../src/components/platform-portal.js';

test('Task 9: End-to-end integration and build readiness', () => {
  resetStore();
  const state = getStore();

  // Test state has all 5 roles data
  assert.ok(state.springs.length >= 4, 'Springs loaded');
  assert.ok(state.bills.length >= 3, 'Bills loaded');
  assert.ok(state.reports.length >= 2, 'Reports loaded');
  assert.ok(state.campaigns.length >= 2, 'Campaigns loaded');
  assert.ok(state.donations.length >= 2, 'Donations loaded');

  // Verify all page renderers produce valid non-empty HTML
  assert.ok(renderHomePage().length > 500, 'Home page renders');
  assert.ok(renderSolutionsPage().length > 500, 'Solutions page renders');
  assert.ok(renderProjectsPage().length > 500, 'Projects page renders');
  assert.ok(renderAboutPage().length > 500, 'About page renders');

  // Verify all 5 role views render without errors
  const roles = ['warga', 'pengelola', 'relawan', 'donatur', 'admin'];
  for (const role of roles) {
    const html = renderRoleView(role);
    assert.ok(html.length > 300, `Role view for ${role} must render properly`);
  }

  // Verify index.html structure
  const indexPath = path.resolve('index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  assert.ok(indexHtml.includes('/src/main.js'), 'index.html must link main.js');
  assert.ok(indexHtml.includes('demo-bar-mount'), 'index.html must have demo-bar-mount');
  assert.ok(indexHtml.includes('portal-mount'), 'index.html must have portal-mount');
});
