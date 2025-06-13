<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$id = $_GET['id'] ?? null;
if ($id) {
    $stmt = $pdo->prepare("DELETE FROM catatan WHERE id = :id");
    $stmt->execute([':id' => $id]);
    echo json_encode(['status' => 'dihapus']);
} else {
    echo json_encode(['status' => 'gagal']);
}
