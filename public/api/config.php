<?php
/**
 * Razorpay Payment Gateway Configuration
 * MSR Assessment Pvt Ltd
 */

// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Load .env variables
// Check both the source repository root (../../.env) and the exported root (../.env)
$env_paths = [
    __DIR__ . '/../../.env',
    __DIR__ . '/../.env'
];
foreach ($env_paths as $env_path) {
    if (file_exists($env_path)) {
        $lines = file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim(trim($value), '"\''); // Remove surrounding quotes if any
                if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                    putenv(sprintf('%s=%s', $name, $value));
                    $_ENV[$name] = $value;
                    $_SERVER[$name] = $value;
                }
            }
        }
        break; // Stop after loading the first found .env file
    }
}

// Razorpay API Credentials
// Try to get from environment first, then fallback
$key_id = getenv('RAZORPAY_KEY_ID') ?: 'rzp_test_gY8wzF9vJmKqLn';
$key_secret = getenv('RAZORPAY_KEY_SECRET') ?: 'placeholder_secret_replace_me_with_yours';

define('RAZORPAY_KEY_ID', $key_id); 
define('RAZORPAY_KEY_SECRET', $key_secret);

// Company details for checkout overlay
define('COMPANY_NAME', 'MSR Assessment Pvt Ltd');
define('COMPANY_DESCRIPTION', 'Secure Corporate & Compliance Payment');
define('COMPANY_LOGO', 'msr.png');
define('CURRENCY', 'INR');
?>
