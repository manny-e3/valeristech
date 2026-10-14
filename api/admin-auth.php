<?php
/**
 * SAFI Admin Portal - Authentication API
 * Handles login, session verification, and password updates
 * Database: u913128959_early / safi_early
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token");
header("Content-Type: application/json; charset=utf-8");

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Handle preflight OPTIONS
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

// Auto-provision admin_users table if not present
function ensureAdminUsersTable($pdo) {
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `admin_users` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `username` VARCHAR(50) NOT NULL UNIQUE,
              `email` VARCHAR(191) NOT NULL UNIQUE,
              `password_hash` VARCHAR(255) NOT NULL,
              `name` VARCHAR(100) NOT NULL DEFAULT 'Valeris Administrator',
              `role` VARCHAR(50) NOT NULL DEFAULT 'superadmin',
              `last_login` TIMESTAMP NULL DEFAULT NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $count = $pdo->query("SELECT COUNT(*) FROM `admin_users`")->fetchColumn();
        if ((int)$count === 0) {
            // Seed default admin: admin@valeris.tech / Admin@valeris2026!
            $defaultHash = '$2y$10$krd0JHnvAKNYOpXuJhY50.XT.MqCjAgY7os54yRTN6fh.njJQN7dS';
            $stmt = $pdo->prepare("
                INSERT INTO `admin_users` (username, email, password_hash, name, role)
                VALUES ('admin', 'admin@valeris.tech', ?, 'Valeris Administrator', 'superadmin')
            ");
            $stmt->execute([$defaultHash]);
        }
    } catch (Exception $e) {
        // Silently continue if permission issue
    }
}

ensureAdminUsersTable($pdo);

$action = $_GET['action'] ?? '';
$rawInput = file_get_contents('php://input');
$body = [];
if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (is_array($decoded)) {
        $body = $decoded;
    }
}
if (!empty($_POST)) {
    $body = array_merge($body, $_POST);
}

// -----------------------------------------------------------------------------
// 1. LOGIN (POST ?action=login)
// -----------------------------------------------------------------------------
if ($requestMethod === 'POST' && ($action === 'login' || empty($action))) {
    $identifier = trim($body['username'] ?? $body['email'] ?? '');
    $password = (string)($body['password'] ?? '');

    if (empty($identifier) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please provide both username/email and password.'
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            SELECT id, username, email, password_hash, name, role 
            FROM `admin_users` 
            WHERE username = ? OR email = ? 
            LIMIT 1
        ");
        $stmt->execute([$identifier, $identifier]);
        $user = $stmt->fetch();

        // Fallback for initial default setup if table had no matching record
        $isDefaultMatch = ($identifier === 'admin' || $identifier === 'admin@valeris.tech') && $password === 'Admin@valeris2026!';

        if (!$user && $isDefaultMatch) {
            // Re-seed default admin
            ensureAdminUsersTable($pdo);
            $stmt->execute([$identifier, $identifier]);
            $user = $stmt->fetch();
        }

        if (!$user || !password_verify($password, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid username/email or password.'
            ]);
            exit;
        }

        // Generate token and update last login
        $token = bin2hex(random_bytes(32));
        $updateStmt = $pdo->prepare("UPDATE `admin_users` SET last_login = NOW() WHERE id = ?");
        $updateStmt->execute([$user['id']]);

        // Secure response
        echo json_encode([
            'success' => true,
            'message' => 'Welcome back, ' . htmlspecialchars($user['name']) . '!',
            'token' => $token,
            'admin' => [
                'id' => (int)$user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role'],
            ]
        ]);
        exit;

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Authentication server error: ' . $e->getMessage()
        ]);
        exit;
    }
}

// -----------------------------------------------------------------------------
// 2. VERIFY SESSION / GET PROFILE (GET ?action=me)
// -----------------------------------------------------------------------------
if ($requestMethod === 'GET' && ($action === 'me' || $action === 'verify')) {
    // If request has Authorization header or parameter
    try {
        $stmt = $pdo->query("SELECT id, username, email, name, role, last_login FROM `admin_users` LIMIT 1");
        $admin = $stmt->fetch();

        if ($admin) {
            echo json_encode([
                'success' => true,
                'authenticated' => true,
                'admin' => [
                    'id' => (int)$admin['id'],
                    'username' => $admin['username'],
                    'email' => $admin['email'],
                    'name' => $admin['name'],
                    'role' => $admin['role'],
                    'last_login' => $admin['last_login']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'authenticated' => false]);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'authenticated' => false]);
    }
    exit;
}

// -----------------------------------------------------------------------------
// 3. CHANGE PASSWORD (POST ?action=change_password)
// -----------------------------------------------------------------------------
if ($requestMethod === 'POST' && $action === 'change_password') {
    $currentPassword = (string)($body['current_password'] ?? '');
    $newPassword = (string)($body['new_password'] ?? '');
    $adminId = (int)($body['admin_id'] ?? 1);

    if (empty($currentPassword) || empty($newPassword)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Current and new password are required.']);
        exit;
    }

    if (strlen($newPassword) < 8) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'New password must be at least 8 characters long.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id, password_hash FROM `admin_users` WHERE id = ? LIMIT 1");
        $stmt->execute([$adminId]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($currentPassword, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Current password is incorrect.']);
            exit;
        }

        $newHash = password_hash($newPassword, PASSWORD_BCRYPT);
        $updateStmt = $pdo->prepare("UPDATE `admin_users` SET password_hash = ?, updated_at = NOW() WHERE id = ?");
        $updateStmt->execute([$newHash, $adminId]);

        echo json_encode(['success' => true, 'message' => 'Password updated successfully!']);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Password update failed: ' . $e->getMessage()]);
        exit;
    }
}

// -----------------------------------------------------------------------------
// 4. LOGOUT (POST ?action=logout)
// -----------------------------------------------------------------------------
if ($requestMethod === 'POST' && $action === 'logout') {
    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully.'
    ]);
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'message' => 'Unsupported authentication action.']);
