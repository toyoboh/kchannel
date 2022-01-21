<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;

if($_SERVER["REQUEST_METHOD"] !== "GET" && !isset($_GET["category_id"])) {
    exit;
}

// Receive parameter
$category_id = $_GET["category_id"];

// Get category information
$t_category = new TCategory();
list($select_count, $category_information)  = $t_category->selectCategoryInformation($category_id);

$res_result;
if($select_count > 0) {
    $res_result["success"]                      = true;
    $res_result["data"]["category_information"] = $category_information;
} else {
    $res_result["success"]                      = false;
    $res_result["data"]["category_information"] = array();
}
echo json_encode($res_result);
