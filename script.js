document.addEventListener('DOMContentLoaded', function() {
  function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

  // Initialize Feather Icons
  feather.replace();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkModeIcon = darkModeToggle.querySelector('i');

  // Check for saved user preference or use system preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
    darkModeIcon.setAttribute('data-feather', 'moon');
    feather.replace();
  }

  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      darkModeIcon.setAttribute('data-feather', 'moon');
    } else {
      localStorage.setItem('theme', 'light');
      darkModeIcon.setAttribute('data-feather', 'sun');
    }

    feather.replace();
  });

  // Pricing Tabs
  const pricingTabs = document.querySelectorAll('.pricing-tab');

  pricingTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      pricingTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // In a real implementation, you would update the pricing display here
      // For this demo, we're just toggling the active class
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      item.classList.toggle('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Demo form submission
  const demoForm = document.querySelector('.demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;

      // Here you would typically send the data to your server
      console.log('Demo requested for:', email);

      // Show a success message
      alert('Thank you! We will contact you shortly to schedule your demo.');
      this.reset();
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.animationPlayState = 'running';
      }
    });
  };

  // Run once on load
  animateOnScroll();

  // And then on scroll
  window.addEventListener('scroll', animateOnScroll);
});
