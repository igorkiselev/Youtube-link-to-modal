(function($) {
	$.fn.extend({
		preview_video: function(o) {

			var $this = this,
				$b = $('body'),
				s = $.extend({
					notClickable: '.content',
					escapeKey: false,
					overflow: true,
					overflowClass: 'modal_open',
					showClass: 'show',
					onInit: function() {},
					onClose: function() {},
					onOpen: function() {}
				}, o);



			$this.click(function(e) {

				$this.removeClass(s.showClass);

				(s.overflow) ? $b.css({
					'overflow': 'auto'
				}): false;

				$b.removeClass(s.overflowClass);

				s.onClose.call();

				e.preventDefault();
			});
			if (s.notClickable) {

				$(s.notClickable).click(function(e) {
					e.stopPropagation();
				});
			}
			if (s.escapeKey) {

				$(document).keyup(function(e) {

					(e.keyCode == 27) ? $this.click(): false;

					e.preventDefault();

				});
			}

			if (!$this.hasClass(s.showClass)) {

				(s.overflow) ? $b.css({
					'overflow': 'hidden'
				}): false;

				$b.addClass(s.overflowClass);

				s.onOpen.call();

				$this.addClass(s.showClass);

			} else {
				$this.click();
			}
			s.onInit.call();
		},
	});

	$(document).ready(function() {
		$('a[href*="youtube"][target="_blank"]').click(function(e) {
			$modal = $('#preview_video'), $this = $(this);
			$modal.preview_video({
				onOpen: function() {
					var $link = $this.attr('href');
					$modal.addClass('loading');
					$.getJSON("https://www.youtube.com/oembed?url=" + $link + "&format=json", function(data) {
						$modal.removeClass('loading');
						content = data.html;
						$modal.find('.content').css({"aspect-ratio" : data.width+" / "+data.height}).html(content).append("<a href=\"#close\" class=\"close\"></a>");
						$modal.find('.close').on("click", function(e) {
							$modal.click();
							e.preventDefault();
						});
					});
				},
				onClose: function() {
					$modal.find('.content').html('');
				},
				showClass: 'visible',
				overflowClass: 'modal_preview_video',
			});
			e.preventDefault();
		});
		$('a[href*="vimeo"][target="_blank"]').click(function(e) {
			$modal = $('#preview_video'), $this = $(this);
			$modal.preview_video({
				onOpen: function() {
					var $link = $this.attr('href');
					$modal.addClass('loading');
					$.getJSON("https://vimeo.com/api/oembed.json?url=" + $link, function(data) {
						$modal.removeClass('loading');
						content = data.html;
						
						$modal.find('.content').css({"aspect-ratio" : data.width+" / "+data.height}).html(content).append("<a href=\"#close\" class=\"close\"></a>");
						$modal.find('.close').on("click", function(e) {
							$modal.click();
							e.preventDefault();
						});
					});
				},
				onClose: function() {
					$modal.find('.content').html('');
				},
				showClass: 'visible',
				overflowClass: 'modal_preview_video',
			});
			e.preventDefault();
		});
	});
	
})(jQuery);