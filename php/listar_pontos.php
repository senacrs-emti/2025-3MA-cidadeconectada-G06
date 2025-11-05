<?php
include('config.php');

$result = $conn->query("SELECT * FROM pontos");
$pontos = [];

while ($row = $result->fetch_assoc()) {
    $pontos[] = $row;
}

echo json_encode($pontos);
?>
