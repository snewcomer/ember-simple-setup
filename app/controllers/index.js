import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

import { validatePresence } from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  username: validatePresence(true)
};

export default class IndexController extends Controller {
  /**
    @property appNotice
    @type Ember.Service
  */
  @service appNotice

  constructor() {
    super();

    this.model = {
      username: ''
    };
    this.validations = NEW_MODEL;
    this.supportiveMessages = [
      'Welcome to ember-simple-setup'
    ]
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

  submitName = task(function * ({ username }) {
    try {
      const model = this.store.createRecord('user', { username });
      yield model.save().then(() => {
        this.transitionToRoute('users.user', model);
      });
    } catch(e) {
      const appNotice = get(this, 'appNotice');
      appNotice.handleNotification({message: 'oops', level: 'error'});
    }
  })
}
