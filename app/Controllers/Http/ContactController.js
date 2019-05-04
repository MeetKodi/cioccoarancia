'use strict';

const _ = use('lodash');
const Mail = use('Mail');
const Config = use('Config');
const axios = use('axios');

/**
 * Class ContactController
 * =======================
 */
class ContactController {
  /**
   * Sends message from user to admin email
   *
   * @param request
   * @param response
   * @returns {Promise<boolean | void>}
   */
  async sendMessage({ request, response }) {
    const data = request.only(['email', 'message']);
    const adminEmail = Config.get('app.adminEmail');

    await Mail.send('emails.contact', { message: data.message }, message => {
      message
        .to(adminEmail)
        .from(adminEmail)
        .replyTo(data.email)
        .subject('Contact message');
    });

    return response.send('Grazie!');
  }

  /**
   * Registers email address to the main MailChimp list
   *
   * @param request
   * @param response
   * @returns {Promise<boolean | void>}
   */
  async registerEmail({ request, response }) {
    const { email } = request.only(['email']);
    const url = Config.get('services.mailChimp.url');
    const api = Config.get('services.mailChimp.api');
    const listId = Config.get('services.mailChimp.lists.main');

    try {
      await axios.post(`${url}/lists/${listId}/members`,
        {
          email_address: email,
          status: 'subscribed'
        },
        {
          headers: {
            'Authorization': `Bearer ${api}`
          }
        }
      );
    } catch (e) {
      const message = _.get(e, 'response.data.title') || e.message || 'Unknown error.';
      throw new Error(message);
    }

    return response.send(email);
  }
}

module.exports = ContactController;
