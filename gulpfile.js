const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat') 

/*

-- TOP LEVEL FUNCTIONS --

gulp.task - Defines tasks
gulp.src - Point to the files that we use
gulp.dest - Folder where files are output
gulp.watch - Watch files and folders for changes

*/

gulp.task('message', () => {
    console.log('Hello, Brian! Gulp is now distributing all ~/src files to the ~/dist folder ...');
})

// Copy all html files 
gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

// Optimize images
gulp.task('imagemin', () => 
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
    )

// Minify javascript
gulp.task('minify', () => 
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    )

// Compile Sass    
gulp.task('sass', () => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
})

// Scripts
gulp.task('scripts', () => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))

})

// Logs message, compiles all files to dist
    gulp.task('default', ['message', 'copyHtml', 'imagemin', 'sass', 'scripts']
    )

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
    });