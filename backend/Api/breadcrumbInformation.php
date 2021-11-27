<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;
use Kchannel\Classes\Models\TBoard;
use Kchannel\Classes\Models\TThread;

// Executed only when the category_id is received by GET METHOD
// When there is the board:    return
//                             $board["data"]["item"]
// When there is no the board: return
//                             $board["data"]["item"] <- empty array, $board["message"]
if($_SERVER["REQUEST_METHOD"] === "GET") {
    $pagename = $_GET["pagename"];
    
    $result_data = null;

    $breadcrumbData         = array();
    $breadcrumbData["data"] = array();

    switch($pagename) {
        case "boardList":
            $category_id = $_GET["id"];
            $t_category = new TCategory();
            $result_data = $t_category->selectCategoryBreadcrumbInfo($category_id);
            break;
        case "threadList":
            $board_id = $_GET["id"];
            $t_board = new TBoard();
            $result_data = $t_board->selectBoardBreadcrumbInfo($board_id);
            break;
        case "commentList":
            $thread_id = $_GET["id"];
            $t_thread = new TThread();
            $result_data = $t_thread->selectThreadBreadcrumbInfo($thread_id);
            break;
    }
    
    if(isset($result_data["category_id"]) && isset($result_data["category_name"])) {
        $category = [
            "id" => $result_data["category_id"],
            "name" => $result_data["category_name"]
        ];
        array_push($breadcrumbData["data"], $category);
    }
    if(isset($result_data["board_id"]) && isset($result_data["board_name"])) {
        $board = [
            "id" => $result_data["board_id"],
            "name" => $result_data["board_name"]
        ];
        array_push($breadcrumbData["data"], $board);
    }
    if(isset($result_data["thread_id"]) && isset($result_data["thread_name"])) {
        $thread = [
            "id" => $result_data["thread_id"],
            "name" => $result_data["thread_name"]
        ];
        array_push($breadcrumbData["data"], $thread);
    }

    echo json_encode($breadcrumbData);
}
