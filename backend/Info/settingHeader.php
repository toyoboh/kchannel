<?php
    $reqHeaders = apache_request_headers();
    $allowedOrigin = array(
    "http://localhost:3000",
    "http://www.kchannel.jp"
    );
    
    if(in_array($reqHeaders['Origin'], $allowedOrigin)) {
        header("Access-Control-Allow-Origin: {$reqHeaders['Origin']}");
    }
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
?>
