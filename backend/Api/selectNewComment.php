<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TComment;

if($_SERVER["REQUEST_METHOD"] === "GET") {
    // Set received parameter
    $thread_id  = $_GET["thread_id"];
    $comment_id = $_GET["comment_id"];
    
    // Define the response array
    $res_result = array();
    $res_data["data"] = array();

    // Register the new Comment
    $t_comment = new TComment();
    $select_result = $t_comment->selectNewComment($thread_id, $comment_id);

    $res_result["success"]          = $select_result["success"];
    if($res_result["success"]) {
        $res_result["data"]["item"] = $select_result["data"];
    } else {
        $res_result["data"]["item"] = array();
        $res_result["message"]      = $select_result["message"];
    }

    echo json_encode($res_result);
}
