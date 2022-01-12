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

        return array(
            $stmt->rowCount(),
            $stmt->fetch()
        );
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

        $row_count = $stmt->rowCount();

        $result = array();
        if($row_count >= 1) {
            $result["success"] = true;
        } else {
            $result["success"] = false;
            $result["message"] = "変更箇所がないため更新されませんでした。もしくはシステムエラー。";
        }

        return $result;
    }

    public function selectUserInformation($user_id, $mail_address) {
        $query = "SELECT
                    user_id,
                    user_name,
                    password
                FROM
                    t_users
                WHERE
                    user_id      = :user_id
                OR
                    mail_address = :mail_address
        ;";

        $use_query_item = [
            "user_id" => $user_id,
            "mail_address" => $mail_address
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return array(
            $stmt->rowCount(),
            $stmt->fetch()
        );
    }

    public function updateAtLogin($user_id) {
        $query = "UPDATE
                    t_users
                SET
                    last_login_at = CURRENT_TIMESTAMP()
                WHERE
                    user_id = :user_id
        ;";

        $use_query_item = [
            "user_id" => $user_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        $row_count = $stmt->rowCount();

        if($row_count >= 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check if the user_id is used.
     * @param string $user_id
     * @return boolean
     */
    public function checkUserIdExists($user_id) {
        $query = "SELECT
                    user_id
                FROM
                    t_users
                WHERE
                    user_id = :user_id
        ;";

        $use_query_item = [
            "user_id" => $user_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount() > 0;
    }

    /**
     * Check if the mail_address is used.
     * @param string $mail_address
     * @return boolean
     */
    public function checkMailAddressExists($mail_address) {
        $query = "SELECT
                    mail_address
                FROM
                    t_users
                WHERE
                    mail_address = :mail_address
        ;";

        $use_query_item = [
            "mail_address" => $mail_address
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount() > 0;
    }

    /**
     * Register new Account
     * @param string $user_id
     * @param string $user_name
     * @param string $mail_address
     * @param string $hash_password
     * @return boolean
     */
    public function register($user_id, $user_name, $mail_address, $hash_password, $auth) {
        $query = "INSERT INTO
                    t_users(
                        user_id,
                        user_name,
                        mail_address,
                        password,
                        auth
                    ) VALUES(
                        :user_id,
                        :user_name,
                        :mail_address,
                        :password,
                        :auth
                    )
        ;";

        $use_query_item = [
            "user_id"      => $user_id,
            "user_name"    => $user_name,
            "mail_address" => $mail_address,
            "password"     => $hash_password,
            "auth"         => $auth
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount() > 0;
    }

    /**
     * 
     */
    public function removeAllAutoLoginToken($user_id) {
        $query = "DELETE FROM
                    t_auto_login
                WHERE
                    user_id = :user_id
        ;";

        $use_query_item = [
            "user_id" => $user_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    /**
     * 
     */
    public function registrationAutoLoginToken($user_id, $auto_login_token) {
        $query = "INSERT INTO
                    t_auto_login(
                        user_id,
                        auto_login_token
                    ) VALUES (
                        :user_id,
                        :auto_login_token
                    )
        ;";

        $use_query_item = [
            "user_id" => $user_id,
            "auto_login_token" => $auto_login_token
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    /**
     * 
     */
    public function selectAutoLoginUserInformation($auto_login_token) {
        $query = "SELECT
                    TU.user_id     AS user_id,
                    TU.user_name   AS user_name,
                    TAL.created_at AS token_created_at
                FROM
                    t_auto_login TAL
                INNER JOIN
                    t_users      TU
                ON
                    TAL.user_id = TU.user_id
                WHERE
                    TAL.auto_login_token = :auto_login_token
                ORDER BY
                    TAL.created_at DESC
                LIMIT
                    1
        ;";

        $use_query_item = [
            "auto_login_token" => $auto_login_token
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return array(
            $stmt->rowCount(),
            $stmt->fetch()
        );
    }
}
