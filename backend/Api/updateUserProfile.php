<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    // Set received parameter
    $csrf_token   = $posts["csrf_token"];
    $user_id      = $posts["user_id"];
    $user_name    = $posts["user_name"];
    $introduction = $posts["introduction"];

    // Define response data
    $res_result  = array();

    // Check csrf token
    $session = new Session();
    if(!$session->checkMatch($csrf_token, "csrf_token")) {
        $res_result["success"]    = false;
        $res_result["message"]    = "不正なアクセスのため、正常に処理ができませんでした。";
        $res_result["csrf_token"] = $session->get("csrf_token");
        echo json_encode($res_result);
        exit;
    }

    $t_user = new TUser();
    $update_result = $t_user->updateUserProfile($user_id, $user_name, $introduction);

    $res_result["success"] = $update_result["success"];
    if(!$res_result["success"]) {
        $res_result["message"] = $update_result["message"];
    }

    echo json_encode($res_result);
}
