<?php
/**
 * Database Connection for SAFI Early Access API
 * Database: u913128959_early (or local safi_early fallback)
 */

$db_host = getenv('DB_HOST') ?: 'localhost';
$db_port = getenv('DB_PORT') ?: '3306';
$db_name = getenv('DB_NAME') ?: 'u913128959_early';
$db_user = getenv('DB_USER') ?: 'u913128959_early';
$db_pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '$nU1PU5&+';

$dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    // Fallback for local development if remote user is not present on localhost MySQL
    try {
        $localDsn = "mysql:host=localhost;port=3306;dbname=safi_early;charset=utf8mb4";
        $pdo = new PDO($localDsn, 'root', '', $options);
    } catch (PDOException $e2) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed: ' . $e->getMessage()
        ]);
        exit;
    }
}
