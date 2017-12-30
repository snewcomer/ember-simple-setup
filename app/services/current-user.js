import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';
import Service, { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Service.extend({
  session: service(),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      let userId = get(this, 'session.session.authenticated.user_id');
      if (!isEmpty(userId)) {
        return get(this, 'store').findRecord('user', userId).then((user) => {
          set(this, 'user', user);
          resolve(user);
        }, reject);
      } else {
        resolve(null);
      }
    });
  }
});
