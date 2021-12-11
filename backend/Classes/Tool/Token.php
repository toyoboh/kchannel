<?php

namespace Kchannel\Classes\Tool;

class Token {
    public function getCsrfToken() {
        $token_length = 32;
        $bytes        = random_bytes($token_length);
        return bin2hex($bytes);
    }
}
