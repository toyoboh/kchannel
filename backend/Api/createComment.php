<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    // Set received parameter
    $csrf_token         = $posts["csrf_token"];
    $user_id            = $posts["user_id"];
    $thread_id          = $posts["thread_id"];
    $comment_body       = $posts["comment_body"];
    
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

    // Register the new Comment
    $t_comment = new TComment();
    $create_result = $t_comment->create($user_id, $thread_id, $comment_body);

    $res_result["success"] = $create_result["success"];
    if(!$res_result["success"]) {
        $res_result["message"] = $create_result["message"];
    }

    echo json_encode($res_result);
}
