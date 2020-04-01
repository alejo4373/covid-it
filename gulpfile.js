const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

exports.default = (done) => {
  gulp.src('src/index.css')
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('dist'))

  done()
}
