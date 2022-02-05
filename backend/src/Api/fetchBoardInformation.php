<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;


if($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["board_id"])) {
    exit;
}

// Receive parameter
$board_id = $_GET["board_id"];

// Get thread information
$t_board = new TBoard();
list($select_count, $board_information) = $t_board->selectBoardInformation($board_id);

// Formatting response data
$res_data;
if($select_count > 0) {
    $res_data["success"] = true;
    $res_data["data"]["board_information"] = $board_information;
} else {
    $res_data["success"] = false;
    $res_data["data"]["board_information"] = array();
}

// Returns response data
echo json_encode($res_data);
