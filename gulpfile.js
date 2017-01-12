var gulp = require('gulp'),
    fs = require('fs'),
    through = require('through2'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    gulpSequence = require('gulp-sequence'),
    newshater = require('./newshater/newshater'),
    coreComponents = require('./newshater/newshater-core-components'),
    watch = require('gulp-watch'),
    inlineCss = require('gulp-inline-css'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');




gulp.task('default', gulpSequence('processHtml', 'processCss'));


 gulp.task('watch', ['default'], function () {
    gulp.watch('./src/**/*.scss', ['processHtml','processCss']);
    gulp.watch('./src/**/*.pug', ['processHtml','processCss']);
});


gulp.task('processHtml', function(callback){
    gulpSequence('pug','newshater')(callback);
});
gulp.task('processCss', function(callback){
    gulpSequence('sass', 'inlineCss')(callback);
});

//newshater TASK
gulp.task('newshater', function () {
    //Source & destination
    var newshaterSrcDest = {
        'src':'/process/',
        'dest':'/dist/'
    }
    //newshater TASK
    gulp.src('.'+newshaterSrcDest.src+'**/*.html')
        .pipe(through({ objectMode: true, allowHalfOpen: false }, function (chunk, enc, cb) {
            //console.log(chunk.path);
            var html = fs.readFile(chunk.path, 'utf8', function(err, html){
                //console.log(html);
                newshater.init(html);

                //functionnality
                //newshater.replaceEach('row', ['table','tr']);

                coreComponents(); //Execute all components

                //Return the final html result
                var rewritten = newshater.html();

                var dest = chunk.path.replace(newshaterSrcDest.src,newshaterSrcDest.dest)
                fs.writeFile(dest, rewritten, (err) => {
                    if(err){throw err};
                    console.log('It\'s saved!');
                });
                //console.log(rewritten);
            });
            cb(null, null)
        }));
});

//PUG TASK
gulp.task('pug', function () {

    var YOUR_LOCALS = {};

    return gulp.src('./src/**/*.pug')
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(pug({
            pretty: false,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./process'));

});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('inlineCss', function() {
    console.log('inlineCss');
    return gulp.src('./dist/**/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./dist/'));
});


