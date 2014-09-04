var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
//var browserifyshim = require('browserify-shim');

var watching = true;

gulp.task('browserify', function() {
  var bundler = watchify(browserify('./app/app.js',
      { debug: true }
    ));

  bundler
    .on('update', rebundle)
    .on('error', gutil.log.bind(gutil, 'Browserify Error'));

  function rebundle() {
    return bundler.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./dist'));
  }

  return rebundle();
});

gulp.task('html', function() {
  return gulp.src('./app/**/*.html')
  .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['html', 'browserify']);

gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
      baseDir: ['./dist/']
    },
    files: [
      "./dist/**",
      "!dist/**.map"
    ]
  });
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./app/**/*.html', ['html']);
});
