    if ($todo->title == "") {
      $validation_messages = array();
      $validation_messages["title"] = "Der Titel ist eine Pflichtangabe. Bitte geben Sie einen Titel an.";
      $response = $response->withStatus(400);
      return $response->withJson($validation_messages);
    }