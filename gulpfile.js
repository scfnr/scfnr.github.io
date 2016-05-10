var gulp   = require("gulp"),
	rename = require("gulp-rename"),
	concat = require("gulp-concat"),
	less   = require("gulp-less"),
	uglify = require("gulp-uglify"),
	data   = require("gulp-data"),
	path   = require("path"),
	jade   = require("gulp-jade");

var SRC = {
	CSS: {
		MAIN: "src/css/style.less",
		WATCH: "src/css/**/*.less"
	},
	JS: "src/js/**/*.js",
	IMAGES: "src/images/**/*",
	TEMPLATES: "src/templates/pages/*.jade"
};

var DEST = {
	CSS: "dist/assets/css/",
	JS: "dist/assets/js/",
	IMAGES: "dist/assets/images/",
	TEMPLATES: "dist/"
};

gulp.task("css", function () {
	gulp.src(SRC.CSS.MAIN)
		.pipe(less({
			compress: true
		}))
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest(DEST.CSS));
});

gulp.task("js", function () {
	gulp.src(SRC.JS)
		.pipe(concat("scfn.js"))
		// .pipe(gulp.dest(DEST.JS))
		.pipe(uglify())
		.pipe(rename("scfn.min.js"))
		.pipe(gulp.dest(DEST.JS));
});

gulp.task("images", function () {
	gulp.src(SRC.IMAGES)
		.pipe(gulp.dest(DEST.IMAGES));
});

gulp.task("templates", function () {
	gulp.src(SRC.TEMPLATES)
		.pipe(data(function (file) {
			var config = require("./config.json");

			return {
				config: config,
				file: path.basename(file.path)
			};
		}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(DEST.TEMPLATES));
});

gulp.task("default", ["css", "js", "images", "templates"]);

gulp.task("watch", ["default"], function () {
	gulp.watch(SRC.CSS.WATCH, ["css"]);
	gulp.watch(SRC.JS, ["js"]);
	gulp.watch(SRC.TEMPLATES, ["templates"]);
});