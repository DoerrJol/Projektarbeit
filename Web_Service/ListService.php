<?php

use ListService as GlobalListService;

require "Einkaufsliste.php";
require "createListResult.php";

class ListService
{
  const INVALID_INPUT = "INVALID_INPUT";
  const OK = "OK";
  const NOT_FOUND = "NOT_FOUND";
  const DATABASE_ERROR = "DATABASE_ERROR";
  const VERSION_OUTDATED = "VERSION_OUTDATED";

  public function readList($listenid)
  {
    $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
    $selectstatement =  "SELECT bezeichnung, menge FROM  einkaufszettel, produkte WHERE produkte.artikelid = einkaufszettel.artikelid
    AND einkaufszettel.listenid = $listenid";
    $result_set = $connection->query($selectstatement);
    if ($result_set->rowCount() === 0) {
      $connection = NULL;
      return ListService::NOT_FOUND;
    }
    $eklist = $result_set->fetchAll(PDO:: FETCH_CLASS,"Einkaufsliste");
    $connection = null;
    return $eklist;
  }

  public function readLists()
  {
    try {
      $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
      $selectstatement =      "SELECT listenid, titel, status, listenversion FROM allelisten order by listenid";

      $result_set = $connection->query($selectstatement);
      $eklists = $result_set->fetchAll(PDO::FETCH_CLASS, "Einkaufsliste");
      $connection = null;
      return $eklists;
    } catch (PDOException $ex) {
      $connection = NULL;
      error_log("Datenbankfehler: " . $ex->getMessage());
      return ListService::DATABASE_ERROR;
    }
  }

  public function createList($ekliste)
  {
    if ($ekliste->title === "") {
      $result = new CreateListResult();
      $result->status_code = ListService::INVALID_INPUT;
      $result->validationMessages["title"] = "Der Titel ist ungültig. Bitte geben Sie einen Titel an.";
      return $result;
    }

    $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
    $insertstatement =    "INSERT INTO todo SET " .
                          "created_date = CURDATE(), " .
                          "due_date = '$ekliste->due_date', " .
                          "title = '$ekliste->title', " .
                          "notes = '$ekliste->notes'," .
                          "version = 1";
    $connection->query($insertstatement);
    $listenid = $connection->lastInsertId();
    $connection = null;
    $result = new CreateListResult();
    $result->id = $listenid;
    $result->status_code = ListService::OK;
    return $result;
  }

  public function deleteList($listenid){
    $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
    $deleteStatement = "DELETE FROM todo WHERE id = $listenid";
    $connection->query($deleteStatement);
    $connection= null;
  }

  public function updateTodo($todo){
    $connection = new PDO("mysql:host=localhost;dbname=einkaufsliste;charset=UTF8", "root", "");
    $updateStatement = "UPDATE todo SET ".
    "title = '$todo->title', ". 
    "due_date = '$todo->due_date', ".
    "notes = '$todo->notes', ".
    "version = version + 1 ".
    "WHERE id = $todo->id AND version = $todo->version";
    
    $affected_rows = $connection->exec($updateStatement);
    

    if ($affected_rows=== 0){
      $selectstatement= "SELECT COUNT(*) FROM todo WHERE id= $todo->id";
      $result_set = $connection->query($selectstatement);
      $row = $result_set->fetch();
      $count = intval($row[0]);
      $connection= null;

      if($count === 1){
        return ListService::VERSION_OUTDATED;  

      }
      else{
        return ListService::NOT_FOUND;

      }
    }
  
  }
}
