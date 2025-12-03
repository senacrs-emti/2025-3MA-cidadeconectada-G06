<?php
include("config.php");

$username = $_POST['username'];
$email = $_POST['email'];
$senha = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Evitar SQL injection
$stmt = $conn->prepare("INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $senha);

if ($stmt->execute()) {
    header("Location: ../html/index5.html"); // ir para login
    exit;
} else {
    echo "Erro ao registrar usuário: " . $stmt->error;
}
?>
