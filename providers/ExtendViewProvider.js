'use strict';

const { ServiceProvider } = require('@adonisjs/fold');

/**
 * class ExtendViewProvider
 * ========================
 *
 * Uses to register additional global variables to views
 * (probably extend is not a good word here)
 */
class ExtendViewProvider extends ServiceProvider {
  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const View = this.app.use('Adonis/Src/View');
    const Config = this.app.use('Adonis/Src/Config');
    const config = {
      name: Config.get('app.name'),
      url: Config.get('app.url'),
      logLevel: Config.get('app.logger.console.level'),
    };
    View.global('config', JSON.stringify(config));
    /*View.global('config', function() {
      return this.safe(config);
    });*/
  }
}

module.exports = ExtendViewProvider;
