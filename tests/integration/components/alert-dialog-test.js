import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import PageObject, { text } from 'ember-cli-page-object';

const alertDialog = PageObject.create({
  container: text('.t-alert-dialog'),
  body: text('.t-modal-body'),
  footer: text('.t-modal-footer')
});

module('Integration | Component | alert dialog', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    alertDialog.setContext(this);
  });
  hooks.afterEach(function() {
    alertDialog.removeContext(this);
  });

  test('it renders', async function(assert) {
    await render(hbs`{{alert-dialog}}`);

    assert.equal(alertDialog.container, '');

    // Template block usage:
    await render(hbs`
      {{#alert-dialog}}
        template block text
      {{/alert-dialog}}
    `);

    assert.equal(alertDialog.container, 'template block text');

    // contextual usage
    await render(hbs`
      {{#alert-dialog as |content|}}
        {{#content.body}}
          body block text
        {{/content.body}}
        {{#content.footer}}
          footer block text
        {{/content.footer}}
      {{/alert-dialog}}
    `);

    assert.equal(alertDialog.body, 'body block text');
    assert.equal(alertDialog.footer, 'footer block text');
  });
});
