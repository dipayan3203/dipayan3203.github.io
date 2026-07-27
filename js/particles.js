/**
 * particles.js - Particle Background Effect
 * Creates an interactive particle network background
 * Lightweight implementation with canvas
 */

(function() {
  'use strict';

  // Only run on desktop (performance optimization)
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    console.log('Particles disabled on mobile for performance');
    return;
  }

  // Configuration
  const CONFIG = {
    particleCount: 80,
    lineDistance: 150,
    particleSize: 2,
    speed: 0.5,
    color: '#6b4c7a',
    opacity: 0.3
  };

  // Canvas setup
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    opacity: 0.5;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;

  /**
   * Resize canvas to fill window
   */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Particle class
   */
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.radius = Math.random() * CONFIG.particleSize + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.color;
      ctx.globalAlpha = CONFIG.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  /**
   * Initialize particles
   */
  function initParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  /**
   * Draw lines between nearby particles
   */
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONFIG.lineDistance) {
          const opacity = 1 - (distance / CONFIG.lineDistance);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = CONFIG.color;
          ctx.globalAlpha = opacity * 0.3;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  /**
   * Animation loop
   */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    drawLines();
    animationId = requestAnimationFrame(animate);
  }

  /**
   * Start particle animation
   */
  function startParticles() {
    resizeCanvas();
    initParticles();
    
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animate();
  }

  /**
   * Stop particle animation
   */
  function stopParticles() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // ========================================
  // Event Listeners
  // ========================================

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 250);
  });

  // Stop particles when tab is hidden (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopParticles();
    } else {
      startParticles();
    }
  });

  // ========================================
  // Initialize
  // ========================================

  // Start after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startParticles);
  } else {
    startParticles();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', stopParticles);

  console.log('✨ Particles initialized');
})();
