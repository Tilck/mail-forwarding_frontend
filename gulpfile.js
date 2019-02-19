'use strict';

let fs = require('fs'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync').create();

gulp.task('sass', function () {
	return gulp.src('./public/shop/assets/css/scss/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./public/shop/assets/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./public/shop/assets/css/scss/**/*.scss', ['sass']);
});

gulp.task('autoprefixer', function () {
	return gulp.src('css/style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('css/'));
});

let jsFilesArray = [
	'**/*'
];

const assetsPath = './',
	destPath = './dist';

function getJsFiles() {
	return jsFilesArray.map(file => `${assetsPath}js/${file}.js`);
}


let paths = {
	css: [`${assetsPath}/css/scss/**/*.scss`],
	js: './js/**/*.js',
	html: './**/*.html',
	destCss: `${destPath}`,
	destJs: `${destPath}`
};


let isProd = gutil.env.env === 'production';


gulp.task('sass', function () {

	gulp.src(paths.css)
		.pipe(sass().on('error', sass.logError))
		.pipe(isProd ? autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}) : gutil.noop())
		.pipe(isProd ? cssmin({
			compatibility: '*',
			level: {
				2: {
					all: false,
					removeDuplicateRules: true
				}
			}
		}) : gutil.noop())
		.pipe(gulp.dest(paths.destCss))
		.pipe(browserSync.stream());
});

gulp.task('js', function () {
	gulp.src(paths.js)
		.pipe(concat('all.js'))
		.pipe(babel())
		.pipe(isProd ? uglify({
			mangle: true
		}) : gutil.noop())
		.on('error', function (err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		.pipe(gulp.dest(paths.destJs))
		.pipe(browserSync.stream());
});

gulp.task('serve', function () {

	browserSync.init({
		server: "./",
		port: 8080
	});

	gulp.watch(paths.css, ['sass']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.html).on('change', browserSync.reload);
});


gulp.task('default', ['build']);

gulp.task('build', ['sass', 'js']);
