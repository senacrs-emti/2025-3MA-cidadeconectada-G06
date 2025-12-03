<?php
$host = "127.0.0.1:3307";
$user = "root";
$pass = "";
$dbname = "incluipoa";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>