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
    Swal.fire({ icon: 'warning', title: 'Alamat email tidak valid', text: 'Masukkan alamat email yang valid.', ...swalTheme() });
    return;
  }

  const btn  = contactForm.querySelector('.btn-submit');
  const span = btn.querySelector('span');
  span.textContent = 'Mengirim...';
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
      Swal.fire({ icon: 'error', title: 'Kesalahan pengiriman', text: 'Terjadi kesalahan. Silakan coba lagi.', ...swalTheme() });
    }
  } catch {
    Swal.fire({ icon: 'error', title: 'Kesalahan pengiriman', text: 'Periksa koneksi internet Anda.', ...swalTheme() });
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
   GITHUB CONTRIBUTIONS GRAPH
═══════════════════════════════════════════════ */
(async () => {
  const graphEl = document.getElementById('githubGraph');
  const totalEl = document.getElementById('githubTotal');
  if (!graphEl) return;

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
	const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const [contribRes] = await Promise.allSettled([
    fetch('https://github-contributions-api.jogruber.de/v4/JavierSA-dev?y=last')
  ]);

  if (contribRes.status !== 'fulfilled' || !contribRes.value.ok) {
    graphEl.innerHTML = '<p class="github-loading">Proses tidak dapat dimuat.</p>';
    return;
  }

  const data  = await contribRes.value.json();
  const days  = data.contributions;
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  // Etiquetas de meses
  const monthsRow = document.createElement('div');
  monthsRow.className = 'github-months-row';
  let lastMonth = -1;
  weeks.forEach(week => {
    const m = new Date(week[0].date).getMonth();
    const lbl = document.createElement('span');
    lbl.className = 'github-month-lbl';
    lbl.textContent = m !== lastMonth ? MONTHS[m] : '';
    if (m !== lastMonth) lastMonth = m;
    monthsRow.appendChild(lbl);
  });

  // Grid con etiquetas de días
  const graphBody = document.createElement('div');
  graphBody.className = 'github-body';

  const dayLabelsEl = document.createElement('div');
  dayLabelsEl.className = 'github-day-labels';
  [0,1,2,3,4,5,6].forEach(i => {
    const lbl = document.createElement('span');
    lbl.textContent = (i % 2 === 1) ? DAY_LABELS[i] : '';
    dayLabelsEl.appendChild(lbl);
  });

  const grid = document.createElement('div');
  grid.className = 'github-grid';
  weeks.forEach(week => {
    const col = document.createElement('div');
    col.className = 'github-week';
    week.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'github-day';
      cell.setAttribute('data-level', day.level);
      const fecha = new Date(day.date + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      cell.setAttribute('data-bs-toggle', 'tooltip');
      cell.setAttribute('data-bs-placement', 'top');
      cell.setAttribute('title', `${day.count} contribución${day.count !== 1 ? 'es' : ''} · ${fecha}`);
      col.appendChild(cell);
    });
    grid.appendChild(col);
  });

  graphBody.appendChild(dayLabelsEl);
  graphBody.appendChild(grid);

  // Inicializar tooltips Bootstrap tras renderizar
  requestAnimationFrame(() => {
    graphEl.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el, { trigger: 'hover' });
    });
  });

  // Leyenda
  const legend = document.createElement('div');
  legend.className = 'github-legend';
  legend.innerHTML = `
    <span>Lebih sedikit</span>
    ${[0,1,2,3,4].map(l => `<div class="github-day" data-level="${l}" style="flex-shrink:0"></div>`).join('')}
    <span>Lebih jauh</span>
  `;

  graphEl.innerHTML = '';
  graphEl.appendChild(monthsRow);
  graphEl.appendChild(graphBody);

  const total = Object.values(data.total).reduce((a, b) => a + b, 0);
  totalEl.innerHTML = `<span>${total} kontribusi dalam setahun terakhir</span>${legend.outerHTML}`;
})();

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
