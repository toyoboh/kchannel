<?php

require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\DbConnect;

if($_SERVER["REQUEST_METHOD"] === "GET") {
    $c_db_connect = new DbConnect();
    var_dump($c_db_connect->getPdo());
    
    //カテゴリ取得
    $category_list = fetchCategoryList();

    json_data_return($category_list);

}

function fetchCategoryList() {
    return null;
    // return [
    //     ["category_id" => 1, "category_name" => "K-POP", "count" => 2],
    //     ["category_id" => 2, "category_name" => "料理", "count" => 3],
    //     ["category_id" => 3, "category_name" => "美容", "count" => 10]
    // ];
}

function json_data_return($value) {
    $json_data = json_encode($value);
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
    echo $json_data;
}
