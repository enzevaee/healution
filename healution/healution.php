<?php
/*
Plugin Name: [H]ealution
Plugin URI: 
Description: Help mothers keep their kids active using map 
Version: 0.1.0
Author: Alireza Enzevaee
Author URI: www.healution.tk
Text Domain: Hobbie and entertainment
Domain Path: /languages
*/

if (!defined ('ABSPATH')) {
    exit;
}

// Load scripts
require_once(plugin_dir_path(__FILE__).'/includes/healution-scripts.php');

// Load Class
require_once(plugin_dir_path(__FILE__).'/includes/healution-class.php');

//Register Widget
function register_healution() {
    register_widget('Healution_Widget');
}

//hook in function
add_action('widgets_init','register_healution');

?>

//echo 'wd';
