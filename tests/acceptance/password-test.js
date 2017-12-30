import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import passwordPage from '../pages/password';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | password test', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /password/reset and logging in successfully', async function(assert) {
    let email = 'test@test.com';
    let password = 'password';
    let token = 'abc123';

    server.create('user', { email, password, token });

    await visit('/password/reset/' + token)

    assert.equal(currentURL(), '/password/reset?token=abc123');

    await passwordPage.resetPasswordForm.sendResetPasswordSuccessfully('password', 'password');

    assert.equal(currentURL(), '/projects');
  });

  test('visiting /password/reset and entering diff passwords returns 422', async function(assert) {
    let email = 'test@test.com';
    let password = 'password';
    let token = 'abc123';

    server.create('user', { email, password, token });

    await visit('/password/reset/' + token)

    assert.equal(currentURL(), '/password/reset?token=abc123');

    await passwordPage.resetPasswordForm.sendResetPasswordSuccessfully('password', 'chuckNorris');

    assert.equal(currentURL(), '/password/reset?token=abc123');
    assert.equal(passwordPage.errorFormatter.errors().count, 1, 'Each error message is rendered');
  });

  test('visiting /password/forgot', async function(assert) {
    await visit('/password/forgot');

    assert.equal(currentURL(), '/password/forgot');

    await passwordPage.forgotPasswordForm.sendForgotPasswordSuccessfully('admin@gmail.com');

    assert.equal(currentURL(), '/');
  });
});
