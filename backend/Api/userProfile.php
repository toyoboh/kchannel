<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;

// exit 
if($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["user_id"])) {
    exit;
}

// get parameter
$user_id = $_GET["user_id"];

// get user information
$t_user       = new TUser();
list($select_count, $user_information) = $t_user->getUserProfile($user_id);

// Formatting response data
$res_data;
if($select_count > 0) {
    $res_data["success"]                  = true;
    $res_data["message"]                  = "";
    $res_data["data"]["user_information"] = $user_information;
} else {
    $res_data["success"]                  = false;
    $res_data["message"]                  = "存在しないユーザです。";
    $res_data["data"]["user_information"] = array();
}

echo json_encode($res_data);
