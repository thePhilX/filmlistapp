'use strict';

var path = require('path');
var gulp = require('gulp');
var zip = require('gulp-zip');
var prompt = require('gulp-prompt');
var rename = require('gulp-rename');

gulp.task('marketplace-release', ['build', 'dev-release'], function () {
  return gulp.src('')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'version',
      message: 'Please enter release version (x.x.x)'
    }, function (res) {
      var nameAndVersion = 'blur-admin-' + res.version;
      return gulp
        .src(['/public/src/**', '/public/release/**', '/public/dev-release/**', '/public/gulp/**', 'bower.json', '/public/gulpfile.js', 'package.json', 'README.md', '/public/.gitignore', '.gitignore'], {base: "."})
        .pipe(rename(function (path) {
          path.dirname = nameAndVersion + '/' + path.dirname;
        }))
        .pipe(zip(nameAndVersion + '.zip'))
        .pipe(gulp.dest('.'));
    }));

});
