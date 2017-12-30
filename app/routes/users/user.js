import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { service } from 'ember-decorators/service';

export default class UserRoute extends Route {
  @service currentUser

  async model() {
    let userId = get(this, 'currentUser.user.id');
    return this.store.findRecord('user', userId);
  }
}
