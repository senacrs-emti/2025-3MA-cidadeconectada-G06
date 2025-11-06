<?php
header("Content-Type: application/json");
include('config.php');

$sql = "SELECT * FROM pontos";
$result = $conn->query($sql);

$pontos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pontos[] = $row;
    }
}

echo json_encode($pontos);
?>
