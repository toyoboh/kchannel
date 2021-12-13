<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TBoard
{
    //columns
    public $category_id;
    public $board_id;
    public $board_name;
    public $board_board_explanation;
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
                CAST(boards.category_id AS CHAR) = :category_id
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
     * Get Information to create a breadcrumb list
     * @param string $board_id
     * @return array     exist: Category and Board Information
     *               not exist: empty array
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
                CAST(boards.board_id AS CHAR) = :board_id
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

    /**
     * Check if the board exists
     * @param string $board_id
     * @return array     exist: $result["data"] <- board information(array)
     *                          $result["data"]["board_exists"] <- Does it exist(boolean:true)
     *               not exist: $result["data"]["board_exists"] <- Does it exist(boolean:false)
     *                          $result["message"] <- error message(string)
     */
    public function checkBoardExists($board_id) {
        $query = "SELECT
                board_id,
                board_name
            FROM
                t_boards
            WHERE
                CAST(board_id AS CHAR) = :board_id
        ;";

        $use_query_item = [
            "board_id" => $board_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();

        $result = array();
        $result["data"] = array();

        if($row_count > 0) {
            //true
            $result["data"]["board_info"] = $stmt->fetch();
            $result["data"]["board_exists"] = true;
        } else {
            //false message
            $result["data"]["board_exists"] = false;
            $result["message"] = "存在しない掲示板にスレッドを追加することはできません";
        }

        return $result;
    }

    /**
     * create board
     * @param string  $user_id
     * @param integer $category_id
     * @param string  $baord_name
     * @param string  $board_explanation
     * @return array
     */
    public function create($user_id, $category_id, $board_name, $board_explanation) {
        // Response result array
        $result = array();

        // Define user id
        $created_user_id = $user_id;
        $updated_user_id = $user_id;

        // Exists check
        $select_sql = "SELECT
                        categories.category_id,
                        boards.board_id,
                        boards.board_name
                    FROM
                        t_categories categories
                    INNER JOIN
                        t_boards     boards
                    ON
                        categories.category_id = boards.category_id
                    WHERE
                        categories.category_id = :category_id
                    AND
                        boards.board_name      = :board_name
        ;";
        $select_query_item = [
            "category_id" => $category_id,
            "board_name"  => $board_name
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

        $insert_sql = "INSERT INTO
                        t_boards(
                            category_id,
                            board_name,
                            board_explanation,
                            created_user_id,
                            updated_user_id
                        )
                    VALUES(
                        :category_id,
                        :board_name,
                        :board_explanation,
                        :created_user_id,
                        :updated_user_id
                    )
        ;";
        $insert_query_item = [
            "category_id"       => $category_id,
            "board_name"        => $board_name,
            "board_explanation" => $board_explanation,
            "created_user_id"   => $created_user_id,
            "updated_user_id"   => $updated_user_id
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
