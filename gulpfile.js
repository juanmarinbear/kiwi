var gulp = require('gulp');
var del = require('del');
var glob = require('glob');
var merge = require('merge-stream');
var plug = require('gulp-load-plugins')();
var log = plug.util.log;
var plato = require('plato');
var colors = plug.util.colors;
var util = require('util');
var critical = require('critical');

var paths = require('./gulp.config.json');

/*
 * List the available gulp tasks
 */

gulp.task('help', plug.taskListing);

/*
 * Analize JavaScript
 */

gulp.task('analyze', function() {
  log('Analyzing source with JSHint, JSCS, and Plato');

  var jshint = analyzejshint([].concat(paths.js, paths.specs));
  var jscs = analyzejscs([].concat(paths.js));

  startPlatoVisualizer();

  return merge(jshint, jscs);
});

/*
 * Create HTML JavaScript templates and inject into $templateCache 
 * @return {Stream}
 */

gulp.task('htmlTemplates', function() {
  log('Creating an AngularJS $templateCache for Html files');

  return gulp
    .src(paths.htmlTemplates)
    .pipe(plug.bytediff.start())
    .pipe(plug.minifyHtml({
        empty: true
    }))
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(plug.angularTemplatecache('htmlTemplates.js', {
        module: 'app.core',
        standalone: false,
        root: 'app/'
    }))
    .pipe(gulp.dest(paths.build));
});

/*
 * Create JSON JavaScript templates and inject into $templateCache 
 * @return {Stream}
 */

gulp.task('jsonTemplates', function() {
  log('Creating an AngularJS $templateCache for Json files');

  return gulp
    .src(paths.jsonTemplates)
    .pipe(plug.angularTemplatecache('jsonTemplates.js', {
        module: 'app.core',
        standalone: false,
        root: 'app/'
    }))
    .pipe(gulp.dest(paths.build));
});

/*
 * Minify and bundle JavaScript 
 * @return {Stream}
 */

gulp.task('js', ['analyze', 'htmlTemplates', 'jsonTemplates'], function() {
  log('Bundling, minifying, and copying the app\'s JavaScript');

  var source = [].concat(paths.js, paths.build + 'htmlTemplates.js', paths.build + 'jsonTemplates.js');
  return gulp
    .src(source)
    //.pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
    .pipe(plug.concat('all.min.js'))
    .pipe(plug.ngAnnotate({
        add: true,
        single_quotes: true
    }))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify({
      mangle: true
    }))
    .pipe(plug.bytediff.stop(bytediffFormatter))
    //.pipe(plug.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build));
});

/*
 * Minify async JavaScript loaders
 */

gulp.task('asyncLoaders', function() {
  log('Minifying async JavaScript loaders');

  return gulp.src(paths.asyncLoaders)
    .pipe(plug.rename(function(path) {
      path.basename += ".min";
    }))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify())
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build));
});

/*
 * Minify and bundle vendor JavaScript 
 * @return {Stream}
 */

gulp.task('vendorjs', function() {
  log('Minifying and bundling vendor JavaScript');

  return gulp.src(paths.vendorJs)
    .pipe(plug.concat('vendor.min.js'))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify())
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build));
});

/*
 * Bundle CSS
 * @return {Stream}
 */

gulp.task('css', function() {
  log('Bundling, minifying, and copying the app\'s CSS');

  var vendor = gulp.src(paths.vendorCss)
    .pipe(plug.concat('vendor.min.css'))

  var styles = gulp.src(paths.css)
    .pipe(plug.concat('styles.css'))
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    .pipe(plug.bytediff.start())
    .pipe(plug.minifyCss())
    .pipe(plug.bytediff.stop(bytediffFormatter))

  return merge(vendor, styles)
    .pipe(plug.concat('all.min.css'))
    .pipe(gulp.dest(paths.build + 'common'));
});

/*
 * Copy fonts
 * @return {Stream}
 */

gulp.task('fonts', function() {
  log('Copying fonts');
  return gulp
    .src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'));
});

/*
 * Copy videos 
 * @return {Stream}
 */

gulp.task('videos', function() {
  log('Copying videos');
  return gulp
    .src(paths.videos)
    .pipe(gulp.dest(paths.build + 'common/videos'));
});

/*
 * Copy docs 
 * @return {Stream}
 */

gulp.task('docs', function() {
  log('Copying docs');
  return gulp
    .src(paths.docs)
    .pipe(gulp.dest(paths.build + 'common/docs'));
});

/*
 * Compress images
 * @return {Stream}
 */

gulp.task('images', function() {
  var dest = paths.build + 'common/images';
  log('Compressing, caching, and copying images');
  return gulp
    .src(paths.images)
    .pipe(plug.cache(plug.imagemin({
        optimizationLevel: 3
    })))
    .pipe(gulp.dest(dest));
});

/*
 * Copy maps 
 * @return {Stream}
 */

gulp.task('map', function() {
  var dest = paths.build + 'common';
  log('Copying min.css.map');
  return gulp
    .src(paths.vendorCssMaps)
    .pipe(gulp.dest(paths.build + 'common'));
});

/**
 * Copy other files 
 * @return {Stream}
 */

gulp.task('other', function() {
  var dest = paths.build + 'common';
  log('Copying other files');
  return gulp
    .src(paths.otherFiles)
    .pipe(gulp.dest(paths.build));
});

/**
 * Rev and inject files into index.html
 * @return {Stream}
 */

