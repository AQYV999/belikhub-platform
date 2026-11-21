import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Task 2: CSS custom properties and Regola font declarations in src/styles.css', () => {
  const cssPath = path.resolve('src/styles.css');
  assert.ok(fs.existsSync(cssPath), 'src/styles.css should exist');

  const css = fs.readFileSync(cssPath, 'utf8');

  // Verify Samara color tokens
  assert.match(css, /--color-ivory:\s*#FDFDF7/i, 'should contain --color-ivory: #FDFDF7');
  assert.match(css, /--color-beige:\s*#F7F7F0/i, 'should contain --color-beige: #F7F7F0');
  assert.match(css, /--color-evergreen:\s*#375033/i, 'should contain --color-evergreen: #375033');
  assert.match(css, /--color-charcoal:\s*#262626/i, 'should contain --color-charcoal: #262626');
  assert.match(css, /--color-black:\s*#111111/i, 'should contain --color-black: #111111');
  assert.match(css, /--color-muted:\s*#6B6B66/i, 'should contain --color-muted: #6B6B66');

  // Verify font-family and @font-face
  assert.match(css, /font-family:\s*['"]?Regola['"]?/i, 'should define font-family Regola');
  assert.match(css, /@font-face/i, 'should contain @font-face declarations');
});
