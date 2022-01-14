<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Receive data in JSON format
$json_posts = file_get_contents("php://input");
$posts      = json_decode($json_posts, true);

if(!isset($posts["csrf_token"]))        exit;
if(!isset($posts["id"]))                exit;
if(!isset($posts["category_id"]))       exit;
if(!isset($posts["board_name"]))        exit;
if(!isset($posts["board_explanation"])) exit;

// Set received parameter
$csrf_token        = $posts["csrf_token"];
$id                = $posts["id"];
$category_id       = $posts["category_id"];
$board_name        = $posts["board_name"];
$board_explanation = $posts["board_explanation"];

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
$t_board = new TBoard();
$select_count = $t_board->checkSameNameExists($category_id, $board_name);

$insert_success = false;
if($select_count <= 0) {
    $insert_count = $t_board->create($id, $category_id, $board_name, $board_explanation);

    $insert_success = $insert_count > 0 ? true : false;
}

if($insert_success) {
    $res_result["success"] = true;
    $res_result["message"] = "";
} else {
    $res_result["success"] = false;
    $res_result["message"] = "『${board_name}』はすでに使用されているため、登録することができませんでした。またはシステムエラー。";
}

echo json_encode($res_result);
