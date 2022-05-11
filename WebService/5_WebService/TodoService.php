<?php
require "Todo.php";
require "createTodoResult.php";

class TodoService
{
  const INVALID_INPUT = "INVALID_INPUT";
  const OK = "OK";
  const NOT_FOUND = "NOT_FOUND";
  const DATABASE_ERROR = "DATABASE_ERROR";
  const VERSION_OUTDATED = "VERSION_OUTDATED";

  public function readTodo($id)
  {
    $connection = new PDO("mysql:host=localhost;dbname=todolist;charset=UTF8", "root", "");
    $selectstatement =  "SELECT id, due_date <= CURDATE() as due, created_date, due_date, author, title, notes, version " .
      "FROM todo " .
      "WHERE id = $id";
    $result_set = $connection->query($selectstatement);
    if ($result_set->rowCount() === 0) {
      $connection = NULL;
      return TodoService::NOT_FOUND;
    }
    $todo = $result_set->fetchObject("Todo");
    $connection = null;
    return $todo;
  }

  public function readTodos()
  {
    try {
      $connection = new PDO("mysql:host=localhost;dbname=todolist;charset=UTF8", "root", "");
      $selectstatement =      "SELECT id, due_date <= CURDATE() as due, due_date, author, title, version " .
        "FROM todo " .
        "ORDER BY due_date";
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

  public function createTodo($todo)
  {
    if ($todo->title === "") {
      $result = new CreateTodoResult();
      $result->status_code = TodoService::INVALID_INPUT;
      $result->validationMessages["title"] = "Der Titel ist ungültig. Bitte geben Sie einen Titel an.";
      return $result;
    }

    $connection = new PDO("mysql:host=localhost;dbname=todolist;charset=UTF8", "root", "");
    $insertstatement =    "INSERT INTO todo SET " .
                          "created_date = CURDATE(), " .
                          "due_date = '$todo->due_date', " .
                          "title = '$todo->title', " .
                          "notes = '$todo->notes'," .
                          "version = 1";
    $connection->query($insertstatement);
    $id = $connection->lastInsertId();
    $connection = null;
    $result = new CreateTodoResult();
    $result->id = $id;
    $result->status_code = TodoService::OK;
    return $result;
  }

  public function deleteTodo($id){
    $connection = new PDO("mysql:host=localhost;dbname=todolist;charset=UTF8", "root", "");
    $deleteStatement = "DELETE FROM todo WHERE id = $id";
    $connection->query($deleteStatement);
    $connection= null;
  }

  public function updateTodo($todo){
    $connection = new PDO("mysql:host=localhost;dbname=todolist;charset=UTF8", "root", "");
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
        return TodoService::VERSION_OUTDATED;  

      }
      else{
        return TodoService::NOT_FOUND;

      }
    }
  
  }
}
