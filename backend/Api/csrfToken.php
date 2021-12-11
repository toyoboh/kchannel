<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Token;
use Kchannel\Classes\Tool\Session;

if($_SERVER["REQUEST_METHOD"] === "PUT") {
    // Define csrf token
    $token      = new Token();
    $csrf_token = $token->getCsrfToken();
    
    // Set result value
    $result                 = array();
    $result["success"]      = true;
    $result["csrf_token"]   = $csrf_token;

    // Set session value
    $session = new Session();
    $session->set("csrf_token", $csrf_token);

    echo json_encode($result);
}
