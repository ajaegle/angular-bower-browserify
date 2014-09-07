var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
//var browserifyshim = require('browserify-shim');

var watching = true;

gulp.task('browserify', function() {
  var b = browserify('./app/app.js',
      {
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
      }
    );

  var w = watchify(b);

  var rebundle = function () {
    return w.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./dist'));
  };

  w.on('update', rebundle);
  w.on('error', function(e) {
    gutil.log('Browserify Error', e);
  });
  return rebundle();
});

gulp.task('html', function() {
  return gulp.src('./app/**/*.html')
  .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  return gulp.src(['./app/**/*.css', './bower_components/ng-tags-input/ng-tags-input.css'])
  .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['html', 'css', 'browserify']);

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
  gulp.watch('./app/**/*.css', ['css']);
});
