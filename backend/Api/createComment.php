<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] !== "POST") exit;

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

// Check for the existence of parameters
if(!isset($posts["csrf_token"]))   exit;
if(!isset($posts["user_id"]))      exit;
if(!isset($posts["thread_id"]))    exit;
if(!isset($posts["comment_body"])) exit;

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
    echo json_encode($res_result);
    exit;
}

// Register the new Comment
$t_comment = new TComment();
$create_count = $t_comment->create($user_id, $thread_id, $comment_body);

if($create_count > 0) {
    $res_result["success"] = true;
    $res_resutl["message"] = "";
} else {
    $res_result["success"] = false;
    $res_result["message"] = "正常にデータを登録することができませんでした。";
}

echo json_encode($res_result);
