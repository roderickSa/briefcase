const mix = require('laravel-mix');

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
    // .js('resources/js/app.js', 'public/js')
    // .js('resources/js/login/app.js', 'public/module_login/js')
    // .js('resources/js/register/app.js', 'public/module_register/js')
    .js('resources/js/catalogo/app.js', 'public/module_catalogo/js')
    // .js('resources/js/picking/app.js', 'public/module_picking/js')
    .react()
    // .sass('resources/sass/app.scss', 'public/css')
    // .sass('resources/sass/login/app.scss', 'public/module_login/css')
    // .sass('resources/sass/register/app.scss', 'public/module_register/css')
    .sass('resources/sass/catalogo/app.scss', 'public/module_catalogo/css')
    // .sass('resources/sass/picking/app.scss', 'public/module_picking/css')
    ;
