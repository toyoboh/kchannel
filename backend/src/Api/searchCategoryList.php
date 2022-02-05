<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Models\TCategory;

// Exit conditions
if($_SERVER["REQUEST_METHOD"] !== "GET") exit;
if(!isset($_GET["search_word"]))         exit;
if(!isset($_GET["csrf_token"]))          exit;

// recieve parameter
$search_word = $_GET["search_word"];
$csrf_token  = $_GET["csrf_token"];

// set result data
$res_result         = array();
$res_result["data"] = array();

// check csrf token
$session = new Session();
if(!$session->checkMatch($csrf_token, "csrf_token")) {
    $res_result["message"]            = "不正なアクセスのため、正常に処理ができませんでした。";
    $res_result["data"]["categories"] = array();
    echo json_encode($res_result);
    exit;
}

// search category
$t_category = new TCategory();
list($select_count, $categories) = $t_category->search($search_word);

if($select_count > 0) {
    $res_result["success"]            = true;
    $res_result["message"]            = "";
    $res_result["data"]["categories"] = $categories;
} else {
    $res_result["success"]            = false;
    $res_result["message"]            = "「{$search_word}」の検索結果はありません。";
    $res_result["data"]["categories"] = array();
}

echo json_encode($res_result);
