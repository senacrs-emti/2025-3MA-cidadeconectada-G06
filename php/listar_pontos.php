<?php
session_start();
header("Content-Type: application/json");
include('config.php');

if (!isset($_SESSION['id'])) {
    echo json_encode([]);
    exit;
}

$usuario_id = $_SESSION['id'];

$sql = "SELECT p.id, p.latitude, p.longitude, p.descricao, u.username
        FROM pontos p
        JOIN usuarios u ON u.id = p.usuario_id
        WHERE p.usuario_id = ?";

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
