<?php
/**
 * Valeris Technologies — Mail Dispatcher & Email Templates
 * Supports Hostinger Authenticated SMTP (Port 465 SSL / 587 TLS) with native fallback.
 */

/**
 * Generate the Luxury HTML Email Template for SAFI Early Access Confirmation
 * 
 * @param string $fullName Recipient full name
 * @param string $bank Preferred bank integration
 * @return string Full responsive HTML email string
 */
function getEarlyAccessEmailTemplate($fullName = 'Valued Partner', $bank = '') {
    $safeName = htmlspecialchars(trim($fullName ?: 'there'), ENT_QUOTES, 'UTF-8');
    $safeBank = !empty($bank) ? htmlspecialchars(trim($bank), ENT_QUOTES, 'UTF-8') : 'Commercial Banking';
    $currentYear = date('Y');

    return '<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank you for your interest in SAFI — Valeris Technologies</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset & Base Styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f4f1ea;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #172a22;
      line-height: 1.6;
    }
    /* Layout */
    .email-container {
      max-width: 600px;
      margin: 32px auto;
      background-color: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid #e8e3d8;
      box-shadow: 0 10px 30px rgba(6, 36, 27, 0.06);
    }
    .header-banner {
      background: linear-gradient(135deg, #041c14 0%, #06241b 100%);
      padding: 36px 40px 32px;
      text-align: left;
      border-bottom: 3px solid #c29853;
    }
    .brand-eyebrow {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #c29853;
      margin: 0 0 8px;
    }
    .brand-logo-text {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .brand-tagline {
      font-size: 13px;
      color: #9cb3a5;
      margin: 4px 0 0;
      font-weight: 400;
    }
    .content-body {
      padding: 40px 40px 32px;
    }
    .greeting-h2 {
      font-size: 20px;
      font-weight: 800;
      color: #06241b;
      margin: 0 0 16px;
      line-height: 1.3;
    }
    .primary-message {
      font-size: 16px;
      color: #2c4238;
      line-height: 1.7;
      margin: 0 0 18px;
    }
    .highlight-card {
      background-color: #faf9f6;
      border: 1.5px solid #ede7dc;
      border-radius: 14px;
      padding: 22px 24px;
      margin: 24px 0 28px;
    }
    .highlight-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #059669;
      margin: 0 0 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .meta-row {
      display: table;
      width: 100%;
      padding: 6px 0;
      border-bottom: 1px solid #f1ece1;
      font-size: 14px;
    }
    .meta-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .meta-label {
      display: table-cell;
      color: #64748b;
      font-weight: 500;
      width: 45%;
    }
    .meta-value {
      display: table-cell;
      color: #06241b;
      font-weight: 700;
      text-align: right;
    }
    .badge-active {
      display: inline-block;
      background-color: #ecfdf5;
      color: #059669;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
    }
    .closing-block {
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid #f0ede6;
    }
    .signoff-name {
      font-size: 16px;
      font-weight: 800;
      color: #06241b;
      margin: 0 0 2px;
    }
    .signoff-sub {
      font-size: 13px;
      color: #597367;
      margin: 0;
    }
    .footer-section {
      background-color: #041c14;
      padding: 28px 40px;
      text-align: center;
      color: #7a9686;
      font-size: 12px;
      line-height: 1.6;
    }
    .footer-links a {
      color: #34d399;
      text-decoration: none;
      margin: 0 8px;
      font-weight: 600;
    }
    .footer-copy {
      margin: 12px 0 0;
      color: #688273;
    }
    @media only screen and (max-width: 620px) {
      .email-container { margin: 12px !important; width: auto !important; border-radius: 12px !important; }
      .header-banner { padding: 28px 24px !important; }
      .content-body { padding: 28px 20px !important; }
      .footer-section { padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="background-color: #f4f1ea; margin: 0; padding: 0;">
  <center>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f1ea; padding: 20px 0;">
      <tr>
        <td align="center">
          <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e8e3d8; text-align: left;">
            
            <!-- Luxury Header -->
            <div class="header-banner">
              <div class="brand-eyebrow">Valeris Technologies Ltd</div>
              <h1 class="brand-logo-text">SAFI</h1>
              <p class="brand-tagline">Bank-Embedded Financial Behaviour Infrastructure</p>
            </div>

            <!-- Main Content Area -->
            <div class="content-body">
              <h2 class="greeting-h2">Hello ' . $safeName . ',</h2>

              <p class="primary-message" style="font-size: 16px; color: #172a22; font-weight: 600; line-height: 1.6; margin-bottom: 14px;">
                Thank you for your interest in SAFI!
              </p>

              <p class="primary-message" style="font-size: 15px; color: #2c4238; line-height: 1.7; margin-bottom: 20px;">
                We appreciate your interest and look forward to connecting with you. Our team will be reaching out with more updates soon.
              </p>

              <!-- Registration Record Card -->
              <div class="highlight-card">
                <div class="highlight-title">
                  <span>✓ APPLICATION RECEIVED · COHORT 1</span>
                </div>
                
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 500; border-bottom: 1px solid #f1ece1;">Preferred Bank Integration:</td>
                    <td style="padding: 6px 0; color: #06241b; font-size: 13px; font-weight: 700; text-align: right; border-bottom: 1px solid #f1ece1;">' . $safeBank . '</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 500; border-bottom: 1px solid #f1ece1;">Confidentiality (NDA):</td>
                    <td style="padding: 6px 0; text-align: right; border-bottom: 1px solid #f1ece1;"><span class="badge-active">Confirmed</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 500;">Status:</td>
                    <td style="padding: 6px 0; color: #059669; font-size: 13px; font-weight: 700; text-align: right;">Priority Waitlist</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 14px; color: #4b6358; line-height: 1.6; margin: 0 0 20px;">
                As pilot sprints roll out across participating financial institutions, you will receive invitation schedules for product demonstrations and preview deployments.
              </p>

              <!-- Closing / Sign-off requested by user -->
              <div class="closing-block">
                <div class="signoff-name">Team SAFI | Valeris Technologies</div>
                <div class="signoff-sub">Financial Technology · Digital Systems · Advisory</div>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer-section">
              <div class="footer-links">
                <a href="https://valeristechltd.com/safi" target="_blank">About SAFI</a>
                <span style="color: #4b6358;">·</span>
                <a href="https://valeristechltd.com/early-access" target="_blank">Early Access Portal</a>
                <span style="color: #4b6358;">·</span>
                <a href="https://valeristechltd.com/contact" target="_blank">Contact Us</a>
              </div>
              <p class="footer-copy">
                &copy; ' . $currentYear . ' Valeris Technologies Ltd (RC: 9571130). All rights reserved.<br>
                Lagos, Nigeria
              </p>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>';
}

/**
 * Dispatch an email via Hostinger Authenticated SMTP with SSL/TLS sockets
 */
function sendHostingerSMTP($host, $port, $username, $password, $fromEmail, $fromName, $toEmail, $replyToEmail, $subject, $bodyHtml) {
    $timeout = 15;
    $isSsl = ($port == 465);
    $socketTarget = $isSsl ? "ssl://" . $host : $host;

    $socket = @fsockopen($socketTarget, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        // Fallback to PHP native mail() if socket fails (e.g. localhost firewall)
        $nativeHeaders = "MIME-Version: 1.0\r\n";
        $nativeHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
        $nativeHeaders .= "From: {$fromName} <{$fromEmail}>\r\n";
        if (!empty($replyToEmail)) {
            $nativeHeaders .= "Reply-To: {$replyToEmail}\r\n";
        }
        @mail($toEmail, $subject, $bodyHtml, $nativeHeaders);
        return ["success" => false, "error" => "SMTP socket unavailable: $errstr ($errno) - attempted mail() fallback"];
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
    $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));

    // 3. STARTTLS if port 587
    if (!$isSsl && $port == 587) {
        $starttls = $send("STARTTLS");
        if (substr($starttls, 0, 3) !== "220") {
            fclose($socket);
            return ["success" => false, "error" => "STARTTLS failed: " . trim($starttls)];
        }
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);
        $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
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
        return ["success" => false, "error" => "Authentication failed: " . trim($passResp)];
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

/**
 * Send the SAFI Early Access confirmation email to a newly registered user
 * 
 * @param string $recipientEmail User's email
 * @param string $recipientName User's full name
 * @param string $bank Preferred bank
 * @return array ['success' => bool, 'error' => string|null]
 */
function sendEarlyAccessConfirmation($recipientEmail, $recipientName, $bank = '') {
    if (empty($recipientEmail) || !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
        return ["success" => false, "error" => "Invalid recipient email"];
    }

    // Hostinger SMTP configuration
    $smtp_host     = "smtp.hostinger.com";
    $smtp_port     = 465;
    $smtp_username = "esther.ehighelua@valeristechltd.com";
    $smtp_password = ";6:LH>XQGGn";
    $from_name     = "Team SAFI | Valeris Technologies";
    $from_email    = $smtp_username;
    $reply_to      = "info@valeristechltd.com";
    $subject       = "Thank you for your interest in SAFI!";

    $bodyHtml = getEarlyAccessEmailTemplate($recipientName, $bank);

    return sendHostingerSMTP(
        $smtp_host,
        $smtp_port,
        $smtp_username,
        $smtp_password,
        $from_email,
        $from_name,
        $recipientEmail,
        $reply_to,
        $subject,
        $bodyHtml
    );
}
