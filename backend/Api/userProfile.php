<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TUser;

if($_SERVER["REQUEST_METHOD"] === "GET" && $_GET["user_id"]) {
    $user_id = $_GET["user_id"];

    $t_user       = new TUser();
    $user_profile = $t_user->getUserProfile($user_id);

    echo json_encode($user_profile);
}
