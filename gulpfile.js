
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

gulp.task('sass', function() {
    gulp.src('assets/css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('auto-sass', ['sass'], function() {
    gulp.watch('assets/css/main.scss', ['sass']);
})

gulp.task('minify', function() {
 gulp.src('assets/scripts/*.js')
   .pipe(minify({
       ext:{
           min:'-min.js'
       },
       exclude: ['tasks'],
       ignoreFiles: ['.combo.js', '-min.js']
   }))
   .pipe(gulp.dest('assets/scripts/min/'))
});