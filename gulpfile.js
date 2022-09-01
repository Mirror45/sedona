const Key = "new",
  gulp = require("gulp"),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer"),
  htmlmin = require("gulp-htmlmin"),
  terser = require("gulp-terser"),
  webp = require("gulp-webp"),
  svgstore = require("gulp-svgstore"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  sourcemaps = require("gulp-sourcemaps"),
  imagemin = require("gulp-imagemin"),
  { series, parallel, watch, task } = require("gulp");

//  Sass

task("sass", () => {
  return gulp
    .src(Key + "/assets/sass/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest(Key + "/assets/css"));
});

watch(Key + "/assets/sass/**/*.scss", parallel("sass"));

// Js

task("js", () => {
  return gulp
    .src([Key + "/assets/js/function.js", Key + "/assets/sass/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest(Key + "/assets/js"));
});

watch(
  [
    Key + "/assets/js/libs/*.js",
    Key + "/assets/js/function.js",
    Key + "/assets/sass/**/*.js",
  ],
  parallel("js")
);

//  Css min

task("cssmin", () => {
  return gulp
    .src([
      Key + "/assets/sass/css/libs/*.css",
      Key + "/assets/sass/css/style.css",
    ])
    .pipe(concat("style.css"))
    .pipe(cleanCSS()) //  { compatibility: "ie8" }
    .pipe(gulp.dest(Key + "/dist/assets/css"));
});

//  Html min

task("htmlmin", () => {
  return gulp
    .src(Key + "/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(Key + "/dist"));
});

// Img min

task("imgmin", () => {
  return gulp
    .src(Key + "/assets/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true }), //  !quality: 75
        imagemin.optipng({ optimizationLevel: 3 }), //  5
        imagemin.svgo(), //  {plugins: [{ removeViewBox: true }, { cleanupIDs: false }]}
      ])
    )
    .pipe(gulp.dest(Key + "/dist/assets/img"));
});

//  WebP

task("webp", () => {
  return gulp
    .src(Key + "/assets/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest(Key + "/dist/img"));
});

// Sprite

task("sprite", () => {
  return gulp
    .src(Key + "/assets/img/sprite/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest(Key + "/dist/img"));
});

//  JS min

task("jsmin", () => {
  return gulp
    .src(Key + "/assets/js/script.js")
    .pipe(terser())
    .pipe(gulp.dest(Key + "/dist//assets/js"));
});

// Exports

exports.dist = series("imgmin");
exports.default = series("sass");
