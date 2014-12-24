/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var wintersmith = require('wintersmith');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  return gulp.src(['app/*', '!app/*.html'], {dot: true})
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/*',])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Automatically Prefix CSS
gulp.task('styles:css', function () {
  return gulp.src('app/styles/**/*.css')
    .pipe($.changed('app/styles'))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size({title: 'styles:css'}));
});

// Compile Sass For Style Guide Components (app/styles/components)
gulp.task('styles:components', function () {
  return gulp.src('app/styles/components/components.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/styles/components']
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('app/styles/components'))
    .pipe($.size({title: 'styles:components'}));
});

// Compile Any Other Sass Files You Added (app/styles)
gulp.task('styles:scss', function () {
  return gulp.src(['app/styles/*.scss', '!app/styles/components/components.scss'])
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['.tmp']
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.csso())
    .pipe(gulp.dest('app/styles'))
    .pipe($.size({title: 'styles:scss'}));
});

// Output Final CSS Styles
gulp.task('styles', ['styles:components', 'styles:scss', 'styles:css']);

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var jsFilter = $.filter("**/*.js");
  var cssFilter = $.filter("**/*.css");
  var htmlFilter = $.filter("**/*.html");

  return gulp.src('app/**/*.html')
    .pipe($.useref.assets())
    .on('error', console.error.bind(console))

    .pipe(jsFilter)
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe(jsFilter.restore())

    .pipe(cssFilter)
    .pipe($.uncss({
      html: [
        'app/index.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: [
        '.navdrawer-container.open',
        /.app-bar.open/,
        '.topbar--pinned',
        '.topbar--unpinned',
        '.fa-spin'
      ]
    }))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.replace('components/components.css', 'components/main.min.css'))

    // Minify Any HTML
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeComments: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      collapseWhitespace: true,
    }))
    .pipe(htmlFilter.restore())
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Font Awesome
gulp.task('fa', function() {
  return gulp.src('app/styles/font-awesome.min.css')
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'font-awesome'}));
})

// Copy resume
gulp.task('resume', function() {
  return gulp.src('app/resume/*')
    .pipe(gulp.dest('dist/resume'))
    .pipe($.size({title: 'user-js'}));
})

gulp.task('blog', function() {
  var file = 'blog/config.json';
  var ws = wintersmith(file);
  ws.build(function(err) {
    if(err) throw err;
    console.log('Built blog.');
  })
})
// Watch Files For Changes & Reload
gulp.task('serve', ['styles:components', 'styles:scss'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.scss'], ['styles:components', 'styles:scss']);
  gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: 'dist'
    }

  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', [ 'html', 'blog', 'images', 'fonts', 'copy', 'resume'], cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'http://victorszeto.com',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
