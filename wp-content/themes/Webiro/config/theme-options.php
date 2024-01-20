<?php defined( 'ABSPATH' ) OR die( 'This script cannot be accessed directly.' );

global $usof_options;

// Change default appearance of input fields due to historical Zephyr defference
$config['input_fields']['fields']['input_fields']['std'][0] = array(
	'color_bg' => 'transparent',
	'color_bg_focus' => '',
	'color_border' => isset( $usof_options['color_content_border'] ) ? $usof_options['color_content_border'] : '#e8e8e8',
	'color_border_focus' => isset( $usof_options['color_content_primary'] ) ? us_gradient2hex( $usof_options['color_content_primary'] ) : '#e95095',
	'color_text' => 'inherit',
	'color_text_focus' => '',
	'color_shadow' => '',
	'color_shadow_focus' => isset( $usof_options['color_content_primary'] ) ? us_gradient2hex( $usof_options['color_content_primary'] ) : '#e95095',
	'shadow_offset_h' => '0px',
	'shadow_offset_v' => '0px',
	'shadow_blur' => '0px',
	'shadow_spread' => '1px',
	'shadow_inset' => array( '1' ),
	'shadow_focus_offset_h' => '0px',
	'shadow_focus_offset_v' => '0px',
	'shadow_focus_blur' => '0px',
	'shadow_focus_spread' => '1px',
	'shadow_focus_inset' => array( '1' ),
	'font' => '',
	'font_size' => '1rem',
	'font_weight' => '400',
	'letter_spacing' => '0em',
	'height' => '3em',
	'padding' => '1em',
	'border_radius' => '0.2em',
	'border_width' => '1px',
);

return $config;
