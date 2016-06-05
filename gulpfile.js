'use strict';

var gulp = require('gulp');  // eslint-disable-line
var stylus = require('gulp-stylus');  // eslint-disable-line
var autoprefixer = require('gulp-autoprefixer'); // eslint-disable-line
var uglifyJS = require('gulp-uglifyjs');  // eslint-disable-line

gulp.task('stylus-dev', function () {
    return gulp.src('./static/css/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./static/css/compiled'));
});

gulp.task('stylus', function () {
    return gulp.src('./static/css/*.styl')
        .pipe(stylus({compress: true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./DATA/css/compiled'));
});

gulp.task('uglifyJS-dev', function () {
    gulp.src('./static/js/*.js')
        .pipe(uglifyJS())
        .pipe(gulp.dest('./static/js/compiled'));
});

gulp.task('uglifyJS', function () {
    gulp.src('./static/js/*.js')
        .pipe(uglifyJS())
        .pipe(gulp.dest('./DATA/js/compiled'));
});

gulp.task('watch', function () {
    gulp.watch('./static/css/*.styl', ['stylus-dev']);
    gulp.watch('./static/js/*.js', ['uglifyJS-dev']);
});

gulp.task('default', ['stylus', 'uglifyJS']);

gulp.task('build-dev', ['stylus-dev', 'uglifyJS-dev']);
