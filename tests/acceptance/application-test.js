import { module, test } from 'qunit';
import { click, visit, fillIn, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-setup/tests/helpers/ember-simple-auth-patch';

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
    let username = 'test';
    let email = 'test@test.com';
    let password = 'password';
    server.create('user', { username, email, password });

    await visit('/');

    await click('.t-login');

    assert.equal(currentURL(), '/login');

    await fillIn('#username', username);
    await fillIn('#password', password);
    await click('button[type=submit]');

    assert.equal(currentURL(), '/users/test');
  });

  test('if authenticated, redirects to main', async function(assert) {
    let user = server.create('user');
    await authenticateSession(this.owner, { user_id: user.id });

    await visit('/login');

    assert.equal(currentURL(), `/users/${user.username}`);
  });

  test('can logout', async function(assert) {
    let user = server.create('user');
    await authenticateSession(this.owner, { user_id: user.id });

    await visit('/');

    await click('a.user-menu__toggle');//page.userMenu.clickDropdownMenu();
    await click('a.logout');//page.userMenu.logout();

    // assert.equal(currentURL(), '/main/conversations');
    assert.equal(this.owner.lookup('service:session').get('isAuthenticated'), false);
  });

  test('can signup', async function(assert) {
    await visit('/');

    await click('.t-signup');

    assert.equal(currentURL(), '/signup');

    let username = 'test';
    let email = 'test@test.com';
    let password = 'password';
    await fillIn('#username', username);
    await fillIn('#email', email);
    await fillIn('#password', password);
    await fillIn('#passwordConfirmation', password);
    await click('button[type=submit]');

    assert.equal(currentURL(), '/users/test');
  });
});
