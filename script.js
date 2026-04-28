// Studio Primus — Vanilla JS

// Render Lucide icons once loaded
window.addEventListener('load', () => {
  if (window.lucide) window.lucide.createIcons();
});

// Header scroll effect
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
menuBtn.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navMobile.classList.remove('open'))
);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Schedule data
const schedule = [
  { day: 'Segunda', classes: [{ time: '15:30', level: 'Treino Misto' }, { time: '17:00', level: 'Treino Misto' }, { time: '18:00', level: 'Infantil' },{ time: '19:00', level: 'Treino Misto' }] },
  { day: 'Terça', classes: [{ time: '17:00', level: 'Treino Misto' }, { time: '18:00', level: 'Infantil' }, { time: '19:00', level: 'Treino Misto' }] },
  { day: 'Quarta', classes: [{ time: '15:30', level: 'Treino Misto' }, { time: '17:00', level: 'Treino Misto' },{ time: '18:00', level: 'Infantil' }, { time: '19:00', level: 'Treino Misto' }] },
  { day: 'Quinta', classes: [{ time: '15:30', level: 'Treino Misto' }, { time: '17:00', level: 'Treino Misto' }, { time: '19:00', level: 'Treino Misto' }] },
  { day: 'Sexta', classes: [{ time: '15:30', level: 'Treino Misto' }, { time: '17:00', level: 'Treino Misto' }, { time: '18:00', level: 'Infantil' }] },
  { day: 'Sábado', classes: [{ time: 'Descanso', level: 'Recuperar e Repetir' }] },
  { day: 'Domingo', classes: [{ time: 'Descanso', level: 'Recuperar e Repetir' }] },
  { day: 'Particular', classes: [{ time: 'Agendado', level: 'Treinamento 1 a 1' }] },
];

const scheduleGrid = document.getElementById('scheduleGrid');
scheduleGrid.innerHTML = schedule.map(d => `
  <div class="schedule-card">
    <div class="schedule-card-head">
      <h3>${d.day}</h3>
      <i data-lucide="calendar" class="gold-deep"></i>
    </div>
    <ul>
      ${d.classes.map(c => `<li><span class="schedule-time">${c.time}</span><span class="schedule-level">${c.level}</span></li>`).join('')}
    </ul>
  </div>
`).join('');

// Reviews data
const reviews = [
  { name: 'Lucas Ferreira', text: 'Ambiente incrível e treinadores muito atenciosos! Evoluí mais em 3 meses do que em anos em outros lugares.', rating: 5 },
  { name: 'Mariana Silva', text: 'Melhor academia de Muay Thai da região! Profissional, limpa e acolhedora para mulheres.', rating: 5 },
  { name: 'Rafael Costa', text: 'Os treinadores realmente se importam com a sua técnica. Me prepararam para minha primeira luta amadora.', rating: 5 },
  { name: 'Beatriz Almeida', text: 'Vim pela forma física, fiquei pelo clima de família. Melhor decisão que tomei este ano.', rating: 5 },
  { name: 'Diego Martins', text: 'Matriculei meu filho e foi a melhor decisão que tomei. Em poucos meses ele ganhou disciplina, confiança e foco nos estudos. O ambiente é seguro e os professores tratam as crianças com muito carinho e responsabilidade.', rating: 5 },
  { name: 'Camila Rocha', text: 'Iniciantes são levados a sério. Fui do zero a competir em 8 meses.', rating: 5 },
];

const reviewsGrid = document.getElementById('reviewsGrid');
reviewsGrid.innerHTML = reviews.map(r => `
  <div class="review-card">
    <div class="review-stars">${Array.from({ length: r.rating }).map(() => '<i data-lucide="star" style="fill:currentColor"></i>').join('')}</div>
    <p class="review-text">"${r.text}"</p>
    <div class="review-author">
      <div class="avatar">${r.name[0]}</div>
      <div class="review-name">${r.name}</div>
    </div>
  </div>
`).join('');

// Re-render icons after dynamic content
if (window.lucide) window.lucide.createIcons();

// Contact form -> WhatsApp
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const msg = `Olá! Sou ${data.get('name')} (${data.get('phone')}). ${data.get('message')}`;
  window.open(`https://wa.me/5518999999999?text=${encodeURIComponent(msg)}`, '_blank');
});

// ========== Scroll Fade-In Animations ==========
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach((el, i) => {
  // Add stagger delay classes to stat-cards within achievements
  const parent = el.closest('.achievements-grid');
  if (parent && el.classList.contains('stat-card')) {
    const cards = parent.querySelectorAll('.stat-card');
    const index = Array.from(cards).indexOf(el);
    if (index >= 0) el.classList.add(`delay-${index + 1}`);
  }
  animateObserver.observe(el);
});

// ========== Number Counter Animation ==========
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000; // ms
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-big[data-count]').forEach((el) => {
  counterObserver.observe(el);
});
