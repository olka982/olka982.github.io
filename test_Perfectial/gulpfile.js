const gulp = require('gulp');
const del = require('del');
const plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-group-css-media-queries': 'gcmq',
    'gulp-clean-css': 'cleanCSS'
  }
});
const pngquant = require('imagemin-pngquant');
const imageminJR = require('imagemin-jpeg-recompress');
const browserSync = require('browser-sync').create();

const onError = err => {
  plugins.notify.onError({
    title: `Error in ${err.plugin}`,
    message: '<%= error.message %>',
    sound: 'Pop',
    onLast: true
  })(err);
  this.emit('end');
};

const dev = plugins.environments.development;
const prod = plugins.environments.production;

const paths = {
  src: {
    html: 'src/**/*.html',
    scss: 'src/styles/',
    img: 'src/img/'
  },
  watch: {
    html: 'src/**/*.html',
    scss: 'src/styles/**/*.scss',
    img: 'src/img/*.*'
  },
  dist: 'dist/'
};

/* =====================  HTML  ===================== */
gulp.task('html', cb => {
  gulp
    .src('src/**/*.html')
    .pipe(prod(plugins.htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('dist'))
    .on('end', browserSync.reload);
  cb();
});

/* ====================  Styles  ==================== */
gulp.task('scss', () =>
  gulp
    .src(`${paths.src.scss}*.scss`)
    .pipe(plugins.plumber({ errorHandler: onError }))
    .pipe(dev(plugins.sourcemaps.init()))
    .pipe(
      plugins.sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      plugins.autoprefixer({
        browsers: ['last 10 versions'],
        cascade: true
      })
    )
    .pipe(dev(plugins.sourcemaps.write()))
    .pipe(plugins.gcmq())
    .pipe(prod(plugins.cleanCSS()))
    .pipe(gulp.dest(`${paths.dist}css`))
    .pipe(browserSync.stream())
);

/* ===================  Images  =================== */
gulp.task('img', () =>
  gulp
    .src([`${paths.src.img}**/*.*`, `!${paths.src.img}{png,svg}/*.*`])
    .pipe(
      plugins.cache(
        plugins.imagemin(
          [
            plugins.imagemin.gifsicle({ interlaced: true }),
            plugins.imagemin.jpegtran({ progressive: true }),
            imageminJR({
              loops: 5,
              min: 65,
              max: 70,
              quality: 'medium'
            }),
            plugins.imagemin.svgo(),
            plugins.imagemin.optipng({ optimizationLevel: 3 }),
            pngquant({ quality: '65-70', speed: 5 })
          ],
          {
            verbose: true
          }
        )
      )
    )
    .pipe(gulp.dest(`${paths.dist}img`))
);
/* ===================  Watch  ==================== */
gulp.task('watch', () => {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch(paths.watch.scss, gulp.series('scss'));
  gulp.watch(paths.watch.img, gulp.series('img'));
});
/* ===================  Serve  ==================== */
gulp.task('serve', () => {
  browserSync.init({
    server: paths.dist
  });
});
/* ===================  Clean  ==================== */
gulp.task('clean', () => {
  plugins.cache.clearAll();
  return del(paths.dist).then(dir => {
    console.log('Deleted files and folders:\n', dir.join('\n'));
  });
});
/* ===================  Build  ==================== */
gulp.task('build', gulp.series('clean', gulp.parallel('html', 'scss', 'img')));
/* ==================  Default  =================== */
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));
