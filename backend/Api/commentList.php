<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;
use Kchannel\Classes\Models\TThread;

// Executed only when the thread_id is received by GET METHOD
// When there is the comment:    return
//                               $comment["data"]["item"], $comment["data"]["thread_info"]
// When there is no the comment: return
//                               $comment["data"]["item"] <- empty array, $comment["message"]
if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["thread_id"])) {
    $thread_id = $_GET["thread_id"];

    $t_comment = new TComment();
    $comments  = $t_comment->fetchThreadInBoard($thread_id);

    $t_thread = new TThread();

    $comments["data"]["thread_info"] = $t_thread->fetchThreadInfo($thread_id);

    echo json_encode($comments);
}
