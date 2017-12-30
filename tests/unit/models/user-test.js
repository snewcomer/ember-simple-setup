import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testForAttributes } from 'ember-simple-setup/tests/helpers/attributes';

module('model:user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
  });
  hooks.afterEach(function() {
    delete this.store;
  });

  testForAttributes('user', [
    'admin', 'email', 'insertedAt', 'updatedAt', 'password', 'photoLargeUrl',
    'photoThumbUrl', 'username'
  ]);
});
