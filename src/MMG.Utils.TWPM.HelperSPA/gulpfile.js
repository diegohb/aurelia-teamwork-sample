var gulp = require("gulp");
var bundler = require("aurelia-bundler");

var config = {
    force: true,
    baseURL: ".", // baseURL of the application
    configPath: "./config.js", // config.js file. Must be within `baseURL`
    bundles: {
        "dist/app-build": {
            includes: [
                "[app/**/*.js]" /*,
                "*.html!text",
                "*.css!text"*/
            ],
            options: {
                inject: true,
                minify: true
            }
        },
        "dist/vendor-build": {
            includes: [
                "aurelia-bootstrapper",
                "aurelia-fetch-client",
                "aurelia-router",
                /*"aurelia-animator-css",*/
                "aurelia-templating-binding",
                "aurelia-templating-resources",
                "aurelia-templating-router",
                "aurelia-loader-default",
                "aurelia-history-browser",
                "aurelia-logging-console",
                "core-js",
                "babel" /*,
                "bootstrap/css/bootstrap.css!text"*/
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("bundle", ["unbundle"], function() {
    return bundler.bundle(config);
});

gulp.task("unbundle", function() {
    return bundler.unbundle(config);
});

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task("gen-ts-refs", function() {
    var target = gulp.src("jspm_packages/github/aurelia/**/*.d.ts");
    return target.pipe(gulp.dest("typings/aurelia"));
});