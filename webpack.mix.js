let mix = require('laravel-mix')

mix
    // Directories
    .copyDirectory('site/src/assets', './public/assets')
    .copyDirectory('site/_redirects', './public/')

    // JavaScript
    .js('./site/src/scripts/app.js', 'public/scripts').setPublicPath('public')
    .js('./site/src/scripts/calculator.js', 'public/scripts').setPublicPath('public')
    .js('./site/src/scripts/exportTable.js', 'public/scripts').setPublicPath('public')
    .js('./site/src/scripts/tabs.js', 'public/scripts').setPublicPath('public')

    // CSS
    .sass('./site/src/style/style.scss', 'public/style/style.css')
