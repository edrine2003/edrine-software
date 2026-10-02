/* ============================================================
   Edrine Software Ltd — Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Set current year in footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Navbar: scroll shadow + active link ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    // Scrolled shadow
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back-to-top button
    const btn = document.getElementById('backToTop');
    if (btn) {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
      });
    });
  }

  // ---- Back to top ----
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Scroll fade-in animation ----
  const fadeTargets = document.querySelectorAll(
    '.service-card, .pillar-card, .contact-card, .stat, .quote-card'
  );

  // Add class to targets
  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay based on sibling index
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeTargets.forEach(el => observer.observe(el));

  // ---- Contact form (mailto fallback) ----
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showNote('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNote('Please enter a valid email address.', 'error');
        return;
      }

      // Build mailto link
      const subject = encodeURIComponent(`[Edrine Software] ${service || 'Enquiry'} from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`
      );
      const mailtoLink = `mailto:edrinehero@gmail.com?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      showNote('✓ Your message is ready — your email client should open now.', 'success');
      form.reset();
    });
  }

  function showNote(msg, type) {
    if (!formNote) return;
    formNote.textContent = msg;
    formNote.className = `form-note ${type}`;
    setTimeout(() => {
      formNote.textContent = '';
      formNote.className = 'form-note';
    }, 6000);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 75;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
