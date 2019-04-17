'use strict';

const Mail = use('Mail');
const Config = use('Config');

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
        //.inReplyTo('')
        .subject('Contact message');
    });

    return response.send('The message had been sent!');
  }
}

module.exports = ContactController;
