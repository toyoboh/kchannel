<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TUserDetail
{
    // columns
    public $user_id;
    public $birthday;
    public $introduction;
    public $created_at;
    public $updated_at;
    public $deleted_at;

    public function getUserDetailInformation($user_id) {
        $query = "SELECT
                    users.user_id AS user_id,
                    users.user_name AS user_name,
                    details.introduction AS introduction
                FROM
                    t_users users
                INNER JOIN
                    t_user_details details
                ON
                    users.user_id = details.user_id
                WHERE
                    users.user_id = :user_id
        ;";

        $use_query_item = [
            "user_id" => $user_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();

        $user_detail = array();
        $user_detail["data"] = array();

        if($row_count > 0) {
            $user_detail["data"] = $stmt->fetch();
        } else {
            $user_detail["message"] = "ユーザ情報が存在しません";
        }

        return $user_detail;
    }
}
