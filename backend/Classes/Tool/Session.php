<?php

namespace Kchannel\Classes\Tool;

class Session {

    /**
     * @param void
     * @return void
     */
    public function __construct() {
        if(!isset($_SESSION)) {
            session_start();
        }
        // session setting
    }

    /**
     * @param void
     * @return void
     * Change current session id
     */
    public function regenerate() {
        session_regenerate_id();
    }

    /**
     * Get the session value
     * @param string $key: The key of the session variable
     * @return mixed
     */
    public function get($key) {
        return $_SESSION[$key];
    }

    /**
     * Set the session value
     * @param string $key  : The key of the session variable
     * @param mixed  $value: The value of the session variable
     * @return void
     */
    public function set($key, $value) {
        $_SESSION[$key] = $value;
    }

    /**
     * Delete specific value of session variable
     * @param string $key: The key of the session variable
     * @return void
     */
    public function delete($key) {
        unset($_SESSION[$key]);
    }

    /**
     * Destroy
     * @param void
     * @return void
     */
    public function destroy() {
        $_SESSION = array();
        session_destroy();
    }

    /**
     * Check if they match
     * @param mixed  $item: Value to be compared
     * @param string $key : Session key
     * @return boolean
     */
    public function checkMatch($item, $key) {
        return $item === $_SESSION[$key];
    }
}
