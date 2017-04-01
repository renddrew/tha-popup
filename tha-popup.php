<?php

/*
Plugin Name: Tha Popup
Plugin URI: 
Description: Poppin.. Simply  Usage: [tha_popup pgid="123"] <a data-popup-id="123">Show Popup</a> 
Version: 0.1
Author: Andrew Rendall
Author URI: 
License: 
*/


add_action( 'wp_enqueue_scripts', 'tha_enqueues');
function tha_enqueues(){
  wp_enqueue_style( 'tha-popup-css', plugin_dir_url( __FILE__ ) . 'tha-popup.css');
  wp_enqueue_script( 'tha-popup-js', plugin_dir_url( __FILE__ ) . 'tha-popup.js', array('jquery'));
}


add_shortcode('tha_popup', 'tha_popup');
function tha_popup($atts){
    extract(shortcode_atts(array(
      'pgid' => ''
    ), $atts));

    $page_data = get_page($pgid);

    if($page_data) {

       $content= apply_filters('the_content', $page_data->post_content);

       $url = get_the_permalink($pgid);

       $src = str_replace( home_url(), "", $url );

       $out = '<div class="tha-popup-preload" data-tha-popup-src="' . $src . '" data-tha-popup-id="' . $pgid . '">
       <div class="tha-pop-shadow"></div>
       <div class="tha-popup-container">
        <div class="tha-popup-body">' . $content . '</div><div class="tha-popup-hide">x</div></div>
       </div>';
       return $out;
    }

}















