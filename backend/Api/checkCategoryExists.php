<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;

if($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["category_id"])) {
    $category_id = $_GET["category_id"];

    $t_category = new TCategory();
    $category  = $t_category->checkCategoryExists($category_id);

    echo json_encode($category);
}
