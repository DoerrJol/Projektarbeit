<?php
require "vendor/autoload.php";
//require "IgnoreCaseMiddleware.php";
require "DenyCachingMiddleware.php";
require "ListService.php";

$app = \Slim\Factory\AppFactory::create();
//$app->add(new DenyCachingMiddleware());
$app->addRoutingMiddleware();
$app->getRouteCollector()->setDefaultInvocationStrategy(new \Slim\Handlers\Strategies\RequestResponseArgs());
$app->setBasePath("/Projektarbeit/Web_Service");
$app->addErrorMiddleware(true, true, true);


$app->get(
  "/listen",
  function ($request, $response) {
    $listService = new ListService();
    $eklists = $listService->readLists();

    if($eklists === ListService::DATABASE_ERROR){
      $response = $response->withStatus(500);
      return $response;
    }

    foreach($eklists as $eklist){
      $eklist->url = "/Projektarbeit/Web_Service/listen/$eklist->listenid";
      unset($eklist->listenid);
    }

    $response->getBody()->write(json_encode($eklists));
    return $response;
  });

$app->get(
  "/listen/{listenid}",
  function ($request, $response, $listenid){
    $listService = new ListService();
    $eklist = $listService->readList($listenid);

    if($eklist=== ListService::NOT_FOUND){
      $response = $response->withStatus(404);
      return $response;
    }

//    $response = $response->withHEader("Etag", $eklist->version);
    $response->getBody()->write(json_encode($eklist));
    return $response;
  }
);

$app->post(
  "/listen",
  function ($request, $response){
    $body = $request->getParsedBody();
    $einkaufsliste = new Einkaufsliste();
    $einkaufsliste->title = $body["titel"];

    $listService = new ListService();
    $result = $listService->createTodo($einkaufsliste);

    if($result->status_code === ListService::INVALID_INPUT){
      $response = $response->withStatus(400);
      $response->getBody()->write(json_encode($result->validationMessages));
      return $response;
    }

    $response = $response->withStatus(201);
    $response = $response->withHeader("Location", "Projektarbeit/Web_Service/todos/$result->id");
    return $response;
  }
);

$app->delete(
  "/todos/{id}",
  function ($request, $response, $id){
    $todoService=new ListService();
    $todoService->deleteTodo($id)  ;
    return $response;
  }
);

$app->put(
  "/todos/{id}",
  function ($request, $response, $id){
    $body = $request->getParsedBody();
    $todo = new Einkaufsliste();
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

    $todoService=new ListService();
    $result = $todoService->updateTodo($todo)  ;
    if ($result === ListService::VERSION_OUTDATED){
      $response = $response->withStatus(412);
      return $response;
    }
    if ($result === ListService::NOT_FOUND){
      $response = $response->withStatus(404);
      return $response;
    }

    return $response;
  }
);

$app->run();
?>