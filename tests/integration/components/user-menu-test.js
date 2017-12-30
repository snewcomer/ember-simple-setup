import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { get, set } from '@ember/object';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import PageObject from 'ember-cli-page-object';
import userMenu from 'ember-simple-setup/tests/pages/components/user-menu';

let page = PageObject.create(userMenu);

const stubUser = {
  id: 1,
  username: 'tester',
  photoThumbUrl: '/assets/images/twitter.png',
};

function renderPage() {
  return render(hbs`{{user-menu user=user}}`);
}

module('Integration | Component | user menu', function(hooks) {
  setupRenderingTest(hooks);
  
  hooks.beforeEach(function() {
    page.setContext(this);
  });
  hooks.afterEach(function() {
    page.removeContext();
  });

  test('it renders properly', async function(assert) {
    assert.expect(5);
  
    set(this, 'user', stubUser);
    await renderPage();
  
    page.toggle();
  
    assert.ok(page.iconVisible, "The user's icon renders");
    page.icon.as((icon) => {
      assert.equal(icon.src, get(stubUser, 'photoThumbUrl'), 'The icon has the correct source');
    });
  
    assert.ok(page.sluggedRouteLinkVisible, 'The link to the user route is rendered');
    assert.ok(page.logoutLinkVisible, 'The logout link is rendered');
  
    assert.equal(page.footerText, `Signed in as ${get(stubUser, 'username')}`, 'The username is rendered in the footer');
  });
  
  test('clicking the menu toggles the dropdown', async function(assert) {
    assert.expect(3);
  
    set(this, 'user', stubUser);
    await renderPage();
  
    assert.ok(page.dropdownIsHidden, 'The dropdown is initially hidden');
    await page.toggle();
    assert.notOk(page.dropdownIsHidden, 'The dropdown is now visible');
    await page.clickDropdownMenu();
    assert.ok(page.dropdownIsHidden, 'The dropdown is now hidden');
  });
});
