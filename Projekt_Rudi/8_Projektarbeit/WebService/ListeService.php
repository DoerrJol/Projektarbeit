<?php
require "Liste.php";

class ListeService
{
    const INVALID_INPUT = "INVALID_INPUT";
    const OK = "OK";
    const NOT_FOUND = "NOT_FOUND";
    const DATABASE_ERROR = "DATABASE_ERROR";
    const VERSION_OUTDATED = "VERSION_OUTDATED";


    public function readListe($liste_id)
    {
        $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
        $selectstatement = "SELECT liste_id, angelegt_am, name, version FROM liste " .
            "WHERE liste_id=$liste_id";
        $result_set = $connection->query($selectstatement);
        if ($result_set->rowCount() === 0) {
            $connection = NULL;
            return ListeService::NOT_FOUND;
        }
        $liste = $result_set->fetchObject("Liste");
        $connection = null;
        return $liste;
    }

    public function readListen()
    {
        try{
        $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
        $selectstatement = "SELECT liste_id, angelegt_am, name, version FROM liste " .
            "ORDER BY angelegt_am";
            $result_set = $connection->query($selectstatement);
            $todos = $result_set->fetchAll(PDO::FETCH_CLASS, "Todo");
            $connection = null;
            return $todos;
          } catch (PDOException $ex) {
            $connection = NULL;
            error_log("Datenbankfehler: " . $ex->getMessage());
            return TodoService::DATABASE_ERROR;
          }

    }
}
