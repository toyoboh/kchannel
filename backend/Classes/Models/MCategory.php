<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class MCategory
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
                m_categories categories
            LEFT JOIN
                m_boards boards
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

        if($row_count > 0) {
            $category["data"] = $stmt->fetchAll();
        } else {
            $category["data"] = array();
            $category["message"] = "Not Found Category";
        }

        return $category;
    }
}
