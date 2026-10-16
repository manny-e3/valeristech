<?php
/**
 * Safe Environment Loader
 * Automatically parses .env files and loads them into getenv(), $_ENV, and $_SERVER.
 * Also supports fallback to config.local.php if present.
 */

if (!function_exists('loadValerisEnv')) {
    function loadValerisEnv() {
        static $loaded = false;
        if ($loaded) return;
        $loaded = true;

        $projectRoot = dirname(__DIR__);

        // Candidate locations for .env
        $envFiles = [
            $projectRoot . '/.env',
            __DIR__ . '/.env',
            $projectRoot . '/public/api/.env',
        ];

        foreach ($envFiles as $envFile) {
            if (file_exists($envFile) && is_readable($envFile)) {
                $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                if (is_array($lines)) {
                    foreach ($lines as $line) {
                        $line = trim($line);
                        // Skip empty lines and comments
                        if ($line === '' || substr($line, 0, 1) === '#') {
                            continue;
                        }
                        if (strpos($line, '=') !== false) {
                            list($key, $val) = explode('=', $line, 2);
                            $key = trim($key);
                            $val = trim($val);
                            
                            // Remove surrounding quotes if present
                            $len = strlen($val);
                            if ($len >= 2) {
                                $firstChar = $val[0];
                                $lastChar = $val[$len - 1];
                                if (($firstChar === '"' && $lastChar === '"') || ($firstChar === "'" && $lastChar === "'")) {
                                    $val = substr($val, 1, -1);
                                }
                            }
                            
                            putenv("{$key}={$val}");
                            $_ENV[$key] = $val;
                            $_SERVER[$key] = $val;
                        }
                    }
                }
                break; // Stop after finding the first valid .env
            }
        }

        // Secondary fallback to config.local.php if .env was not found or for legacy setups
        $legacyConfigs = [
            __DIR__ . '/config.local.php',
            $projectRoot . '/api/config.local.php',
            $projectRoot . '/config.local.php',
        ];
        foreach ($legacyConfigs as $cfg) {
            if (file_exists($cfg)) {
                require_once $cfg;
                break;
            }
        }
    }
}

loadValerisEnv();
