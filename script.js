// Ano automático + header sombra ao rolar
const header = document.querySelector('.site-header');
const yearEl = document.getElementById('year') || (function(){
  const small = document.querySelector('.copy');
  if (!small) return null;
  const span = document.createElement('span'); span.id = 'year';
  small.prepend(span); small.insertAdjacentText('afterbegin', '© ');
  return span;
})();
if (yearEl) yearEl.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  if (window.scrollY > 8) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}


/* Countdown Promo */
(function(){
  const el = document.getElementById('promo-countdown');
  if (!el) return;
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  const deadlineAttr = el.getAttribute('data-deadline') || '2025-12-31T23:59:59-03:00';
  const target = new Date(deadlineAttr).getTime();
  function tick(){
    const now = Date.now();
    let diff = target - now;
    if (diff <= 0){
      dEl.textContent = '0'; hEl.textContent = '00'; mEl.textContent = '00'; sEl.textContent = '00';
      const until = el.querySelector('.until'); if (until) until.textContent = 'Promoção encerrada';
      clearInterval(timer); return;
    }
    const day = 24*60*60*1000, hour = 60*60*1000, min = 60*1000, sec = 1000;
    const days = Math.floor(diff / day); diff %= day;
    const hours = Math.floor(diff / hour); diff %= hour;
    const mins = Math.floor(diff / min); diff %= min;
    const secs = Math.floor(diff / sec);
    dEl.textContent = String(days);
    hEl.textContent = String(hours).padStart(2,'0');
    mEl.textContent = String(mins).padStart(2,'0');
    sEl.textContent = String(secs).padStart(2,'0');
  }
  tick();
  const timer = setInterval(tick, 1000);
})();