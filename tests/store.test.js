import { test } from 'node:test';
import assert from 'node:assert';
import {
  getStore,
  updateStore,
  resetStore,
  subscribeStore,
  validateIndonesiaCoordinates,
  INITIAL_DATA
} from '../src/store.js';

test('Task 3: Store initialization, reactivity, reset, and coordinate validation', () => {
  // Test initial state
  resetStore();
  const state = getStore();
  assert.ok(Array.isArray(state.springs), 'springs should be an array');
  assert.ok(state.springs.length >= 4, 'should have at least 4 Batang springs');
  const tukBismo = state.springs.find(s => s.name.includes('Bismo'));
  assert.ok(tukBismo, 'Tuk Bismo spring must exist in seed data');

  // Test subscriptions and updateStore
  let notified = false;
  let receivedState = null;
  const unsubscribe = subscribeStore((newState) => {
    notified = true;
    receivedState = newState;
  });

  updateStore({ activeRole: 'warga' });
  assert.strictEqual(notified, true, 'subscriber should be notified on updateStore');
  assert.strictEqual(receivedState.activeRole, 'warga', 'activeRole should be updated to warga');
  unsubscribe();

  // Test resetStore resets to initial
  updateStore({ activeRole: 'admin' });
  resetStore();
  assert.strictEqual(getStore().activeRole, INITIAL_DATA.activeRole, 'resetStore should restore default activeRole');

  // Test Indonesia GPS coordinate validation (-11.5 <= lat <= 6.5, 94.0 <= lng <= 141.5)
  // Batang, Central Java: approx -7.05, 109.85 (Valid)
  assert.strictEqual(validateIndonesiaCoordinates(-7.05, 109.85), true, 'Batang coordinates must be valid');
  // Outside Indonesia (Tokyo: 35.67, 139.65)
  assert.strictEqual(validateIndonesiaCoordinates(35.67, 139.65), false, 'Tokyo coordinates must be invalid');
  // Outside Indonesia (London: 51.5, -0.12)
  assert.strictEqual(validateIndonesiaCoordinates(51.5, -0.12), false, 'London coordinates must be invalid');
});
