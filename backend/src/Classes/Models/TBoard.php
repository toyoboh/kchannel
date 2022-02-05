<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TBoard
{
    /**
     * Fetch boards included in the category
     * @param string $category_id 
     * @return array Only when there is no board: add message
     */
    public function initialSelect($category_id) {
        $query = "SELECT
                boards.board_id                                      AS board_id,
                boards.board_name                                    AS board_name,
                DATE_FORMAT(boards.created_at, '%Y/%m/%d %H:%i:%s')  AS created_at,
                COUNT(threads.thread_id)                             AS thread_count
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

        return array(
            $stmt->rowCount(),
            $stmt->fetchAll()
        );
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

    // get board information
    public function selectBoardInformation($board_id) {
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

        return array(
            $stmt->rowCount(),
            $stmt->fetch()
        );
    }

    /**
     * Check if the same name already exists.
     */
    public function checkSameNameExists($category_id, $board_name) {
        $query = "SELECT
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

        $use_query_item = [
            "category_id" => $category_id,
            "board_name"  => $board_name
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }


    /**
     * create board
     * @param integer $account_id
     * @param integer $category_id
     * @param string  $baord_name
     * @return array
     */
    public function create($account_id, $category_id, $board_name) {
        $query = "INSERT INTO
                        t_boards(
                            category_id,
                            board_name,
                            created_account_id,
                            updated_account_id
                        )
                    VALUES(
                        :category_id,
                        :board_name,
                        :created_account_id,
                        :updated_account_id
                    )
        ;";
        $use_query_item = [
            "category_id"        => $category_id,
            "board_name"         => $board_name,
            "created_account_id" => $account_id,
            "updated_account_id" => $account_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    // search
    public function search($word, $id) {
        $query = "SELECT
                boards.board_id                                      AS board_id,
                boards.board_name                                    AS board_name,
                DATE_FORMAT(boards.created_at, '%Y/%m/%d %H:%i:%s')  AS created_at,
                COUNT(threads.thread_id)                             AS thread_count
            FROM
                t_boards boards
            LEFT JOIN
                t_threads threads
            ON
                boards.board_id = threads.board_id
            WHERE
                CAST(boards.category_id AS CHAR) = :category_id
            AND
                boards.board_name LIKE :word
            GROUP BY
                boards.board_id
            ;";

        $use_query_item = [
            "category_id" => $id,
            "word"        => sprintf("%%%s%%", addcslashes($word, "\_%"))
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
