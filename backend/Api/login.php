<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    // Set received parameter
    $csrf_token         = $posts["csrf_token"];
    $user_id            = $posts["user_info"];
    $mail_address       = $posts["user_info"];
    $plaintext_password = $posts["password"];
    
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

    // 
    $t_user = new TUser();
    $select_result = $t_user->selectUserInformation($user_id, $mail_address);

    // Exit if there is no user information
    if(!$select_result["success"]) {
        $res_result["success"] = false;
        $res_result["message"] = "メールアドレス・ユーザIDまたはパスワードが間違っています。";
        echo json_encode($res_result);
        exit;
    }
    
    // password check
    if(!password_verify($plaintext_password, $select_result["data"]["password"])) {
        $res_result["success"] = false;
        $res_result["message"] = "メールアドレス・ユーザIDまたはパスワードが間違っています。";
    } else {
        // update last login date at time.
        // TODO: Needs processing in case of failure.
        $t_user->updateAtLogin($select_result["data"]["user_id"]);

        // Set session information
        $session->regenerate();
        $session->set("user_id", $select_result["data"]["user_id"]);
        $session->set("user_name", $select_result["data"]["user_name"]);

        // Set response data
        $res_result["success"]           = true;
        $res_result["data"]              = array();
        $res_result["data"]["user_id"]   = $select_result["data"]["user_id"];
        $res_result["data"]["user_name"] = $select_result["data"]["user_name"];
    }

    echo json_encode($res_result);
}
