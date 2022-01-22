<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TUser
{
    public function getUserProfile($user_id) {
        $query = "SELECT
                    users.account_id     AS account_id,
                    users.user_id        AS user_id,
                    users.user_name      AS user_name,
                    details.introduction AS introduction
                FROM
                    t_users users
                INNER JOIN
                    t_user_details details
                ON
                    users.account_id = details.account_id
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

    public function updateUserProfile($account_id, $user_name, $introduction) {
        $query = "UPDATE
                    t_users        users
                INNER JOIN
                    t_user_details details
                ON
                    users.account_id     = details.account_id
                SET
                    users.user_name      = :user_name,
                    details.introduction = :introduction
                WHERE
                    users.account_id     = :account_id
        ;";

        $use_query_item = [
            "account_id"   => $account_id,
            "user_name"    => $user_name,
            "introduction" => $introduction
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    public function selectUserInformation($user_id, $mail_address) {
        $query = "SELECT
                    account_id,
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

    public function updateAtLogin($account_id) {
        $query = "UPDATE
                    t_users
                SET
                    last_login_at = CURRENT_TIMESTAMP()
                WHERE
                    account_id = :account_id
        ;";

        $use_query_item = [
            "account_id" => $account_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
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

        return $stmt->rowCount();
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

        return $stmt->rowCount();
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

        return array(
            $stmt->rowCount(),
            $database->lastId()
        );
    }

    /**
     * 
     */
    public function removeAllAutoLoginToken($account_id) {
        $query = "DELETE FROM
                    t_auto_login
                WHERE
                    created_account_id = :account_id
        ;";

        $use_query_item = [
            "account_id" => $account_id
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }

    /**
     * 
     */
    public function registrationAutoLoginToken($account_id, $auto_login_token) {
        $query = "INSERT INTO
                    t_auto_login(
                        created_account_id,
                        auto_login_token
                    ) VALUES (
                        :created_account_id,
                        :auto_login_token
                    )
        ;";

        $use_query_item = [
            "created_account_id" => $account_id,
            "auto_login_token"   => $auto_login_token
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
                    TU.daccount_id AS account_id,
                    TU.user_id     AS user_id,
                    TU.user_name   AS user_name,
                    TAL.created_at AS token_created_at
                FROM
                    t_auto_login TAL
                INNER JOIN
                    t_users      TU
                ON
                    TAL.created_account_id = TU.account_id
                WHERE
                    TAL.auto_login_token   = :auto_login_token
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
