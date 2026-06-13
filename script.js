document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Sticky Navbar & Active Section Link
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    navToggle.textContent = navLinksList.classList.contains('active') ? '✕' : '☰';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
      navToggle.textContent = '☰';
    });
  });

  // ==========================================
  // Typing Effect
  // ==========================================
  const typingTextElement = document.getElementById('typing-text');
  const titles = [
    "Backend Engineer",
    "Applied AI Developer",
    "LangChain · FastAPI · AWS",
    "Always Building, Always Shipping"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typingTextElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  if (typingTextElement) {
    type();
  }

  // ==========================================
  // Scroll Animation - Intersection Observer
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.scroll-fade');
  animatedElements.forEach(el => observer.observe(el));

  // ==========================================
  // Interactive Visual Orb Tracking
  // ==========================================
  const heroVisual = document.querySelector('.hero-visual');
  const orbCenter = document.querySelector('.orb-center');

  if (heroVisual && orbCenter) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      orbCenter.style.transform = `translate(calc(-50% + ${x * 0.15}px), calc(-50% + ${y * 0.15}px)) scale(1.05)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      orbCenter.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // ==========================================
  // Contact Form — Formspree Integration
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const formAlertMessage = document.getElementById('form-alert-message');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <span class="cursor" style="background-color: var(--bg-primary);"></span>`;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formAlertMessage.textContent = 'Message sent successfully!';
          formAlert.classList.add('show');
          contactForm.reset();
        } else {
          formAlertMessage.textContent = 'Something went wrong. Try emailing directly.';
          formAlert.classList.add('show');
        }
      } catch (error) {
        formAlertMessage.textContent = 'Network error. Please try again.';
        formAlert.classList.add('show');
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;

      setTimeout(() => {
        formAlert.classList.remove('show');
      }, 4000);
    });
  }
});
