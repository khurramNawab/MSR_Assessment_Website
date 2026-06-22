<?php
/**
 * Buy Page - Razorpay Payment Gateway Integration
 * MSR Assessment Pvt Ltd
 */
require_once 'config.php';

$error_message = '';
$order_id = '';
$amount_paise = 0;
$customer_name = '';
$customer_email = '';
$customer_phone = '';
$service = '';
$amount_display = '';

// Handle form submission to create order
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate inputs
    $customer_name = trim(filter_input(INPUT_POST, 'name', FILTER_DEFAULT));
    $customer_email = trim(filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL));
    $customer_phone = trim(filter_input(INPUT_POST, 'phone', FILTER_DEFAULT));
    $service = trim(filter_input(INPUT_POST, 'service', FILTER_DEFAULT));
    $amount_input = trim(filter_input(INPUT_POST, 'amount', FILTER_DEFAULT));

    // Simple backend validations
    if (empty($customer_name) || empty($customer_email) || empty($customer_phone) || empty($service) || empty($amount_input)) {
        $error_message = "All fields are required. Please fill in all fields.";
    } elseif (!$customer_email) {
        $error_message = "Please provide a valid email address.";
    } elseif (!is_numeric($amount_input) || floatval($amount_input) <= 0) {
        $error_message = "Please enter a valid positive amount.";
    } else {
        $amount = floatval($amount_input);
        $amount_display = number_format($amount, 2);
        // Razorpay expects amount in paise (1 INR = 100 Paise)
        $amount_paise = round($amount * 100);
        $receipt_id = 'rcpt_' . time() . '_' . rand(1000, 9999);

        // Prepare Razorpay Order payload
        $order_payload = [
            'amount' => $amount_paise,
            'currency' => CURRENCY,
            'receipt' => $receipt_id,
            'payment_capture' => 1, // Auto-capture payments
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
            $error_message = "Unable to connect to payment gateway. Error: " . $curl_error;
        } else {
            $response_data = json_decode($response, true);
            if ($http_code === 200 && isset($response_data['id'])) {
                $order_id = $response_data['id'];
                // Order created successfully, checkout screen will display the JS script
            } else {
                $err_desc = isset($response_data['error']['description']) ? $response_data['error']['description'] : 'Unknown error';
                $error_message = "Payment gateway initialization failed: " . $err_desc;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Online Instant Payment Checkout Gateway - MSR Assessment Pvt Ltd. Safe and secured corporate payment settlements.">
  <title>Pay Online | MSR Assessment Pvt Ltd</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* Specific Page Styles */
    .pay-hero {
      padding: calc(38px + 70px + 64px) 0 var(--s6);
      background: linear-gradient(135deg, rgba(24, 49, 83, 0.95) 0%, rgba(14, 29, 48, 0.97) 100%), url('assets/two_professional_businessmen_in_suits_shaking_hands_in_a_high_rise_office.png') no-repeat center/cover;
      border-bottom: 1px solid var(--border-solid);
      color: white;
    }

    .pay-hero-wrap {
      max-width: var(--content-w);
      margin: 0 auto;
      padding: 0 var(--s5);
      text-align: center;
    }

    .pay-hero-title {
      font-family: var(--font-head);
      font-size: clamp(32px, 5vw, 52px);
      font-weight: 800;
      letter-spacing: -2px;
      color: white;
      line-height: 1.1;
      margin-bottom: var(--s2);
    }

    .pay-hero-desc {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.7;
      max-width: 640px;
      margin: 0 auto;
    }

    .pay-container {
      max-width: 760px;
      margin: 0 auto;
      padding: var(--s8) var(--s5);
    }

    .checkout-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border-solid);
      border-radius: var(--r-xl);
      padding: var(--s5);
      box-shadow: var(--sh-lg);
    }

    .checkout-form-title {
      font-family: var(--font-head);
      font-size: 24px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: var(--s3);
      text-align: center;
    }

    .error-alert {
      background-color: #FDF2F2;
      border-left: 4px solid #F05252;
      color: #9B1C1C;
      padding: var(--s2);
      border-radius: var(--r-xs);
      margin-bottom: var(--s3);
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: var(--s1);
    }

    .loading-overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--s6) 0;
      text-align: center;
    }

    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border-left-color: var(--primary);
      animation: spin 1s linear infinite;
      margin-bottom: var(--s2);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .pay-badge-row {
      display: flex;
      justify-content: center;
      gap: var(--s4);
      flex-wrap: wrap;
      margin-top: var(--s4);
      padding-top: var(--s3);
      border-top: 1px solid var(--border-solid);
    }

    .pay-badge-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 600;
    }

    .pay-badge-item i {
      color: var(--accent);
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
      <span class="ribbon-item"><span class="ri-dot"></span> IRCA Certified Lead Auditors</span>
      <span class="ribbon-item"><span class="ri-dot"></span> Corporate Governance Specialists</span>
      <span class="ribbon-item"><span class="ri-dot"></span> Pan-India Audit Offices</span>
      <span class="ribbon-item"><span class="ri-dot"></span> Accredited ISO Audits</span>
    </div>
  </div>

  <!-- Header -->
  <header class="site-header scrolled" id="site-header" role="banner">
    <div class="header-wrap">
      <!-- Logo -->
      <a href="index.html" class="site-logo" aria-label="MSR Assessment Pvt Ltd Home">
        <img src="msr.png" alt="MSR Assessment Pvt Ltd Logo" width="40" height="40">
        <div class="logo-wordmark">
          <span class="logo-name">MSR Assessment Pvt Ltd</span>
          <span class="logo-tagline">Corporate &amp; Legal Services</span>
        </div>
      </a>

      <!-- Mobile Menu Toggle Button -->
      <button class="menu-toggle" id="mobile-menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Navigation -->
      <nav class="header-nav" role="navigation" aria-label="Main navigation" id="header-nav">
        <button class="menu-close-btn" id="mobile-menu-close" aria-label="Close navigation">
          <i class="fas fa-times"></i>
        </button>

        <a href="index.html" class="nav-link">Home</a>
        <a href="about-us.html" class="nav-link">About Us</a>
        <a href="iso-certification.html" class="nav-link">ISO Certification</a>
        <a href="audit-services.html" class="nav-link">Audit Services</a>
        <a href="blogs.html" class="nav-link">Blogs</a>
        <a href="contact.html" class="nav-link nav-contact-btn">Contact Us</a>
        <a href="payment.html" class="nav-link">Online Payment</a>
      </nav>

      <div class="header-actions">
        <button class="btn btn-sm btn-primary" id="btn-inquiry"
          onclick="document.getElementById('inquiry-modal').classList.add('open')">
          Talk To An Expert
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero -->
    <section class="pay-hero">
      <div class="pay-hero-wrap">
        <div class="breadcrumb" style="display:flex; justify-content:center; gap:6px; font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:14px;">
          <a href="index.html" style="color:var(--accent-light); text-decoration:none;">Home</a>
          <span>/</span>
          <a href="payment.html" style="color:var(--accent-light); text-decoration:none;">Payment</a>
          <span>/</span>
          <span>Pay Online</span>
        </div>
        <h1 class="pay-hero-title">Instant Online Payment</h1>
        <p class="pay-hero-desc">Settle invoices or secure professional consulting audits instantly via Razorpay. Support cards, UPI, netbanking, and corporate wallets.</p>
      </div>
    </section>

    <!-- Content Area -->
    <section class="pay-container">
      <div class="checkout-wrapper">

        <?php if (!empty($order_id)): ?>
          <!-- Payment initialization state -->
          <div class="loading-overlay">
            <div class="spinner"></div>
            <h2 class="checkout-form-title">Connecting to Gateway...</h2>
            <p style="color: var(--text-muted); font-size: 15px; margin-bottom: var(--s3);">Please do not refresh the page or click back. The payment checkout window is opening.</p>
            <div style="background: var(--bg-alt); padding: var(--s2); border-radius: var(--r-sm); width: 100%; max-width: 400px; text-align: left; font-size: 14px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="color: var(--text-muted);">Company Name:</span>
                    <strong style="color: var(--text);"><?php echo htmlspecialchars($customer_name); ?></strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="color: var(--text-muted);">Service:</span>
                    <strong style="color: var(--text);"><?php echo htmlspecialchars($service); ?></strong>
                </div>
                <div style="display: flex; justify-content: space-between; border-top: 1px dotted var(--border-solid); padding-top: 6px; font-weight: 700;">
                    <span style="color: var(--primary);">Total Amount:</span>
                    <span style="color: var(--accent);">₹<?php echo $amount_display; ?> INR</span>
                </div>
            </div>
            
            <button id="rzp-manual-button" class="btn btn-md btn-primary" style="margin-top: var(--s3); width: 100%; max-width: 400px;">
                Open Payment Window <i class="fas fa-external-link-alt"></i>
            </button>
          </div>

          <!-- Razorpay Standard Checkout SDK Script -->
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          <script>
            document.addEventListener('DOMContentLoaded', function() {
                var options = {
                    "key": "<?php echo RAZORPAY_KEY_ID; ?>",
                    "amount": "<?php echo $amount_paise; ?>",
                    "currency": "<?php echo CURRENCY; ?>",
                    "name": "<?php echo COMPANY_NAME; ?>",
                    "description": "<?php echo COMPANY_DESCRIPTION; ?>",
                    "image": "<?php echo COMPANY_LOGO; ?>",
                    "order_id": "<?php echo $order_id; ?>",
                    "callback_url": "verify.php",
                    "prefill": {
                        "name": "<?php echo htmlspecialchars($customer_name, ENT_QUOTES); ?>",
                        "email": "<?php echo htmlspecialchars($customer_email, ENT_QUOTES); ?>",
                        "contact": "<?php echo htmlspecialchars($customer_phone, ENT_QUOTES); ?>"
                    },
                    "notes": {
                        "customer_name": "<?php echo htmlspecialchars($customer_name, ENT_QUOTES); ?>",
                        "service": "<?php echo htmlspecialchars($service, ENT_QUOTES); ?>"
                    },
                    "theme": {
                        "color": "#183153"
                    },
                    "modal": {
                        "ondismiss": function() {
                            window.location.href = "buy.php?error=Payment cancelled by user.";
                        }
                    }
                };
                var rzp = new Razorpay(options);
                
                // Auto-open Checkout Modal
                rzp.open();
                
                // Manual Button backup
                document.getElementById('rzp-manual-button').onclick = function(e){
                    rzp.open();
                    e.preventDefault();
                }
            });
          </script>

        <?php else: ?>
          <!-- Payment Intake Form -->
          <h2 class="checkout-form-title">Checkout Payment Details</h2>

          <?php if (!empty($error_message)): ?>
            <div class="error-alert">
              <i class="fas fa-exclamation-triangle"></i>
              <span><?php echo htmlspecialchars($error_message); ?></span>
            </div>
          <?php elseif (isset($_GET['error'])): ?>
            <div class="error-alert">
              <i class="fas fa-exclamation-triangle"></i>
              <span><?php echo htmlspecialchars($_GET['error']); ?></span>
            </div>
          <?php endif; ?>

          <form action="buy.php" method="POST" id="checkout-form">
            <div class="form-row">
              <div class="form-group">
                <label for="pay-name">Company / Client Name *</label>
                <input type="text" id="pay-name" name="name" required placeholder="Verma Industries Pvt Ltd" value="<?php echo htmlspecialchars($customer_name); ?>">
              </div>
              <div class="form-group">
                <label for="pay-email">Billing Email Address *</label>
                <input type="email" id="pay-email" name="email" required placeholder="accounts@vermaindustries.com" value="<?php echo htmlspecialchars($customer_email); ?>">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="pay-phone">Phone Number *</label>
                <input type="tel" id="pay-phone" name="phone" required placeholder="+91 99887 76655" value="<?php echo htmlspecialchars($customer_phone); ?>">
              </div>
              <div class="form-group">
                <label for="pay-service">Associated Service *</label>
                <select id="pay-service" name="service" required>
                  <option value="">Select corporate service...</option>
                  <option <?php echo ($service === 'Company Registration') ? 'selected' : ''; ?>>Company Registration</option>
                  <option <?php echo ($service === 'Trademark Registration') ? 'selected' : ''; ?>>Trademark Registration</option>
                  <option <?php echo ($service === 'GST Registration') ? 'selected' : ''; ?>>GST Registration</option>
                  <option <?php echo ($service === 'ISO Certification') ? 'selected' : ''; ?>>ISO Certification</option>
                  <option <?php echo ($service === 'FSSAI License') ? 'selected' : ''; ?>>FSSAI License</option>
                  <option <?php echo ($service === 'MSME Registration') ? 'selected' : ''; ?>>MSME Registration</option>
                  <option <?php echo ($service === 'Audit Services') ? 'selected' : ''; ?>>Audit Services</option>
                  <option <?php echo ($service === 'Training Services') ? 'selected' : ''; ?>>Training Services</option>
                  <option <?php echo ($service === 'Website Development') ? 'selected' : ''; ?>>Website Development</option>
                  <option <?php echo ($service === 'Mobile App Development') ? 'selected' : ''; ?>>Mobile App Development</option>
                  <option <?php echo ($service === 'Digital Marketing') ? 'selected' : ''; ?>>Digital Marketing</option>
                  <option <?php echo ($service === 'Other Advisory Services') ? 'selected' : ''; ?>>Other Advisory Services</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="pay-amount">Payment Amount (INR) *</label>
              <div style="position: relative;">
                <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-weight: 700; color: var(--text-mid);">₹</span>
                <input type="number" id="pay-amount" name="amount" min="1" step="0.01" required placeholder="Enter amount to pay" style="padding-left: 32px;" value="<?php echo htmlspecialchars($amount_input ?? ''); ?>">
              </div>
            </div>

            <button type="submit" class="btn-submit" style="width: 100%; margin-top: var(--s2);">
              Proceed to Pay ₹ <span id="amount-btn-display">0.00</span> Securely
            </button>
          </form>
        <?php endif; ?>

        <!-- Security Badge row -->
        <div class="pay-badge-row">
          <div class="pay-badge-item">
            <i class="fas fa-shield-halved"></i>
            <span>100% SECURE CHECKOUT</span>
          </div>
          <div class="pay-badge-item">
            <i class="fas fa-check-double"></i>
            <span>RAZORPAY VERIFIED</span>
          </div>
          <div class="pay-badge-item">
            <i class="fas fa-receipt"></i>
            <span>INSTANT INVOICING</span>
          </div>
        </div>

      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="msr.png" alt="MSR Assessment Pvt Ltd" width="38" height="38">
          <span class="footer-logo-name">MSR Assessment Pvt Ltd</span>
        </div>
        <p class="footer-tagline">
          India's trusted third-party registrar and auditing firm. Providing accredited environmental, quality, security, and sectoral system compliance assessments — since 2013.
        </p>
      </div>

      <div class="footer-col">
        <h4>Core Standards</h4>
        <a href="iso-9001-certification.html">ISO 9001 (QMS)</a>
        <a href="iso-14001-certification.html">ISO 14001 (EMS)</a>
        <a href="iso-27001-certification.html">ISO 27001 (ISMS)</a>
        <a href="iso-45001-certification.html">ISO 45001 (OHS)</a>
      </div>

      <div class="footer-col">
        <h4>Advisory &amp; Support</h4>
        <a href="internal-audit-services.html">Internal Audits</a>
        <a href="compliance-consulting.html">Regulatory Compliance</a>
        <a href="payment.html">Offline Settlements</a>
        <a href="contact.html">Contact Support</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 MSR Assessment Pvt Ltd. All rights reserved. Registered under MCA.</span>
    </div>
  </footer>

  <div class="toast" id="toast">
    <i class="fas fa-check-circle"></i>
    <span id="toast-msg">Success!</span>
  </div>

  <script>
    // Live update on amount button text
    const amountInput = document.getElementById('pay-amount');
    const amountDisplay = document.getElementById('amount-btn-display');
    if (amountInput && amountDisplay) {
        amountInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
                amountDisplay.textContent = val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                amountDisplay.textContent = '0.00';
            }
        });
        
        // Initial load check
        if(amountInput.value) {
            const val = parseFloat(amountInput.value);
            if(!isNaN(val)) {
                amountDisplay.textContent = val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
        }
    }

    // Alphabetic input restriction for name
    const nameInput = document.getElementById('pay-name');
    if(nameInput) {
        nameInput.addEventListener('input', (e) => {
            const originalValue = e.target.value;
            const filtered = originalValue.replace(/[^A-Za-z\s\.]/g, "");
            if (filtered !== originalValue) {
                e.target.value = filtered;
            }
        });
    }
  </script>
</body>

</html>
