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

gulp.task('deps', function() {
  var scripts_dir = gulp.dest('js/');
  return gulp.src([
    'js/vendor/FitText.js/*.js',
    'js/vendor/Lettering.js/*.js',
    'js/vendor/Flowtype.js/*.js'
    ])
    .pipe(concat('typography.js'))
    .pipe(scripts_dir)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(scripts_dir)
    .pipe(livereload(server))
    .pipe(notify({ message: 'Typography tools ready' }))
});

gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
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

    // Watch .js files
    gulp.watch('js/*.js', ['deps']);

    // Watch image files
    gulp.watch('images/*', ['images']);

  });

});