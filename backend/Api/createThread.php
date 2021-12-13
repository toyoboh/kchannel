<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TThread;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    // Set received parameter
    $csrf_token         = $posts["csrf_token"];
    $user_id            = $posts["user_id"];
    $board_id           = $posts["board_id"];
    $thread_name        = $posts["thread_name"];
    $thread_explanation = $posts["thread_explanation"];
    
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

    // Register the new Thread
    $t_thread = new TThread();
    $create_result = $t_thread->create($user_id, $board_id, $thread_name, $thread_explanation);

    $res_result["success"] = $create_result["success"];
    if(!$res_result["success"]) {
        $res_result["message"] = $create_result["message"];
    }

    echo json_encode($res_result);
}
