(function ($) {
	/**
	 * Get the current local time in ms. 
	 */
	function getTimestamp() {
		return new Date().getTime();
	}

	/**
	 * Create an animated slideshow from a jQuery object. 
	 */
	$.fn.slideshow = function (options) {
		var settings = $.extend({
				duration: 0
			}, options),
			$slideshow = this,
			$progress = $slideshow.find(".progress > .bar"),
			$progressbar = new Progressbar($progress),
			duration = settings.duration * 1000;

		// temporary function to repeat slideshow frame switching
		function animate() {
			var lastSwitch = $slideshow.data("last-switch"),
				now = getTimestamp(),
				diff = now - lastSwitch;

			if (diff >= duration) {
				$slideshow.nextFrame();
				setTimeout(animate, duration);
			} else {
				setTimeout(animate, duration - diff);
			}
		}

		// initialize slideshow data
		$slideshow.data("index", 1);
		$slideshow.data("progressbar", $progressbar);
		$slideshow.data("duration", duration);

		// show all controls
		$slideshow.find(".hidden")
					.removeClass("hidden");

		$slideshow.previousFrame();

		if (duration > 0) {
			setTimeout(animate, duration);
		}

		// assign button actions
		$slideshow.find(".left").click(function () {
			$slideshow.previousFrame();
		});

		$slideshow.find(".right").click(function () {
			$slideshow.nextFrame();
		});

		return this;
	};

	/**
	 * Get the current status of the given slideshow. 
	 */
	function getSlideshowStatus($slideshow) {
		var $images = $slideshow.find(".image"),
			index = $slideshow.data("index");

		var status = {
			count: $images.length,
			index: parseInt(index),
			first: $images.first()
		};

		return status;
	}

	/**
	 * Switch to the next/previous frame of the slideshow. Direction is either "forward" or "backward". 
	 */
	function switchSlideshow($slideshow, direction) {
		var status = getSlideshowStatus($slideshow),
			$progressbar = $slideshow.data("progressbar"),
			duration = $slideshow.data("duration"),
			index;

		if (direction === "forward") {
			index = (status.index + 1) % status.count;
		} else {
			index = status.index - 1;

			if (index < 0) {
				index = status.count - 1;
			}
		}

		// temporary fix for border animation on jumbotron
		$slideshow.find(".active")
					.removeClass("active");

		$($slideshow.find(".image")[index])
					.find(".content")
					.addClass("active");

		$slideshow.data("index", index);
		$slideshow.data("last-switch", getTimestamp());

		status.first.css("margin-left", "-" + (index * 100) + "%");
		
		if (duration > 0) {
			$progressbar.start(duration);
		}
	}

	/**
	 * Goto the next frame of the slideshow
	 */
	$.fn.nextFrame = function () {
		var $slideshow = this;

		switchSlideshow($slideshow, "forward");

		return $slideshow;
	};

	/**
	 * Goto the previous frame of the slideshow
	 */
	$.fn.previousFrame = function () {
		var $slideshow = this;

		switchSlideshow($slideshow, "backward");

		return $slideshow;
	};
})(jQuery);