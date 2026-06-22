<?php
/**
 * API Create Order - Generates Razorpay Order ID
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
    echo json_encode(['error' => 'Invalid JSON input payload']);
    http_response_code(400);
    exit;
}

$customer_name = isset($input['name']) ? trim($input['name']) : '';
$customer_email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL) : '';
$customer_phone = isset($input['phone']) ? trim($input['phone']) : '';
$service = isset($input['service']) ? trim($input['service']) : '';
$amount_input = isset($input['amount']) ? $input['amount'] : '';

// Validation
if (empty($customer_name) || empty($customer_email) || empty($customer_phone) || empty($service) || empty($amount_input)) {
    echo json_encode(['error' => 'All fields are required. Please fill in all fields.']);
    http_response_code(400);
    exit;
}

if (!$customer_email) {
    echo json_encode(['error' => 'Please provide a valid email address.']);
    http_response_code(400);
    exit;
}

$amount = floatval($amount_input);
if ($amount <= 0) {
    echo json_encode(['error' => 'Please enter a valid positive amount.']);
    http_response_code(400);
    exit;
}

// Razorpay expects amount in paise (1 INR = 100 Paise)
$amount_paise = round($amount * 100);
$receipt_id = 'rcpt_' . time() . '_' . rand(1000, 9999);

// Prepare Razorpay Order payload
$order_payload = [
    'amount' => $amount_paise,
    'currency' => CURRENCY,
    'receipt' => $receipt_id,
    'payment_capture' => 1,
    'notes' => [
        'customer_name' => $customer_name,
        'customer_email' => $customer_email,
        'customer_phone' => $customer_phone,
        'service' => $service
    ]
];

// API call to Razorpay via cURL
$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($order_payload));
curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    echo json_encode(['error' => 'Unable to connect to payment gateway. Error: ' . $curl_error]);
    http_response_code(400);
    exit;
}

$response_data = json_decode($response, true);
if ($http_code === 200 && isset($response_data['id'])) {
    echo json_encode([
        'order_id' => $response_data['id'],
        'razorpay_key_id' => RAZORPAY_KEY_ID
    ]);
} else {
    $err_desc = isset($response_data['error']['description']) ? $response_data['error']['description'] : 'Unknown gateway error';
    echo json_encode(['error' => 'Payment gateway initialization failed: ' . $err_desc]);
    http_response_code(400);
}
?>
