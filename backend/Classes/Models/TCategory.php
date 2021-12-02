<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TCategory
{
    //columns
    public $category_id;
    public $category_name;
    public $created_at;
    public $created_user_id;
    public $updated_at;
    public $updated_user_id;

    /**
     * Fetch all category of database and 
     * @param void
     * @return array Only when there is no category: add message
     */
    public function fetchAllCategory() {
        $query = "SELECT
                categories.category_id    AS category_id,
                categories.category_name  AS category_name,
                COUNT(boards.category_id) AS board_count
            FROM
                t_categories categories
            LEFT JOIN
                t_boards boards
            ON
                categories.category_id = boards.category_id
            GROUP BY
                categories.category_id
            ;";
        
        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query);

        $row_count = $stmt->rowCount();
        
        $category = array();
        $category["data"] = array();

        if($row_count > 0) {
            $category["data"]["item"] = $stmt->fetchAll();
        } else {
            $category["data"]["item"] = array();
            $category["message"] = "Not Found Category";
        }

        return $category;
    }

    /**
     * Get Information to create a breadcrumb list
     * @param string $category_id
     * @return array     exist: Category Information
     *               not exist: empty array
     */
    public function selectCategoryBreadcrumbInfo($category_id) {
        $query = "SELECT
                categories.category_id AS category_id,
                categories.category_name AS category_name
            FROM
                t_categories categories
            WHERE
                categories.category_id = :category_id
        ;";

        $use_query_item = [
            "category_id" => $category_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();

        if($row_count > 0) {
            return $stmt->fetch();
        } else {
            return array();
        }
    }

    /**
     * Check if the category exists
     * @param string $category_id
     * @return array     exist: $result["data"] <- category information(array)
     *                          $result["data"]["category_exists"] <- Does it exist(boolean:true)
     *               not exist: $result["data"]["category_exists"] <- Does it exist(boolean:false)
     *                          $result["message"] <- error message(string)
     */
    public function checkCategoryExists($category_id) {
        $query = "SELECT
                category_id,
                category_name
            FROM
                t_categories
            WHERE
                category_id = :category_id
        ;";

        $use_query_item = [
            "category_id" => $category_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();

        $result = array();
        $result["data"] = array();

        if($row_count > 0) {
            //true
            $result["data"]["category_info"] = $stmt->fetch();
            $result["data"]["category_exists"] = true;
        } else {
            //false message
            $result["data"]["category_exists"] = false;
            $result["message"] = "存在しないカテゴリーに掲示板を追加することはできません";
        }

        return $result;
    }
}
