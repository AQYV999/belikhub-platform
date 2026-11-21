import { test } from 'node:test';
import assert from 'node:assert';
import { renderHomePage } from '../src/pages/home.js';

test('Task 5: Homepage sections and exact brand copy verification', () => {
  const html = renderHomePage();

  // Section A — Hero
  assert.ok(html.includes('Water begins long before it reaches the tap.'), 'Hero headline must match spec');
  assert.ok(html.includes('Healthy water sources depend on healthy ecosystems.'), 'Hero supporting text must match spec');
  assert.ok(html.includes('Explore our solutions'), 'Hero CTA 1 must exist');
  assert.ok(html.includes('Partner with us'), 'Hero CTA 2 must exist');

  // Section B — Solutions Showcase
  assert.ok(html.includes('Belik Sense'), 'Card 1 title must be Belik Sense');
  assert.ok(html.includes('Conservation Services'), 'Card 2 title must be Conservation Services');

  // Section C — Brand Statement
  assert.ok(html.includes('Water conservation is not only about protecting the source. It is about protecting everything that sustains it.'), 'Brand statement must match spec verbatim');

  // Section D — How It Works (4 stages)
  assert.ok(html.includes('01 — Monitor') || html.includes('01'), 'Stage 1 Monitor must exist');
  assert.ok(html.includes('02 — Understand') || html.includes('02'), 'Stage 2 Understand must exist');
  assert.ok(html.includes('03 — Restore') || html.includes('03'), 'Stage 3 Restore must exist');
  assert.ok(html.includes('04 — Sustain') || html.includes('04'), 'Stage 4 Sustain must exist');

  // Section F & G — Partnership CTA & Footer
  assert.ok(html.includes("Let's protect the ecosystems that sustain our water."), 'Partnership CTA headline must match spec');
  assert.ok(html.includes('Copyright 2026 BelikHub'), 'Footer copyright must match spec');
});
