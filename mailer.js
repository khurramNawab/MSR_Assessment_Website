/**
 * MSR Assessment — mailer.js
 * Handles inquiry form and newsletter form submissions
 * (Simulates backend — replace with actual API endpoint)
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAME FIELD VALIDATION ---
  document.querySelectorAll('input[name="name"], #inq-name, #car-name, #inq-name-modal, #car-name').forEach(input => {
    input.addEventListener('input', (e) => {
      const originalValue = e.target.value;
      const filtered = originalValue.replace(/[^A-Za-z\s\.]/g, '');
      if (filtered !== originalValue) {
        e.target.value = filtered;
        showToast('Only alphabets, dots, and spaces are allowed in the name field.', true);
      }
    });
  });

  // ─── TOAST UTILITY ────────────────────────────────────────────────────────
  function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;

    // Swap icon based on type
    const icon = toast.querySelector('i');
    if (icon) {
      icon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
      icon.style.color = isError ? '#E74C3C' : 'var(--accent)';
    }

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // ─── INQUIRY FORM ─────────────────────────────────────────────────────────
  const inquiryForm = document.getElementById('inquiry-form');
  const submitBtn   = document.getElementById('submit-btn') ||
                      inquiryForm?.querySelector('button[type="submit"]');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic validation
      const name    = inquiryForm.querySelector('[name="name"]')?.value.trim();
      const email   = inquiryForm.querySelector('[name="email"]')?.value.trim();
      const phone   = inquiryForm.querySelector('[name="phone"]')?.value.trim();

      if (!name || !email || !phone) {
        showToast('Please fill in all required fields.', true);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', true);
        return;
      }

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      // Collect form data
      const formData = {
        name,
        email,
        phone,
        service: inquiryForm.querySelector('[name="service"]')?.value ||
                 inquiryForm.querySelector('[name="service_interested"]')?.value || '',
        message: inquiryForm.querySelector('[name="message"]')?.value || ''
      };

      try {
        // Simulate API call (replace this with your actual backend endpoint)
        await simulateSend(formData);

        showToast('Inquiry sent! Our expert will contact you within 2 hours.');
        inquiryForm.reset();

        // Close modal if open
        const modal = document.getElementById('inquiry-modal');
        if (modal) setTimeout(() => modal.classList.remove('open'), 1200);

      } catch (err) {
        showToast('Something went wrong. Please try again or call us directly.', true);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Inquiry <i class="fas fa-arrow-right"></i>';
        }
      }
    });
  }

  // ─── NEWSLETTER FORM ──────────────────────────────────────────────────────
  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('[name="email"]');
      const submitNl   = newsletterForm.querySelector('button[type="submit"]');
      const email = emailInput?.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', true);
        return;
      }

      if (submitNl) {
        submitNl.disabled = true;
        submitNl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      }

      try {
        await simulateSend({ email, type: 'newsletter' });
        showToast('Subscribed! You\'ll receive compliance updates in your inbox.');
        newsletterForm.reset();
      } catch {
        showToast('Subscription failed. Please try again.', true);
      } finally {
        if (submitNl) {
          submitNl.disabled = false;
          submitNl.innerHTML = '<i class="fas fa-arrow-right"></i>';
        }
      }
    });
  }

  // ─── SIMULATE BACKEND ─────────────────────────────────────────────────────
  // Replace this function with your actual fetch/API call
  function simulateSend(data) {
    console.log('[MSR Mailer] Submission:', data);
    return new Promise((resolve) => setTimeout(resolve, 1200));
  }

});
