<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;
use Kchannel\Classes\Models\TBoard;
use Kchannel\Classes\Models\TThread;

if($_SERVER["REQUEST_METHOD"] !== "GET") {
    exit;
}

// check received parameter
if(!isset($_GET["pagename"])) exit;
if(!isset($_GET["id"]))       exit;

// define
$pagename = $_GET["pagename"];

// get breadcrumb information
$select_data;
switch($pagename) {
    case "boardList":
        $category_id = $_GET["id"];
        $t_category = new TCategory();
        $select_data = $t_category->selectCategoryBreadcrumbInfo($category_id);
        break;
    case "threadList":
        $board_id = $_GET["id"];
        $t_board = new TBoard();
        $select_data = $t_board->selectBoardBreadcrumbInfo($board_id);
        break;
    case "commentList":
        $thread_id = $_GET["id"];
        $t_thread = new TThread();
        $select_data = $t_thread->selectThreadBreadcrumbInfo($thread_id);
        break;
}

// formatting response data
$resBreadcrumbData["data"] = array();
if(isset($select_data["category_id"]) && isset($select_data["category_name"])) {
    $category = [
        "id" => $select_data["category_id"],
        "name" => $select_data["category_name"],
        "title" => "カテゴリー",
        "link" => "/boardList"
    ];
    array_push($resBreadcrumbData["data"], $category);
}
if(isset($select_data["board_id"]) && isset($select_data["board_name"])) {
    $board = [
        "id" => $select_data["board_id"],
        "name" => $select_data["board_name"],
        "title" => "掲示板",
        "link" => "/threadList"
    ];
    array_push($resBreadcrumbData["data"], $board);
}
if(isset($select_data["thread_id"]) && isset($select_data["thread_name"])) {
    $thread = [
        "id" => $select_data["thread_id"],
        "name" => $select_data["thread_name"],
        "title" => "スレッド",
        "link" => "/commentList"
    ];
    array_push($resBreadcrumbData["data"], $thread);
}

echo json_encode($resBreadcrumbData);
