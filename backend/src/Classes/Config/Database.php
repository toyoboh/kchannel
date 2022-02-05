<?php

namespace Kchannel\Classes\Config;

class Database
{
    // pdo object
    private $pdo;

    /**
     * Connect to the DB and set the pdo
     * @param void
     * @return void
     */
    public function connect() {
        list($dsn, $username, $password) = $this->getDatabaseInfo();

        $options = [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false
        ];
        
        try{
            $this->pdo = new \PDO($dsn, $username, $password, $options);
        } catch(\PDOException $e) {
            var_dump($e->getMessage());
            $this->pdo = false;
        }
    }

    /**
     * Get the information needed form a DB connection
     * @param void
     * @return array DSN info, DB username, DB user password
     */
    public function getDatabaseInfo() {
        $key;
        $info_file_path;
        if($_SERVER["HTTP_HOST"] === "api.kchannel.jp") {
            $key = "kchannel_db_main";
            $info_file_path = __DIR__ . "/../../../../../kchannel/Info/info.ini";
        } else {
            $key = "kchannel_db_test";
            $info_file_path = __DIR__ . "/../../Info/info.ini";
        }

        $ini_array = parse_ini_file($info_file_path, true);
        $dbname    = $ini_array[$key]["db_name"];
        $host      = $ini_array[$key]["host"];
        $port      = $ini_array[$key]["port"];
        $charset   = $ini_array[$key]["charset"];

        $dsn      = "mysql:dbname={$dbname};host={$host};port={$port};charset={$charset}";
        $username  = $ini_array[$key]["username"];
        $password  = $ini_array[$key]["password"];

        return array($dsn, $username, $password);
    }

    /**
     * execute query
     * @param string $query
     * @param array $arr Array for the injection measures
     * @return object statement after query executed
     */
    public function executeQuery($query, $arr = null) {
        if(is_null($arr)) {
            $stmt = $this->pdo->query($query);
        } else {
            $stmt = $this->pdo->prepare($query);
            foreach($arr as $key => $value) {
                $stmt->bindValue(":{$key}", $value);
            }
            $stmt->execute();
        }
        return $stmt;
    }

    /**
     * return last insert id
     */
    public function lastId() {
        return $this->pdo->lastInsertId();
    }
}
