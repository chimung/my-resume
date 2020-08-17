var { src, dest, series, parallel, watch } = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

function buildScss() {
  const postcss = require('gulp-postcss')
  return src('scss/*.scss')
              .pipe(sass())
              .pipe(postcss([
                require('tailwindcss')
              ]))
              .pipe(dest('dist'))
              .pipe(browserSync.stream())
}

function moveIndex() {
  return src('index.html')
    .pipe(dest('dist'))
}


// Static server
function serve(done) {
    browserSync.init({
        open: false,
        files: ['*.html', '*.css'],
        server: {
            baseDir: "./dist",
            index: 'index.html'
        }
    });

    done()
};

function watchFileChange() {
  watch("scss/*.scss").on('change', buildScss)
  watch("tailwind.config.js").on('change', buildScss)
  watch("index.html").on('change', moveIndex)
}
exports.default = series(
  parallel(moveIndex, buildScss),
  serve,
  watchFileChange
)
