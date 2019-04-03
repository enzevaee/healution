<?php
// Add Scripts
function htn_add_scripts(){
    // Add Main CSS
    wp_enqueue_style ('htn-main-style', plugins_url(). '/Healution/css/style.css');

    // Add main JS
    wp_enqueue_script('htn-main-script', plugins_url(). '/Healution/js/main.js');
}

add_action('wp_enqueue_scripts',htn_add_scripts); 
