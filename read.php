<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'config.php';

$data = $pdo->query("SELECT * FROM catatan ORDER BY tanggal DESC")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
