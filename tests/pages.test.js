import { test } from 'node:test';
import assert from 'node:assert';
import { renderProjectsPage } from '../src/pages/projects.js';
import { renderAboutPage } from '../src/pages/about.js';

test('Task 7: Projects and About pages render verified locations and partner context', () => {
  const projectsHtml = renderProjectsPage();
  assert.ok(projectsHtml.includes('Tuk Bismo'), 'Projects page must list Tuk Bismo');
  assert.ok(projectsHtml.includes('Tuk Silumut'), 'Projects page must list Tuk Silumut');
  assert.ok(projectsHtml.includes('Tuk Luwung'), 'Projects page must list Tuk Luwung');
  assert.ok(projectsHtml.includes('Tuk Kalisari'), 'Projects page must list Tuk Kalisari');
  assert.ok(projectsHtml.includes('Pilot project'), 'Projects page must indicate pilot project stage');

  const aboutHtml = renderAboutPage();
  assert.ok(aboutHtml.includes('BelikHub'), 'About page must describe BelikHub');
  assert.ok(aboutHtml.includes('PDAM') || aboutHtml.includes('Kabupaten Batang'), 'About page must reference PDAM Batang partnership');
  assert.ok(aboutHtml.includes('Conrad Challenge'), 'About page must reference Conrad Challenge');
  assert.ok(aboutHtml.includes('Protecting the ecosystems that sustain our water'), 'About page must include brand statement');
});
