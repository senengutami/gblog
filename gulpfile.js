const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
var rename = require("gulp-rename");
//ejs
var ejs = require("gulp-ejs")
const srcFiles = [
    "./**/*.ejs",
    "!" + "./app/parts/*.ejs"
]
gulp.task("ejs", function () {
    return gulp.src(srcFiles)
        .pipe(ejs())
        .pipe(rename({ extname: ".html" }))
        .pipe(gulp.dest("./dist"))

})
//compile sass into CSS & auto browsers
gulp.task('sass', function () {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/app/css"))
        .pipe(browserSync.stream());
});
//copy bootstrap js file
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest("dist/app/js"))
        .pipe(browserSync.stream());
});
//images
gulp.task('images', function () {
    return gulp.src("app/images/**/*")
        .pipe(gulp.dest("./dist/app/images"))
})
//Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {

    browserSync.init({
        server: "./dist/app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series("sass"));
    gulp.watch(["app/**/*.ejs", "app/*.ejs"], gulp.series("ejs"))
    gulp.watch("dist/app/*.html").on('change', browserSync.reload);

}));

gulp.task('default', gulp.parallel('images', 'js', 'ejs', 'serve'));