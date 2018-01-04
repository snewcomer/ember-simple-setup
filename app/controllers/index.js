import Controller from '@ember/controller';

export default class IndexController extends Controller {
  constructor() {
    super();

    this.supportiveMessages = [
      'Welcome to ember-simple-setup'
    ]
  }
}
