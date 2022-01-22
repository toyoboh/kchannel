<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TThread
{
    /**
     * Fetch threads included in the board
     * @param string $board_id 
     * @return array Only when there is no thread: add message
     */
    public function initialSelect($board_id) {
        $query = "SELECT
                threads.thread_id                                    AS thread_id,
                threads.thread_name                                  AS thread_name,
                DATE_FORMAT(threads.created_at, '%Y/%m/%d %H:%i:%s') AS created_at,
                COUNT(comments.comment_id)                           AS comment_count
            FROM
                t_threads threads
            LEFT JOIN
                t_comments comments
            ON
                threads.thread_id              = comments.thread_id
            WHERE
                CAST(threads.board_id AS CHAR) = :board_id
            GROUP BY
                threads.thread_id
        ;";

        $use_query_item = [
            "board_id" => $board_id
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
     * Select information about the thread
     * @param string $thread_id
     * @return array Returns an empty array when thread infomation fetch fails
     */
    public function selectThreadInformation($thread_id) {
        $query = "SELECT
                threads.thread_id                                     AS thread_id,
                threads.thread_name                                   AS thread_name,
                threads.created_account_id                            AS created_account_id,
                users.user_name                                       AS created_user_name,
                DATE_FORMAT(threads.created_at, '%Y/%m/%d %H:%i:%s')  AS created_at
            FROM
                t_threads threads
            INNER JOIN
                t_users   users
            ON
                threads.created_account_id      = users.account_id
            WHERE
                CAST(threads.thread_id AS CHAR) = :thread_id
        ;";

        $use_query_item = [
            "thread_id" => $thread_id
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
     * Get Information to create a breadcrumb list
     * @param string $thread_id
     * @return array     exist: Category and Board and Thread Information
     *               not exist: empty array
     */
    public function selectThreadBreadcrumbInfo($thread_id) {
        $query = "SELECT
                categories.category_id   AS category_id,
                categories.category_name AS category_name,
                boards.board_id          AS board_id,
                boards.board_name        AS board_name,
                threads.thread_id        AS thread_id,
                threads.thread_name      AS  thread_name
            FROM
                t_threads threads
            INNER JOIN
                t_boards boards
            ON
                threads.board_id = boards.board_id
            INNER JOIN
                t_categories categories
            ON
                boards.category_id = categories.category_id
            WHERE
                CAST(threads.thread_id AS CHAR) = :thread_id
        ;";

        $use_query_item = [
            "thread_id" => $thread_id
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
     * Check if the same name already exists.
     * @param 
     */
    public function checkSameNameExists($board_id, $thread_name) {
        $query = "SELECT
                boards.board_id,
                threads.thread_id,
                threads.thread_name
            FROM
                t_boards  boards
            INNER JOIN
                t_threads threads
            ON
                boards.board_id     = threads.board_id
            WHERE
                boards.board_id     = :board_id
            AND
                threads.thread_name = :thread_name
        ;";

        $use_query_item = [
            "board_id"     => $board_id,
            "thread_name"  => $thread_name
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    /**
     * create thread
     * @param  integer $account_id
     * @param  integer $board_id
     * @param  string  $thread_name
     * @return integer
     */
    public function create($account_id, $board_id, $thread_name) {
        $query = "INSERT INTO
                        t_threads(
                            board_id,
                            thread_name,
                            created_account_id,
                            updated_account_id
                        )
                    VALUES(
                        :board_id,
                        :thread_name,
                        :created_account_id,
                        :updated_account_id
                    )
        ;";
        $use_query_item = [
            "board_id"           => $board_id,
            "thread_name"        => $thread_name,
            "created_account_id"    => $account_id,
            "updated_account_id"    => $account_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    public function search($word, $id) {
        $query = "SELECT
                threads.thread_id                                    AS thread_id,
                threads.thread_name                                  AS thread_name,
                DATE_FORMAT(threads.created_at, '%Y/%m/%d %H:%i:%s') AS created_at,
                COUNT(comments.comment_id)                           AS comment_count
            FROM
                t_threads  threads
            LEFT JOIN
                t_comments comments
            ON
                threads.thread_id = comments.thread_id
            WHERE
                CAST(threads.board_id AS CHAR) = :board_id
            AND
                threads.thread_name LIKE :word
            GROUP BY
                threads.thread_id
        ;";

        $use_query_item = [
            "board_id" => $id,
            "word"     => sprintf("%%%s%%", addcslashes($word, "\%_"))
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
