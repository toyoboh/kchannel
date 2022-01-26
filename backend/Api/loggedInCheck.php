<?php

require __DIR__ . "/../Info/settingHeader.php";
require __DIR__ . "/../../vendor/autoload.php";

use Kchannel\Classes\Tool\Cookie;
use Kchannel\Classes\Tool\Session;
use Kchannel\Classes\Tool\Token;
use Kchannel\Classes\Models\TUser;
use Kchannel\Classes\Models\TAutoLogin;

if($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

$session = new Session();

// セッション情報もクッキー情報もない人、何もせずに終了（オートログイン機能をしようしない人）
if(!$session->checkExists("account_id") && !isset($_COOKIE["auto_login_token"])) {
    $res_result["success"] = false;
    echo json_encode($res_result);
    exit;
}

// セッション情報はあるがクッキー情報がない人、セッションIDを再発行して、ユーザ情報を返して終了（オートログイン機能を使用しない人）
if($session->checkExists("account_id") && !isset($_COOKIE["auto_login_token"])) {
    //session id再発行
    $session->regenerate();

    // get session data
    $account_id = $session->get("account_id");
    $user_id    = $session->get("user_id");
    $user_name  = $session->get("user_name");

    // response data
    $res_result["success"]            = true;
    $res_result["data"]["account_id"] = $account_id;
    $res_result["data"]["user_id"]    = $user_id;
    $res_result["data"]["user_name"]  = $user_name;
    
    // update last login date at time.
    $t_user = new TUser();
    $t_user->updateAtLogin($account_id);

    // returns
    echo json_encode($res_result);
    exit;
}

// セッション情報もクッキー情報もある人、セッションIDを再発行、DBのトークン削除、新規トークンを登録（DBとcookie）、ユーザ情報を返して終了（オートログイン使用する人）
if($session->checkExists("account_id") && isset($_COOKIE["auto_login_token"])) {
    // session id再発行
    $session->regenerate();

    // get user information
    $account_id = $session->get("account_id");
    $user_id    = $session->get("user_id");
    $user_name  = $session->get("user_name");

    // update last login date at time.
    $t_user = new TUser();
    $t_user->updateAtLogin($account_id);

    // DBのトークン削除
    $old_auto_login_token = $_COOKIE["auto_login_token"];
    $t_auto_login         = new TAutoLogin();
    $t_auto_login->remove($old_auto_login_token);

    // 新しいトークンの作成
    $t_token              = new Token();
    $new_auto_login_token = $t_token->autoLoginToken();

    // DBへの新規トークン登録
    $insert_count = $t_auto_login->register($account_id, $new_auto_login_token);

    // Cookieへの新規トークン登録
    if($insert_count > 0) {
        $t_cookie = new Cookie();
        $t_cookie->registrationAutoLoginToken($new_auto_login_token);
    }
    
    // response data
    $res_result["success"]            = true;
    $res_result["data"]["account_id"] = $account_id;
    $res_result["data"]["user_id"]    = $user_id;
    $res_result["data"]["user_name"]  = $user_name;

    // returns
    echo json_encode($res_result);
    exit;
}

// セッション情報はないがクッキー情報はある人、
// セッション情報がある時点で直近でログインしたと思われるので、クッキーの期限確認は不要
// 上記はまちがい！！！端末の時間設定がおかしい可能性もあるので、DBのcreate_atを見る必要がある
if(!$session->checkExists("account_id") && isset($_COOKIE["auto_login_token"])) {
    // get auto_login_token of the cookie
    $old_auto_login_token = $_COOKIE["auto_login_token"];

    // Get information about users that match the token
    $t_auto_login              = new TAutoLogin();
    list($select_count, $user) = $t_auto_login->getUser($old_auto_login_token);

    // Exit if there is no acquisition information
    if($select_count <= 0) {
        $res_result["success"] = false;
        echo json_encode($res_result);
        exit;
    }

    // Remove old token
    $t_auto_login->remove($old_auto_login_token);

    // set user information
    $account_id       = $user["account_id"];
    $user_id          = $user["user_id"];
    $user_name        = $user["user_name"];
    $token_created_at = $user["token_created_at"];

    // expiry of the auto login token
    $token_created_datetime = new DateTime($token_created_at);
    $token_expiry           = $token_created_datetime->modify("+14 days");

    $now_datetime           = new DateTime();

    // Exit if it is outside the expiration.
    if($token_expiry < $now_datetime) {
        $res_result["success"] = false;
        echo json_encode($res_result);
        exit;
    }

    // update last login date at time.
    $t_user = new TUser();
    $t_user->updateAtLogin($account_id);
    
    // 新しいトークンの作成
    $t_token              = new Token();
    $new_auto_login_token = $t_token->autoLoginToken();
    
    // DBへの新規トークン登録
    $insert_count = $t_auto_login->register($account_id, $new_auto_login_token);
    
    // Cookieへの新規トークン登録
    if($insert_count > 0) {
        $t_cookie = new Cookie();
        $t_cookie->registrationAutoLoginToken($new_auto_login_token);
    }
    
    // set session
    $session->regenerate();
    $session->set("account_id", $account_id);
    $session->set("user_id", $user_id);
    $session->set("user_name", $user_name);
    
    // formatting response data
    $res_result["success"]            = true;
    $res_result["data"]["account_id"] = $account_id;
    $res_result["data"]["user_id"]    = $user_id;
    $res_result["data"]["user_name"]  = $user_name;

    // returns
    echo json_encode($res_result);
    exit;
}
