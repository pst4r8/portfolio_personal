/* ═══════════════════════════════════════════════
   INIT AOS - AOS LIBRARY FOR SCROLL ANIMATIONS
═══════════════════════════════════════════════ */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

/* ═══════════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

/* ═══════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════════
   ACTIVE NAV LINK
═══════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}
updateActiveNav();

/* ═══════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ═══════════════════════════════════════════════
   TYPING EFFECT
═══════════════════════════════════════════════ */
const words   = ['Full Stack', 'Laravel', 'PHP', 'Mobile'];
const typingEl = document.getElementById('typing');
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % words.length;
    charIndex  = 0;
    delay = 400;
  }

  setTimeout(type, delay);
}
type();

/* ═══════════════════════════════════════════════
   PROJECTS FILTER
═══════════════════════════════════════════════ */
const originBtns   = document.querySelectorAll('.origin-btn');
const projectCards = document.querySelectorAll('.project-card');
const filterHint   = document.getElementById('filterHint');

originBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    originBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterHint.textContent = btn.dataset.sub;
    const origin = btn.dataset.origin;
    projectCards.forEach(card => {
      const isWork = card.classList.contains('project-work') || card.classList.contains('project-ticado');
      const show = origin === 'all'
        || (origin === 'work'     &&  isWork)
        || (origin === 'personal' && !isWork);
      card.classList.toggle('hidden', !show);
    });
    AOS.refresh();
  });
});

/* ═══════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════ */
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

const swalTheme = () => ({
  background: getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim() || '#fff',
  color:      getComputedStyle(document.documentElement).getPropertyValue('--text').trim()   || '#000',
  confirmButtonColor: '#22c55e'
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailVal = contactForm.querySelector('#email').value.trim();
  const emailOk  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

  if (!emailOk) {
    Swal.fire({ icon: 'warning', title: 'Email inválido', text: 'Introduce una dirección de correo válida.', ...swalTheme() });
    return;
  }

  const btn  = contactForm.querySelector('.btn-submit');
  const span = btn.querySelector('span');
  span.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xreyvgeq', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });

    if (res.ok) {
      contactForm.reset();
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    } else {
      Swal.fire({ icon: 'error', title: 'Error al enviar', text: 'Ha ocurrido un error. Inténtalo de nuevo.', ...swalTheme() });
    }
  } catch {
    Swal.fire({ icon: 'error', title: 'Sin conexión', text: 'Comprueba tu conexión a internet.', ...swalTheme() });
  } finally {
    span.textContent = 'Enviar mensaje';
    btn.disabled = false;
  }
});

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL FOR INTERNAL LINKS
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════
   FAB SPEED DIAL
═══════════════════════════════════════════════ */
const fabContainer = document.getElementById('fabContainer');
const fabMain      = document.getElementById('fabMain');

fabMain.addEventListener('click', () => {
  fabContainer.classList.toggle('open');
});

document.addEventListener('click', e => {
  if (!fabContainer.contains(e.target)) {
    fabContainer.classList.remove('open');
  }
});

/* ═══════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // El anillo sigue con lag suave
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Efecto hover en interactivos
  const interactives = 'a, button, [role="button"], input, textarea, label';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
