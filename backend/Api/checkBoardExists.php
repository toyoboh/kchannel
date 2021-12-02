<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;

if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["board_id"])) {
    $board_id = $_GET["board_id"];

    $t_board = new TBoard();
    $board  = $t_board->checkBoardExists($board_id);

    echo json_encode($board);
}
