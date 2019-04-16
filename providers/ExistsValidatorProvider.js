'use strict';

const { ServiceProvider } = require('@adonisjs/fold');

/**
 * class ExistsValidatorProvider
 * =============================
 *
 * Uses to extend global Validator with the 'exists' rule
 */
class ExistsValidatorProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = use('Validator');

    Validator.extend('exists', this.existFn);
  }

  /**
   * Registers exists validation prop
   *
   * @param data
   * @param field
   * @param message
   * @param args
   * @param get
   * @returns {Promise<void>}
   */
  async existFn(data, field, message, args, get) {
    const Database = use('Database');
    const value = get(data, field);
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return;
    }

    const [table, column] = args;
    const row = await Database.table(table).where(column, value).first();

    if (!row) {
      throw message;
    }
  }
}

module.exports = ExistsValidatorProvider;
