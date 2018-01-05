import Component from '@ember/component';
import { set, get } from '@ember/object';

/**
  `dialog-container` A basic modal dialog

  ## default usage

  ```Handlebars
  {{#if showModal}}
    {{dialog-container size="small" show=showModal}}
  {{/if}}
  ```
  @class dialog-container
  @module Component
  @extends Ember.Component
*/

export default class NCDialog extends Component {
  constructor() {
    super();
    /**
      A class binding for size `small, medium, large`

      @property size
      @default large {String}
    */
    this.size = this.size || 'large';
    /**
      A reference to the condition used to display or hide the modal

      @property show
      @public
    */
    this.show = this.show || null;
    /**
      An explicit function to execute upon exit

      @method close
      @returns function
    */
    this.close = this.close || null;
  }

  /**
    Set passed in toggle property to false when exit is pressed

    @method _exitHandler
    @param e {Event}
    @private
  */
  _exitHandler(e) {
    // escape key or overlay was clicked
    if (e.keyCode === 27 || e.type === 'click' && (/ember-modal-overlay/).test(e.target.className)) {
      set(this, 'show', null);
      if (get(this, 'close')) {
        this.close();
      }
    }
  }
  /**
    A contextual reference to the _exitHandler method

    @method _exitClosure
    @private
  */
  _exitClosure = null;
  /**
    Attach event handlers

    @method _attachExitHandlers
    @private
  */
  _attachExitHandlers() {
    // create a keyboard event instance
    const keyboard = new KeyboardEvent('keyup', { view: window, bubbles: true, cancelable: true });

    // create a click event instance
    const mouse = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });

    // create/cache a closure giving _exitHandler context
    let _exitClosure = ((e) => this._exitHandler(e));
    set(this, '_exitClosure', _exitClosure);

    // add listeners and dispatch the events
    document.addEventListener('keyup', _exitClosure, false);
    document.dispatchEvent(keyboard);
    document.addEventListener('click', _exitClosure, false);
    document.dispatchEvent(mouse);
  }
  /**
    Remove event handlers

    @method _detatchExitHandlers
    @private
  */
  _detachExitHandlers() {
    document.removeEventListener('keyup', get(this, '_exitClosure'), false);
    document.removeEventListener('click', get(this, '_exitClosure'), false);
  }

  didInsertElement() {
    this._super(...arguments);
    if (get(this, 'show') || get(this, 'close')) {
      this._attachExitHandlers();
    }
  }

  willDestroyElement() {
    this._super(...arguments);
    this._detachExitHandlers();
  }
}
