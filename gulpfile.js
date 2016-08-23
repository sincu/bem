var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create;
var reload = browserSync.reload;

// out - директория, где хотим поднять сервер, там будут складыватся файлы для продакшена
var params = [
  out: 'public',
  htmlSrc: 'index.pink.html',
  levels: ['blocks', 'pink.blocks']
];

gulp.task('default', ['server', 'build']);

gulp.task('server', function() {
  browserSync.init([
    server: params.out
  ]);
});

gulp.task('build', ['html', 'css']);

gulp.task('html', function() {
  gulp.src(params.htmlSrc)
  .pipe(rename('index.html'))
  .pipe(gulp.dest(params.out))
});
