<?php
session_start(); // <-- ADICIONE ISSO NO TOPO

include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (empty($_POST['email']) || empty($_POST['senha'])) {
        die("Preencha todos os campos.");
    }

    $email = $_POST['email'];
    $senhaDigitada = $_POST['senha'];
    $username = $_POST["username"] ?? null;

    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $usuario = $result->fetch_assoc();

        if (password_verify($senhaDigitada, $usuario["senha"])) {

    $_SESSION['user_id'] = $usuario['id'];
    $_SESSION['username'] = $usuario['username'];
    $_SESSION['user_email'] = $usuario['email'];

    header("Location: ../html/index.php");
    exit();



        } else {
            echo "Senha incorreta!";
        }

    } else {
        echo "Usuário não encontrado!";
    }
}
?>
