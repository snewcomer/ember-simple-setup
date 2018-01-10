import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  /**
   * load the current user loaded into the session
   * @method beforeModel
   */
  async beforeModel() {
    try {
      await this._loadCurrentUser()
      return this._super(...arguments);
    } catch (_e) {
      this._invalidateSession();
    }
  },

  async sessionAuthenticated() {
    try {
      const user = await this._loadCurrentUser();
      this._attemptTransitionAfterAuthentication(user);
    } catch(e) {
      this._invalidateSession()
    }
  },
  _attemptTransitionAfterAuthentication(user) {
    let attemptedTransition = get(this, 'session.attemptedTransition');
    if (isPresent(attemptedTransition)) {
      attemptedTransition.retry();
      set(this, 'session.attemptedTransition', null);
    } else {
      this.transitionTo('users.user', { slug: get(user, 'username') });
    }
  },

  _invalidateSession() {
    get(this, 'session').invalidate();
  },

  _loadCurrentUser() {
    return get(this, 'currentUser').loadCurrentUser();
  },
});
