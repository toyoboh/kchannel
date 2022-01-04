<?php

require __DIR__ . "/../Info/settingHeader.php";
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
