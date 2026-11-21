import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Task 1: Vite configuration and Samara Regola font files exist', () => {
  const viteConfigPath = path.resolve('vite.config.js');
  assert.ok(fs.existsSync(viteConfigPath), 'vite.config.js should exist');

  const fontsDir = path.resolve('public/assets/fonts');
  assert.ok(fs.existsSync(fontsDir), 'public/assets/fonts should exist');

  const expectedFonts = [
    'regola-book.woff2',
    'regola-regular.woff2',
    'regola-medium.woff2',
    'regola-light.woff2'
  ];

  for (const font of expectedFonts) {
    const fontPath = path.join(fontsDir, font);
    assert.ok(fs.existsSync(fontPath), `Font ${font} should exist in public/assets/fonts`);
  }
});
