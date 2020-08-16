var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        files: ["index/html"],
        server: {
            baseDir: "./",
            index: 'index.html'
        }
    });

    gulp.watch("index.html").on("change", reload);
});
