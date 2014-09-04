var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
//var browserifyshim = require('browserify-shim');

var watching = true;

gulp.task('browserify', function() {
  var bundler = browserify({
    // watchify args
    cache: {}, packageCache: {}, fullPaths: true,

    transform: ['browserify-shim'],
    insertGlobals: true,
    entries: ['./app/app.js'],

    debug: false
  });

  var bundle = function() {
    //console.log(bundler);
    return bundler
    .bundle()
    // gulp-compatible stream (output filename)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));
  };

  if(watching) {
    bundler = watchify(bundler);
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }
  return bundle();
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
