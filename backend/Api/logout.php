<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Cookie;
use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Models\TAutoLogin;

if($_SERVER["REQUEST_METHOD"] !== "GET") {
    exit;
}

// remove all auto_login_token in DB and Cookie if auto_login_token exists in cookie.
if(isset($_COOKIE["auto_login_token"])) {
    // remove auto login token in DB
    $old_auto_login_token = $_COOKIE["auto_login_token"];
    $t_auto_login         = new TAutoLogin();
    $t_auto_login->remove($old_auto_login_token);
    
    // remove auto login token in cookie
    $_cookie = new Cookie();
    $_cookie->remove("auto_login_token");
}

// Session initialization
$_session = new Session();
$_session->destroy();

// Formatting response data
$res_result["success"] = true;

echo json_encode($res_result);
