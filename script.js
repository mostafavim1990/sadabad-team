// ===============================
// 🎬 اینتروی هوشمند: بار اول ۳ ثانیه، دفعات بعد ۱.۲ ثانیه
// ===============================
const intro = document.getElementById('intro');
const introLogo = document.getElementById('introLogo');
const navLogo = document.querySelector('.navbar .logo');

const SEEN_KEY = 'saadabad_intro_seen';
const seenBefore = sessionStorage.getItem(SEEN_KEY) === '1';
const GLOW_TIME = seenBefore ? 1200 : 3000; // ✏️ مدت درخشش
const FLY_TIME = 1000;

function revealSite() {
  document.body.classList.remove('loading');
  document.body.classList.add('site-in');
  if (intro && intro.parentNode) intro.remove();
}

function flyToNav() {
  if (!intro || intro.classList.contains('flying')) return;
  intro.classList.add('flying');
  sessionStorage.setItem(SEEN_KEY, '1');

  const navRect = navLogo.getBoundingClientRect();
  const logoRect = introLogo.getBoundingClientRect();
  const dx = (navRect.left + navRect.width / 2) - (logoRect.left + logoRect.width / 2);
  const dy = (navRect.top + navRect.height / 2) - (logoRect.top + logoRect.height / 2);
  const scale = navRect.height / logoRect.height;

  introLogo.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';

  setTimeout(() => {
    intro.classList.add('done');
    revealSite();
  }, FLY_TIME);
}

if (intro && navLogo) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timer = setTimeout(flyToNav, reduced ? 800 : GLOW_TIME);
  intro.addEventListener('click', () => { clearTimeout(timer); flyToNav(); });
}

// ===============================
// 🌟 ذرات طلایی شناور
// ===============================
function makeParticles(id, count) {
  const box = document.getElementById(id);
  if (!box) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
    s.style.setProperty('--s', (Math.random() * 5 + 2.5).toFixed(1) + 'px');
    s.style.setProperty('--t', (Math.random() * 10 + 9).toFixed(1) + 's');
    s.style.setProperty('--dl', (-Math.random() * 18).toFixed(1) + 's');
    s.style.setProperty('--o', (Math.random() * .5 + .35).toFixed(2));
    frag.appendChild(s);
  }
  box.appendChild(frag);
}
makeParticles('heroParticles', 26);
makeParticles('heritageParticles', 20);

// ===============================
// 🧭 اسکرول: منو + بخش فعال + نوار پیشرفت + دکمه بالا
// ===============================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('header[id], section[id]');
const progressBar = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');

function onScroll() {
  const y = window.scrollY;

  navbar.classList.toggle('scrolled', y > 40);
  if (toTop) toTop.classList.toggle('show', y > 600);

  if (progressBar) {
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = max > 0 ? (y / max) * 100 + '%' : '0';
  }

  let current = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (toTop) {
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// 📱 منوی موبایل
const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
  })
);

// ===============================
// ✨ انیمیشن ظاهر شدن هنگام اسکرول
// ===============================
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===============================
// 🔢 شمارنده‌های آمار (اعداد فارسی)
// ===============================
function animateCount(el) {
  const target = +el.dataset.count;
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString('fa-IR');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statIO.unobserve(e.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('.stat-num').forEach(el => statIO.observe(el));

// ===============================
// 📊 نوارهای پیشرفت پروژه‌ها
// ===============================
const progIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.progress-fill');
      fill.style.width = fill.dataset.progress + '%';
      progIO.unobserve(e.target);
    }
  });
}, { threshold: .4 });
document.querySelectorAll('.progress').forEach(el => progIO.observe(el));

// ===============================
// 🔍 فیلتر گالری
// ===============================
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hide', cat !== 'all' && card.dataset.cat !== cat);
    });
  });
});

// ===============================
// 💬 اسلایدر نظرات مشتریان
// ===============================
(function () {
  const track = document.getElementById('testiTrack');
  const dotsBox = document.getElementById('testiDots');
  const slider = document.getElementById('testiSlider');
  if (!track || !dotsBox || !slider) return;

  const total = track.children.length;
  let cur = 0, autoTimer = null;

  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'نظر شماره ' + (i + 1));
    d.addEventListener('click', () => go(i));
    dotsBox.appendChild(d);
  }
  const dots = dotsBox.querySelectorAll('.dot');

  function go(i) {
    cur = (i + total) % total;
    // چیدمان راست‌به‌چپ: نمایش کارت بعدی با حرکت به راست
    track.style.transform = 'translateX(' + (cur * 100) + '%)';
    dots.forEach((d, j) => d.classList.toggle('active', j === cur));
    restart();
  }

  function restart() {
    clearInterval(autoTimer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      autoTimer = setInterval(() => go(cur + 1), 6000); // ✏️ سرعت تعویض خودکار
    }
  }

  // توقف هنگام هاور
  slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slider.addEventListener('mouseleave', restart);

  // سوایپ لمسی برای موبایل
  let startX = null;
  track.addEventListener('pointerdown', e => { startX = e.clientX; });
  window.addEventListener('pointerup', e => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) go(cur + (dx > 0 ? 1 : -1));
    startX = null;
  });

  restart();
})();

// ===============================
// ✉️ فرم تماس
// ===============================
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.querySelector('input[type=text]').value;
  const phone = this.querySelector('input[type=tel]').value;
  const msg = this.querySelector('textarea').value;
  const subject = encodeURIComponent('پیام از سایت — درخواست مشاوره');
  const body = encodeURIComponent('نام: ' + name + '\nشماره تماس: ' + phone + '\n\n' + msg);
  // ✏️ ایمیل شرکت را اینجا عوض کنید
  window.location.href = 'mailto:info@saadabad.ir?subject=' + subject + '&body=' + body;
});