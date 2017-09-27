var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var del = require('del');

gulp.task('sass', function() {
    return gulp.src('app/scss/main.scss')
               .pipe(plumber())
               .pipe(sass.sync({
                   outputStyle: 'compressed'
               }))
               .pipe(gulp.dest('app/css'))
               .pipe(browserSync.stream());
});

gulp.task('server', function() {
    browserSync.init({
        server: 'app'
    });
});

gulp.task('watch', function() {
    gulp.watch('app/scss/*/*.scss', ['sass']);
    gulp.watch(['app/*.html', 'app/js/.js'], browserSync.reload);
});

gulp.task('images', function() {
    gulp.src("app/images/**/*.+(png|jpg)")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

gulp.task('clean', function() {
    del('dist/');
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task("js", function() {
        gulp.src("app/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("copy", function() {
    gulp.src("app/css/*.css")
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("default", ["sass", "server", "watch"]);

gulp.task("minify", ["html", "js"]);

gulp.task("build", function() {

    runSequence("clean", "images", "minify", "copy");

});

gulp.task("build:server", ["build"], function() {

    browserSync.init({
        server: "dist/"
    });

});
