<?php

namespace Kchannel\Classes;

class DbConnect
{
    //pdoオブジェクト
    private $pdo;

    /**
     * DB接続し、メンバ変数$pdoをセットする
     * @param void
     * @return void
     */
    public function __construct() {
        $pdo_result = $this->dbConnect();
        $this->pdo = $pdo_result;
    }

    /**
     * DB接続メソッド
     * @param void
     * @return mixed 成功時:PDOオブジェクト 失敗時:false
     */
    public function dbConnect() {
        list($dsn, $username, $password) = $this->getDbConnectInfo();

        $options = [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false
        ];
        
        try{
            return new \PDO($dsn, $username, $password, $options);
        } catch(\PDOException $e) {
            var_dump($e->getMessage());
            return false;
        }
    }

    /**
     * DB接続に使用する情報を返却する
     * @param void
     * @return array dsn情報, DBのユーザ名, DBユーザのパスワード
     */
    public function getDbConnectInfo() {
        $ini_array = parse_ini_file(__DIR__ . "/../../info.ini", true);
        $dbname    = $ini_array["kchannel_db_test"]["db_name"];
        $host      = $ini_array["kchannel_db_test"]["host"];
        $charset   = $ini_array["kchannel_db_test"]["charset"];

        $dsn      = "mysql:dbname={$dbname};host={$host};charset={$charset}";
        $username  = $ini_array["kchannel_db_test"]["username"];
        $password  = $ini_array["kchannel_db_test"]["password"];

        return array($dsn, $username, $password);
    }

    /**
     * メンバ変数$pdoのgetter
     * @param void
     * @return object pdoオブジェクト
     */
    public function getPdo() {
        return $this->pdo;
    }
}
