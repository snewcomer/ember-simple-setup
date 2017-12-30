import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application test', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting root', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('visiting wildcard', async function(assert) {
    await visit('/wat');

    assert.equal(currentURL(), '/');
  });

  test('can login', async function(assert) {
    await visit('/');

    await click('.t-login');

    assert.equal(currentURL(), '/login');
  });

  test('can signup', async function(assert) {
    await visit('/');

    await click('.t-signup');

    assert.equal(currentURL(), '/signup');
  });
});
