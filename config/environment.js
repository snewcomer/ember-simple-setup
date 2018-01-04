/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ember-simple-setup',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      SEARCH_DEBOUNCE: 250,
      ANIMATION_TIME: 333,
      DISMISS_NOTICE_TIMEOUT: 5000
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    cloudinary: {},
    DS: {
      host: 'http://localhost:4000'
    },
    i18n: {
      defaultLocale: 'en'
    }
  };

  if (environment === 'development') {
    ENV.API_BASE_URL = 'http://localhost:4000';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV.cloudinary.cloud = 'snewcomer';
    ENV.cloudinary.uploadPreset = 'qzyqzcjk'
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'mirage-development') {
    ENV.API_BASE_URL = '';
    ENV.WEB_BASE_URL = '';
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'test') {
    ENV.API_BASE_URL = '';
    ENV.WEB_BASE_URL = '';
    ENV.APP.SEARCH_DEBOUNCE = 0;
    ENV.APP.ANIMATION_TIME = 0;
    ENV.APP.DISMISS_NOTICE_TIMEOUT = 0;

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.SEARCH_DEBOUNCE = 0;
    ENV.APP.ANIMATION_TIME = 0;
    ENV.APP.DISMISS_NOTICE_TIMEOUT = 0;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.DS.host = 'https://website.com';
    ENV.API_BASE_URL = 'https://website.com';
    ENV.WEB_BASE_URL = 'https://website.com'; 
    ENV.cloudinary.cloud = 'snewcomer';
    ENV.cloudinary.uploadPreset = 'qzyqzcjk';
  }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.API_BASE_URL + '/token',
    serverTokenRefreshEndpoint: ENV.API_BASE_URL + '/token/refresh',
    refreshLeeway: 300, // 5 minutes before expiry
  };

  return ENV;
};
