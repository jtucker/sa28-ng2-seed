/// <binding AfterBuild='copyLibs, copyApp' Clean='clean' />

var gulp = require('gulp'),
    del = require('del'),
    dest = require('gulp-dest'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    Builder = require('systemjs-builder'),
    ts = require('gulp-typescript'),
    inlineNg2Template = require('gulp-inline-ng2-template');
 
var paths = {
    app: ['app/**/*.ts', "app/**/*.html"],
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

gulp.task('copyLibs', function (cb) {
    // Setup paths
    var modulePath = 'node_modules/';
    var libPath = './wwwroot/libs';
    var vendorPath = libPath + '/vendor/';
    gulp.src(paths.libs).pipe(gulp.dest(vendorPath));
    gulp.src(paths.css).pipe(gulp.dest(libPath + '/css'));
    gulp.src(modulePath + 'rxjs/**/*.js*').pipe(gulp.dest(vendorPath + 'rxjs'));
    gulp.src(modulePath + 'plugin-typescript/lib/**.js*').pipe(gulp.dest(vendorPath + 'plugin-typescript'));
    gulp.src(modulePath + 'typescript/lib/typescript.js*').pipe(gulp.dest(vendorPath + 'typescript/lib'));
    
    for (var i = 0; i < paths.angular.length; i++) {
        var basePath = modulePath + paths.angular[i];
        gulp.src(basePath + '/*.js*').pipe(gulp.dest(vendorPath + paths.angular[i]));
        gulp.src(basePath + '/*.css').pipe(gulp.dest(vendorPath + paths.angular[i]));
        gulp.src(basePath + '/src/**/*.js*').pipe(gulp.dest(vendorPath + paths.angular[i] + '/src/'));
        gulp.src(basePath + '/src/**/*.css').pipe(gulp.dest(vendorPath + paths.angular[i] + '/src/'));
    }
});

gulp.task('copyDev', function() {
    return gulp.src('config/environment.dev.ts')
                .pipe(rename('environment.ts'))
                .pipe(gulp.dest('app/config/'), { overwrite: true });
})

gulp.task('copyApp', ['copyDev'], function () {
    return gulp.src(paths.app).pipe(gulp.dest('wwwroot/app'));
});

// clean all the generated typescript files
gulp.task('clean', function () {
    return del(['wwwroot/app/**/*', 'wwwroot/libs/**/*']);
});

gulp.task('enableProd', function() {
    gulp.src('config/environment.prod.ts')
        .pipe(rename('environment.ts'))
        .pipe(gulp.dest('wwwroot/app/config/', { overwrite: true }));
});

gulp.task('inlineTemplates', function() {
    return gulp.src(paths.app)
                    .pipe(inlineNg2Template())
                    .pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('bundleProd', function() {
    var builder = new Builder('./wwwroot', './wwwroot/systemjs.config.js');
    return builder.buildStatic('app', 'dist/app.js', { minify: true, mangle: true })
                  .then(function() { console.log('Production bundle created.'); })
                  .catch(function(err) { console.log('There was an error: ' + err); });
});

gulp.task('copyShim', function() {
    var libPath = './dist/libs';
    var vendorPath = libPath + '/vendor/';
    gulp.src(paths.libs).pipe(gulp.dest(vendorPath));
});

gulp.task('buildProd', function() {
    runSequence('clean', 
                'copyLibs', 
                'inlineTemplates',
                'enableProd',                
                'bundleProd', 
                'copyShim');
});