var gulp = require("gulp");
/*var bundler = require("aurelia-bundler");*/
var bundler = require("./node_modules/aurelia-bundler/dist/bundler");

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
                "aurelia-binding",
                "aurelia-dependency-injection",
                "aurelia-loader",
                "aurelia-logging",
                "aurelia-metadata",
                "aurelia-pal",
                "aurelia-path",
                "aurelia-task-queue",
                "aurelia-templating",
                "core-js"
            ],
            options: {
                inject: true,
                minify: true
            }
        }
    }
};

gulp.task("bundle", function() {
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