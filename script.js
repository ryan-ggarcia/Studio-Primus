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
  { day: 'Monday', classes: [{ time: '07:00', level: 'All Levels' }, { time: '18:00', level: 'Beginner' }, { time: '20:00', level: 'Advanced' }] },
  { day: 'Tuesday', classes: [{ time: '06:30', level: 'Conditioning' }, { time: '19:00', level: 'Intermediate' }, { time: '20:30', level: 'Sparring' }] },
  { day: 'Wednesday', classes: [{ time: '07:00', level: 'All Levels' }, { time: '18:00', level: 'Beginner' }, { time: '20:00', level: 'Advanced' }] },
  { day: 'Thursday', classes: [{ time: '06:30', level: 'Conditioning' }, { time: '19:00', level: 'Intermediate' }, { time: '20:30', level: 'Sparring' }] },
  { day: 'Friday', classes: [{ time: '07:00', level: 'All Levels' }, { time: '18:00', level: 'Technique' }, { time: '19:30', level: 'Advanced' }] },
  { day: 'Saturday', classes: [{ time: '09:00', level: 'Open Mat' }, { time: '10:30', level: 'Kids' }] },
  { day: 'Sunday', classes: [{ time: 'Rest', level: 'Recover & Repeat' }] },
  { day: 'Private', classes: [{ time: 'By appt.', level: '1-on-1 coaching' }] },
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
  { name: 'Lucas Ferreira', text: "Amazing environment and very attentive coaches! I've evolved more in 3 months than in years elsewhere.", rating: 5 },
  { name: 'Mariana Silva', text: 'Best Muay Thai gym in the region! Professional, clean, and welcoming for women.', rating: 5 },
  { name: 'Rafael Costa', text: 'The coaches really care about your technique. Got me ready for my first amateur fight.', rating: 5 },
  { name: 'Beatriz Almeida', text: "I came for fitness, stayed for the family vibe. Best decision I've made this year.", rating: 5 },
  { name: 'Diego Martins', text: 'World-class structure right here in Prudente. Worth every centavo.', rating: 5 },
  { name: 'Camila Rocha', text: 'Beginners are taken seriously. I went from zero to competing in 8 months.', rating: 5 },
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
  const msg = `Hi! I'm ${data.get('name')} (${data.get('phone')}). ${data.get('message')}`;
  window.open(`https://wa.me/5518999999999?text=${encodeURIComponent(msg)}`, '_blank');
});
