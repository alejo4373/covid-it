const { watch, src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

const autoprefixCss = (done) => {
  src('src/index.css')
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest('dist'))

  done()
}

exports.default = (done) => {
  watch('src/*.css', autoprefixCss)
}
