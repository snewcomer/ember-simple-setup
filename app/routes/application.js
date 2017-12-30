import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  async sessionAuthenticated() {
    try {
      await this._loadCurrentUser()
      this._attemptTransitionAfterAuthentication();
    } catch(e) {
      this._invalidateSession()
    }
  },
  _attemptTransitionAfterAuthentication() {
    let attemptedTransition = get(this, 'session.attemptedTransition');
    if (isPresent(attemptedTransition)) {
      attemptedTransition.retry();
      set(this, 'session.attemptedTransition', null);
    } else {
      this.transitionTo('main.conversations');
    }
  },

  _invalidateSession() {
    get(this, 'session').invalidate();
  },

  _loadCurrentUser() {
    return get(this, 'currentUser').loadCurrentUser();
  },
});
