<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Models\TUser;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

// Define response data
$result;

// Check if user information remains in the session
$session = new Session();
if($session->checkExists("user_id")) {
    // get session data
    $user_id = $session->get("user_id");
    $user_name = $session->get("user_name");

    // Formatting response data
    $result["success"]           = true;
    $result["data"]["user_id"]   = $user_id;
    $result["data"]["user_name"] = $user_name;

    // update users last_login_at data 
    $t_user = new TUser();
    $t_user->updateAtLogin($user_id);
} else {
    $result["success"]           = false;
}

echo json_encode($result);
