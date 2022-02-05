<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TThread;


if($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["thread_id"])) {
    exit;
}

// Receive parameter
$thread_id = $_GET["thread_id"];

// Get thread information
$t_thread = new TThread();
list($select_count, $thread_information) = $t_thread->selectThreadInformation($thread_id);

// Formatting response data
$res_data;
if($select_count > 0) {
    $res_data["success"] = true;
    $res_data["data"]["thread_information"] = $thread_information;
} else {
    $res_data["success"] = false;
    $res_data["data"]["thread_information"] = array();
}

// Returns response data
echo json_encode($res_data);
