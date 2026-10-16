<?php
/**
 * Valeris Technologies Ltd — Hostinger SMTP Form Handler
 * 
 * Configured according to Hostinger SMTP specifications:
 * Host: smtp.hostinger.com
 * Port: 465 (SSL) or 587 (TLS)
 * Requires Authentication: Yes
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS Pre-flight
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($requestMethod !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

// -----------------------------------------------------------------------------
// 1. CONFIGURATION: Load Hostinger Email Account credentials
// -----------------------------------------------------------------------------
if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
} elseif (file_exists(dirname(dirname(__DIR__)) . '/api/config.local.php')) {
    require_once dirname(dirname(__DIR__)) . '/api/config.local.php';
} elseif (file_exists(dirname(__DIR__) . '/../api/config.local.php')) {
    require_once dirname(__DIR__) . '/../api/config.local.php';
}

$smtp_host     = getenv('SMTP_HOST') ?: "smtp.hostinger.com";
$smtp_port     = (int)(getenv('SMTP_PORT') ?: 465); // SSL port (use 587 for TLS)

// Read credentials securely from environment / config.local.php (do NOT commit secrets to git)
$smtp_username = getenv('SMTP_USER') ?: "";
$smtp_password = getenv('SMTP_PASS') ?: "";

// Where incoming inquiries should be delivered:
$recipient_email = getenv('CONTACT_RECIPIENT') ?: ($smtp_username ?: "info@valeristechltd.com");

if (empty($smtp_username) || empty($smtp_password)) {
    echo json_encode(["success" => false, "error" => "Mail server credentials not configured."]);
    exit;
} 

// -----------------------------------------------------------------------------
// 2. RECEIVE & SANITIZE INPUT
// -----------------------------------------------------------------------------
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid JSON payload"]);
    exit;
}

$name         = trim($data['name'] ?? '');
$email        = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$organization = trim($data['organization'] ?? 'Not specified');
$phone        = trim($data['phone'] ?? 'Not specified');
$topic        = trim($data['topic'] ?? 'General Inquiry');
$message      = trim($data['message'] ?? 'No additional details provided.');

if (empty($name) || !$email) {
    echo json_encode(["success" => false, "error" => "Name and a valid corporate email are required."]);
    exit;
}

// -----------------------------------------------------------------------------
// 3. BUILD THE NOTIFICATION EMAIL TEMPLATE
// -----------------------------------------------------------------------------
$subject = "[Valeris Portal] " . htmlspecialchars($topic) . " — " . htmlspecialchars($organization !== 'Not specified' ? $organization : $name);

$bodyHtml = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: #070e22; padding: 24px 30px; border-bottom: 3px solid #2563eb; }
    .header h2 { margin: 0; color: #ffffff; font-size: 18px; font-weight: 700; }
    .header p { margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; }
    .content { padding: 30px; }
    .field-row { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
    .field-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field-val { font-size: 15px; color: #0f172a; font-weight: 500; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .footer { background: #f8fafc; padding: 16px 30px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Valeris Technologies Ltd — New Inquiry</h2>
      <p>Received via Official Corporate Web Portal</p>
    </div>
    <div class="content">
      <div class="field-row">
        <div class="field-label">Submitter Name</div>
        <div class="field-val">' . htmlspecialchars($name) . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Organization / Institution</div>
        <div class="field-val">' . htmlspecialchars($organization) . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Corporate Email</div>
        <div class="field-val"><a href="mailto:' . htmlspecialchars($email) . '" style="color:#2563eb;">' . htmlspecialchars($email) . '</a></div>
      </div>
      <div class="field-row">
        <div class="field-label">Phone Number</div>
        <div class="field-val">' . htmlspecialchars($phone) . '</div>
      </div>
      <div class="field-row">
        <div class="field-label">Engagement Focus</div>
        <div class="field-val"><span style="background:#eff6ff;color:#2563eb;padding:3px 10px;border-radius:9999px;font-weight:700;font-size:12px;">' . htmlspecialchars($topic) . '</span></div>
      </div>
      <div class="field-row" style="border-bottom:none;">
        <div class="field-label">Project Scope / Inquiry Details</div>
        <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>
      </div>
    </div>
    <div class="footer">
      Valeris Technologies Ltd · RC: 9571130 · Lagos, Nigeria
    </div>
  </div>
</body>
</html>';

// -----------------------------------------------------------------------------
// 4. PURE PHP SMTP DISPATCHER FUNCTION (Zero External Dependencies)
// -----------------------------------------------------------------------------
function sendHostingerSMTP($host, $port, $username, $password, $fromEmail, $fromName, $toEmail, $replyToEmail, $subject, $bodyHtml) {
    $timeout = 25;
    $isSsl = ($port == 465);
    $socketTarget = $isSsl ? "ssl://" . $host : $host;

    $socket = @fsockopen($socketTarget, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        return ["success" => false, "error" => "Failed to connect to Hostinger SMTP: $errstr ($errno)"];
    }

    $read = function() use ($socket) {
        $data = "";
        while ($line = fgets($socket, 515)) {
            $data .= $line;
            if (substr($line, 3, 1) === " ") {
                break;
            }
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    // 1. Initial 220 banner
    $banner = $read();
    if (substr($banner, 0, 3) !== "220") {
        fclose($socket);
        return ["success" => false, "error" => "SMTP banner error: " . trim($banner)];
    }

    // 2. EHLO
    $hello = $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));

    // 3. STARTTLS if port 587
    if (!$isSsl && $port == 587) {
        $starttls = $send("STARTTLS");
        if (substr($starttls, 0, 3) !== "220") {
            fclose($socket);
            return ["success" => false, "error" => "STARTTLS failed: " . trim($starttls)];
        }
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);
        $hello = $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    }

    // 4. AUTH LOGIN
    $auth = $send("AUTH LOGIN");
    if (substr($auth, 0, 3) !== "334") {
        fclose($socket);
        return ["success" => false, "error" => "AUTH LOGIN command rejected: " . trim($auth)];
    }

    $userResp = $send(base64_encode($username));
    if (substr($userResp, 0, 3) !== "334") {
        fclose($socket);
        return ["success" => false, "error" => "Username rejected: " . trim($userResp)];
    }

    $passResp = $send(base64_encode($password));
    if (substr($passResp, 0, 3) !== "235") {
        fclose($socket);
        return ["success" => false, "error" => "Authentication failed. Please verify your Hostinger email password: " . trim($passResp)];
    }

    // 5. MAIL FROM
    $mailFrom = $send("MAIL FROM: <$fromEmail>");
    if (substr($mailFrom, 0, 3) !== "250") {
        fclose($socket);
        return ["success" => false, "error" => "MAIL FROM rejected: " . trim($mailFrom)];
    }

    // 6. RCPT TO
    $rcptTo = $send("RCPT TO: <$toEmail>");
    if (substr($rcptTo, 0, 3) !== "250") {
        fclose($socket);
        return ["success" => false, "error" => "RCPT TO rejected: " . trim($rcptTo)];
    }

    // 7. DATA
    $dataCmd = $send("DATA");
    if (substr($dataCmd, 0, 3) !== "354") {
        fclose($socket);
        return ["success" => false, "error" => "DATA command rejected: " . trim($dataCmd)];
    }

    // Headers
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <$fromEmail>\r\n";
    $headers .= "To: <$toEmail>\r\n";
    if (!empty($replyToEmail)) {
        $headers .= "Reply-To: <$replyToEmail>\r\n";
    }
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "Date: " . date("r") . "\r\n";

    $payload = $headers . "\r\n" . $bodyHtml . "\r\n.";
    $sendResult = $send($payload);

    $send("QUIT");
    fclose($socket);

    if (substr($sendResult, 0, 3) === "250") {
        return ["success" => true];
    } else {
        return ["success" => false, "error" => "Mail delivery failed: " . trim($sendResult)];
    }
}

// -----------------------------------------------------------------------------
// 5. DISPATCH THE EMAIL
// -----------------------------------------------------------------------------
$result = sendHostingerSMTP(
    $smtp_host,
    $smtp_port,
    $smtp_username,
    $smtp_password,
    $smtp_username,                         // From Email (must match Hostinger account)
    "Valeris Corporate Portal",             // From Name
    $recipient_email,                       // Recipient Email
    $email,                                 // Reply-To Email (so hitting reply emails the user directly)
    $subject,
    $bodyHtml
);

echo json_encode($result);
exit;
