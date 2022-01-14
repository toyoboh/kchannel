<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;

//
if($_SERVER["REQUEST_METHOD"] === "GET") {
    $t_category = new TCategory();
    list($select_count, $categories) = $t_category->fetchAllCategory();

    $res_result;
    if($select_count > 0) {
        $res_result["success"]            = true;
        $res_result["message"]            = "";
        $res_result["data"]["categories"] = $categories;
    } else {
        $res_result["success"]            = false;
        $res_result["message"]            = "カテゴリーは現在未登録です。";
        $res_result["data"]["categories"] = array();
    }
    echo json_encode($res_result);
}
