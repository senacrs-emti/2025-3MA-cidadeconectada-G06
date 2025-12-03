<?php
include("config.php");



$username = $_POST["username"] ?? null;
$email = $_POST["email"] ?? null;
$password = $_POST["senha"] ?? null;

if (!$username || !$email || !$password) {
    die("Erro: todos os campos são obrigatórios.");
}

$senhaHash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Erro no prepare: " . $conn->error);
}

$stmt->bind_param("sss", $username, $email, $senhaHash);

if ($stmt->execute()) {
    header("Location: ../html/index5.php");
    exit;
} else {
    die("Erro ao registrar: " . $stmt->error);
}
