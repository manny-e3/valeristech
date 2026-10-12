<?php
/**
 * SAFI Early Access Submission API
 * Handles registration for SAFI Early Access Program
 * Database: u913128959_early / safi_early
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Handle preflight OPTIONS request
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

// Health check / stats on GET
if ($requestMethod === 'GET') {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) AS total FROM safi_early_access");
        $count = $stmt->fetchColumn();
        echo json_encode([
            'success' => true,
            'message' => 'SAFI Early Access API is operational',
            'database' => $db_name ?? 'safi_early',
            'total_registered' => (int)$count
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error querying database: ' . $e->getMessage()
        ]);
    }
    exit;
}

// Only allow POST for submissions
if ($requestMethod !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Please use POST.'
    ]);
    exit;
}

// Read raw body (for JSON payloads)
$rawInput = file_get_contents('php://input');
$data = [];

if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $data = $decoded;
    }
}

// Merge with $_POST in case application/x-www-form-urlencoded or multipart is used
if (!empty($_POST)) {
    $data = array_merge($data, $_POST);
}

// Extract and sanitize input fields
$fullName = trim($data['fullName'] ?? $data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? $data['phoneNumber'] ?? '');
$bank = trim($data['bank'] ?? $data['userBank'] ?? $data['user_bank'] ?? '');
$source = trim($data['source'] ?? $data['referral_source'] ?? '');

// Validation
$errors = [];

if (empty($fullName)) {
    $errors['fullName'] = 'Full name is required.';
} elseif (mb_strlen($fullName) > 150) {
    $errors['fullName'] = 'Full name must be under 150 characters.';
}

if (empty($email)) {
    $errors['email'] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
} elseif (mb_strlen($email) > 191) {
    $errors['email'] = 'Email address is too long.';
}

if (!empty($phone) && mb_strlen($phone) > 50) {
    $errors['phone'] = 'Phone number must be under 50 characters.';
}

if (!empty($bank) && mb_strlen($bank) > 100) {
    $bank = mb_substr($bank, 0, 100);
}

if (!empty($source) && mb_strlen($source) > 100) {
    $source = mb_substr($source, 0, 100);
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed. Please check your details.',
        'errors' => $errors
    ]);
    exit;
}

// Client metadata
$ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
if (strpos($ipAddress, ',') !== false) {
    $ipParts = explode(',', $ipAddress);
    $ipAddress = trim($ipParts[0]);
}
$ipAddress = substr($ipAddress, 0, 45);
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Helper to ensure 'bank' column exists
function ensureBankColumn($pdo, $table) {
    try {
        $stmt = $pdo->query("SHOW COLUMNS FROM `{$table}` LIKE 'bank'");
        if (!$stmt->fetch()) {
            $pdo->exec("ALTER TABLE `{$table}` ADD COLUMN `bank` VARCHAR(100) DEFAULT NULL AFTER `phone`");
        }
    } catch (Exception $e) {
        // Silently continue if permission or already exists
    }
}

ensureBankColumn($pdo, 'safi_early_access');
ensureBankColumn($pdo, 'early_access');

try {
    // Check if email already registered
    $checkStmt = $pdo->prepare("SELECT id FROM safi_early_access WHERE email = ? LIMIT 1");
    $checkStmt->execute([$email]);
    $existing = $checkStmt->fetch();

    if ($existing) {
        // Update existing record with any updated details
        $updateStmt = $pdo->prepare("
            UPDATE safi_early_access 
            SET full_name = ?, 
                phone = COALESCE(NULLIF(?, ''), phone), 
                bank = COALESCE(NULLIF(?, ''), bank),
                source = COALESCE(NULLIF(?, ''), source),
                ip_address = ?,
                user_agent = ?,
                updated_at = NOW()
            WHERE id = ?
        ");
        $updateStmt->execute([
            $fullName,
            $phone ?: null,
            $bank ?: null,
            $source ?: null,
            $ipAddress,
            $userAgent,
            $existing['id']
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Welcome back! Your SAFI Early Access details have been updated.',
            'id' => (int)$existing['id'],
            'is_update' => true
        ]);
        exit;
    }

    // Insert new registration into safi_early_access
    $insertStmt = $pdo->prepare("
        INSERT INTO safi_early_access 
        (full_name, email, phone, bank, source, ip_address, user_agent, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())
    ");
    $insertStmt->execute([
        $fullName,
        $email,
        $phone ?: null,
        $bank ?: null,
        $source ?: null,
        $ipAddress,
        $userAgent
    ]);
    $insertId = (int)$pdo->lastInsertId();

    // Also populate early_access table for redundancy
    try {
        $insertSecondary = $pdo->prepare("
            INSERT INTO early_access 
            (full_name, email, phone, bank, source, ip_address, user_agent, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())
        ");
        $insertSecondary->execute([
            $fullName,
            $email,
            $phone ?: null,
            $bank ?: null,
            $source ?: null,
            $ipAddress,
            $userAgent
        ]);
    } catch (Exception $e) {
        // Non-blocking fallback
    }

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for joining SAFI Early Access! We will be in touch shortly.',
        'id' => $insertId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error during registration: ' . $e->getMessage()
    ]);
}
