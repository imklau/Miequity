var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    nunjucksRender = require('gulp-nunjucks-render'),
    del = require('del')

gulp.task('html', () => {
  return gulp.src('resources/views/*.html')
             .pipe(nunjucksRender({
                path: ['resources/views']
             }))
             .pipe(gulp.dest('public'))
})

gulp.task('sass', () => {
  return gulp.src('resources/assets/scss/*.scss')
             .pipe(plumber())
             .pipe(sass.sync({
                outputStyle: 'compressed'
             }))
             .pipe(gulp.dest('public/css'))
})

gulp.task('images', () => {
  gulp.src("resources/assets/images/**/*.+(png|jpg)")
      .pipe(imagemin())
      .pipe(gulp.dest("public/images"))
})

gulp.task("js", () => {
  gulp.src("resources/assets/js/*.js")
      .pipe(uglify())
      .pipe(gulp.dest("public/js"))
})

gulp.task('clean', () => {
  del('public/')
})

gulp.task('server', () => {
  browserSync.init({
    server: { baseDir: 'public' },
    open: false
  })
})

gulp.task('watch', ['server'], () => {
  gulp.watch('resources/assets/scss/**/*.scss', ['sass', browserSync.reload])
  gulp.watch('resources/views/**/*.html', ['html', browserSync.reload])
  gulp.watch('resources/assets/js/*.js', ['js', browserSync.reload])
})

gulp.task("default", ["sass", "js", "images", "html"])

gulp.task("build", () => {
  runSequence("clean", "images", "html", "sass", "js")
})

gulp.task("build:server", ["build"], () => {
  browserSync.init({
    server: "public/"
  })
})
