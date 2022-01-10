<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;

// Exit if the conditions are not met
if($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["thread_id"]) || !isset($_GET["comment_id"])) {
    exit;
}

// Set received parameter
$thread_id  = $_GET["thread_id"];
$comment_id = $_GET["comment_id"];

// Get the new comments
$t_comment                     = new TComment();
list($select_count, $comments) = $t_comment->selectNewComment($thread_id, $comment_id);

// Formatting response data
$res_result;
if($select_count > 0) {
    $res_result["success"]          = true;
    $res_result["data"]["comments"] = $comments;
} else {
    $res_result["success"]          = false;
}

echo json_encode($res_result);
