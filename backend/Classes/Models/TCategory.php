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

    /**
     * create category
     * @param string $user_id
     * @param string $category_name
     * @return array
     */
    public function create($user_id, $category_name) {
        // result array
        $result = array();

        $created_user_id = $user_id;
        $updated_user_id = $user_id;

        // exists check
        $select_sql = "SELECT
                        category_id,
                        category_name
                    FROM
                        t_categories
                    WHERE
                        category_name = :category_name
        ;";
        $select_query_item = [
            "category_name" => $category_name
        ];

        $database = new Database();
        $database->connect();
        $select_stmt = $database->executeQuery($select_sql, $select_query_item);

        $select_row_count = $select_stmt->rowCount();

        if($select_row_count >= 1) {
            $result["message"] = "同名のカテゴリが存在しているため、登録できませんでした。";
            $result["success"] = false;
            return $result;
        }

        // create category id
        $category_id = "ddd";

        $insert_sql = "INSERT INTO
                        t_categories(
                            category_id,
                            category_name,
                            created_user_id,
                            updated_user_id
                        )
                    VALUES(
                        :category_id,
                        :category_name,
                        :created_user_id,
                        :updated_user_id
                    )
        ;";
        $insert_query_item = [
            "category_id" => $category_id,
            "category_name" => $category_name,
            "created_user_id" => $created_user_id,
            "updated_user_id" => $updated_user_id
        ];

        $insert_stmt = $database->executeQuery($insert_sql, $insert_query_item);
        $insert_row_count = $insert_stmt->rowCount();

        if($insert_row_count >= 1) {
            $result["success"] = true;
        } else {
            $result["message"] = "システムエラー。正常にカテゴリーを登録することができませんでした。";
            $result["success"] = false;
        }

        return $result;
    }
}
