<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TAutoLogin
{
    public function register($account_id, $auto_login_token) {
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

    public function remove($auto_login_token) {
        $query = "DELETE FROM
                    t_auto_login
                WHERE
                    :auto_login_token
        ;";

        $use_query_item = [
            "auto_login_token" => $auto_login_token
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);
    }

    public function getUser($auto_login_token) {
        $query = "SELECT
                    TU.daccount_id AS account_id,
                    TU.user_id     AS user_id,
                    TU.user_name   AS user_name,
                    TU.authority   AS authority,
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
