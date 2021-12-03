<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Models\TCategory;

//
if($_SERVER["REQUEST_METHOD"] === "GET") {
    $t_category = new TCategory();
    $categories = $t_category->fetchAllCategory();
    echo json_encode($categories);
}
