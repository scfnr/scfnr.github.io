var URL = {
	FACEBOOK: "https://www.facebook.com/scfnregensburg",
	YOUTUBE: "https://www.youtube.com/channel/UC_5TCVIWqnf0l0uEnoTlTjA",
	CROWDFUNDING: "https://www.indiegogo.com/projects/students-charity-fight-night-regensburg/x/11877805#/",
	REGISTER: "https://www.facebook.com/events/1495230480792126/"
};

var gulp   = require("gulp"),
	rename = require("gulp-rename"),
	less   = require("gulp-less"),
	jade   = require("gulp-jade");

var SRC = {
	CSS: {
		MAIN: "src/css/style.less",
		WATCH: "src/css/**/*.less"
	},
	IMAGES: "src/images/**/*",
	TEMPLATES: "src/templates/pages/*.jade"
};

var DEST = {
	CSS: "dist/assets/css/",
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

gulp.task("images", function () {
	gulp.src(SRC.IMAGES)
		.pipe(gulp.dest(DEST.IMAGES));
});

gulp.task("templates", function () {
	gulp.src(SRC.TEMPLATES)
		.pipe(jade({
			pretty: true,
			data: {
				url: {
					facebook: URL.FACEBOOK,
					youtube: URL.YOUTUBE,
					crowdfunding: URL.CROWDFUNDING,
					register: URL.REGISTER
				},
				feed: require("./feed.json")
			}
		}))
		.pipe(gulp.dest(DEST.TEMPLATES));
});

gulp.task("default", ["css", "images", "templates"]);

gulp.task("watch", ["default"], function () {
	gulp.watch(SRC.CSS.WATCH, ["css"]);
	gulp.watch(SRC.TEMPLATES, ["templates"]);
});