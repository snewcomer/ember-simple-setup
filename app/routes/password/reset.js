import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default class ResetRoute extends Route {
  queryParams = {
    token: { refreshModel: true }
  }

  model(params) {
    return params.token;
  }

  setupController(controller, model) {
    set(controller, 'token', model);
  }
}
