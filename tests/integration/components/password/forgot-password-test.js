import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import forgotPasswordComponent from 'ember-simple-setup/tests/pages/components/password/forgot-password';
import PageObject from 'ember-cli-page-object';
import { task } from 'ember-concurrency';
import { blur } from 'ember-native-dom-helpers';

let page = PageObject.create(forgotPasswordComponent);

function renderPage() {
  return render(hbs`{{password/forgot-password 
    forgotPassword=forgotPassword 
    model=model 
  }}`);
}

module('Integration | Component | password/forgot password', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    page.setContext(this);

    this.model = { 
      email: '',
    };
  });
  hooks.afterEach(function() {
    page.removeContext();
  });

  test('it renders with email input and correct label', async function(assert) {
    assert.expect(3);

    await renderPage();

    assert.equal(page.emailInput.isVisible, true);
    assert.equal(page.passwordHeader, 'Enter your email and we\'ll send you a link to reset your password.');
    assert.equal(page.button.text, 'send email');
  });

  test('can fill out form and submit', async function(assert) {
    assert.expect(2);

    this.forgotPassword = task(function * ({ email }) {
      yield;
      assert.equal(email, 'admin@email.com');
    });

    await renderPage();

    await page.email('admin@email.com');
    blur('input');

    assert.equal(page.emailInput.value, 'admin@email.com');

    await page.submit();
  });
});