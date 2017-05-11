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
  wp_localize_script( 'tha-popup-js', 'tha_popup', array(
    'thaAjaxUrl'=> admin_url('admin-ajax.php')
    ));
}





// shortcode function to add popup link 
function tha_popup_link($atts){
    extract(shortcode_atts(array(
      'page_id' => '',
      'link_text' => '',
      'classes' => '',
      'lazy_load' => 'true',
      'bg' => '',
      'color' => ''
    ), $atts));

    if($lazy_load === 'true'){
      $data.= ' data-tha-popup-lazy="true"';
    }elseif($lazy_load === 'onclick'){
      $data.= ' data-tha-popup-lazy="onclick"';
    }

    if($bg){
      $data.= ' data-tha-popup-bg="' . $bg . '"';
    }

    if($color){
      $data.= ' data-tha-popup-color="' . $color . '"';
    }

    if($page_id){
      $out = '<a href="#" data-tha-popup-id="' . $page_id . '" class="tha-popup-trigger ' . $classes . '" ' . $data . '>' . $link_text . '</a>';
      return apply_filters('the_content', $out);
    }
}
add_shortcode('tha_popup_link', 'tha_popup_link');




function tha_popup_content($pgid, $bg='#fff', $color='#000'){
   $page_data = get_post($pgid);
   if($page_data){
       $content= apply_filters('the_content', $page_data->post_content);
       return $content;
    }
}


function tha_ajax(){
  if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
    $id = $_POST['id'];
    $data['id'] = $id;
    $data['content'] =  tha_popup_content($id); 
    echo json_encode($data);
  }
  die();
}

add_action('wp_ajax_tha_ajax','tha_ajax');
add_action('wp_ajax_nopriv_tha_ajax','tha_ajax');











