<?php
require "vendor/autoload.php";
//require "IgnoreCaseMiddleware.php";
require "DenyCachingMiddleware.php";
require "TodoService.php";

$app = \Slim\Factory\AppFactory::create();
//$app->add(new DenyCachingMiddleware());
$app->addRoutingMiddleware();
$app->getRouteCollector()->setDefaultInvocationStrategy(new \Slim\Handlers\Strategies\RequestResponseArgs());
$app->setBasePath("/DoerrJol/5_WebService");
$app->addErrorMiddleware(true, true, true);

$app->get(
  "/todos/{id}",
  function ($request, $response, $id){
    $todoService = new TodoService();
    $todo = $todoService->readTodo($id);

    if($todo=== TodoService::NOT_FOUND){
      $response = $response->withStatus(404);
      return $response;
    }
    
    unset($todo->id);
    $response = $response->withHEader("Etag", $todo->version);
    unset($todo->version);
    $response->getBody()->write(json_encode($todo));
    return $response;
  }
);

$app->get(
  "/todos",
  function ($request, $response) {
    $todoService = new TodoService();
    $todos = $todoService->readTodos();

    if($todos === TodoService::DATABASE_ERROR){
      $response = $response->withStatus(500);
      return $response;
    }

    foreach($todos as $todo){
      $todo->url = "/DoerrJol/5_WebService/todos/$todo->id";
      unset($todo->id);
    }

    $response->getBody()->write(json_encode($todos));
    return $response;
  });

$app->post(
  "/todos",
  function ($request, $response){
    $body = $request->getParsedBody();
    $todo = new Todo();
    $todo->title = $body["title"];
    $todo->due_date = $body["due_date"];
    $todo->notes = $body["notes"];

    $todoService = new TodoService();
    $result = $todoService->createTodo($todo);

    if($result->status_code === TodoService::INVALID_INPUT){
      $response = $response->withStatus(400);
      $response->getBody()->write(json_encode($result->validationMessages));
      return $response;
    }

    $response = $response->withStatus(201);
    $response = $response->withHeader("Location", "DoerrJol/5_WebService/todos/$result->id");
    return $response;
  }
);

$app->delete(
  "/todos/{id}",
  function ($request, $response, $id){
    $todoService=new TodoService();
    $todoService->deleteTodo($id)  ;
    return $response;
  }
);

$app->put(
  "/todos/{id}",
  function ($request, $response, $id){
    $body = $request->getParsedBody();
    $todo = new Todo();
    $todo->id = $id;
    $todo->title = $body["title"];
    $todo->due_date = $body["due_date"];
    $todo->notes = $body["notes"];
    $todo->version = $request->getHeaderLine("If-Match");

    if ($todo->title == "") {
      $validation_messages = array();
      $validation_messages["title"] = "Der Titel ist eine Pflichtangabe. Bitte geben Sie einen Titel an.";
      $response = $response->withStatus(400);
      return $response->withJson($validation_messages);
    }

    $todoService=new TodoService();
    $result = $todoService->updateTodo($todo)  ;
    if ($result === TodoService::VERSION_OUTDATED){
      $response = $response->withStatus(412);
      return $response;
    }
    if ($result === TodoService::NOT_FOUND){
      $response = $response->withStatus(404);
      return $response;
    }

    return $response;
  }
);

$app->run();
?>