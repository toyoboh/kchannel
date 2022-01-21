<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Cookie;
use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Models\TUser;

if($_SERVER["REQUEST_METHOD"] !== "GET") {
    exit;
}

$_session = new Session();

// remove all auto_login_token in DB and Cookie if auto_login_token exists in cookie.
if(isset($_COOKIE["auto_login_token"])) {
    $account_id = $_session->get("account_id");
    $t_user     = new TUser();
    $t_user->removeAllAutoLoginToken($account_id);

    // remove auto login token in cookie
    $_cookie = new Cookie();
    $_cookie->remove("auto_login_token");
}

// Session initialization
$_session->destroy();

// Formatting response data
$res_result["success"] = true;

echo json_encode($res_result);
