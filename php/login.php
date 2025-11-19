<?php
session_start();
include("config.php");

$login = $_POST['login'];
$senha = $_POST['senha'];

// Pode logar usando username **ou** email
$stmt = $conn->prepare("SELECT id, senha FROM usuarios WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $login, $login);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $senhaHash);
    $stmt->fetch();

    if (password_verify($senha, $senhaHash)) {
        $_SESSION['usuario_id'] = $id;

        header("Location: ../html/index.html");
        exit;
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}
?>
