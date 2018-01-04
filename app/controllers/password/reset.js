import Controller from '@ember/controller';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';

import { 
  validatePresence, 
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  password: [
    validatePresence(true),
    validateLength({ min: 6 })
  ],
  passwordConfirmation: validateConfirmation({ on: 'password' })
};

export default class PasswordResetController extends Controller {
  /**
    @property session
    @type Ember.Service
  */
  @service session
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
      password: '',
      passwordConfirmation: ''
    };
    this.validations = NEW_MODEL;
  }

  resetPassword = task(function * ({ password, passwordConfirmation }) {
    try {
      yield get(this, 'ajax').request('/password/reset', {
        method: 'POST',
        data: {
          token: get(this, 'token'),
          password,
          'password-confirmation': passwordConfirmation
        }
      }).then((response) => {
        return get(this, 'session').authenticate('authenticator:jwt', { identification: response.username, password });
      });
    } catch(e) {
      const appNotice = get(this, 'appNotice');
      appNotice.handleNotification({message: 'oops', level: 'error'});
    }
  })
}

