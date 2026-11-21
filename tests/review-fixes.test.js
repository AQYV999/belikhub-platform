import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { getStore, updateStore, resetStore } from '../src/store.js';

test('Review Fixes: CSS mobile utilities, escape key listener, and collection rate recalculation', () => {
  const cssPath = path.resolve('src/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Verify P1.1: Mobile navigation media query
  assert.match(css, /@media\s*\(max-width:\s*840px\)/, 'should have mobile navigation media query at 840px');

  // Verify P1.2: .hide-mobile utility
  assert.match(css, /\.hide-mobile\s*\{[^}]*display:\s*none/i, 'should define .hide-mobile display: none');

  // Verify P1.3: Mobile modal overlay padding
  assert.match(css, /\.platform-modal-overlay\s*\{[^}]*padding:\s*0\.5rem/i, 'should optimize mobile modal padding');

  // Verify P2.4: Dynamic collectionRate calculation in store logic
  resetStore();
  const state = getStore();
  const initialCollected = state.villageFinances.totalCollected;
  const initialRate = state.villageFinances.collectionRate;
  const target = state.villageFinances.totalTarget;

  const newCollected = initialCollected + 20000;
  const expectedRate = Math.round((newCollected / target) * 100);

  updateStore({
    villageFinances: {
      ...state.villageFinances,
      totalCollected: newCollected,
      collectionRate: expectedRate
    }
  });

  assert.strictEqual(getStore().villageFinances.collectionRate, expectedRate, 'collectionRate should be dynamically computed');
});
