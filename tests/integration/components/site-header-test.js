import { find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | site header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{site-header}}`);
    assert.equal(find('.t-header-logo').textContent.trim(), '');
  });
});