// ==========================================
// ZS COMPANY — SCRIPT.JS (OTIMIZADO PARA MOBILE)
// ==========================================

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

// ------------------------------------------
// NAVBAR SCROLL
// ------------------------------------------
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ------------------------------------------
// CURSOR PERSONALIZADO (APENAS DESKTOP)
// ------------------------------------------
const cursor = document.querySelector('.cursor-dot');

if (cursor && !isTouchDevice) {
  document.addEventListener('mousemove', (event) => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${event.clientX - 4}px, ${event.clientY - 4}px)`;
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

// ------------------------------------------
// ANIMAÇÕES AO ROLAR A PÁGINA
// ------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: isTouchDevice ? 0.05 : 0.12
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

// ------------------------------------------
// MODAL DE PROJETOS / SHOWREEL
// ------------------------------------------
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');

function openModal(title = 'THE SHOWREEL', category = 'SHOWREEL') {
  if (!modal) return;

  if (modalTitle) modalTitle.textContent = title;
  if (modalCategory) modalCategory.textContent = category;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal="showreel"]').forEach((button) => {
  button.addEventListener('click', () => {
    openModal('THE SHOWREEL', 'SHOWREEL');
  });
});

document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.project-link');
    if (!clickedButton && !isTouchDevice) return;

    const title = card.dataset.title || 'PROJECT';
    const category = card.dataset.category || 'PROJECT';

    openModal(title, category);
  });
});

const closeButton = document.querySelector('.modal-close');
if (closeButton) {
  closeButton.addEventListener('click', closeModal);
}

const modalBackdrop = document.querySelector('.modal-backdrop');
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// ------------------------------------------
// FORMULÁRIO DE CONTATO
// ------------------------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');

    alert(`Obrigado, ${name}! Sua mensagem foi enviada.`);
    contactForm.reset();
  });
}

// ------------------------------------------
// EFEITO 3D NOS CARDS (DESATIVADO EM TOUCH)
// ------------------------------------------
if (!isTouchDevice) {
  document.querySelectorAll('.work-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 4;

      card.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ------------------------------------------
// MENU MOBILE (SINCRONIZADO COM CSS .nav-open)
// ------------------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobileNav') || document.querySelector('.navbar nav');

if (menuToggle && navbar) {
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = navbar.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('click', (event) => {
    if (navbar.classList.contains('nav-open') && !event.target.closest('.navbar')) {
      navbar.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ------------------------------------------
// PARALLAX NO HERO (DESATIVADO EM TOUCH)
// ------------------------------------------
const heroGlowA = document.querySelector('.glow-a');
const heroGlowB = document.querySelector('.glow-b');

if (!isTouchDevice && (heroGlowA || heroGlowB)) {
  window.addEventListener('mousemove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    if (heroGlowA) {
      heroGlowA.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
    }

    if (heroGlowB) {
      heroGlowB.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    }
  }, { passive: true });
}

// ------------------------------------------
// ANO ATUAL NO FOOTER
// ------------------------------------------
const footerYear = document.querySelector('[data-current-year]');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

console.log('ZS Company — Script mobile e desktop inicializado com sucesso.');