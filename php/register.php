<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = $_POST['username'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    if (!$username || !$email || !$password) {
        die("Erro: Todos os campos são obrigatórios.");
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password_hash);

    if ($stmt->execute()) {
        echo "Usuário registrado com sucesso!";
    } else {
        echo "Erro ao registrar usuário: " . $stmt->error;
    }
}
?>
