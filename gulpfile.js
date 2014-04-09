var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    bower = require('gulp-bower'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

gulp.task('css', function() {
  var css_dir = gulp.dest('css/');
  var opts = {
    keepSpecialComments: 0
  };
  return gulp.src('css/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(minify(opts))
    .pipe(css_dir)
    .pipe(livereload(server))
    .pipe(notify({ message: 'CSS has been compiled' }));
});

gulp.task('images', function() {
  return gulp.src(['images/**/*', 'post-images/**/*'])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
});

// Dummy task to watch for html changes
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(livereload(server))
    .pipe(notify({ message: 'Changes logged. Reloading.' }));
});

gulp.task('default', ['css', 'deps', 'images', 'server'], function() {
});

// Watch
gulp.task('server', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    };

    // Watch .scss files
    gulp.watch('css/scss/**/*.scss', ['css']);

    // Watch image files
    gulp.watch(['images/**/*', 'post-images/**/*'], ['images']);

    // Watch Liquid templates
    gulp.watch('*.html', ['html']);
  });

});