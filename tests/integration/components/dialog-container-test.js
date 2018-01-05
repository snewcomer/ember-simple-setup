import { module, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Dialog from 'ember-simple-setup/tests/pages/components/dialog-container';
import PageObject from 'ember-cli-page-object';
import { keyEvent } from 'ember-native-dom-helpers';
import { set, setProperties } from '@ember/object';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

let page = PageObject.create(Dialog);

module('Integration | Component | dialog-container', function(hooks) {
  setupRenderingTest(hooks);
  
  hooks.beforeEach(function() {
    page.setContext(this);
  });
  hooks.afterEach(function() {
    page.removeContext(this);
  });

  test('defaults to a large modal', async function(assert) {
    await render(hbs`<div id="modal-overlays"></div>{{dialog-container}}`);
    assert.ok(page.modal.largeDesktopClass, 'dialog has default large class');
  });

  test('adding size=small adds the small class', async function(assert) {
    await render(hbs`<div id="modal-overlays"></div>{{dialog-container size="small"}}`);
    assert.ok(page.modal.smallDesktopClass, 'small class is added when size is small');
  });

  test('when `show` property is provided, it destroys using the only escape key', async function(assert) {
    this.shouldShow = true;
    await render(hbs`<div id="modal-overlays"></div>{{#if shouldShow}} {{dialog-container show=shouldShow}} {{/if}}`);
    assert.equal(page.modal.overlay.isVisible, true, 'modal is rendered');
    await keyEvent('', 'keyup', 27); // escape key triggered from testing container (#ember-testing)
    assert.equal(page.modal.overlay.isVisible, false, 'modal is not rendered');
  });

  test('when any other key (besides escape key) is pressed, it will not destroy', async function(assert) {
    this.shouldShow = true;
    await render(hbs`<div id="modal-overlays"></div>{{#if shouldShow}} {{dialog-container show=shouldShow}} {{/if}}`);
    await keyEvent('', 'keyup', 67);
    assert.equal(page.modal.overlay.isVisible, true, 'some other key was triggered, modal is still rendered');
  });

  test('when `show` property is provided, it destroys when clicking on the background overlay', async function(assert) {
    this.shouldShow = true;
    await render(hbs`<div id="modal-overlays"></div>{{#if shouldShow}} {{dialog-container show=shouldShow}} {{/if}}`);
    assert.equal(page.modal.overlay.isVisible, true, 'modal is rendered');
    await page.modal.overlay.click()
    assert.equal(page.modal.overlay.isVisible, false, 'modal is not rendered');
  });

  test('when `close` method is provided, it executes upon destroying', async function(assert) {
    run(() => {
      setProperties(this, {
        close: () => set(this, 'foo', 'baz'),
        foo: '',
        shouldShow: true
      })
    });
    await render(hbs`<div id="modal-overlays"></div>{{#if shouldShow}} {{dialog-container show=shouldShow close=close}} {{/if}}`);
    assert.equal(page.modal.overlay.isVisible, true, 'modal is rendered');
    assert.equal(this.foo, '');
    await page.modal.overlay.click()
    assert.equal(page.modal.overlay.isVisible, false, 'modal is not rendered');
    assert.equal(this.foo, 'baz', 'close method was executed');
    run(() => {
      setProperties(this, {
        close: null,
        shouldShow: true
      })
    });

    await render(hbs`<div id="modal-overlays"></div>{{#if shouldShow}} {{dialog-container show=shouldShow close=close}} {{/if}}`);
    assert.equal(page.modal.overlay.isVisible, true, 'modal is rendered');
    await page.modal.overlay.click();
    assert.equal(this.foo, 'baz', 'close method was null and did nothing');
  });
});
