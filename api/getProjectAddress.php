<?php
require_once('../../wp-load.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
echo json_encode(get_post_meta($_GET['id'], '_project_address', true));