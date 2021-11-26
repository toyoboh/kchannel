<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TBoard
{
    //columns
    public $category_id;
    public $board_id;
    public $board_name;
    public $board_explanation;
    public $board_rule;
    public $created_at;
    public $created_user_id;
    public $updated_at;
    public $updated_user_id;

    /**
     * Fetch boards included in the category
     * @param string $category_id 
     * @return array Only when there is no board: add message
     */
    public function fetchBoardInCategory($category_id) {
        $query = "SELECT
                boards.board_id          AS board_id,
                boards.board_name        AS board_name,
                COUNT(threads.thread_id) AS thread_count
            FROM
                t_boards boards
            LEFT JOIN
                t_threads threads
            ON
                boards.board_id = threads.board_id
            WHERE
                boards.category_id = :category_id
            GROUP BY
                boards.board_id
            ;";

        $use_query_item = [
            "category_id" => $category_id
        ];
        
        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();
        
        $board = array();
        $board["data"] = array();

        if($row_count > 0) {
            $board["data"]["item"] = $stmt->fetchAll();
        } else {
            $board["data"]["item"] = array();
            $board["message"] = "Not Found Board";
        }

        return $board;
    }

    /**
     * 
     */
    public function selectBoardBreadcrumbInfo($board_id) {
        $query = "SELECT
                categories.category_id AS category_id,
                categories.category_name AS category_name,
                boards.board_id AS board_id,
                boards.board_name AS board_name
            FROM
                t_boards boards
            INNER JOIN
                t_categories categories
            ON
                boards.category_id = categories.category_id
            WHERE
                boards.board_id = :board_id
        ;";

        $use_query_item = [
            "board_id" => $board_id
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
}
