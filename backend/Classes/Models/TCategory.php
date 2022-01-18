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
                categories.category_id                                  AS category_id,
                categories.category_name                                AS category_name,
                DATE_FORMAT(categories.created_at, '%Y/%m/%d %H:%i:%s') AS created_at,
                COUNT(boards.category_id)                               AS board_count
            FROM
                t_categories categories
            LEFT JOIN
                t_boards boards
            ON
                CAST(categories.category_id AS CHAR) = boards.category_id
            GROUP BY
                categories.category_id
        ;";
        
        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query);

        return array(
            $stmt->rowCount(),
            $stmt->fetchAll()
        );
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
                CAST(categories.category_id AS CHAR) = :category_id
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
     * 
     */
    public function selectCategoryInformation($category_id) {
        $query = "SELECT
                category_id,
                category_name
            FROM
                t_categories
            WHERE
                CAST(category_id AS CHAR) = :category_id
        ;";

        $use_query_item = [
            "category_id" => $category_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return array(
            $stmt->rowCount(),
            $stmt->fetch()
        );
    }

    /**
     * Check if the same name already exists.
     * @param  string $category_name
     * @return integer
     */
    public function checkSameNameExists($category_name) {
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
        $stmt = $database->executeQuery($select_sql, $select_query_item);

        return $stmt->rowCount();
    }

    /**
     * create category
     * @param  integer $id
     * @param  string  $category_name
     * @return integer
     */
    public function create($id, $category_name) {
        $query = "INSERT INTO
                        t_categories(
                            category_name,
                            created_user_id,
                            updated_user_id
                        )
                    VALUES(
                        :category_name,
                        :created_user_id,
                        :updated_user_id
                    )
        ;";
        $use_query_item = [
            "category_name" => $category_name,
            "created_user_id" => $id,
            "updated_user_id" => $id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);
        
        return $stmt->rowCount();
    }

    /**
     * @param  mixed $word search word
     * @return array
     */
    public function search($word) {
        $query = "SELECT
                    categories.category_id                                  AS category_id,
                    categories.category_name                                AS category_name,
                    DATE_FORMAT(categories.created_at, '%Y/%m/%d %H:%i:%s') AS created_at,
                    COUNT(boards.category_id)                               AS board_count
                FROM
                    t_categories categories
                LEFT JOIN
                    t_boards boards
                ON
                    CAST(categories.category_id AS CHAR) = boards.category_id
                WHERE
                    categories.category_name LIKE :word
                GROUP BY
                    categories.category_id
        ;";

        $use_query_item = [
            "word" => sprintf("%%%s%%", addcslashes($word, "\_%"))
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return array(
            $stmt->rowCount(),
            $stmt->fetchAll()
        );
    }
}
