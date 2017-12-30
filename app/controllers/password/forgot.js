import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';

import { 
  validateFormat 
} from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  email: validateFormat({ type: 'email' })
}

export default class PasswordForgotController extends Controller {
  /**
    @property ajax
    @type Ember.Service
  */
  @service ajax
  /**
    @property appNotice
    @type Ember.Service
  */
  @service appNotice

  constructor() {
    super();

    this.model = {
      email: ''
    };
    this.validations = NEW_MODEL;
  }

  forgotPassword = task(function * ({ email }) {
    const appNotice = get(this, 'appNotice');
    try {
      yield get(this, 'ajax').request('/password/forgot', {
        method: 'POST',
        data: {
          email
        }
      }).then(() => {
        this.transitionToRoute('/');
        appNotice.handleNotification({message: 'email.sent', level: 'success'});
        set(this, 'model', { email: '' });
      });
    } catch(e) {
      appNotice.handleNotification({message: 'oops', level: 'error'});
    }
  })
}
