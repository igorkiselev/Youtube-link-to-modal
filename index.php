<?php
	
/**
 * Plugin Name: Youtube Link Modal Window
 */
 
if (!class_exists(youtubelink)) {
	class youtubelink {
		public function modal(){
				
				echo "<section id=\"preview_video\" class=\"modal loading\">
						<div class=\"container\">
							<div class=\"content\"></div>
						</div>
					</section>";
		}
	}
	add_action('plugins_loaded', function () {
		
		$youtubelink = new youtubelink();
			
		add_action('wp_footer', array(&$youtubelink, 'modal'));
		
		add_action('wp_enqueue_scripts', function () {
			wp_enqueue_script('jquery');
			wp_register_script("blueconic_youtube_application", plugin_dir_url(__FILE__) . "assets/app.min.js", array('jquery'), "0.0.1", true);
			wp_register_style('blueconic_youtube_stylesheet', plugin_dir_url(__FILE__) . 'assets/styles.css');
			wp_enqueue_script('blueconic_youtube_application');
			wp_enqueue_style('blueconic_youtube_stylesheet');
		}, 99);
	});
}