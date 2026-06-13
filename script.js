document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Sticky Navbar & Active Section Link
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Toggle sticky navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active navigation link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
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

  // Close mobile menu when a link is clicked
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
      typingDelay = 50; // Speed up deletion
    } else {
      typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at full word
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingDelay = 500; // Pause before typing next word
    }

    setTimeout(type, typingDelay);
  }

  // Start the typing animation
  if (typingTextElement) {
    type();
  }

  // ==========================================
  // Terminal Simulator Simulation
  // ==========================================
  const terminalLoadingLine = document.getElementById('terminal-loading-line');
  const terminalLoadingOutput = document.getElementById('terminal-loading-output');

  if (terminalLoadingLine && terminalLoadingOutput) {
    const logSteps = [
      "Initializing LangChain RAG Search Engine...",
      "Connecting to vector database cluster... [OK]",
      "Waking LLM agents... (Gemini & GPT-4o Online)",
      "Ready. Listening on port :8000 🚀"
    ];
    let step = 0;

    function runLogSimulation() {
      if (step < logSteps.length) {
        setTimeout(() => {
          const newLine = document.createElement('div');
          newLine.style.color = '#8B949E';
          newLine.style.fontSize = '0.9rem';
          newLine.textContent = logSteps[step];
          terminalLoadingOutput.appendChild(newLine);
          step++;
          runLogSimulation();
        }, 1200 + step * 300); // progressive delaying
      }
    }

    // Trigger simulation once terminal is loaded
    terminalLoadingOutput.textContent = "Connecting to Dipayan's systems...";
    runLogSimulation();
  }

  // ==========================================
  // Scroll Animation - Intersection Observer
  // ==========================================
  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-active');
        // Unobserve after animating once
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

      // Drifts the inner glow slightly towards the cursor
      orbCenter.style.transform = `translate(calc(-50% + ${x * 0.15}px), calc(-50% + ${y * 0.15}px)) scale(1.05)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      orbCenter.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // ==========================================
  // Contact Form Submission (Toast Notification)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Change button text to indicate loading
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <span class="cursor" style="background-color: var(--bg-primary);"></span>`;

      // Mock backend processing delay
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        // Show Success Toast Alert
        formAlert.classList.add('show');
        
        // Reset form inputs
        contactForm.reset();

        // Dismiss Toast alert after 4 seconds
        setTimeout(() => {
          formAlert.classList.remove('show');
        }, 4000);

      }, 1500);
    });
  }
});
