'use strict';

const Env = use('Env');

module.exports = {
  mailChimp: {
    url: Env.get('SERVICE_MAILCHIMP_URL'),
    api: Env.get('SERVICE_MAILCHIMP_API_KEY'),
    lists: {
      main: Env.get('SERVICE_MAILCHIMP_LISTS_MAIN')
    }
  }
};
