<?php
/**
 * Razorpay Payment Gateway Configuration
 * MSR Assessment Pvt Ltd
 */

// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Razorpay API Credentials
// Replace these with your actual keys from the Razorpay Dashboard (Settings > API Keys)
define('RAZORPAY_KEY_ID', 'rzp_test_gY8wzF9vJmKqLn'); 
define('RAZORPAY_KEY_SECRET', 'placeholder_secret_replace_me_with_yours');

// Company details for checkout overlay
define('COMPANY_NAME', 'MSR Assessment Pvt Ltd');
define('COMPANY_DESCRIPTION', 'Secure Corporate & Compliance Payment');
define('COMPANY_LOGO', 'msr.png');
define('CURRENCY', 'INR');
?>
