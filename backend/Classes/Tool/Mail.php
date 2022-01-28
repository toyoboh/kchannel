<?php

namespace Kchannel\Classes\Tool;

class Mail
{
    public function __construct() {
        mb_language("Japanese");
        mb_internal_encoding("UTF-8");
    }

    /**
     * @param string $to_mail_address
     * @param string $user_name
     * @param string $token
     * @return boolean
     */
    public function mainRegistrationGuidance($to_mail_address, $user_name, $token) {
        // Set the key used to read the setting information.
        // HACK: not cool
        $ini_file_path;
        $key;
        if($_SERVER["HTTP_HOST"] === "api.kchannel.jp") {
            $ini_file_path = __DIR__ . "/../../../../../kchannel/Info/info.ini";
            $key           = "kchannel_origin_main";
        } else {
            $ini_file_path = __DIR__ . "/../../Info/info.ini";
            $key           = "kchannel_origin_test";
        }

        // Set the origin information of the "Kちゃんねる" site
        $ini_array    = parse_ini_file($ini_file_path, true);
        $site_origin  = $ini_array[$key]["origin"];

        // Set the subject of the email
        $mail_subject = "【Kちゃんねる】ユーザ登録のご確認";

        // Set email message
        $message  = "{$user_name}様\n";
        $message .= "\n";
        $message .= "『Kちゃんねる』です。\n";
        $message .= "\n";
        $message .= "この度はユーザ登録（仮）頂きありがとうございます。\n";
        $message .= "\n";
        $message .= "※現在は仮登録の状態です。\n";
        $message .= "本会員登録を完了するには下記URLにアクセスしてください。\n";
        $message .= "\n";
        $message .= "===============================================\n";
        $message .= "▼本登録URL\n";
        $message .= "{$site_origin}/registrationCompleted/{$token}\n";
        $message .= "===============================================\n";
        $message .= "\n";
        $message .= "■お願いとご注意事項について\n";
        $message .= "===============================================\n";
        $message .= "\n";
        $message .= "上記のユーザー登録に心当たりがない場合は\n";
        $message .= "本メールを削除してください。\n";
        $message .= "※URLにアクセスしなければユーザーの本登録は完了しません。\n";
        $message .= "===============================================\n";
        $message .= "\n";
        $message .= "Kちゃんねる\n";
        $message .= "https://www.kchannel.jp/\n";

        // Set header information(from mail address)
        $headers = "From: info@kchannel.jp";

        return mb_send_mail($to_mail_address, $mail_subject, $message, $headers);
    }
}
