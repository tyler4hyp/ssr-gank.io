const gulp = require('gulp');

gulp.task('default', function() {
  gulp.src('src/**/**/**.njk',{base: 'src'}).pipe(gulp.dest('dist/views'));
});
