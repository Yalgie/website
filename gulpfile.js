var jsFiles = [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/jquery-ui-dist/jquery-ui.js",
    "dev/js/room.js",
    "dev/js/desktop.js",
    "dev/js/datetime.js",
    "dev/js/ga.js"
]

var gulp   =  require('gulp'),
    uglify =  require('gulp-uglify'),
    concat =  require('gulp-concat'),
    clean  =  require('gulp-clean-css'),
    rename =  require('gulp-rename'),
    sass   =  require('gulp-sass'),
    del    =  require('del'),
    gutil  =  require('gulp-util'),
    pug    =  require('gulp-pug');

// Concat + minify JS scripts for production
// Loops through jsFiles array at top of page
// Will build in the order of the array
gulp.task('scripts', function() { 
    return gulp.src(jsFiles, { allowEmpty: true })
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Compiles sass and chucks it into dev/css
gulp.task('compileSass', function() {
    return gulp.src([
        "dev/sass/**/*.scss"
    ], { allowEmpty: true })
    .pipe(sass().on('error', function(err){
        gutil.log(gutil.colors.red('[Error]'), err.toString());
        this.emit('end');
    }))
    .pipe(gulp.dest('dev/css'));
});

// Grabs the compiled sass from dev/css and minifies/cleans it
// Puts it into the dist/css folder for production
gulp.task("minifyCss", gulp.series("compileSass", function() {
    return gulp.src([
        "node_modules/jquery-ui-dist/jquery-ui.css",
        "dev/css/**/*.css"
    ], { allowEmpty: true })
    .pipe(concat('all.css'))
    .pipe(clean({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/css')) 
}));

// Compiles Pug template files into html and minifes them
gulp.task('views', function buildHTML() {
    return gulp.src('views/*.pug', { allowEmpty: true })
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// Copy font-awesome
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/**', { allowEmpty: true })
    .pipe(gulp.dest('dist/fonts'));
});

// Watches for changes on css/js/pug files
// Triggers a build for the specific type
gulp.task('watch', function() {
    gulp.watch('dev/sass/**/*.scss', ['compileSass', 'minifyCss']);
    gulp.watch('dev/js/*.js', ['scripts']);
    gulp.watch('views/**/*.pug', ['views']);
});

// Runs all of the tasks
gulp.task("build", gulp.series('compileSass', 'minifyCss', 'scripts', 'views', 'fonts', function() {
    return gulp.src(["css/style.min.css"], { allowEmpty: true })   
    .pipe(gulp.dest('dist'));
}));

// running 'gulp' in the cmd line will execute the build task
gulp.task("default", function() {
    gulp.start('build');
});

