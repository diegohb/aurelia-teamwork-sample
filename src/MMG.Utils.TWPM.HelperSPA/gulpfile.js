/// <vs />
var gulp = require("gulp");
var bundler = require("./jspm_packages/npm/aurelia-bundler@0.1.9");

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task("gen-ts-refs", function () {
    var target = gulp.src("jspm_packages/github/aurelia/**/*.d.ts");
    return target.pipe(gulp.dest("typings/aurelia"));
});


var config = {
    force: true,
    packagePath: ".",
    bundles: {
        "dist/app-build": {
            includes: [
              "*",
              "*.html!text",
              "*.css!text",
              "bootstrap/css/bootstrap.css!text"
            ],
            options: {
                inject: true,
                minify: true
            }
        },
        "dist/aurelia": {
            includes: [
                 "aurelia-bootstrapper",
            "aurelia-framework",
            "aurelia-http-client"
              /*,"aurelia-bootstrapper",
              "aurelia-fetch-client",
              "aurelia-router",
              "aurelia-animator-css",
              "github:aurelia/templating-binding",
              "github:aurelia/templating-resources",
              "github:aurelia/templating-router",
              "github:aurelia/loader-default",
              "github:aurelia/history-browser",
              "github:aurelia/logging-console"*/
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("bundle", function () {
    return bundler.bundle(config);
});

gulp.task("unbundle", function () {
    return bundler.unbundle(config);
});