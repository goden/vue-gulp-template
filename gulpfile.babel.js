var gulp =        require('gulp');
var image =       require('gulp-image');            // 圖形優化
var sass =        require('gulp-sass');             // SASS/SCSS編譯
// var compass =     require('gulp-compass');
var sourcemaps =  require('gulp-sourcemaps');       // 編譯時要在產出源碼檔中嵌入source maps
var uglify =      require('gulp-uglify');           // 壓縮javascript
var plumber =     require('gulp-plumber');          // 例外處理
var notify =      require('gulp-notify');           // gulp處理通知
var clean =       require('gulp-clean');            // 清空所有dest目錄下所有目錄與檔案
var browserify =  require('browserify');            // 處理javascript中的require語法，包裝指定的函式至指定檔案           //
var babelify =    require('babelify');              //
var source =      require('vinyl-source-stream');   // 承接browserify.bundle產生的vinyl串流
var buffer =      require('vinyl-buffer');
var runSequence = require('run-sequence');          // 讓任務依指定順序來執行
var htmlminify =  require('gulp-html-minify');      // 壓縮html內容
var rename =      require('gulp-rename');
var gutil =       require('gulp-util');
var fs =          require('fs');

var bs =          require('browser-sync').create();

var envs =        require('./src/scripts/env.js');

// 複製並優化src/images目錄下所有圖片
gulp.task('build-image', function() {
    return gulp.src('./src/images/*')
        .pipe(plumber())
        .pipe(image())
        .pipe(gulp.dest('./dist/img'))
        .pipe(notify('image task has done!'));
});

// 編譯SCSS為CSS
// 產品化時才加入參數outputstyle
gulp.task('build-style', function() {

    return gulp.src('./src/sass/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        // .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify('style task has done!'));
});

// javascript編譯、壓縮
gulp.task('build-script', function() {

    const _path = './src/scripts/';
    fs.readdir(_path, function(err, entries) {
        
        if (err) {
            console.logError(err);
            return;
        }

        entries.map(function (_entry) {

            _entry = _path + _entry;

            return browserify({
                entries: [_entry],
                debug: true
            })
            .transform(babelify, { presets: ['es2015'] })
            .bundle()
            .pipe(plumber())
            .pipe(source(_entry))
            .pipe(buffer())
            // .pipe(sourcemaps.init({ loadMaps: true }))
            // .pipe(uglify())
            // .on('error', gutil.log)
            .pipe(rename({ dirname: '/dist/js' }))
            // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./'));
        });
    });

});

gulp.task('build-html', function(cb) {

    return gulp.src(`./src/*.html`)
        .pipe(plumber())
        // .pipe(htmlminify())
        .pipe(gulp.dest(`./dist`));

});

gulp.task('build', [], function () {
    runSequence(
        'clean-script', 
        [
            'build-image',
            'build-style',
            'build-script',
            'build-html'
        ],
        function(){});
});

// deafult task
gulp.task('default', [], function (cb) {
    gulp.start('build', cb);
});

// 清除dist目錄下所有產出檔
gulp.task('clean', function() {
    return gulp.src(`./dist/*`, { read: false })
        .pipe(clean());
});

// 清除執行build-script中額外產生的.map檔
gulp.task('clean-script', function () {
    return gulp.src(`./dist/js/*.map`, { read: false })
        .pipe(clean());
});

// src目錄一有變更隨即執行build
gulp.task('watch', function() {
    gulp.watch(['./src/**/*', './src/*'], ['build']);
});

// Live reload
// 只要dist目錄有檔案變更即核重整頁面
gulp.task('browser', [], function() {

    gulp.watch([
        'dist/**/*',
        'dist/*'
    ], bs.reload);

    bs.init({
        server: {
            baseDir: 'dist',
            index: 'index.html'
        },
        port: 8080
    });

});