function Progressbar($bar) {
	this.bar = $($bar);
}

Progressbar.prototype.start = function(duration) {
	var progress = this,
		bar = progress.bar;

	progress.stop();
	bar.css("width", "0%");

	bar.animate({
		width: "100%"
	}, duration, "linear");
};

Progressbar.prototype.stop = function() {
	this.bar.stop();
};