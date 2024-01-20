<?php defined('ABSPATH') or die('This script cannot be accessed directly.');
/**
 * Plugin Name: WEBIRO
 * Plugin URI: https://webiro.ir/webiro-wordpress-theme
 * Description: Adds plenty of features for WEBIRO themes.
 * Author: WEBIRO
 * Author URI: https://webiro.ir
 * Version: 3.0.0
 **/
// Global variables for plugin usage
function day_left_licence()
{
	$host = $_SERVER['HTTP_HOST'];
	preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
	$result = get_result();
	?>
	<div class="notice notice-success is-dismissible">
		<p>لایسنس وبیرو : از مدت زمان لایسنس شما که با دامنه <strong>
				<?php echo "{$matches[0]}"; ?>
			</strong> ثبت شده است، <b>
				<?php echo $result[0]['day_left']; ?>
			</b> روز باقی‌مانده است.</p>
	</div>
	<?php
}
function licence_finished()
{
	$host = $_SERVER['HTTP_HOST'];
	preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
	$result = get_result();
	?>
	<style>
		.us-core-notice {
			display: none !important;
		}
	</style>
	<div class="notice notice-success is-dismissible">
		<p> <b>
			
			</b> -> مدت زمان استفاده از لایسنس شما به اتمام رسیده‌است. لطفا با <a href="https://t.me/WebiroSupport">پشتیبانی
				تلگرام</a> ارتباط بگیرید و یا از طریق این <a href="https://webiro.ir/webiro-wordpress-theme">لینک</a>
			درخواست خود را ثبت نمایید.</p>
	</div>
	<?php
}
function get_result()
{
	$host = $_SERVER['HTTP_HOST'];
	preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
	$domain = $matches[0];
	$data = array(
		'url' => $domain
	);
	// Initialize cURL
	$ch = curl_init('https://webiro.ir/licence/');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	if ($response === false) {
		$error = curl_error($ch);
		curl_close($ch);
		die("cURL error: " . $error);
	}
	curl_close($ch);
	$result = json_decode($response, true);
	return $result;
}
function prefix_add_content($content)
{
	$after = "<licence>لایسنس قالب شما غیرفعال می‌باشد. از پنل کاربری خود نسبت به تمدید و فعالسازی اقدام فرمایید.</licence>" .
		'<style>
	licence { color:white; width:100%; position:fixed; bottom:0; right:0; z-index:9999; background:#ff0000b5; direction:rtl; text-align:center; font-size:12px; padding:0.5rem; }
	</style>';
	$content = $content . $after;
	return $content;
}
function wp_maintenance_mode()
{
	if (!current_user_can('edit_themes') || !is_user_logged_in()) {
		wp_die('<h1>License has EXPIRED</h1><br />Please contact us to renew and reactivate the license.
		[<a href="https://t.me/WebiroSupport">Telegram</a>]
		[<a href="https://webiro.ir/webiro-wordpress-theme">Website</a>]');
	}
}
$host = $_SERVER['HTTP_HOST'];
preg_match("/[^\.\/]+\.[^\.\/]+$/", $host, $matches);
$result = get_result();
$day = intval($result[0]['day_left']);
if ($day < 0) {
	add_action('admin_notices', 'licence_finished');
	add_filter('the_content', 'prefix_add_content');
	add_action('get_header', 'wp_maintenance_mode');
} else {
	add_action('admin_notices', 'day_left_licence');
	$uscore_dir = plugin_dir_path(__FILE__);
	$uscore_uri = plugins_url('', basename(dirname(__FILE__)) . '/' . basename(__FILE__));
	if (!defined('US_CORE_DIR')) {
		define('US_CORE_DIR', $uscore_dir);
	}
	if (!defined('US_CORE_URI')) {
		define('US_CORE_URI', $uscore_uri);
	}
	$uscore_data = get_file_data(__FILE__, array('Version' => 'Version'), FALSE);
	$uscore_version = $uscore_data['Version'] ? $uscore_data['Version'] : FALSE;
	if ($uscore_version and !defined('US_CORE_VERSION')) {
		define('US_CORE_VERSION', $uscore_version);
	}
	// Reinit files location
	global $us_files_search_paths, $us_file_paths;
	unset($us_files_search_paths);
	unset($us_file_paths);
	require_once US_CORE_DIR . 'functions/init.php';
}