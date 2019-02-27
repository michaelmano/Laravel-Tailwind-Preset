const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

// Custom PurgeCSS extractor for Tailwind that allows special characters in class names.
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    // eslint-disable-next-line no-useless-escape
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/js/app.js', 'public/js')
  .copy('resources/images', 'public/images')
  .sass('resources/sass/app.scss', 'public/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.js')],
  });

// Only run PurgeCSS during production builds for faster development builds
// and so you still have the full set of utilities available during
// development.
if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new PurgecssPlugin({
        // Remove empty keyframe rules.
        keyframes: true,
        // Specify the locations of any files you want to scan for class names.
        paths: glob.sync([
          // eslint-disable-next-line no-undef
          path.join(__dirname, 'resources/views/**/*.blade.php'),
          // eslint-disable-next-line no-undef
          path.join(__dirname, 'resources/js/**/*.vue'),
        ]),
        extractors: [
          {
            extractor: TailwindExtractor,
            // Specify the file extensions to include when scanning for class names.
            extensions: ['html', 'js', 'php', 'vue'],
          },
        ],
      }),
    ],
  });
}