/* ============================================================
   Bakeonado – Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar scroll behaviour ---- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---- Mobile menu toggle ---- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu    = document.getElementById('navMenu');

  menuToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- Active nav-link highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('nav-link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav-link--active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Menu tabs ---- */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.menu__panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-target');

      tabBtns.forEach(function (b) {
        b.classList.remove('tab-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function (p) {
        p.classList.add('menu__panel--hidden');
      });

      btn.classList.add('tab-btn--active');
      btn.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.remove('menu__panel--hidden');
      }
    });
  });

  /* ---- Testimonials slider ---- */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotsContainer    = document.getElementById('slideDots');
  const prevBtn          = document.getElementById('prevSlide');
  const nextBtn          = document.getElementById('nextSlide');
  let currentSlide       = 0;
  let autoSlideTimer;

  // Build dots
  testimonialCards.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
    dot.addEventListener('click', function () {
      goToSlide(i);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    testimonialCards[currentSlide].classList.remove('active');
    dotsContainer.querySelectorAll('.dot')[currentSlide].classList.remove('active');

    currentSlide = (index + testimonialCards.length) % testimonialCards.length;

    testimonialCards[currentSlide].classList.add('active');
    dotsContainer.querySelectorAll('.dot')[currentSlide].classList.add('active');
  }

  prevBtn.addEventListener('click', function () {
    goToSlide(currentSlide - 1);
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', function () {
    goToSlide(currentSlide + 1);
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  startAutoSlide();

  /* ---- Stats counter animation ---- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated  = false;

  function animateStats() {
    if (statsAnimated) return;
    const statsStrip = document.querySelector('.stats-strip');
    if (!statsStrip) return;

    const rect = statsStrip.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      statsAnimated = true;

      statNumbers.forEach(function (el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();

        const locale = navigator.language || 'en-IN';

        function update(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString(locale);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString(locale);
          }
        }
        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats(); // run once on load in case already visible

  /* ---- Back to top ---- */
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Contact form validation ---- */
  const orderForm   = document.getElementById('orderForm');
  const formSuccess = document.getElementById('formSuccess');

  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      function showError(inputId, errorId, message) {
        const el = document.getElementById(errorId);
        if (el) el.textContent = message;
        const input = document.getElementById(inputId);
        if (input) input.style.borderColor = '#c0392b';
        valid = false;
      }

      function clearError(inputId, errorId) {
        const el = document.getElementById(errorId);
        if (el) el.textContent = '';
        const input = document.getElementById(inputId);
        if (input) input.style.borderColor = '';
      }

      // Name
      clearError('name', 'nameError');
      const nameVal = document.getElementById('name').value.trim();
      if (!nameVal) {
        showError('name', 'nameError', 'Please enter your name.');
      }

      // Email
      clearError('email', 'emailError');
      const emailVal = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        showError('email', 'emailError', 'Please enter your email.');
      } else if (!emailRegex.test(emailVal)) {
        showError('email', 'emailError', 'Please enter a valid email address.');
      }

      // Phone
      clearError('phone', 'phoneError');
      const phoneVal = document.getElementById('phone').value.trim();
      const phoneRegex = /^[+\d\s\-()]{7,20}$/;
      if (!phoneVal) {
        showError('phone', 'phoneError', 'Please enter your phone number.');
      } else if (!phoneRegex.test(phoneVal)) {
        showError('phone', 'phoneError', 'Please enter a valid phone number.');
      }

      // Message
      clearError('message', 'messageError');
      const messageVal = document.getElementById('message').value.trim();
      if (!messageVal) {
        showError('message', 'messageError', 'Please describe your order or enquiry.');
      }

      if (valid) {
        // Show success message
        orderForm.hidden = true;
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Live clear errors on input
    ['name', 'email', 'phone', 'message'].forEach(function (id) {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', function () {
          const errEl = document.getElementById(id + 'Error');
          if (errEl) errEl.textContent = '';
          input.style.borderColor = '';
        });
      }
    });
  }

  /* ---- Newsletter form ---- */
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        emailInput.value = '';
        emailInput.placeholder = '✓ Subscribed! Thank you 🎂';
        emailInput.disabled = true;
      }
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Intersection Observer for fade-in animations ---- */
  const animatableEls = document.querySelectorAll(
    '.menu-card, .special-card, .gallery-item, .about__img, .about__text, .contact__info, .contact__form-wrap, .stat-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animatableEls.forEach(function (el) {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animatableEls.forEach(function (el) {
      el.classList.add('animate-in');
    });
  }
})();
