'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const through2 = require('through2');
const fs = require('fs');
// const through2 = require('through2').obj;
// const File = require('vinyl');
// const autoprefixer = require('autoprefixer');
// const debug = require('gulp-debug');
// const del = require('del');
// const gulpIf = require('gulp-if');
// const stylus = require('gulp-stylus');
// const sourcemaps = require('gulp-sourcemaps');
// const browserSync = require('browser-sync').create();
// const notify = require('gulp-notify');
// const multipipe = require('multipipe');
// const plumber = require('gulp-plumber');
// const concat = require('concat');
// const remember = require('gulp-remember');
// const path = require('path');
// const cached = require('gulp-cached');
// const newer = require('gulp-newer');

gulp.task('lint', function () {

  let eslintResults = {};

  let cacheFilePath = process.cwd() + '/tmp/lintCache.json';

  return gulp.src('frontend/**/*.js')
	.pipe(eslint())
	.pipe(through2(function (file, enc, callback) {
	  eslintResults[file.path] = {
	    eslint: file.eslint,
		mtime: file.stat.mtime
	  };
	  callback(null, file);
	}, function (callback) {
	  	fs.writeFileSync(cacheFilePath, JSON.stringify(eslintResults));
	  	callback();
	  }))
	.pipe(eslint.format())
	.pipe(eslint.failAfterError())
});

// gulp.task('assets', function () {
//
//   const mtimes = {};
//
//   return gulp.src('frontend/assets/**/*.*')
// 	.pipe(through2(
// 	  function (file, enc, callback) {
// 		mtimes[file.relative] = file.stat.mtime;
// 		callback(null, file);
// 	  }
// 	))
// 	.pipe(gulp.dest('public'))
// 	.pipe(through2(
// 	  function (file, enc, callback) {
// 		callback();
// 	  },
// 	  function (callback) {
// 		let manifest = new File({
// 		  contents: new Buffer(JSON.stringify(mtimes)),
// 		  base: process.cwd(),
// 		  path: process.cwd() + '/manifest.json'
// 		});
// 		this.push(manifest);
// 		callback();
// 	  }
// 	))
// 	.pipe(gulp.dest('.'));
// });

// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// gulp.task('styles', function () {
//
//   // return multipipe(
// 	// gulp.src('frontend/styles/main.styl'),
// 	//   // .pipe(plumber({
// 	// 	// errorHandler: notify.onError(function (err) {
// 	// 	//   return {
// 	// 	// 	title: 'Styles',
// 	// 	// 	message: err.message
// 	// 	//   };
// 	// 	// })
// 	//   // }))
// 	// gulpIf(isDevelopment, sourcemaps.init()),
// 	// stylus(),
// 	// gulpIf(isDevelopment, sourcemaps.write()),
// 	// gulp.dest('public')
//   // ).on('error', notify.onError());
//
// 	// return gulp.src('frontend/styles/**/*.css')
// 	//   .pipe(cached('styles'))
// 	//   .pipe(autoprefixer())
// 	//   .pipe(remember('styles'))
// 	//   .pipe(concat('all.css'))
// 	//   .pipe(gulp.dest('public'))
// 	//   .pipe(stylus('all.css'));
//
// });
//
// gulp.task('clean', function () {
//   return del('public');
// });
//
// gulp.task('assets', function () {
//   return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
// 	.pipe(debug({title: 'assets'}))
// 	.pipe(gulp.dest('public'));
// });
//
// gulp.task('build', gulp.series(
//   'clean',
//   gulp.parallel('styles', 'assets'))
// );
//
// gulp.task('watch', function () {
//   gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
//
//   gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
// });
//
// gulp.task('serve', function () {
//   browserSync.init({
// 	server: 'public'
//   });
//
//   browserSync.watch('public/**/*.*').on('change', browserSync.reload);
// });
//
// gulp.task('dev',
//   gulp.series('build', gulp.parallel('watch', 'serve'))
// );



