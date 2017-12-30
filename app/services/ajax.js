import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'ember-simple-setup/config/environment';

export default AjaxService.extend({
  host: ENV.API_BASE_URL,

  session: service(),

  headers: computed('session.session.authenticated.token', {
    get() {
      let headers = {};
      let token = get(this, 'session.session.authenticated.token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // eslint-disable-line dot-notation
      }
      return headers;
    }
  })
});
