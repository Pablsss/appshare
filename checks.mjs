import {test} from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {categories, creators, seeds, matches, webUrl} from './dist/catalog.js';

test('Every category has artwork and every app points to a creator and category', async () => {
  for (const category of categories) await access(new URL('./dist/assets/' + category.id + '.jpg', import.meta.url));
  for (const app of seeds) {
    assert.ok(creators.some(creator => creator.id === app.author));
    assert.ok(categories.some(category => category.id === app.category));
    if (app.remix) {
      assert.ok(app.license);
      await access(new URL('./dist/' + app.source, import.meta.url));
    }
  }
});

test('Submissions accept HTTPS and restrict repositories to GitHub projects', () => {
  for (const input of ['javascript:alert(1)', 'data:text/html,test', 'http://example.com', 'https://person:secret@example.com']) {
    assert.equal(webUrl(input), '');
  }
  for (const input of ['https://github.com', 'https://github.com.evil.test/foo/bar', 'https://github.com/foo/bar/issues']) {
    assert.equal(webUrl(input, true), '');
  }
  assert.equal(webUrl('https://github.com/studio/tool', true), 'https://github.com/studio/tool');
});

test('Discovery searches names, descriptions, and category titles', () => {
  const spectrum = seeds.find(app => app.id === 'spectrum');
  for (const keyword of [' spectrum ', 'HEX', 'design']) assert.ok(matches(spectrum, keyword));
  assert.equal(matches(spectrum, 'accounting'), false);
});
