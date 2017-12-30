import Controller from '@ember/controller';
import { get } from '@ember/object';
import { service } from 'ember-decorators/service';
import { reads } from 'ember-decorators/object/computed';
import { action } from 'ember-decorators/object';

export default class ApplicationController extends Controller {
  @service appNotice

  init() {
    this._super(...arguments);

    let appNotice = get(this, 'appNotice');
    this._online = appNotice.notifyOnline.bind(appNotice);
    this._offline = appNotice.notifyOffline.bind(appNotice);

    window.addEventListener('offline', this._offline);
    window.addEventListener('online', this._online);
  }

  willDestroy() {
    window.removeEventListener('offline', this._offline);
    window.removeEventListener('online', this._online);
  }

    /**
    Proxy to appNotice handleNotification method

    @method handleNotification
    @param {Error|Object} notice `{message,level}`
  */
  handleNotification(notice) {
    get(this, 'appNotice').handleNotification(notice);
  }

  /**
    Proxy to appNotice service message property

    @property message
    @type String|null
    @default null
  */
  @reads('appNotice.message') message

  /**
    Proxy to appNotice service message property

    E.g. `error`, `warning`, `success`

    @property level
    @type String|null
    @default null
  */
  @reads('appNotice.level') level 

  /**
    @method dismiss_errors
  */
  @action
  dismiss_errors() {
    get(this, 'appNotice').dismiss_errors();
  }
}