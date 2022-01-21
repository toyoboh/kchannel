<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

// check receive data
if(!isset($posts["csrf_token"]))   exit;
if(!isset($posts["account_id"]))   exit;
if(!isset($posts["user_name"]))    exit;
if(!isset($posts["introduction"])) exit;

// Set received parameter
$csrf_token   = $posts["csrf_token"];
$account_id   = $posts["account_id"];
$user_name    = $posts["user_name"];
$introduction = $posts["introduction"];

// Define response data
$res_result;

// Check csrf token
$session = new Session();
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["success"]    = false;
    $res_result["message"]    = "不正なアクセスのため、正常に処理ができませんでした。";
    echo json_encode($res_result);
    exit;
}

$t_user = new TUser();
$update_count = $t_user->updateUserProfile($account_id, $user_name, $introduction);

if($update_count > 0) {
    $res_result["success"] = true;
    $res_result["message"] = "";
} else {
    $res_result["success"] = false;
    $res_result["message"] = "変更箇所がないため更新されませんでした。もしくはシステムエラー。";
}

echo json_encode($res_result);
