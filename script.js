/**
 * ============================================================================
 * MUHAMMAD SUBHAN - PERSONAL PORTFOLIO JAVASCRIPT
 * ============================================================================
 * Features:
 *  1. Dynamic Projects Data & Renderer (Easy to add/edit projects)
 *  2. Dark / Light Mode Toggle with LocalStorage persistence
 *  3. Responsive Mobile Hamburger Menu
 *  4. Smooth Scrolling & Active Navigation Link Highlighter
 *  5. Profile Image & Project Thumbnail Missing Fallback Handlers
 *  6. Back to Top Smooth Scroll Button
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     SECTION 1: PROJECTS DATA ARRAY
     ==========================================================================
     To add a new project, copy an entire { ... } block below and paste it 
     into the array. Fill in your details.
     
     PROPERTIES FOR EACH PROJECT:
     - title:       (String) Your project name.
     - description: (String) A short explanation of what your project does.
     - image:       (String) Path to your thumbnail (e.g., 'images/project1.jpg').
     - technologies:(Array)  List of tech tags (e.g., ['HTML', 'CSS', 'JavaScript']).
     - liveDemoUrl: (String) URL to the live site. Leave empty ("") to hide the button.
     - githubUrl:   (String) URL to GitHub repo. Leave empty ("") to hide the button.
     ========================================================================== */
  const projects = [
    {
      title: "Ecommerce App",
      description: "A fast, secure & fully responsive E-commerce mobile app with seamless shopping, cart, and payment integration. Built for modern online stores to boost sales and user experience.",
      image: "images/project1.jpg", /* <-- [REPLACE WITH YOUR IMAGE PATH] */
      technologies: ["HTML", "CSS", "JavaScript", "Next Js"],

      /* 
       * [PASTE YOUR LIVE DEMO URL HERE]
       * If left empty "", the "Live Demo" button will be automatically hidden.
       */
      liveDemoUrl: "https://ecommerce-app-rosy-alpha.vercel.app/",

      /* 
       * [PASTE YOUR GITHUB REPOSITORY URL HERE]
       * If left empty "", the "Source Code" button will be automatically hidden.
       */
      githubUrl: "https://github.com/msubhanattari101/Ecommerce-App"
    },
    {
      title: "Work Space Manager",
      description: "Workspace Manager is a smart project management tool that helps teams organize tasks, manage projects, and track progress in one place.",
      image: "images/project2.jpg", /* <-- [REPLACE WITH YOUR IMAGE PATH] */
      technologies: ["HTML", "CSS", "JavaScript", "Next Js"],

      /* [PASTE YOUR LIVE DEMO URL HERE] */
      liveDemoUrl: "https://e-coomerce-store-seven.vercel.app/",

      /* [PASTE YOUR GITHUB REPOSITORY URL HERE] */
      githubUrl: "https://github.com/msubhanattari101/Workspace-manager-1"
    },
    {
      title: "Personal Portfolio Template",
      description: "A minimalist, ultra-fast portfolio layout crafted with semantic HTML5, modern CSS custom properties, and accessible mobile controls.",
      image: "images/project3.jpg", /* <-- [REPLACE WITH YOUR IMAGE PATH] */
      technologies: ["HTML5", "Vanilla CSS", "JavaScript", "Responsive Design"],

      /* [PASTE YOUR LIVE DEMO URL HERE] */
      liveDemoUrl: "https://example.com/portfolio-demo",

      /* [PASTE YOUR GITHUB REPOSITORY URL HERE] */
      githubUrl: "https://github.com/msubhanattari101/Portfolio.git"
    }
  ];

  /* ==========================================================================
     SECTION 2: DYNAMIC PROJECT CARDS RENDERING
     ========================================================================== */
  const projectsContainer = document.getElementById('projects-container');

  function renderProjects() {
    if (!projectsContainer) return;

    // Clear existing contents
    projectsContainer.innerHTML = '';

    projects.forEach((project, index) => {
      // 1. Create project card element
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('aria-label', project.title);

      // 2. Generate technology badges HTML
      const techTagsHtml = project.technologies && project.technologies.length > 0
        ? project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')
        : '';

      // 3. Build action buttons HTML conditionally
      let buttonsHtml = '';

      // Live Demo button (only rendered if URL is provided and not empty)
      if (project.liveDemoUrl && project.liveDemoUrl.trim() !== '') {
        buttonsHtml += `
          <a 
            href="${project.liveDemoUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary btn-sm"
            aria-label="View live demo of ${project.title}"
          >
            Live Demo
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        `;
      }

      // Source Code button (only rendered if URL is provided and not empty)
      if (project.githubUrl && project.githubUrl.trim() !== '') {
        buttonsHtml += `
          <a 
            href="${project.githubUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-secondary btn-sm"
            aria-label="View source code on GitHub for ${project.title}"
          >
            Source Code
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </a>
        `;
      }

      // 4. Construct Card Inner HTML with fallback handling for thumbnails
      card.innerHTML = `
        <div class="project-media">
          <img 
            src="${project.image}" 
            alt="Thumbnail for ${project.title}" 
            class="project-thumbnail" 
            loading="lazy"
          >
          <div class="project-placeholder-banner" style="display: none;" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <span>${project.title}</span>
          </div>
        </div>
        <div class="project-content">
          <div class="project-tags">
            ${techTagsHtml}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-actions">
            ${buttonsHtml}
          </div>
        </div>
      `;

      // 5. Add image error listener to display placeholder if thumbnail file doesn't exist
      const img = card.querySelector('.project-thumbnail');
      const placeholder = card.querySelector('.project-placeholder-banner');
      if (img && placeholder) {
        img.addEventListener('error', () => {
          img.style.display = 'none';
          placeholder.style.display = 'flex';
        });
      }

      projectsContainer.appendChild(card);
    });
  }

  // Initial render of projects
  renderProjects();


  /* ==========================================================================
     SECTION 3: LIGHT / DARK THEME TOGGLE
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme: saved choice or system preference
  const currentTheme = storedTheme ? storedTheme : (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggleBtn.setAttribute('aria-label', `Switch to ${activeTheme} mode`);
    });
  }


  /* ==========================================================================
     SECTION 4: MOBILE NAVIGATION & HAMBURGER MENU
     ========================================================================== */
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggleBtn.classList.toggle('active', isOpen);
      menuToggleBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggleBtn.classList.remove('active');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !menuToggleBtn.contains(event.target)
      ) {
        navMenu.classList.remove('open');
        menuToggleBtn.classList.remove('active');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ==========================================================================
     SECTION 5: PROFILE PICTURE FALLBACK
     If 'images/profile.jpg' is missing, show initials placeholder gracefully.
     ========================================================================== */
  const profileImg = document.getElementById('profile-img');
  const profileFallback = document.getElementById('profile-fallback');

  if (profileImg && profileFallback) {
    if (profileImg.complete && profileImg.naturalHeight === 0) {
      profileImg.style.display = 'none';
      profileFallback.style.display = 'flex';
    }
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      profileFallback.style.display = 'flex';
    });
  }


  /* ==========================================================================
     SECTION 6: ACTIVE NAV LINK ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);


  /* ==========================================================================
     SECTION 7: BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
