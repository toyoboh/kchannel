<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;

if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["thread_id"])) {
    $thread_id = $_GET["thread_id"];

    $t_comment = new TComment();
    $comments  = $t_comment->fetchThreadInBoard($thread_id);

    echo json_encode($comments);
}
