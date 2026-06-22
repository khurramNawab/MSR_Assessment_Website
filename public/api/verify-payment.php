<?php
/**
 * API Verify Payment - Verifies Razorpay payment signature
 * MSR Assessment Pvt Ltd
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';

// Retrieve POST body
$input_raw = file_get_contents('php://input');
$input = json_decode($input_raw, true);

if (!$input) {
    echo json_encode(['error' => 'Invalid JSON input payload', 'status' => 'failed']);
    http_response_code(400);
    exit;
}

$payment_id = isset($input['razorpay_payment_id']) ? trim($input['razorpay_payment_id']) : '';
$order_id = isset($input['razorpay_order_id']) ? trim($input['razorpay_order_id']) : '';
$signature = isset($input['razorpay_signature']) ? trim($input['razorpay_signature']) : '';

if (empty($payment_id) || empty($order_id) || empty($signature)) {
    echo json_encode(['error' => 'Missing transaction ID parameters from the checkout callback.', 'status' => 'failed']);
    http_response_code(400);
    exit;
}

// Verify signature
$data = $order_id . "|" . $payment_id;
$expected_signature = hash_hmac('sha256', $data, RAZORPAY_KEY_SECRET);

if (hash_equals($expected_signature, $signature)) {
    // Signature verified! Fetch Order Details from Razorpay API for security verification
    $ch = curl_init('https://api.razorpay.com/v1/orders/' . $order_id);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    $customer_name = isset($input['name']) ? trim($input['name']) : 'Client';
    $customer_email = isset($input['email']) ? trim($input['email']) : '';
    $customer_phone = isset($input['phone']) ? trim($input['phone']) : '';
    $service = isset($input['service']) ? trim($input['service']) : 'Corporate Service';
    $amount_paid = isset($input['amount']) ? floatval($input['amount']) : 0.00;
    $payment_date = date('Y-m-d H:i:s');

    if ($curl_error) {
        // Log error or handle fallback
    }

    if ($http_code === 200 && !empty($response)) {
        $order_data = json_decode($response, true);
        if (isset($order_data['notes'])) {
            $customer_name = $order_data['notes']['customer_name'] ?? $customer_name;
            $customer_email = $order_data['notes']['customer_email'] ?? $customer_email;
            $customer_phone = $order_data['notes']['customer_phone'] ?? $customer_phone;
            $service = $order_data['notes']['service'] ?? $service;
        }
        if (isset($order_data['amount'])) {
            $amount_paid = floatval($order_data['amount']) / 100;
        }
        if (isset($order_data['created_at'])) {
            $payment_date = date('Y-m-d H:i:s', $order_data['created_at']);
        }
    }

    echo json_encode([
        'status' => 'success',
        'payment_id' => $payment_id,
        'order_id' => $order_id,
        'name' => $customer_name,
        'email' => $customer_email,
        'phone' => $customer_phone,
        'service' => $service,
        'amount' => $amount_paid,
        'date' => $payment_date
    ]);
} else {
    echo json_encode([
        'error' => 'Payment signature verification failed. The transaction payload may have been tampered.',
        'status' => 'failed'
    ]);
    http_response_code(400);
}
?>
