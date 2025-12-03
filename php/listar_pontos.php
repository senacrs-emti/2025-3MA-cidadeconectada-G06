<?php
session_start();
header("Content-Type: application/json");
include('config.php');

if (!isset($_SESSION['id'])) {
    echo json_encode([]);
    exit;
}

$usuario_id = $_SESSION['id'];

$sql = "SELECT * FROM pontos WHERE usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();

$result = $stmt->get_result();
$pontos = [];

while ($row = $result->fetch_assoc()) {
    $pontos[] = $row;
}

echo json_encode($pontos);
?>
