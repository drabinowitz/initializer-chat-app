var gulp = require('gulp');
var shell = require('gulp-shell');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function () {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('browserify', shell.task([
  'browserify shared/Components/Routes.js -o client/bundle.js'
]));

gulp.task('watchify', shell.task([
  'watchify -d shared/Components/Routes.js -o client/bundle.js -v'
]));
