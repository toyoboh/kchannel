<?php

namespace Kchannel\Classes\Models;

use Kchannel\Classes\Config\Database;

class TUserDetail
{
    public function initialRegistration($user_id) {
        $query = "INSERT INTO
                    t_user_details(
                        user_id,
                        introduction
                    ) VALUES (
                        :user_id,
                        :introduction
                    )
        ;";

        $use_query_item = [
            "user_id"      => $user_id,
            "introduction" => "" // default
        ];

        $database = new Database();
        $database->connect();
        $stmt = $database->executeQuery($query, $use_query_item);

        return $stmt->rowCount() > 0;
    }
}
