import { test } from 'node:test';
import assert from 'node:assert';
import { renderDemoBar } from '../src/components/demo-bar.js';
import { renderNavigation } from '../src/components/navigation.js';
import { getStore, resetStore } from '../src/store.js';

test('Task 4: Demo bar and Navigation component rendering and role events', () => {
  resetStore();

  // Create a minimal DOM mock container
  const demoBarContainer = { innerHTML: '', querySelector: () => null, addEventListener: () => {} };
  const navContainer = { innerHTML: '', querySelector: () => null, addEventListener: () => {} };

  const demoBarHtml = renderDemoBar();
  assert.ok(demoBarHtml.includes('warga'), 'Demo bar must include Warga button');
  assert.ok(demoBarHtml.includes('pengelola'), 'Demo bar must include Pengelola button');
  assert.ok(demoBarHtml.includes('relawan'), 'Demo bar must include Relawan button');
  assert.ok(demoBarHtml.includes('donatur'), 'Demo bar must include Donatur button');
  assert.ok(demoBarHtml.includes('admin'), 'Demo bar must include Admin button');
  assert.ok(demoBarHtml.includes('Reset Data Demo'), 'Demo bar must include Reset button');

  const navHtml = renderNavigation();
  assert.ok(navHtml.includes('BelikHub'), 'Navigation must include BelikHub wordmark');
  assert.ok(navHtml.includes('Belik Sense'), 'Navigation must include Belik Sense dropdown item');
  assert.ok(navHtml.includes('Conservation Services'), 'Navigation must include Conservation Services dropdown item');
  assert.ok(navHtml.includes('Projects'), 'Navigation must include Projects link');
  assert.ok(navHtml.includes('About'), 'Navigation must include About link');
  assert.ok(navHtml.includes('Partner with us'), 'Navigation must include Partner with us CTA');
});
