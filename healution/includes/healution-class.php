<?php

/**
 * Adds Foo_Widget widget.
 */
class Healution_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'healution_widget', // Base ID
			esc_html__( 'Healution hobbies', 'htn_domain' ), // Name
			array( 'description' => esc_html__( 'A Widget to suggest hobbies around', 'htn_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
        echo $args['before_widget']; //whatever you want to show before widget e.g. <div>, p
        
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}
        
        //here is the display part of widget
        //echo esc_html__( 'Hello, World!', 'htn_domain' );
		//echo '123';
		echo ('</<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>Pick a Suburb</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" media="screen" href="main.css">
			<script src="main.js"></script>
		</head>
		<body>
			<h1> We see U </h1>
		
			<p>LAT:<span></span></p>
			<p>LON:<span></span></p>
			<p>ACCURACY:<span></span></p>
			<p>HEADING:<span></span></p>
			<p>SPEED:<span></span></p>
			<p>ALTITUDE:<span></span></p>
			<p>TIME:<span></span></p>
			<script src="./geolocation.js"></script>
		
		</body>
		</html>');


        echo $args['after_widget']; //whatever you want to show after widget e.g <div>,<p>
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'Enter/Pick a Suburb', 'htn_domain' );
		?>
		<p>
		<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
        <?php esc_attr_e( 'Title:', 'htn_domain' ); ?>
        </label> 
		
        <input 
            class="widefat" 
            id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" 
            name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" 
            type="text" 
            value="<?php echo esc_attr( $title ); ?>">
		</p>
		<?php 
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';

		return $instance;
	}

} // class Foo_Widget

?>

</<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Pick a Suburb</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
    <script src="main.js"></script>
</head>
<body>
    <h1> We see U </h1>

    <p>LAT:<span></span></p>
    <p>LON:<span></span></p>
    <p>ACCURACY:<span></span></p>
    <p>HEADING:<span></span></p>
    <p>SPEED:<span></span></p>
    <p>ALTITUDE:<span></span></p>
    <p>TIME:<span></span></p>
    <script src="./geolocation.js"></script>

</body>
</html>