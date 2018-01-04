import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
// import passwordPage from '../pages/password';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | password test', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /password/reset and logging in successfully', async function(assert) {
    let username = 'test';
    let email = 'test@test.com';
    let password = 'password';
    let token = 'abc123';

    server.create('user', { username, email, password, token });

    await visit('/password/reset?token=' + token)

    assert.equal(currentURL(), '/password/reset?token=abc123');

    await fillIn('#password', 'password');//passwordPage.resetPasswordForm.password('password');
    await fillIn('#password-confirmation', 'password');//passwordPage.resetPasswordForm.passwordConfirmation('password');
    await click('button');//passwordPage.resetPasswordForm.submit();

    assert.equal(currentURL(), '/users/test');
  });

  test('visiting /password/reset and entering diff passwords returns 422', async function(assert) {
    let email = 'test@test.com';
    let password = 'password';
    let token = 'abc123';

    server.create('user', { email, password, token });

    await visit('/password/reset?token=' + token)

    assert.equal(currentURL(), '/password/reset?token=abc123');

    // currently a problem with ember-cli-page-object and promise chains
    await fillIn('#password', 'password');//passwordPage.resetPasswordForm.password('password');
    await fillIn('#password-confirmation', 'wat-password');//passwordPage.resetPasswordForm.passwordConfirmation('password');
    await click('button');//passwordPage.resetPasswordForm.submit();

    assert.equal(currentURL(), '/password/reset?token=abc123');
    // appNotice renders
  });

  test('visiting /password/forgot', async function(assert) {
    await visit('/password/forgot');

    assert.equal(currentURL(), '/password/forgot');

    // await passwordPage.forgotPasswordForm.sendForgotPasswordSuccessfully('admin@gmail.com');
    await fillIn('[name=email]', 'owner@gmail.com');//passwordPage.resetPasswordForm.password('password');
    await click('button');//passwordPage.resetPasswordForm.submit();

    assert.equal(currentURL(), '/');
  });
});
