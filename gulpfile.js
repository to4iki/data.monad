var gulp = require("gulp"),
    babel = require("gulp-babel"),
    plumber = require("gulp-plumber");

gulp.task("build", function() {
    gulp.src("src/**/*.js")
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest("./lib"));
    }
);
