<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Models\TUserDetail;
use Kchannel\Classes\Models\TTemporaryUser;
use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Tool\Token;

// Exit if not POST METHOD
if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

// check received parameter
if(!isset($posts["csrf_token"])) exit;
if(!isset($posts["token"]))      exit;

// Set received parameter
$csrf_token = $posts["csrf_token"];
$token      = $posts["token"];

// Define the response array
$res_result = array();

// session start
$session = new Session();

// Check csrf token
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["success"]    = false;
    $res_result["message"]    = "不正なアクセスのため、正常に処理ができませんでした。";
    echo json_encode($res_result);
    exit;
}

// Get temporary users information
$t_temporary_user               = new TTemporaryUser();
list($select_count, $temp_user) = $t_temporary_user->getUserInformation($token);

// Exit if the token is not valid.
if(!$select_count) {
    $res_result["success"] = false;
    $res_result["message"] = "有効ではないリンクです。";
    echo json_encode($res_result);
    exit;
}

// Define each information of the user.
$user_id       = $temp_user["user_id"];
$user_name     = $temp_user["user_name"];
$mail_address  = $temp_user["mail_address"];
$hash_password = $temp_user["password"];
$auth          = 0; // default auth level of the user.

$t_user = new TUser();

// Check if the "mail_address" is used in the t_users table.
if($t_user->checkMailAddressExists($mail_address)) {
    $res_result["success"] = false;
    $res_result["message"] = "すでに使用されているメールアドレスです。";
    echo json_encode($res_result);
    exit;
}

// User account registration
$t_user_detail       = new TUserDetail();
list($user_insert_count, $account_id) = $t_user->register($user_id, $user_name, $mail_address, $hash_password, $auth);
$detail_insert_count                  = $t_user_detail->initialRegistration($account_id);

if($user_insert_count && $detail_insert_count) {
    $t_temporary_user->deleteRecordWithMatchMailAddress($mail_address);
    $res_result["success"] = true;
} else {
    $res_result["message"] = "システムエラー。ユーザ情報が正常に登録できませんでした。";
    $res_result["success"] = false;
}

echo json_encode($res_result);
