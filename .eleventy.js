const htmlmin = require("html-minifier"); //minify html

const prettyDate = require('./lib/pretty-date.js')

module.exports = function(eleventyConfig) {

    // Recomplile 11ty when files change
    eleventyConfig.addWatchTarget("./src/style/")

    eleventyConfig.addCollection("featuredPosts", collection => {
        return collection.getFilteredByTag("post").filter(item => item.data.featured);
    });

    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByTag("post").reverse();
    });

    // Expose Nunjucks filters
    eleventyConfig.addFilter("prettyDate", prettyDate);

    // Automatically open up the browser on script runs
    eleventyConfig.setBrowserSyncConfig({
        open: true
    })

    // minify html on prod build
    eleventyConfig.addTransform ('htmlmin', content => {
        if (process.env.NODE_ENV === 'production') {
          return htmlmin.minify (content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
          })
        }
        return content
    })

    eleventyConfig.addGlobalData('site', {
        name: 'Your Site Name',
        url: 'https://yoursitename.com',
        host: process.env.NODE_ENV === 'production' ? 'https://gearset.com' : 'http://localhost:8080',
        slogan: 'Your global site slogan',
        description: "your default site description"
    });
     

    return {
        htmlTemplateEngine: 'njk',

        dir: {
            input: "site/src",
            output: "public",
            // In relation to input
            layouts: "../templates",
            // In relation to input
            includes: "../templates/partials"
        },

        templateFormats: [
            "md",
            "njk",
            "jpg",
            "jpeg", 
            "png",
            "gif",
            "webp",
            "svg",
            "xml",
            "txt",
            "pdf",
            "zip",
            "mp4",
            "ogv",
            "json",
            "ics"
        ]
    }
}
