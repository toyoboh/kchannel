<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;

// Executed only when the category_id is received by GET METHOD
// When there is the board:    return
//                             $board["data"]["item"]
// When there is no the board: return
//                             $board["data"]["item"] <- empty array, $board["message"]
if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["category_id"])) {
    $category_id = $_GET["category_id"];

    $t_board = new TBoard();
    $boards  = $t_board->fetchBoardInCategory($category_id);

    echo json_encode($boards);
}
