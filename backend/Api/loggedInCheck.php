<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    return [
        "success" => false
    ];
}

$result         = array();
$result["data"] = array();

$session = new Session();
if($session->checkExists("user_id")) {
    $result["success"]           = true;
    $result["data"]["user_id"]   = $session->get("user_id");
    $result["data"]["user_name"] = $session->get("user_name");
} else {
    $result["success"]           = false;
}

echo json_encode($result);