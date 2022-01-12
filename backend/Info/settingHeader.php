<?php
    // Get information of the request server.
    $request_headers = apache_request_headers();
    $request_origin = isset($request_headers["origin"]) ? $request_headers["origin"] : $request_headers["Origin"];

    // List of allowed origin
    $allowed_origin = array(
        "http://localhost:3000",
        "http://localhost:49001",
        "http://kchannel.jp",
        "http://www.kchannel.jp",
        "https://kchannel.jp",
        "https://www.kchannel.jp"
    );
    
    // Set allow origin
    if(in_array($request_origin, $allowed_origin)) {
        header("Access-Control-Allow-Origin: {$request_origin}");
    }
    
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header("Access-Control-Allow-Credentials: true");
    
?>
