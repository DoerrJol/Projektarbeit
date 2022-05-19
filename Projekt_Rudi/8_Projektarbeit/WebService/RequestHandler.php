<?php

require "vendor/autoload.php";
//require "IgnoreCaseMiddleware.php";
require "DenyCachingMiddleware.php";
require "ListeService.php";

$app = \Slim\Factory\AppFactory::create();
$app->addRoutingMiddleware();
$app->getRouteCollector()->setDefaultInvocationStrategy(new \Slim\Handlers\Strategies\RequestResponseArgs());
$app->setBasePath("/DoerrJol/8_Projektarbeit");
$app->addErrorMiddleware(true, true, true);

$app->get(
    "/liste/{id}",
    function ($request, $response, $liste_id){
      $ListeService = new ListeService();
      $liste = $ListeService->readListe($liste_id);
  
      if($liste=== ListeService::NOT_FOUND){
        $response = $response->withStatus(404);
        return $response;
      }
      
      unset($liste->liste_id);
      $response = $response->withHEader("Etag", $liste->version);
      unset($liste->version);
      $response->getBody()->write(json_encode($liste));
      return $response;
    }
  );