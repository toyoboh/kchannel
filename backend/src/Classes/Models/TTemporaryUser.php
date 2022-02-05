<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TTemporaryUser
{
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

        return $stmt->rowCount();
    }

    /**
     * 
     */
    public function getUserInformation($token) {
        $query = "SELECT
                    user_id,
                    user_name,
                    mail_address,
                    password,
                    created_at
                FROM
                    t_temporary_users
                WHERE
                    token = :token
        ;";

        $use_query_item = [
            "token" => $token
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

        return $stmt->rowCount();
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
