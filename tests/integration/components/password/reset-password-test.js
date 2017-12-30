import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { task } from 'ember-concurrency';
import resetPasswordComponent from 'ember-simple-setup/tests/pages/components/password/reset-password';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(resetPasswordComponent);

function renderPage() {
  return render(hbs`{{password/reset-password resetPassword=resetPassword model=model}}`);
}

module('Integration | Component | password/reset password', function(hooks) {
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

  test('it renders with two password inputs and correct label', async function(assert) {
    assert.expect(5);

    await renderPage();

    assert.equal(page.passwordInput.isVisible, true);
    assert.equal(page.passwordConfirmationInput.isVisible, true);
    assert.equal(page.passwordInput.property, 'password');
    assert.equal(page.passwordConfirmationInput.property, 'password');

    assert.equal(page.button.text, 'Reset Password');
  });

  test('can fill out form and submit', async function(assert) {
    assert.expect(2);

    this.resetPassword = task(function * ({ password, passwordConfirmation }) {
      yield;
      assert.equal(password, 'uuidPassword');
      assert.equal(passwordConfirmation, 'uuidPassword');
    });

    await renderPage();

    await page.password('uuidPassword');
    await page.passwordConfirmation('uuidPassword');

    await page.submit();
  });

});
