const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for our application.
 |
 | Note, you can pass additional presets/plugins for babel using .babelrc file.
 | Webpack.mix will just merge configs smartly.
 |
 */

mix
// setting the public directory to public (this is where the mix-manifest.json gets created)
  .setPublicPath('public')
  .copyDirectory('resources/images', 'public/images')
  .copyDirectory('resources/styles/img', 'public/styles/img')
  // transpiling, babelling, minifying and creating the public/js/index.js out of our assets
  .react(['resources/js/index.js'], 'public/js')
  // same for css
  .sass('resources/styles/main.scss', 'public/styles');

if (mix.inProduction()) {
  mix.version();
}
