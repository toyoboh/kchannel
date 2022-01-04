<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Models\TBoard;

// Exit conditions
if($_SERVER["REQUEST_METHOD"] !== "GET") exit;
if(!isset($_GET["search_word"]))         exit;
if(!isset($_GET["category_id"]))         exit;
if(!isset($_GET["csrf_token"]))          exit;

// recieve parameter
$search_word = $_GET["search_word"];
$category_id = $_GET["category_id"];
$csrf_token  = $_GET["csrf_token"];

// set result data
$res_result         = array();
$res_result["data"] = array();

// check csrf token
$session = new Session();
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["data"]["item"] = array();
    $res_result["message"]      = "不正なアクセスのため、正常に処理ができませんでした。";
    echo json_encode($res_result);
    exit;
}

// search board
$t_board = new TBoard();
list($row_count, $boards) = $t_board->search($search_word, $category_id);

if($row_count > 0) {
    $res_result["data"]["item"] = $boards;
} else {
    $res_result["data"]["item"] = array();
    $res_result["message"]      = "「{$search_word}」の検索結果はありません。";
}

echo json_encode($res_result);
