<?php

/*
Plugin Name: Tha Popup
Plugin URI: 
Description: Simple popup using the content from another WP page. Usage: [tha_popup pgid="123" bg="#fff"] <span data-tha-popup-id="123">Show Popup</span> 
Version: 0.1
Author: Andrew Rendall
Author URI: andrewrendall.com
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
      'pgid' => '',
      'bg' => '#fff',
      'color' => '#000'
    ), $atts));

    $page_data = get_post($pgid);

    if($page_data) {

       $content= apply_filters('the_content', $page_data->post_content);

       $out = '<div class="tha-popup-preload" data-tha-popup-target="' . $pgid . '">
       <div class="tha-pop-shadow"></div>
       <div class="tha-popup-container">
        <div class="tha-popup-body" style="background-color:' . $bg . ';color:' . $color . '">' . $content . '</div><div class="tha-popup-hide">x</div></div>
       </div>';
       return $out;
    }

}















