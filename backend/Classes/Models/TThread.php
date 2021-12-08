<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TThread
{
    //columns
    public $board_id;
    public $thread_id;
    public $thread_name;
    public $thread_explanation;
    public $thread_rule;
    public $created_at;
    public $created_user_id;

    /**
     * Fetch threads included in the board
     * @param string $board_id 
     * @return array Only when there is no thread: add message
     */
    public function fetchThreadInBoard($board_id) {
        $query = "SELECT
                threads.thread_id AS thread_id,
                threads.thread_name AS thread_name,
                COUNT(comments.comment_id) AS comment_count
            FROM
                t_threads threads
            LEFT JOIN
                t_comments comments
            ON
                threads.thread_id = comments.thread_id
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

        $row_count = $stmt->rowCount();
        
        $thread = array();
        $thread["data"] = array();

        if($row_count > 0) {
            $thread["data"]["item"] = $stmt->fetchAll();
        } else {
            $thread["data"]["item"] = array();
            $thread["message"] = "Not Found Thread";
        }

        return $thread;
    }

    /**
     * Fetch infomation about the thread
     * @param string $thread_id
     * @return array Returns an empty array when thread infomation fetch fails
     */
    public function fetchThreadInfo($thread_id) {
        $query = "SELECT
                threads.thread_id          AS thread_id,
                threads.thread_name        AS thread_name,
                threads.thread_explanation AS thread_explanation,
                threads.created_user_id    AS created_user_id,
                users.user_name            AS created_user_name,
                DATE_FORMAT(threads.created_at, '%Y年%m月%d日 %H時%i分%s秒') AS created_at
            FROM
                t_threads threads
            INNER JOIN
                t_users users
            ON
                threads.created_user_id = users.user_id
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
     * Get Information to create a breadcrumb list
     * @param string $thread_id
     * @return array     exist: Category and Board and Thread Information
     *               not exist: empty array
     */
    public function selectThreadBreadcrumbInfo($thread_id) {
        $query = "SELECT
                categories.category_id AS category_id,
                categories.category_name AS category_name,
                boards.board_id AS board_id,
                boards.board_name AS board_name,
                threads.thread_id AS thread_id,
                threads.thread_name AS  thread_name
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
}
