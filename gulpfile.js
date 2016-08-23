var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var autoprefixer = require('autoprefixer')
var postcss = require('gulp-postcss')

// out - директория, где хотим поднять сервер, там будут складыватся файлы для продакшена (называют эти params "ключ")
var params = {
  out: 'public',
  htmlSrc: 'index.potter.html',
  levels: ['blocks', 'potter.blocks']
}

// Названия метода gulp.task - 'default', зависимости - ['server', 'build']
gulp.task('default', ['server', 'build'])

gulp.task('server', function() {
  browserSync.init({
    server: params.out
  })
  gulp.watch('*.html', ['html'])
  gulp.watch(params.levels.map(function(level) {
    var cssGlob = level + '/**/*.css'
    return cssGlob
  }), ['css'])
})

// Сюда добавлять задачи
gulp.task('build', ['html', 'css'])

gulp.task('html', function() {
  gulp.src(params.htmlSrc)
  .pipe(rename('index.html'))
  .pipe(gulp.dest(params.out))
  .pipe(reload({stream: true}))
})

gulp.task('css', function() {
  gulp.src(['blocks/**/*.css', 'potter.blocks/**/*.css'])
  .pipe(concat('styles.css'))
  .pipe(postcss([ autoprefixer() ]))
  .pipe(gulp.dest(params.out))
  .pipe(reload({stream: true}))
})
