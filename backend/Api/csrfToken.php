<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Token;

if($_SERVER["REQUEST_METHOD"] === "PUT") {
    $result = array();

    $token      = new Token();
    $csrf_token = $token->getCsrfToken();

    session_start();
    $_SESSION["csrf_token"] = $csrf_token;

    $result["success"]      = true;
    $result["csrf_token"]   = $csrf_token;

    echo json_encode($result);
}
