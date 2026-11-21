import { test } from 'node:test';
import assert from 'node:assert';
import { renderSolutionsPage } from '../src/pages/solutions.js';

test('Task 6: Solutions page content, accurate hardware specs, and honest boundaries', () => {
  const html = renderSolutionsPage();

  // Title
  assert.ok(html.includes('Understand your water source.'), 'Must include exact headline from spec');

  // Belik Sense Hardware details
  assert.ok(html.includes('ESP32'), 'Must mention ESP32 microcontroller');
  assert.ok(html.includes('flow meter') || html.includes('Flow Meter'), 'Must mention flow meter');
  assert.ok(html.includes('SD card') || html.includes('SD Card'), 'Must mention SD card logger');
  assert.ok(html.includes('Solar panel') || html.includes('solar panel') || html.includes('Panel Surya'), 'Must mention solar panel');

  // Honest technical disclosures
  assert.ok(html.includes('offline') || html.includes('Offline'), 'Must state offline data logging accurately');
  assert.ok(html.includes('Sentinel-2'), 'Must cite Sentinel-2 imagery');
  assert.ok(html.includes('NDVI'), 'Must explain NDVI vegetation analysis');

  // Verify Conservation Services section
  assert.ok(html.includes('Conservation Services'), 'Must include Conservation Services section');
  assert.ok(html.includes('Tree planting') || html.includes('Penanaman pohon') || html.includes('reboisasi'), 'Must explain tree planting / restoration');
  assert.ok(html.includes('BUMDes Tirta') || html.includes('Community') || html.includes('Komunitas'), 'Must mention community stewardship');
});
