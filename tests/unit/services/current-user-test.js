import { get } from '@ember/object';
import RSVP from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('service:current-user', 'Unit | Service | current user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.subject = this.owner.lookup('service:current-user');
  });
  hooks.afterEach(function() {
    delete this.subject;
  })

  test('it returns null for loadCurrentUser when there is no user', function(assert) {
    assert.expect(1);
    let service = this.subject;
    let done = assert.async();
    service.loadCurrentUser().then((user) => {
      assert.equal(user, null);
      done();
    });
  });

  test('it sets the user when there is a user', function(assert) {
    assert.expect(2);
    let service = this.owner.factoryFor('service:current-user').create({
      store: {
        findRecord() {
          return RSVP.resolve({ id: 1 });
        }
      },
      session: {
        session: {
          authenticated: {
            user_id: 1
          }
        }
      }
    });

    let done = assert.async();
    service.loadCurrentUser().then((user) => {
      assert.equal(get(user, 'id'), 1);
      assert.equal(get(service, 'user'), user);
      done();
    });
  });

  test('it rejects when the user is not returned from the store', function(assert) {
    assert.expect(1);
    let service = this.owner.factoryFor('service:current-user').create({
      store: {
        find() {
          return RSVP.reject();
        }
      },
      session: {
        session: {
          authenticated: {
            user_id: 1
          }
        }
      }
    });

    let done = assert.async();
    service.loadCurrentUser().catch(() => {
      assert.ok(true);
      done();
    });
  });
});
