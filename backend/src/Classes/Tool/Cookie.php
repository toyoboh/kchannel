<?php

namespace Kchannel\Classes\Tool;

class Cookie
{
    public function construct() {
        // initial setting
    }

    /**
     * Saving tokens for use with automatic login systems.
     * @param string $auto_login_token
     */
    public function registrationAutoLoginToken($auto_login_token) {
        if($_SERVER["REQUEST_SCHEME"] === "HTTPS") {
            return setcookie("auto_login_token", $auto_login_token, time()+60*60*24*14, "/", null, true, true);
        } else {
            return setcookie("auto_login_token", $auto_login_token, time()+60*60*24*14, "/", null, false, true);
        }
    }
    
    /**
     * remove
     */
    public function remove($key) {
        if($_SERVER["REQUEST_SCHEME"] === "HTTPS") {
            return setCookie($key, "", -1, "/", null, true, true);
        } else {
            return setCookie($key, "", -1, "/", null, false, true);
        }
    }
}
