const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const minimist = require('minimist');

let envOptions = {
    string: 'env',
    default: {
        env: 'develop'
    }
};
let options = minimist(process.argv.slice(2), envOptions)

console.log(options);

gulp.task('copyData', () => {
    return gulp.src('./source/data/data.json')
        .pipe(gulp.dest('./public/data'))
})

gulp.task('copyExcel', () => {
    return gulp.src('./source/excel/**/*.xlsx')
        .pipe(gulp.dest('./public/excel'))
})

gulp.task('pug', () => {
    return gulp.src('./source/*.pug')
        .pipe($.plumber())
        .pipe($.data(function () {
            let menu = require('./source/data/menu.json');
            let source = {
                'menu': menu
            };
            return source;
        }))
        .pipe($.pug())
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream())
})

gulp.task('sass', () => {
    let plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
    ];
    return gulp.src('./source/scss/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'nested',
            includePaths: ['./node_modules/bootstrap/scss']
        }).on('error', $.sass.logError))
        .pipe($.postcss(plugins))
        .pipe($.if(options.env === 'prod', $.cleanCss()))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
});

gulp.task('babel', () =>
    gulp.src('./source/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('all.js'))
        .pipe($.if(options.env === 'prod', $.uglify({
            compress: {
                drop_console: true
            },
        })))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
);

gulp.task('image-min', () =>
    gulp.src(['./source/img/*', './source/img/*/**'])
        .pipe($.if(options.env === 'prod', $.image()))
        .pipe(gulp.dest('./public/img'))
);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});
gulp.task('deploy', () => {
    return gulp.src('./public/**/*')
        .pipe($.ghPages());
});

gulp.task('clean', () => {
    return gulp.src('./public', { read: false })
        .pipe($.clean());
});

gulp.task('watch', gulp.parallel('browser-sync', () => {
    gulp.watch('./source/**/*.pug', gulp.series('pug'));
    gulp.watch('./source/scss/*.scss', gulp.series('sass'));
    gulp.watch('./source/js/*.js', gulp.series('babel'));
}));

gulp.task('bulid', gulp.series('clean', 'pug', 'sass', 'babel', 'copyData', 'copyExcel', 'image-min'));
gulp.task('default', gulp.series('pug', 'sass', 'babel', 'image-min', 'copyData', 'watch'));