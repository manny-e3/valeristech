<?php
/**
 * Example Credentials Template
 * Copy this file to config.local.php and fill in your actual credentials.
 */

// Database Credentials
putenv('DB_HOST=localhost');
putenv('DB_PORT=3306');
putenv('DB_NAME=your_db_name');
putenv('DB_USER=your_db_user');
putenv('DB_PASS=your_db_password');

// Hostinger SMTP Credentials
putenv('SMTP_HOST=smtp.hostinger.com');
putenv('SMTP_PORT=465');
putenv('SMTP_USER=your_email@domain.com');
putenv('SMTP_PASS=your_email_password');
putenv('CONTACT_RECIPIENT=inquiries@domain.com');
