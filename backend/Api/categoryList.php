<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;

//
if($_SERVER["REQUEST_METHOD"] === "GET") {
    $t_category = new TCategory();
    $categories = $t_category->fetchAllCategory();
    echo json_encode($categories);
}
