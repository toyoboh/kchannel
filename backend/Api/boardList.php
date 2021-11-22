<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\MBoard;

if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["category_id"])) {
    $category_id = $_GET["category_id"];

    $m_board = new MBoard();
    $boards  = $m_board->fetchBoardInCategory($category_id);

    echo json_encode($boards);
}
