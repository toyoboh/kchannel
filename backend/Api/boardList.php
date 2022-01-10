<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;

if($_SERVER["REQUEST_METHOD"] !== "GET" && !isset($_GET["category_id"])) {
    exit;
}

// Receive parameter
$category_id = $_GET["category_id"];


// select boards
$t_board = new TBoard();
list($select_count, $boards)  = $t_board->initialSelect($category_id);

// Formatting response data
$res_data;
if($select_count > 0) {
    $res_data["success"]        = true;
    $res_data["data"]["boards"] = $boards;
} else {
    $res_data["success"]        = false;
    $res_data["message"]        = "このカテゴリーにはまだ掲示板がありません。初めての掲示板をつくりましょう！";
    $res_data["data"]["boards"] = array();
}

// Returns response data
echo json_encode($res_data);
