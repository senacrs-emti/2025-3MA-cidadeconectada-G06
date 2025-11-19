<?php
include("config.php");

$username = $_POST['username'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

// Evitar SQL injection (usa prepare)
$stmt = $conn->prepare("INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $senha);

$response = [];

if ($stmt->execute()) {
    header("Location: ../html/login.html");
    exit;
} else {
    echo "Erro ao registrar usuário: " . $stmt->error;
}
?>
