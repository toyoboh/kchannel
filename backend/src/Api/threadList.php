<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TThread;

if($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["board_id"])) {
    exit;
}

// Receive parameter
$board_id = $_GET["board_id"];

// select data
$t_thread = new TThread();
list($select_count, $threads)  = $t_thread->initialSelect($board_id);

// Formatting response data
$res_data;
if($select_count > 0) {
    $res_data["success"] = true;
    $res_data["data"]["threads"] = $threads;
} else {
    $res_data["success"] = false;
    $res_data["message"] = "この掲示板にはまだスレッドがありません。初めてのスレッドをつくりましょう！";
    $res_data["data"]["threads"] = array();
}

echo json_encode($res_data);
