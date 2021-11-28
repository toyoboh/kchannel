<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUserDetail;

if($_SERVER["REQUEST_METHOD"] === "GET" && $_GET["user_id"]) {
    $user_id = $_GET["user_id"];

    $t_user_detail = new TUserDetail();
    $user_detail = $t_user_detail->getUserDetailInformation($user_id);

    echo json_encode($user_detail);
}
