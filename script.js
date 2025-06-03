document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  let darkModeIcon = darkModeToggle.querySelector('i');

  // Initialize Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  } else {
    console.warn('Feather icons not loaded');
    // Fallback: Create a simple SVG if Feather fails
    darkModeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  }

  // Mobile menu toggle
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scroll for internal anchor links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      if (navLinks) navLinks.classList.remove('open');
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Function to set dark mode
  function setDarkMode(isDark) {
    try {
      if (isDark) {
        document.body.classList.add('dark');
        if (darkModeIcon) darkModeIcon.setAttribute('data-feather', 'sun');
      } else {
        document.body.classList.remove('dark');
        if (darkModeIcon) darkModeIcon.setAttribute('data-feather', 'moon');
      }
      // Try to replace icons, but don't fail if Feather isn't available
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    } catch (e) {
      console.error('Error setting dark mode:', e);
    }
  }

  // Load dark mode preference from localStorage
  function loadDarkModePreference() {
    try {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        setDarkMode(true);
      } else if (savedDarkMode === 'false') {
        setDarkMode(false);
      } else {
        // Default to system preference if no saved preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    } catch (e) {
      console.error('Error loading dark mode preference:', e);
      // Default to light mode if there's an error
      setDarkMode(false);
    }
  }

  // Initialize dark mode
  loadDarkModePreference();

  // Dark mode toggle button event
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      try {
        const isDark = document.body.classList.contains('dark');
        setDarkMode(!isDark);
        localStorage.setItem('darkMode', !isDark);
      } catch (e) {
        console.error('Error toggling dark mode:', e);
      }
    });
  }

  // Watch for system color scheme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      try {
        // Only change if user hasn't explicitly set a preference
        if (!localStorage.getItem('darkMode')) {
          setDarkMode(e.matches);
        }
      } catch (e) {
        console.error('Error handling system color scheme change:', e);
      }
    });
  }
});
