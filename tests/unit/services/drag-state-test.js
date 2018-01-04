import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | drag state', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:drag-state');
  });
  hooks.afterEach(function() {
    this.service = null;
  });

  test('it exists', function(assert) {
    let service = this.service;
    assert.ok(service);
  });

  test('it is not dragging by default', function(assert) {
    let service = this.service;
    assert.notOk(service.get('isDragging'));
  });

  test('it sets dragging to false when leaving is called', function(assert) {
    let service = this.service;
    service.set('isDragging', true);
    service.leaving();
    assert.notOk(service.get('isDragging'));
  });

  test('it sets dragging to true when dragging is called', function(assert) {
    let service = this.service;
    service.dragging();
    assert.ok(service.get('isDragging'));
  });
});
