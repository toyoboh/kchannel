<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TTemporaryUser
{
    // columns
    public $user_id;
    public $user_name;
    public $main_address;
    public $password;
    public $token;
    public $created_at;
    public $updated_at;

    /**
     * Check if the user_id is used.
     * @param string $user_id
     * @return boolean
     */
    public function checkUserIdExists($user_id) {
        $query = "SELECT
                    user_id
                FROM
                    t_temporary_users
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
     * 
     */
    public function getUserInformation($token) {
        $query = "SELECT
                    user_id,
                    user_name,
                    mail_address,
                    password
                FROM
                    t_temporary_users
                WHERE
                    token = :token
                AND
                    created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
        ;";

        $use_query_item = [
            "token" => $token
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->fetch();
    }

    /**
     * Register new Account
     * @param string $user_id
     * @param string $user_name
     * @param string $mail_address
     * @param string $hash_password
     * @param string $token
     * @return boolean
     */
    public function register($user_id, $user_name, $mail_address, $hash_password, $token) {
        $query = "INSERT INTO
                    t_temporary_users(
                        user_id,
                        user_name,
                        mail_address,
                        password,
                        token
                    ) VALUES(
                        :user_id,
                        :user_name,
                        :mail_address,
                        :password,
                        :token
                    )
        ;";

        $use_query_item = [
            "user_id" => $user_id,
            "user_name" => $user_name,
            "mail_address" => $mail_address,
            "password" => $hash_password,
            "token" => $token
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount() > 0;
    }

    /**
     * delete record
     */
    public function deleteRecordWithMatchMailAddress($mail_address) {
        $query = "DELETE FROM
                    t_temporary_users
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
}
