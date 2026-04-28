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
const reviewCard = r => `
  <div class="review-card" data-author="${r.name}">
    <button class="review-action" aria-label="Abrir conversa"><i data-lucide="message-circle"></i></button>
    <div class="review-stars">${Array.from({ length: r.rating }).map(() => '<i data-lucide="star" style="fill:currentColor"></i>').join('')}</div>
    <p class="review-text">"${r.text}"</p>
    <div class="review-author">
      <div class="avatar">${r.name[0]}</div>
      <div class="review-name">${r.name}</div>
    </div>
  </div>
`;
// Duplicate cards for infinite marquee scroll on mobile
const allCards = reviews.map(reviewCard).join('');
reviewsGrid.innerHTML = allCards + allCards;

// Re-render icons after dynamic content
if (window.lucide) window.lucide.createIcons();

// Add event listeners to review action buttons (mobile)
function bindReviewActions() {
  const actions = document.querySelectorAll('.review-action');
  actions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.review-card');
      const author = card?.dataset.author || '';
      // Brief pulse animation to highlight
      card.animate([
        { transform: 'scale(1)', boxShadow: 'var(--shadow-card)' },
        { transform: 'scale(1.02)', boxShadow: 'var(--shadow-elevated)' },
        { transform: 'scale(1)', boxShadow: 'var(--shadow-card)' }
      ], { duration: 300 });
      // Open WhatsApp chat with prefilled message referencing the review author
      const msg = `Olá! Vi o depoimento do ${author} no site e gostaria de saber mais.`;
      window.open(`https://wa.me/5518999999999?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

// Bind after DOM insert
bindReviewActions();

// Contact form -> WhatsApp with phone mask and message moderation
const form = document.getElementById('contactForm');
const phoneInput = form.querySelector('input[name="phone"]');
const messageInput = form.querySelector('textarea[name="message"]');

function onlyDigits(str) { return String(str).replace(/\D/g, ''); }
function normalizeText(str) { return String(str).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase(); }

function formatBRPhone(value) {
  const d = onlyDigits(value);
  if (!d) return '';
  if (d.length <= 2) return '(' + d;
  if (d.length <= 6) return '(' + d.slice(0,2) + ') ' + d.slice(2);
  if (d.length <= 10) return '(' + d.slice(0,2) + ') ' + d.slice(2,6) + '-' + d.slice(6);
  // 11+ digits (mobile with 9)
  return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7,11);
}

// Simple blacklist of offensive words (adjustable). We normalize accents before check.
const offensiveWords = ['idiota','burro','imbecil','otario','palhaco','palhaço','estupido'];

// show inline error under input
function showFieldError(field, message) {
  clearFieldError(field);
  const el = document.createElement('div');
  el.className = 'input-error';
  el.textContent = message;
  field.parentNode.appendChild(el);
}
function clearFieldError(field) {
  const next = field.parentNode.querySelector('.input-error');
  if (next) next.remove();
}

// Mask phone while typing
phoneInput.addEventListener('input', (e) => {
  const pos = e.target.selectionStart;
  e.target.value = formatBRPhone(e.target.value);
  // move cursor to end (simpler and reliable)
  e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
  clearFieldError(phoneInput);
});

// Remove errors when user types message
messageInput.addEventListener('input', () => clearFieldError(messageInput));

// Enhanced phone validation using google-libphonenumber (if available)
function isValidPhoneNumberBR(digits) {
  // digits: only numbers string
  try {
    if (!window.libphonenumber) return null; // library not loaded
    const phoneUtil = window.libphonenumber.PhoneNumberUtil.getInstance();
    const number = phoneUtil.parseAndKeepRawInput(digits, 'BR');
    const isPossible = phoneUtil.isPossibleNumber(number);
    const isValid = phoneUtil.isValidNumber(number);
    return { isPossible, isValid };
  } catch (err) {
    return null;
  }
}

// Submit handler re-defined with enhanced phone validation
form.removeEventListener && form.removeEventListener('submit', () => {});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearFieldError(phoneInput);
  clearFieldError(messageInput);

  const data = new FormData(form);
  const name = (data.get('name') || '').trim();
  const phoneRaw = data.get('phone') || '';
  const phoneDigits = onlyDigits(phoneRaw);
  const message = (data.get('message') || '').trim();

  // Validate phone length quickly
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    showFieldError(phoneInput, 'Digite um telefone válido com DDD (10 ou 11 dígitos).');
    phoneInput.focus();
    return;
  }

  // If libphonenumber is present, use it
  const libCheck = isValidPhoneNumberBR(phoneRaw);
  if (libCheck) {
    if (!libCheck.isPossible) {
      showFieldError(phoneInput, 'Número de telefone improvável para o Brasil. Verifique os dígitos.');
      phoneInput.focus();
      return;
    }
    if (!libCheck.isValid) {
      showFieldError(phoneInput, 'Número inválido. Verifique o DDD e o número.');
      phoneInput.focus();
      return;
    }
  }

  // Check offensive vocabulary
  const normalized = normalizeText(message);
  const found = offensiveWords.find(w => new RegExp('\\b' + w + '\\b', 'i').test(normalized));
  if (found) {
    showFieldError(messageInput, 'Sua mensagem contém palavras não permitidas. Por favor, reformule.');
    messageInput.focus();
    return;
  }

  // All good -> open WhatsApp
  const msg = `Olá! Sou ${name} (${formatBRPhone(phoneDigits)}). ${message}`;
  window.open(`https://wa.me/5518991615722?text=${encodeURIComponent(msg)}`, '_blank');
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

// Make the swipe-hint a clickable CTA (mobile)
// (function bindSwipeHint() {
//   const swipe = document.querySelector('.swipe-hint');
//   if (!swipe) return;
//   swipe.setAttribute('role', 'button');
//   swipe.tabIndex = 0;
//   const openWA = () => window.open('https://wa.me/5518999999999', '_blank');
//   swipe.addEventListener('click', openWA);
//   swipe.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openWA(); }
//   });
// })();
