<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Models\TTemporaryUser;
use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Tool\Token;
use Kchannel\Classes\Tool\Mail;

// Exit if not POST METHOD
if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

// Set received parameter
$csrf_token         = $posts["csrf_token"];
$mail_address       = $posts["mail_address"];
$user_id            = $posts["user_id"];
$user_name          = $posts["user_name"];
$plaintext_password = $posts["password"];

// hash password
$hash_password      = password_hash($plaintext_password, PASSWORD_DEFAULT);

// Define the response array
$res_result = array();

// session start
$session = new Session();

// Check csrf token
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["success"]    = false;
    $res_result["message"]    = "不正なアクセスのため、正常に処理ができませんでした。";
    $res_result["csrf_token"] = $session->get("csrf_token");
    echo json_encode($res_result);
    exit;
}

$t_user           = new TUser();
$t_temporary_user = new TTemporaryUser();

$can_register = true;

// Check if the "user_id" is used in the t_users table and t_temporary_users table.
if($t_temporary_user->checkUserIdExists($user_id) || $t_user->checkUserIdExists($user_id)) {
    $res_result["message"]["user_id"] = "すでに使用されているユーザIDです";
    $can_register = false;
} else {
    $res_result["message"]["user_id"] = "";
}

// Check if the "mail_address" is used in the t_users table.
if($t_user->checkMailAddressExists($mail_address)) {
    $res_result["message"]["mail_address"] = "すでに使用されているメールアドレスです";
    $can_register = false;
} else {
    $res_result["message"]["mail_address"] = "";
}

// Exit if registration is not possible.
if(!$can_register) {
    $res_result["success"] = false;
    echo json_encode($res_result);
    exit;
}

// Get token
$tool_token = new Token();
$token = $tool_token->getEmailAuthToken();

// Register new Account
$register_success = $t_temporary_user->register($user_id, $user_name, $mail_address, $hash_password, $token);
$res_result["success"] = $register_success;

// Send E-mail
// ローカル環境では送信できていない
if($res_result["success"]) {
    $mail                    = new Mail();
    $res_result["mail_info"] = $mail->mainRegistrationGuidance($mail_address, $user_name, $token);
}

echo json_encode($res_result);
