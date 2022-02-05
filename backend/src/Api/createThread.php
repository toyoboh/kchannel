<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TThread;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

// check receive data
if(!isset($posts["csrf_token"]))         exit;
if(!isset($posts["account_id"]))         exit;
if(!isset($posts["board_id"]))           exit;
if(!isset($posts["thread_name"]))        exit;

// Set received parameter
$csrf_token  = $posts["csrf_token"];
$account_id  = $posts["account_id"];
$board_id    = $posts["board_id"];
$thread_name = $posts["thread_name"];

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

// Check if the same name already exists.
$t_thread     = new TThread();
$select_count = $t_thread->checkSameNameExists($board_id, $thread_name);

$insert_success = false;
if($select_count <= 0) {
    $insert_count   = $t_thread->create($account_id, $board_id, $thread_name);

    $insert_success = $insert_count > 0;
}

if($insert_success) {
    $res_result["success"] = true;
    $res_result["message"] = "";
} else {
    $res_result["success"] = false;
    $res_result["message"] = "『${thread_name}』はすでに使用されているため、登録することができませんでした。またはシステムエラー。";
}

echo json_encode($res_result);
