var gulp = require('gulp');
var paths = require('./gulp.config.json');
var plug = require('gulp-load-plugins')();
var log = plug.util.log;
var merge = require('merge-stream');
var util = require('util');
var critical = require('critical').stream;

/* build*/
gulp.task('build', ['rev-and-inject','images','fonts','videos'], function() {
  log('Building the optimized app');
  return gulp.src('').pipe(plug.notify({
    onLast: true,
    message: 'Deployed code!'
  }));
});


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

gulp.task('fonts', function() {
  log('Copying fonts');
  return gulp
    .src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'));
});

gulp.task('videos', function() {
  log('Copying videos');
  return gulp
    .src(paths.videos)
    .pipe(gulp.dest(paths.build + 'common/videos'));
});

// gulp.task('awesome-fonts', function() {
//   log('Copying awesome-fonts');
//   return gulp
//     .src(paths.awesomeFonts)
//     .pipe(gulp.dest(paths.build + 'fonts'));
// });

// gulp.task('conekta', function() {
//   log('Copying conekta');
//   return gulp
//     .src(paths.conekta)
//     .pipe(gulp.dest(paths.build + 'common/js'));
// });

gulp.task('rev-and-inject', ['js', 'asyncLoaders', 'vendorjs', 'css'], function() {
  log('Building index.html');

  // File paths

  var index = paths.client + 'index.html'; // New index.html path
  var minified = paths.build + '**/*.min.*';
  var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
  var indexFilter = plug.filter(['index.html'],{restore:true});
  var loadersFilter = plug.filter(['**/*.min.*', '!**/*.map.', '!angular-loader.min.js', '!script.min.js'],{restore:true});

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
    name: 'common/all.min.css',
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
    .pipe(loadersFilter.restore)
    .pipe(indexFilter)
    .pipe(injectContents(angularLoader))
    .pipe(injectContents(script))
    .pipe(inject(js))
    // .pipe(inject(css))
    .pipe(plug.htmlReplace({
        'css': css.name,
    }))
    .pipe(clear(js))
    .pipe(clear(css))
    .pipe(gulp.dest(paths.build)) // write the rev files
    .pipe(indexFilter.restore) // remove filter, back to original stream
    .pipe(plug.revReplace()) // Substitute in new filenames
    // .pipe(plug.removeHtmlComments())
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

gulp.task('js', ['htmlTemplates', 'jsonTemplates'], function() {
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

gulp.task('vendorjs', function() {
  log('Minifying and bundling vendor JavaScript');

  return gulp.src(paths.vendorJs)
    .pipe(plug.concat('vendor.min.js'))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify())
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build));
});

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

function bytediffFormatter(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
  return data.fileName + ' went from ' + (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' + ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

function formatPercent(num, precision) {
  return (num * 100).toFixed(precision);
}

gulp.task('critical', function () {
  return gulp.src('build/*.html')
      .pipe(critical({base: 'build/', inline: true, css: ['build/common/all.min.css']}))
      .pipe(gulp.dest('build'));
});


gulp.task('clean', function () {
  return gulp.src([paths.build], { read: false }).pipe(plug.clean());
});

/* build*/

gulp.task('default', ['watch','jade','sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade', 'sass']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(plug.plumber())
    .pipe(plug.sass({sourceComments:'normal'}))
    .pipe(plug.autoprefixer('last 2 version'))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
    .pipe(plug.size());
});

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe(plug.jade({
      pretty: true
    }))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
});
