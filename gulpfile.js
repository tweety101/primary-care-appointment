var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var zip = require('gulp-zip');

//image compression
var imagemin = require('gulp-imagemin');
var imageminPngquaint = require('imagemin-pngquant')
var imageminJpgCompress = require('imagemin-jpeg-recompress')

// file paths

var DIST_PATH = 'public/dist/'
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var IMAGE_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}'

// styles for SCSS

gulp.task('styles', function() {
    console.log('starting styles tasks');

    return gulp.src('public/scss/styles.scss')
        .pipe(plumber(function(err) {
            console.log('Styles task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

// styles for plain css


// gulp.task('styles', function() {
//    console.log('starting styles tasks');
//
//    return gulp.src(['public/css/reset.css', CSS_PATH])
//        .pipe(plumber(function(err) {
//            console.log('Styles task error');
//            console.log(err);
//            this.emit('end');
//        }))
//        .pipe(sourcemaps.init())
//        .pipe(autoprefixer({
//            browsers: ['last 3 versions'],
//            cascade: false
//        }))
//        .pipe(concat('styles.css'))
//        .pipe(minifyCss())
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest(DIST_PATH))
//        .pipe(livereload());
//});

// scripts

gulp.task('scripts', function() {
    console.log('starting scripts tasks');

    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});


// images

gulp.task('images', function() {
    console.log('starting images tasks');
    gulp.src(IMAGE_PATH)
    .pipe(imagemin(
        [
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng(),
            imagemin.svgo(),
            imageminPngquaint(),
            imageminJpgCompress()
    ]
    ))
    .pipe(gulp.dest(DIST_PATH + '/images'));
});

//default

gulp.task('default', function() {
    console.log('starting default taks');


});

gulp.task('export', function() {
    return gulp.src(['public/dist/**/*', 'public/*.html'], {base: "."})
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('./'));
})

gulp.task('build', function() {
    gulp.src('public/*.html')
        .pipe(gulp.dest('./public/dist'));
       
    gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(gulp.dest('./public/dist'));
    gulp.src('public/scss/styles.scss')
        .pipe(plumber(function(err) {
            console.log('Styles task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        
    
})

gulp.task('html', function() {
    console.log('reloading html');
    return gulp.src('public/*.html')
        .pipe(gulp.dest('./public/dist'))
        .pipe(livereload());
    

})

gulp.task('watch', function() {
    console.log('starting the watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
 //   gulp.watch(CSS_PATH, ['styles']);
    gulp.watch('public/scss/**/*.scss', ['styles']);
    gulp.watch('public/*.html', ['html'])
});