import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import PageObject from 'ember-cli-page-object';
import userDetail from 'ember-simple-setup/tests/pages/components/user-detail';

let page = PageObject.create(userDetail);

module('Integration | Component | user detail', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    page.setContext(this);
  });
  hooks.afterEach(function() {
    page.removeContext(this);
  });

  test('can save form with mock user', async function(assert) {
    assert.expect(1);
    this.model = {
      username: '',
      email: '',
      save() {
        assert.ok(true)
      },
      hasDirtyAttributes: true
    }
    await render(hbs`{{user-detail model=model}}`);
    await page.email.fill('e@gmail.com');
    await page.username.fill('ebert');
    await page.submit.click();
  });

  test('cant save if no username', async function(assert) {
    assert.expect(1);
    this.model = {
      username: '',
      email: ''
    }
    await render(hbs`{{user-detail model=model}}`);
    await page.email.fill('e@gmail.com');
    await page.submit.click();
    assert.equal(page.submit.isDisabled, 'disabled', 'button is disabled');
  });

  test('cant save if no email', async function(assert) {
    assert.expect(1);
    this.model = {
      username: '',
      email: ''
    }
    await render(hbs`{{user-detail model=model}}`);
    await page.username.fill('egmail');
    await page.submit.click();
    assert.equal(page.submit.isDisabled, 'disabled', 'button is disabled');
  });


  test('cant save if user not dirty', async function(assert) {
    assert.expect(1);
    this.model = {
      username: '',
      email: ''
    }
    await render(hbs`{{user-detail model=model}}`);
    await page.email.fill('egmail.com');
    await page.username.fill('ebert');
    await page.submit.click();
    assert.equal(page.submit.isDisabled, 'disabled', 'button is disabled');
  });
});
