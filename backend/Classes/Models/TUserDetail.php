<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TUserDetail
{
    public function initialRegistration($account_id) {
        $query = "INSERT INTO
                    t_user_details(
                        account_id,
                        introduction
                    ) VALUES (
                        :account_id,
                        :introduction
                    )
        ;";

        $use_query_item = [
            "account_id"      => $account_id,
            "introduction" => "" // default
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount();
    }
}
