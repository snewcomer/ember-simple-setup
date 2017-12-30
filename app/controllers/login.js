import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

import { validatePresence } from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  username: validatePresence(true),
  password: validatePresence(true)
}

export default class SigninController extends Controller {
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
      password: ''
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

  /**
    Action that calls the `session.authenticate` method to authenticate the
    user.

    @method signin
  */
  signin = task(function * ({ username, password }) {
    try {
      yield get(this, 'session').authenticate('authenticator:jwt', { identification: username, password });
    } catch(e) {
      const appNotice = get(this, 'appNotice');
      if (e.errors[0].status === 401) {
        appNotice.handleNotification({message: 'login_fail', level: 'error'});
      } else {
        appNotice.handleNotification({message: 'oops', level: 'error'});
      }
    }
  })
}
