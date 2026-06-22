<?php
/**
 * Verification Page - Razorpay Payment Signature Verification
 * MSR Assessment Pvt Ltd
 */
require_once 'config.php';

$success = false;
$error_message = '';

$payment_id = '';
$order_id = '';
$signature = '';

$customer_name = 'N/A';
$customer_email = 'N/A';
$customer_phone = 'N/A';
$service = 'N/A';
$amount_paid = 0.00;
$payment_date = date('Y-m-d H:i:s');

// Catch payment details from Razorpay POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $payment_id = filter_input(INPUT_POST, 'razorpay_payment_id', FILTER_DEFAULT);
    $order_id = filter_input(INPUT_POST, 'razorpay_order_id', FILTER_DEFAULT);
    $signature = filter_input(INPUT_POST, 'razorpay_signature', FILTER_DEFAULT);

    if (!empty($payment_id) && !empty($order_id) && !empty($signature)) {
        // Step 1: Verify the signature
        // Signature string: razorpay_order_id + "|" + razorpay_payment_id
        $data = $order_id . "|" . $payment_id;
        $expected_signature = hash_hmac('sha256', $data, RAZORPAY_KEY_SECRET);

        if (hash_equals($expected_signature, $signature)) {
            $success = true;

            // Step 2: Fetch Order Details from Razorpay API for security verification
            $ch = curl_init('https://api.razorpay.com/v1/orders/' . $order_id);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
            
            $response = curl_exec($ch);
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($http_code === 200 && !empty($response)) {
                $order_data = json_decode($response, true);
                
                // Get customer metadata from notes
                if (isset($order_data['notes'])) {
                    $customer_name = $order_data['notes']['customer_name'] ?? 'Client';
                    $customer_email = $order_data['notes']['customer_email'] ?? '';
                    $customer_phone = $order_data['notes']['customer_phone'] ?? '';
                    $service = $order_data['notes']['service'] ?? 'Corporate Advisory';
                }
                
                // Fetch paid amount (Razorpay stores it in paise)
                if (isset($order_data['amount'])) {
                    $amount_paid = floatval($order_data['amount']) / 100;
                }
                
                if (isset($order_data['created_at'])) {
                    $payment_date = date('Y-m-d H:i:s', $order_data['created_at']);
                }
            } else {
                // API Fallback: If API fetch fails but signature is valid, we can still trust it.
                // We'll show standard receipt details
                $error_message = "Payment verified, but failed to fetch transaction details from gateway.";
            }
        } else {
            $success = false;
            $error_message = "Payment signature verification failed. The transaction payload may have been tampered.";
        }
    } else {
        $success = false;
        $error_message = "Missing transaction ID parameters from the checkout callback.";
    }
} else {
    // Direct GET access to verify.php is not allowed
    header('Location: buy.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Status | MSR Assessment Pvt Ltd</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    .status-hero {
      padding: calc(38px + 70px + 64px) 0 var(--s6);
      background: linear-gradient(135deg, rgba(24, 49, 83, 0.95) 0%, rgba(14, 29, 48, 0.97) 100%);
      border-bottom: 1px solid var(--border-solid);
      color: white;
      text-align: center;
    }

    .status-container {
      max-width: 680px;
      margin: 0 auto;
      padding: var(--s8) var(--s5);
    }

    .receipt-card {
      background: var(--bg-card);
      border: 1px solid var(--border-solid);
      border-radius: var(--r-xl);
      padding: var(--s5);
      box-shadow: var(--sh-lg);
      text-align: center;
    }

    .status-icon-wrap {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-bottom: var(--s3);
    }

    .status-success {
      background-color: #DEF7EC;
      color: #03543F;
    }

    .status-failure {
      background-color: #FDF2F2;
      color: #9B1C1C;
    }

    .receipt-title {
      font-family: var(--font-head);
      font-size: 26px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: var(--s1);
    }

    .receipt-subtitle {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: var(--s4);
    }

    .receipt-details {
      text-align: left;
      background: var(--bg-alt);
      border-radius: var(--r-md);
      padding: var(--s3);
      margin-bottom: var(--s4);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .receipt-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dotted var(--border-solid);
      padding-bottom: 8px;
      font-size: 14px;
    }

    .receipt-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .receipt-label {
      color: var(--text-muted);
      font-weight: 500;
    }

    .receipt-value {
      color: var(--text);
      font-weight: 700;
    }

    .receipt-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    @media print {
      .site-header, .site-footer, .trust-ribbon, .receipt-actions, .breadcrumb, .status-hero {
        display: none !important;
      }
      body {
        background: white;
      }
      .status-container {
        padding: 0;
      }
      .receipt-card {
        box-shadow: none;
        border: none;
      }
    }
  </style>
  <link rel="icon" type="image/png" href="msr.png">
</head>

<body>

  <!-- Trust Ribbon -->
  <div class="trust-ribbon" role="marquee" aria-label="Trust indicators">
    <div class="trust-ribbon-track">
      <span class="ribbon-item"><span class="ri-dot"></span> Accredited ISO Audits</span>
      <span class="ribbon-item"><span class="ri-dot"></span> <strong>5,000+</strong> Audits Completed</span>
      <span class="ribbon-item"><span class="ri-dot"></span> <strong>12+ Years</strong> Regulatory Experience</span>
    </div>
  </div>

  <!-- Header -->
  <header class="site-header scrolled" id="site-header" role="banner">
    <div class="header-wrap">
      <a href="index.html" class="site-logo">
        <img src="msr.png" alt="MSR Assessment Logo" width="40" height="40">
        <div class="logo-wordmark">
          <span class="logo-name">MSR Assessment Pvt Ltd</span>
          <span class="logo-tagline">Corporate &amp; Legal Services</span>
        </div>
      </a>
      <nav class="header-nav">
        <a href="index.html" class="nav-link">Home</a>
        <a href="about-us.html" class="nav-link">About Us</a>
        <a href="payment.html" class="nav-link">Online Payment</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="status-hero">
      <h1 style="font-family: var(--font-head); font-size: 32px; font-weight: 800;">Transaction Status</h1>
    </section>

    <section class="status-container">
      <div class="receipt-card">

        <?php if ($success): ?>
          <div class="status-icon-wrap status-success">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2 class="receipt-title">Payment Verified Successfully!</h2>
          <p class="receipt-subtitle">Thank you. Your corporate compliance order payment has been secured.</p>

          <div class="receipt-details">
            <div class="receipt-row">
              <span class="receipt-label">Client Name</span>
              <span class="receipt-value"><?php echo htmlspecialchars($customer_name); ?></span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Email Address</span>
              <span class="receipt-value"><?php echo htmlspecialchars($customer_email); ?></span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Phone Number</span>
              <span class="receipt-value"><?php echo htmlspecialchars($customer_phone); ?></span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Associated Service</span>
              <span class="receipt-value"><?php echo htmlspecialchars($service); ?></span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Razorpay Order ID</span>
              <span class="receipt-value"><?php echo htmlspecialchars($order_id); ?></span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Razorpay Payment ID</span>
              <span class="receipt-value" style="color: var(--accent);"><?php echo htmlspecialchars($payment_id); ?></span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Transaction Date</span>
              <span class="receipt-value"><?php echo htmlspecialchars($payment_date); ?></span>
            </div>
            <div class="receipt-row" style="font-size: 16px; border-top: 1px dotted var(--border-solid); padding-top: 8px;">
              <span class="receipt-label" style="font-weight: 700; color: var(--primary);">Amount Paid</span>
              <span class="receipt-value" style="color: var(--success);">₹<?php echo number_format($amount_paid, 2); ?> INR</span>
            </div>
          </div>

          <div class="receipt-actions">
            <button onclick="window.print();" class="btn btn-md btn-outline">
              Print Receipt <i class="fas fa-print"></i>
            </button>
            <a href="index.html" class="btn btn-md btn-primary">
              Back to Home <i class="fas fa-arrow-right"></i>
            </a>
          </div>

        <?php else: ?>
          <div class="status-icon-wrap status-failure">
            <i class="fas fa-times-circle"></i>
          </div>
          <h2 class="receipt-title">Payment Verification Failed</h2>
          <p class="receipt-subtitle">We encountered an issue while verifying your transaction.</p>

          <div class="receipt-details" style="background: #FFF5F5;">
            <div class="receipt-row" style="border: none;">
              <span class="receipt-label" style="color: #9B1C1C;">Reason:</span>
              <span class="receipt-value" style="color: #9B1C1C;"><?php echo htmlspecialchars($error_message); ?></span>
            </div>
            <?php if (!empty($payment_id)): ?>
            <div class="receipt-row" style="border: none; padding-top: 0;">
              <span class="receipt-label">Transaction ID:</span>
              <span class="receipt-value"><?php echo htmlspecialchars($payment_id); ?></span>
            </div>
            <?php endif; ?>
          </div>

          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: var(--s4); line-height: 1.6;">
            If amount was deducted from your account, it will automatically refund within 5-7 business days. Please try again or reach out to support.
          </p>

          <div class="receipt-actions">
            <a href="buy.php" class="btn btn-md btn-primary">
              Try Again <i class="fas fa-rotate-left"></i>
            </a>
            <a href="contact.html" class="btn btn-md btn-outline">
              Contact Helpline <i class="fas fa-phone"></i>
            </a>
          </div>
        <?php endif; ?>

      </div>
    </section>
  </main>

  <footer class="site-footer" role="contentinfo" style="margin-top: var(--s6);">
    <div class="footer-bottom">
      <span>© 2026 MSR Assessment Pvt Ltd. Registered under MCA.</span>
    </div>
  </footer>

</body>

</html>
