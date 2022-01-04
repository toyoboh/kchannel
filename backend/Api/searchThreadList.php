<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Models\TThread;

// Exit conditions
if($_SERVER["REQUEST_METHOD"] !== "GET") exit;
if(!isset($_GET["search_word"]))         exit;
if(!isset($_GET["board_id"]))            exit;
if(!isset($_GET["csrf_token"]))          exit;

// recieve parameter
$search_word = $_GET["search_word"];
$board_id    = $_GET["board_id"];
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

// search thread
$t_thread = new TThread();
list($row_count, $threads) = $t_thread->search($search_word, $board_id);

if($row_count > 0) {
    $res_result["data"]["item"] = $threads;
} else {
    $res_result["data"]["item"] = array();
    $res_result["message"]      = "「{$search_word}」の検索結果はありません。";
}

echo json_encode($res_result);
