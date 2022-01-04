<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;

if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["board_id"])) {
    $board_id = $_GET["board_id"];

    $t_board = new TBoard();
    $board  = $t_board->checkBoardExists($board_id);

    echo json_encode($board);
}
