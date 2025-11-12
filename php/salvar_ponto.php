<?php
header('Content-Type: application/json');
include('config.php');

// Lê os dados enviados pelo formulário (x-www-form-urlencoded)
$descricao = $_POST['descricao'] ?? '';
$latitude = $_POST['lat'] ?? '';
$longitude = $_POST['lng'] ?? '';

// Verifica se os campos estão preenchidos
if (empty($descricao) || empty($latitude) || empty($longitude)) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados incompletos.']);
    exit;
}

// Insere no banco
$sql = "INSERT INTO pontos (descricao, latitude, longitude) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdd", $descricao, $latitude, $longitude);

if ($stmt->execute()) {
    echo json_encode(['status' => 'sucesso', 'id' => $conn->insert_id]);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => $stmt->error]);
}

?>
