﻿(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',
    'rxjs': 'libs/vendor/rxjs',
    'angular2-in-memory-web-api': 'libs/vendor/angular2-in-memory-web-api',
    '@angular': 'libs/vendor/@angular',
    'ts': 'libs/vendor/plugin-typescript',
    'typescript': 'libs/vendor/typescript'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main', defaultExtension: 'ts' },
    'app/messages': { main: 'index', defaultExtension: 'ts' },
    'rxjs': { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'ts': { main: 'plugin.js' },
    'typescript': {
      main: 'lib/typescript.js',
      meta: {
        'lib/typescript.js': {
          exports: 'ts'
        }
      }
    }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function (pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    transpiler: 'ts',
    typescriptOptions: {
      target: 'es5',
      module: 'system',
      moduleResolution: 'node',
      experimentalDecorators: true,
      emitDecoratorMetadata: true
    },
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
