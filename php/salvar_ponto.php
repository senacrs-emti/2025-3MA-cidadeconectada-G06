<?php
session_start();
header('Content-Type: application/json');
include('config.php');

if (!isset($_SESSION['id'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Usuário não está logado.']);
    exit;
}

$usuario_id = $_SESSION['id'];
$descricao = $_POST['descricao'] ?? '';
$latitude = $_POST['lat'] ?? '';
$longitude = $_POST['lng'] ?? '';

if (empty($descricao) || empty($latitude) || empty($longitude)) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados incompletos.']);
    exit;
}

$sql = "INSERT INTO pontos (descricao, latitude, longitude, usuario_id)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sddi", $descricao, $latitude, $longitude, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'sucesso', 'id' => $conn->insert_id]);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => $stmt->error]);
}
?>
