const gulp      = require('gulp'),
sass        = require('gulp-sass'),
babel       = require('gulp-babel'),
uglify      = require('gulp-uglify'),
imagemin    = require('gulp-imagemin'),
browserSync = require('browser-sync').create(),
gutil = require('gulp-util');

const src = {
  js     : ['js/**/*.js'],
  sass   : ['scss-page/**/*.scss'],
  html   : ['../**/*.html'],
  img    : ['img/**/*.jpg','img/**/*.jpeg','img/**/*.png','img/**/*.gif','img/**/*.svg']
};

gulp.task('default',function(){
  gulp.start(['build-css', 'build-img', 'build-js', 'browser-sync']);
});

gulp.task('build-css', function() {
  gulp.src(src.sass)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('../build/css'))
  .pipe(browserSync.stream());
});

gulp.task('build-img', function() {
  gulp.src(src.img)
  .pipe(imagemin())
  .pipe(gulp.dest('../build/img'))
  .pipe(browserSync.stream());
});

gulp.task('build-js', function() {
  gulp.src(src.js)
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .on('error', function(err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('../build/js'))
  .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "../"
    }
  });
  gulp.watch([src.sass, 'scss/**/*.scss'], ['build-css']);
  gulp.watch(src.js, ['build-js']);
  gulp.watch(src.img, ['build-img']);
  gulp.watch(src.html).on('change', browserSync.reload);
});
