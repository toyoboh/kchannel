<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "GET") {
    // Clear the Session
    $_session = new Session();
    $_session->destroy();

    $res_result = array();
    $res_result["success"] = true;

    echo json_encode($res_result);
}
