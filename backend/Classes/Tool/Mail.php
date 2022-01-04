<?php

namespace Kchannel\Classes\Tool;

class Mail
{
    /**
     * @param string $to
     * @param string $subject
     * @param string $message
     * @param array  $a_headers
     * @param string $a_params
     * @return boolean
     */
    public function send($to, $subject, $message, $a_headers = [], $a_params = null) {
        mb_language("Japanese");  //言語の指定
        mb_internal_encoding("UTF-8"); //文字コードの指定
        return mb_send_mail($to, $subject, $message, $a_headers, $a_params);
    }
}
