/// <binding AfterBuild='copyLibs, copyApp' Clean='clean' />

var gulp = require('gulp');
var del = require('del');
var dest = require('gulp-dest');

var paths = {
    app: ['app/**/*.ts'],
    libs: [
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/zone.js/dist/zone.js*',
        'node_modules/reflect-metadata/Reflect.js*',
        'node_modules/systemjs/dist/system.src.js*'
    ],
    angular: [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ],
    css: [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'styles/styles.css'
    ]
};

gulp.task('copyLibs', function () {
    // Setup paths
    var modulePath = 'node_modules/';
    var libPath = './wwwroot/libs';
    var vendorPath = libPath + '/vendor/';
    gulp.src(paths.libs).pipe(gulp.dest(vendorPath));
    gulp.src(paths.css).pipe(gulp.dest(libPath + '/css'));
    gulp.src(modulePath + 'rxjs/**/*.js*').pipe(gulp.dest(vendorPath + 'rxjs'));

    for (var i = 0; i < paths.angular.length; i++) {
        var basePath = modulePath + paths.angular[i];
        gulp.src(basePath + '/*.js*').pipe(gulp.dest(vendorPath + paths.angular[i]));
        gulp.src(basePath + '/*.css').pipe(gulp.dest(vendorPath + paths.angular[i]));
        gulp.src(basePath + '/src/**/*.js*').pipe(gulp.dest(vendorPath + paths.angular[i] + '/src/'));
        gulp.src(basePath + '/src/**/*.css').pipe(gulp.dest(vendorPath + paths.angular[i] + '/src/'));
    }
});

gulp.task('copyApp', function () {
    gulp.src(paths.app).pipe(gulp.dest('wwwroot/app'));
});

// clean all the generated typescript files
gulp.task('clean', function () {
    return del(['wwwroot/app/**/*', 'wwwroot/libs/**/*']);
});