gulp.task('rev-and-inject', ['js', 'asyncLoaders', 'vendorjs', 'css'], function() {
  log('Building index.html');

  // File paths

  var index = paths.client + 'index.html'; // New index.html path
  var minified = paths.build + '**/*.min.*';
  var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
  var indexFilter = plug.filter(['index.html']);
  var loadersFilter = plug.filter(['**/*.min.*', '!**/*.map.', '!angular-loader.min.js', '!script.min.js']);

  var angularLoader = {
    name: 'angular-loader',
    paths: paths.build + 'angular-loader.min.js'
  }; // angular-loader script path

  var script = {
    name: 'script',
    paths: paths.build + 'script.min.js'
  }; // angular-loader script path

  var js = {
    name: '',
    paths: [
      paths.build + 'vendor.min.js',
      paths.build + 'all.min.js'
    ]
  }; // JS files paths, order matters!

  var css = {
    name: '',
    paths: [
      paths.build + 'common/all.min.css'
    ]
  }; // CSS files paths, order matters!

  var inlineCss = {
    name: 'inlineCss',
    paths: paths.build + 'common/inline.min.css'
  };

  return gulp.src([].concat(minified, index))
    .pipe(loadersFilter)
    .pipe(plug.rev())
    .pipe(gulp.dest(paths.build))
    .pipe(loadersFilter.restore())
    .pipe(indexFilter)
    .pipe(injectContents(angularLoader))
    .pipe(injectContents(script))
    .pipe(inject(js))
    .pipe(inject(css))
    .pipe(clear(js))
    .pipe(clear(css))
    .pipe(gulp.dest(paths.build)) // write the rev files
    .pipe(indexFilter.restore()) // remove filter, back to original stream
    .pipe(plug.revReplace()) // Substitute in new filenames
    .pipe(gulp.dest(paths.build)) // write the index.html file changes
    .pipe(plug.rev.manifest()) // create the manifest (must happen last or we screw up the injection)
    .pipe(gulp.dest(paths.build)); // write the manifest

    // Clears development files
    
    function clear(obj) {
      var options = {
        read: false,
        starttag: '<!-- clear:{{ext}} -->',
        transform: function(filepath) {
          return '';
        }
      }
      return plug.inject(gulp.src(obj.paths[0]), options);
    }

    // Injects paths into loading scripts.

    function inject(obj) {
      var options = {
        starttag: '// inject:{{ext}} //',
        endtag: '// endinject //',
        ignorePath: paths.build.substring(1),
        read: false,
        transform: function(filepath, file, i, length) {
          return i === length - 1 ? '\'' + filepath + '\'' : '\'' + filepath + '\','; 
        }
      };
      if (obj.name) {
        options.starttag = '// ' + obj.name + ':{{ext}} //';
      }
      return plug.inject(gulp.src(obj.paths), options);
    }

    // Injects minified loading scripts' content.

    function injectContents(obj) {
      var options = {
        starttag: '// inject-' + obj.name + ':{{ext}} //',
        endtag: '// endinject //',
        transform: function(filePath, file) {
          return file.contents.toString('utf8');
        }
      }
      return plug.inject(gulp.src(obj.paths), options);
    }
});

gulp.task('critical', function () {
  critical.generateInline({
    base: paths.build,
    src: 'index.html',
    styleTarget: 'common/all.min.css',
    htmlTarget: 'index.html',
    width: 320,
    height: 480,
    minify: true
  });
});

/**
 * Build the app
 * @return {Stream}
 */

gulp.task('build', ['rev-and-inject', 'images', 'fonts', 'videos', 'docs', 'map', 'other'], function() {
  log('Building the optimized app');
  return gulp.src('').pipe(plug.notify({
    onLast: true,
    message: 'Deployed code!'
  }));

/*
  return gulp.src(paths.build + 'index.html')
    .pipe(plug.minifyHtml({
      conditionals: true,
      quotes: true,
      empty: true
    }))
    .pipe(gulp.dest(paths.build))
    .pipe(plug.notify({
      onLast: true,
      message: 'Deployed code!'
    }));
*/
});

/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */

gulp.task('clean', function(cb) {
  log('Cleaning: ' + plug.util.colors.blue(paths.build));

  var delPaths = [].concat(paths.build, paths.report);
  del(delPaths, cb);
});

////////////////

/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */

function analyzejshint(sources, overrideRcFile) {
  var jshintrcFile = overrideRcFile || './.jshintrc';
  log('Running JSHint');
  log(sources);
  return gulp
    .src(sources)
    .pipe(plug.jshint(jshintrcFile))
    .pipe(plug.jshint.reporter('jshint-stylish'));
}

/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */

function analyzejscs(sources) {
  log('Running JSCS');
  return gulp
    .src(sources)
    .pipe(plug.jscs('./.jscsrc'));
}

/**
 * Start Plato inspector and visualizer
 */

function startPlatoVisualizer() {
  log('Running Plato');

  var files = glob.sync('./src/client/app/**/*.js');
  var excludeFiles = /\/src\/client\/app\/.*\.spec\.js/;

  var options = {
    title: 'Plato Inspections Report',
    exclude: excludeFiles
  };

  var outputDir = './report/plato';

  plato.inspect(files, outputDir, options, platoCompleted);

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    log(overview.summary);
  }
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
  return data.fileName + ' went from ' + (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' + ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {Number}           Formatted perentage
 */

function formatPercent(num, precision) {
  return (num * 100).toFixed(precision);
}
