'use strict';

const gulp = require('gulp');
const concat = require('concat');
const autoprefixer = require('autoprefixer');
const remember = require('gulp-remember');
const path = require('path');
const cached = require('gulp-cached');
const debug = require('gulp-debug');
// const del = require('del');
// const newer = require('gulp-newer');
// const stylus = require('gulp-stylus');
// const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {

	return gulp.src('frontend/styles/**/*.css')
	  .pipe(cached('styles'))
	  .pipe(autoprefixer())
	  .pipe(remember('styles'))
	  .pipe(concat('all.css'))
	  .pipe(gulp.dest('public'));
  // .pipe(stylus('all.css'))

});

// gulp.task('clean', function () {
//   return del('public');
// });

// gulp.task('assets', function () {
//   return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
// 	.pipe(newer('public'))
// 	.pipe(debug({title: 'assets'}))
// 	.pipe(gulp.dest('public'));
// });

// gulp.task('build', gulp.series(
//   'clean',
//   gulp.parallel('styles'/*, 'assets'*/))
// );

gulp.task('watch', function () {
  gulp.watch('frontend/styles/**/*.css', gulp.series('styles')).on('unlink', function (filepath) {
	remember.forget('styles', path.resolve(filepath));
	delete cached.caches.styles[path.resolve(filepath)];
  });

  // gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('dev', gulp.series('styles', 'watch'));



