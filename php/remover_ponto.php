<?php
header('Content-Type: application/json');
include('config.php');

// Verifica se o ID foi enviado
if (!isset($_POST['id'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID não informado.']);
    exit;
}

$id = intval($_POST['id']);

// Deleta o ponto do banco
$sql = "DELETE FROM pontos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'sucesso']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => $stmt->error]);
}
?>
