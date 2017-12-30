import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
import { service } from 'ember-decorators/service';

import { 
  validatePresence, 
  validateLength, 
  validateConfirmation,
  validateFormat
} from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  username: validatePresence(true),
  email: validateFormat({ type: 'email' }),
  password: [
    validatePresence(true),
    validateLength({ min: 6 })
  ],
  passwordConfirmation: validateConfirmation({ on: 'password' })
}

export default class SignupController extends Controller {
  /**
    @property session
    @type Ember.Service
  */
  @service session
  /**
    @property appNotice
    @type Ember.Service
  */
  @service appNotice

  constructor() {
    super();

    this.model = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.validations = NEW_MODEL;
  }

  /**
   * called when hitting enter or clicking button
   * applies underlying changes to data model 
   * 
   * @method validate
   * @param {Object} changeset 
   */
  @action
  validate(changeset) {
    changeset.validate();
    if (changeset.get('isValid')) {
      changeset.execute();
    }
  }

  async signIn({ username, password }) {
    try {
      await get(this, 'session').authenticate('authenticator:jwt', { identification: username, password });
    } catch(e) {
      const appNotice = get(this, 'appNotice');
      appNotice.handleNotification({message: 'oops', level: 'error'});
    }
  }

  signup = task(function * ({ email, username, password }) {
    try {
      const model = this.store.createRecord('user', { email, username, password });
      yield model.save().then(() => {
        return this.signIn({ username, password });
      });
    } catch(e) {
      const appNotice = get(this, 'appNotice');
      appNotice.handleNotification({message: 'oops', level: 'error'});
    }
  })
}
