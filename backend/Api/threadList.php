<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TThread;

// Executed only when the board_id is received by GET METHOD
// When there is the thread:    return
//                              $thread["data"]["item"]
// When there is no the thread: return
//                              $thread["data"]["item"] <- empty array, $thread["message"]
if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["board_id"])) {
    $board_id = $_GET["board_id"];

    $t_thread = new TThread();
    $threads  = $t_thread->fetchThreadInBoard($board_id);

    echo json_encode($threads);
}
