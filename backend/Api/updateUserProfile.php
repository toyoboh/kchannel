<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;

if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    $user_id      = $posts["user_id"];
    $user_name    = $posts["user_name"];
    $introduction = $posts["introduction"];

    $res_result   = array();

    $t_user = new TUser();
    $res_result["update_result"] = $t_user->updateUserProfile($user_id, $user_name, $introduction);

    echo json_encode($res_result);
}
