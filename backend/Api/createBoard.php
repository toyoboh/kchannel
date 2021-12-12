<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TBoard;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    // Set received parameter
    $csrf_token  = $posts["csrf_token"];
    $user_id     = $posts["user_id"];
    $category_id = $posts["category_id"];
    $board_name  = $posts["board_name"];
    $board_explanation = "";
    
    // Define the response array
    $res_result = array();
    
    // session start
    $session = new Session();

    // Check csrf token
    if(!$session->checkMatch($csrf_token, "csrf_token")) {
        $res_result["success"]    = false;
        $res_result["message"]    = "不正なアクセスのため、正常に処理ができませんでした。";
        $res_result["csrf_token"] = $session->get("csrf_token");
        echo json_encode($res_result);
        exit;
    }

    // Register the new category
    $t_board = new TBoard();
    $create_result = $t_board->create($user_id, $category_id, $board_name, $board_explanation);

    $res_result["success"] = $create_result["success"];
    if(!$res_result["success"]) {
        $res_result["message"] = $create_result["message"];
    }

    echo json_encode($res_result);
}
