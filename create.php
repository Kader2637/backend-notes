<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("INSERT INTO catatan (judul, tanggal, deskripsi) VALUES (:judul, :tanggal, :deskripsi)");
$stmt->execute([
    ':judul' => $data['judul'],
    ':tanggal' => $data['tanggal'],
    ':deskripsi' => $data['deskripsi']
]);

echo json_encode(['status' => 'sukses']);
