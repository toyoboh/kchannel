<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;

//
if($_SERVER["REQUEST_METHOD"] === "POST") {
    // Receive data in JSON format
    $json_posts = file_get_contents("php://input");
    $posts      = json_decode($json_posts, true);

    //登録結果格納配列
    $res_result = array();

    // $csrf_token = $posts["csrf_token"];
    // csrfトークン確認
    // OKなら$csrf_token_success = true / NGならfalse
    // if(!$csrf_token_success) {
    //     $res_result["create_success"] = false;
    //     $res_result["message"] = "不正なアクセスのため、正常に処理ができませんでした。";
    //     echo json_encode($res_result);
    //     exit;
    // }

    $user_id = $posts["user_id"];
    $category_name = $posts["category_name"];

    $t_category = new TCategory();
    $create_result = $t_category->create($user_id, $category_name);

    $res_result["success"] = $create_result["success"];
    if(!$res_result["success"]) {
        $res_result["message"] = $create_result["message"];
    }

    echo json_encode($res_result);
}
