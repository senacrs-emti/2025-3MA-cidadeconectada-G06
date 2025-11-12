<?php
include('config.php');


$data = json_decode(file_get_contents("php://input"), true);
$descricao = $data["descricao"];
$latitude = $data["latitude"];
$longitude = $data["longitude"];


$sql = "INSERT INTO pontos (descricao, latitude, longitude) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdd", $descricao, $latitude, $longitude);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => $stmt->error]);
}
?>
