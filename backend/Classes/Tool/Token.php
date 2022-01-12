<?php

namespace Kchannel\Classes\Tool;

class Token {
    public function getCsrfToken() {
        $token_length = 32;
        $bytes        = random_bytes($token_length);
        return bin2hex($bytes);
    }

    public function getEmailAuthToken() {
        $token_length = 16;
        $bytes        = random_bytes($token_length);
        return bin2hex($bytes);
    }

    public function autoLoginToken() {
        $token_length = 16;
        $bytes        = random_bytes($token_length);
        return bin2hex($bytes);
    }
}
