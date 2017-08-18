'use strict';

const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const debug = require('gulp-debug');
const del = require('del');
const gulpIf = require('gulp-if');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
// const concat = require('concat');
// const remember = require('gulp-remember');
// const path = require('path');
// const cached = require('gulp-cached');
// const newer = require('gulp-newer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function () {

  return gulp.src('frontend/styles/main.styl')
	  .pipe(gulpIf(isDevelopment, sourcemaps.init()))
  	  .pipe(stylus())
  	  .pipe(gulpIf(isDevelopment, sourcemaps.write()))
  	  .pipe(gulp.dest('public'));

	// return gulp.src('frontend/styles/**/*.css')
	//   .pipe(cached('styles'))
	//   .pipe(autoprefixer())
	//   .pipe(remember('styles'))
	//   .pipe(concat('all.css'))
	//   .pipe(gulp.dest('public'))
	//   .pipe(stylus('all.css'));

});

gulp.task('clean', function () {
  return del('public');
});

gulp.task('assets', function () {
  return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
	.pipe(debug({title: 'assets'}))
	.pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('styles', 'assets'))
);

gulp.task('watch', function () {
  gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));

  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('serve', function () {
  browserSync.init({
	server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
  gulp.series('build', gulp.parallel('watch', 'serve'))
);



