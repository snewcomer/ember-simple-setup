import { computed } from '@ember/object';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import PageObject from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import userDropdownComponent from 'ember-simple-setup/tests/pages/components/user-dropdown';

let page = PageObject.create(userDropdownComponent);

const stubUser = {
  id: 1,
  username: 'tester',
  photoThumbUrl: '/assets/images/twitter.png',

  atUsername: computed('username', function() {
    return `@${this.get('username')}`;
  }),
};

function renderPage() {
  return render(hbs`{{user-dropdown user=user action='hide'}}`);
}

module('Integration | Component | user dropdown', function(hooks) {
  setupRenderingTest(hooks);
  
  hooks.beforeEach(function() {
    page.setContext(this);
  });
  hooks.afterEach(function() {
    page.removeContext();
  });

  test('it renders', async function(assert) {
    assert.expect(1);

    this.set('user', stubUser);
    await renderPage();

    assert.ok(page.isVisible, 'The component renders');
  });

  skip('it triggers the hide action when clicked', async function(assert) {
    assert.expect(1);

    this.set('user', stubUser);
    this.on('hide', function() {
      assert.ok(true, 'It triggers the hide action when clicked');
    });

    await renderPage();
    await page.click();
  });
});
