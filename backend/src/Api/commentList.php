<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;

if($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["thread_id"])) {
    exit;
}

// Receive parameter
$thread_id = $_GET["thread_id"];

// Get comment
$t_comment = new TComment();
list($select_count, $comments) = $t_comment->selectInitialComments($thread_id);

// Formatting response data
$res_data["success"]               = true;
$res_data["data"]["comments"]      = $comments;
$res_data["data"]["comment_count"] = $select_count;

// Returns response data
echo json_encode($res_data);
