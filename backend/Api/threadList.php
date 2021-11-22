<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TThread;

if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["board_id"])) {
    $board_id = $_GET["board_id"];

    $m_board = new TThread();
    $threads  = $m_board->fetchThreadInBoard($board_id);

    echo json_encode($threads);
}
