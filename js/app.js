/**
 * app.js - Main Application Logic
 * Handles form submissions, scroll effects, navigation, and interactions
 */

// ========================================
// Contact Form Handler
// ========================================

const contactForm = document.getElementById('contact-form');
const formAlert = document.getElementById('form-alert');
const alertMessage = document.getElementById('form-alert-message');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(this);
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showAlert('Message sent successfully!', 'success');
        this.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      showAlert('Oops! Something went wrong. Please try again.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/**
 * Show alert message
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
function showAlert(message, type = 'success') {
  alertMessage.textContent = message;
  formAlert.style.background = type === 'success' ? '#2b8c7c' : '#c45a6b';
  formAlert.classList.add('show');
  
  // Auto-hide after 5 seconds
  clearTimeout(window.alertTimeout);
  window.alertTimeout = setTimeout(() => {
    formAlert.classList.remove('show');
  }, 5000);
}

// ========================================
// Scroll Reveal Animations
// ========================================

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const threshold = 100; // pixels from bottom
  
  return rect.top <= windowHeight - threshold;
}

/**
 * Reveal elements on scroll
 */
function handleScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  revealElements.forEach(el => {
    if (isInViewport(el) && !el.classList.contains('active')) {
      el.classList.add('active');
    }
  });
}

// Add scroll classes to elements
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card:not(.repo-card)');
  const sections = document.querySelectorAll('.section');
  
  // Add reveal classes to cards
  cards.forEach((card, index) => {
    if (!card.closest('#projects')) {
      card.classList.add('reveal');
      card.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }
  });
  
  // Add reveal classes to sections
  sections.forEach(section => {
    section.classList.add('reveal');
  });
  
  // Initial check
  setTimeout(handleScrollReveal, 100);
});

// Listen for scroll events with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    handleScrollReveal();
    scrollTimeout = null;
  }, 100);
});

// ========================================
// Smooth Navigation
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Back to Top Button
// ========================================

const backToTop = document.querySelector('.footer-back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// Console Log - Personal Branding
// ========================================

console.log('%c Dipayan Mahato ', 'background: #6b4c7a; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Python Developer · Applied AI Engineer ', 'color: #6b4c7a; font-size: 14px; font-weight: bold;');
console.log('%c 🚀 Building intelligent systems with FastAPI & LangChain', 'color: #2b8c7c; font-size: 12px;');

// ========================================
// Keyboard Accessibility
// ========================================

document.addEventListener('keydown', (e) => {
  // Escape key closes alert
  if (e.key === 'Escape' && formAlert.classList.contains('show')) {
    formAlert.classList.remove('show');
  }
});

// ========================================
// Performance: Defer non-critical operations
// ========================================

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload images or other low-priority tasks
    console.log('✨ Portfolio ready for action!');
  });
}
