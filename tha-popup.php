<?php

/*
Plugin Name: Tha Popup
Plugin URI: 
Description: A simple popup that ajax loads content from another WP page - on window load or click. Shortcode: [tha_popup_link page_id="123" lazy_load="true|onclick" link_text="Click Me" bg="#fff" color="#000" classes=""]
Version: 1.0
Author: Andrew Rendall
Author URI: andrewrendall.com
License: 
*/


add_action( 'wp_enqueue_scripts', 'tha_popup_enqueues');
function tha_popup_enqueues(){
  wp_enqueue_style( 'tha-popup-css', plugin_dir_url( __FILE__ ) . 'tha-popup.css');
  wp_enqueue_script( 'tha-popup-js', plugin_dir_url( __FILE__ ) . 'tha-popup.js', array('jquery'));
  wp_localize_script( 'tha-popup-js', 'tha_popup', array(
    'thaAjaxUrl'=> admin_url('admin-ajax.php')
    ));
}


// shortcode function to add popup link 
add_shortcode('tha_popup_link', 'tha_popup_link');
function tha_popup_link($atts){
    extract(shortcode_atts(array(
      'page_id' => '',
      'link_text' => '',
      'classes' => '',
      'lazy_load' => 'true',
      'bg' => '',
      'color' => ''
    ), $atts));

    $data = '';

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


function tha_popup_content($pgid, $bg='#fff', $color='#000'){
   $page_data = get_post($pgid);
   if($page_data){
       $content= apply_filters('the_content', $page_data->post_content);
       return $content;
    }
}


add_action('wp_ajax_tha_popup_ajax','tha_popup_ajax');
add_action('wp_ajax_nopriv_tha_popup_ajax','tha_popup_ajax');
function tha_popup_ajax(){
  if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
    $id = $_POST['id'];
    if($id){
      $data['id'] = $id;
      $data['content'] =  tha_popup_content($id); 
      echo json_encode($data);
    }
  }
  die();
}













