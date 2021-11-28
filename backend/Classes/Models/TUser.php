<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TUser
{
    // columns
    public $user_id;
    public $user_name;
    public $main_address;
    public $password;
    public $password_token;
    public $auth;
    public $created_at;
    public $updated_at;
    public $last_login_at;
    public $deleted_at;

    public function getUserProfile($user_id) {
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

        $user_profile         = array();
        $user_profile["data"] = array();

        if($row_count > 0) {
            $user_profile["data"]    = $stmt->fetch();
        } else {
            $user_profile["message"] = "ユーザ情報が存在しません";
        }

        return $user_profile;
    }

    public function updateUserProfile($user_id, $user_name, $introduction) {
        $query = "UPDATE
                    t_users users
                INNER JOIN
                    t_user_details details
                ON
                    users.user_id = details.user_id
                SET
                    users.user_name = :user_name,
                    details.introduction = :introduction
                WHERE
                    users.user_id = :user_id
        ;";

        $use_query_item = [
            "user_id"      => $user_id,
            "user_name"    => $user_name,
            "introduction" => $introduction
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return true;
    }
}
