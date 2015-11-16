var gulp = require("gulp");


/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
 gulp.task("gen-ts-refs", function () {
     var target = gulp.src("jspm_packages/github/aurelia/**/*.d.ts");
     return target.pipe(gulp.dest("typings/aurelia"));
 });