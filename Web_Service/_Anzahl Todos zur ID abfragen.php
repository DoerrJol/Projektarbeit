$select_statement = "SELECT COUNT(*) FROM todo WHERE id = $todo->id";
$result_set = $connection->query($select_statement);
$row = $result_set->fetch();
$count = intval($row[0]);