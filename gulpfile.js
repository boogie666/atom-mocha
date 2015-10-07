var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
    const compiler = babel();
    compiler.on("error", function(error){
        console.error(error.stack);
        compiler.end();
    });
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(compiler)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("lib"));
});

gulp.task("watch", ["default"], function(){
    gulp.watch("src/**/*.js", ["default"]);
});
