import { find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | site footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{site-footer}}`);
    assert.equal(find('[data-test-id="footer-name"]').textContent, 'ember-simple-setup');
  });
});