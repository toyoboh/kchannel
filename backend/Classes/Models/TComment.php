<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TComment
{
    //columns
    public $thread_id;
    public $comment_id;
    public $comment_body;
    public $created_at;
    public $created_user_id;
    public $updated_at;
    public $updated_user_id;

    /**
     * Fetch comments included in the thread
     * @param string $thread_id
     * @return array Only when there is no comments: add message
     */
    public function fetchThreadInBoard($thread_id) {
        $query ="SELECT
                comments.comment_id      AS comment_id,
                comments.comment_body    AS comment_body,
                comments.created_user_id AS created_user_id,
                users.user_name          AS created_user_name,
                DATE_FORMAT(comments.created_at, '%Y年%m月%d日 %H時%i分%s秒') AS created_at
            FROM
                t_comments comments
            INNER JOIN
                t_users users
            ON
                comments.created_user_id = users.user_id
            WHERE
                CAST(comments.thread_id AS CHAR) = :thread_id
            ORDER BY
                comments.created_at ASC
        ;";

        $use_query_item = [
            "thread_id" => $thread_id
        ];
        
        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();
        
        $comment = array();
        $comment["data"] = array();

        if($row_count > 0) {
            $comment["data"]["item"] = $stmt->fetchAll();
        } else {
            $comment["data"]["item"] = array();
            $comment["message"] = "Not Found Comment. Let's write a good comment!";
        }

        return $comment;
    }

    public function create($user_id, $thread_id, $comment_body) {
        // Response result array
        $result = array();

        // Define user id
        $created_user_id = $user_id;
        $updated_user_id = $user_id;

        //query
        $query = "INSERT INTO
                    t_comments(
                        thread_id,
                        comment_body,
                        created_user_id,
                        updated_user_id
                    )
                VALUES(
                    :thread_id,
                    :comment_body,
                    :created_user_id,
                    :updated_user_id
                )
        ;";
        $use_query_item = [
            "thread_id" => $thread_id,
            "comment_body" => $comment_body,
            "created_user_id" => $created_user_id,
            "updated_user_id" => $updated_user_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $count = $stmt->rowCount();

        if($count >= 1) {
            $result["success"] = true;
        } else {
            $result["success"] = false;
            $result["message"] = "システムエラー。正常にカテゴリーを登録することができませんでした。";
        }
        
        return $result;
    }

    public function selectNewComment($thread_id, $comment_id) {
        $query ="SELECT
                    comments.comment_id      AS comment_id,
                    comments.comment_body    AS comment_body,
                    comments.created_user_id AS created_user_id,
                    users.user_name          AS created_user_name,
                    DATE_FORMAT(comments.created_at, '%Y年%m月%d日 %H時%i分%s秒') AS created_at
                FROM
                    t_comments comments
                INNER JOIN
                    t_users users
                ON
                    comments.created_user_id = users.user_id
                WHERE
                    CAST(comments.thread_id AS CHAR) = :thread_id
                AND
                    comments.comment_id > :comment_id
                ORDER BY
                    comments.created_at ASC
        ;";
        
        $use_query_item = [
            "thread_id"  => $thread_id,
            "comment_id" => $comment_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $count  = $stmt->rowCount();
        $result = array();

        if($count >= 1) {
            $result["success"] = true;
            $result["data"]    = $stmt->fetchAll();
        } else {
            $result["success"] = false;
            $result["message"] = "最新のコメントはありません。";
        }
        
        return $result;
    }
}
