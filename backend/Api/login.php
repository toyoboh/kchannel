<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Tool\Token;
use Kchannel\Classes\Tool\Cookie;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

// check parameter
if(!isset($posts["csrf_token"]))      exit;
if(!isset($posts["user_info"]))       exit;
if(!isset($posts["password"]))        exit;
if(!isset($posts["is_auto_login"]))   exit;

// Set received parameter
$csrf_token         = $posts["csrf_token"];
$user_id            = $posts["user_info"];
$mail_address       = $posts["user_info"];
$plaintext_password = $posts["password"];
$is_auto_login      = $posts["is_auto_login"];

// Define the response array
$res_result;

// Check csrf token
$session = new Session();
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["success"]    = false;
    $res_result["message"]    = "不正なアクセスのため、正常に処理ができませんでした。";
    echo json_encode($res_result);
    exit;
}

// Get user user information
$t_user = new TUser();
list($select_count, $user_information) = $t_user->selectUserInformation($user_id, $mail_address);

// If there is no user information
if($select_count <= 0) {
    $res_result["success"] = false;
    $res_result["message"] = "メールアドレス・ユーザIDまたはパスワードが間違っています。";
    echo json_encode($res_result);
    exit;
}

// password check
$hash_password = $user_information["password"];
if(!password_verify($plaintext_password, $hash_password)) {
    $res_result["success"] = false;
    $res_result["message"] = "メールアドレス・ユーザIDまたはパスワードが間違っています。";

    echo json_encode($res_result);
    exit;
}

// When login is successful
// TODO: Needs processing in case of failure.

// update last login date at time.
$id        = $user_information["id"];
$user_id   = $user_information["user_id"];
$user_name = $user_information["user_name"];

$t_user->updateAtLogin($id);

// Set session information
$session->regenerate();
$session->set("id"       , $id);
$session->set("user_id"  , $user_id);
$session->set("user_name", $user_name);

if($is_auto_login) {
    // create auto login token
    $t_token = new Token();
    $auto_login_token = $t_token->autoLoginToken();

    // register in DB
    $t_user->removeAllAutoLoginToken($id);
    $insert_count = $t_user->registrationAutoLoginToken($id, $auto_login_token);

    // register in cookie
    if($insert_count > 0) {
        $t_cookie = new Cookie();
        $t_cookie->registrationAutoLoginToken($auto_login_token);
    } else {
        // HACK: add error proccess
    }
}

// Formatting response data
$res_result["success"]           = true;
$res_result["data"]["id"]        = $id;
$res_result["data"]["user_id"]   = $user_id;
$res_result["data"]["user_name"] = $user_name;


echo json_encode($res_result);
