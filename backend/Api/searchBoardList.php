<?php

require __DIR__ . "/../Info/settingHeader.php";
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
$res_result;
// check csrf token
$session = new Session();
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["success"]      = false;
    $res_result["message"]      = "不正なアクセスのため、正常に処理ができませんでした。";
    $res_result["data"]["boards"] = array();
    echo json_encode($res_result);
    exit;
}

// search board
$t_board = new TBoard();
list($select_count, $boards) = $t_board->search($search_word, $category_id);

// Formatting response data
if($select_count > 0) {
    $res_result["success"]        = true;
    $res_result["data"]["boards"] = $boards;
} else {
    $res_result["success"]        = false;
    $res_result["message"]        = "「{$search_word}」の検索結果はありません。";
    $res_result["data"]["boards"] = array();
}

echo json_encode($res_result);
