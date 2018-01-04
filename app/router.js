import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin');
  this.route('login');
  this.route('signup');
  this.route('main', function() {
  });
  this.route('users', function() {
    this.route('user', { path: '/:slug' });
  });

  this.route('password', function() {
    this.route('reset');
    this.route('forgot');
  });
  this.route('redirect', { path: '/*wildcard' })
});

export default Router;
