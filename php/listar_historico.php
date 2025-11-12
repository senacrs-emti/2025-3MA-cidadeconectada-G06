<?php
header("Content-Type: application/json; charset=UTF-8");
include('config.php');

$sql = "SELECT id, descricao, latitude, longitude FROM pontos ORDER BY id DESC";
$result = $conn->query($sql);

$pontos = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pontos[] = $row;
    }
}

echo json_encode($pontos, JSON_UNESCAPED_UNICODE);
?>
