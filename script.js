// 🛡 خط ۱: علامت «اسکریپت سالم است» — CSS اضطراری را خنثی می‌کند
document.documentElement.classList.add('js-ok');

// ===============================
// 🎬 اینترو: درخشش لوگو (۳ ثانیه بار اول) و پرواز به جای خودش
// ===============================
const intro = document.getElementById('intro');
const introLogo = document.getElementById('introLogo');
const navLogo = document.querySelector('.navbar .logo');

let seenBefore = false;
try {
  seenBefore = sessionStorage.getItem('saadabad_intro_seen') === '1';
} catch (e) { /* حالت ناشناس برخی مرورگرها */ }

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
  try { sessionStorage.setItem('saadabad_intro_seen', '1'); } catch (e) {}

  if (navLogo && introLogo) {
    const navRect = navLogo.getBoundingClientRect();
    const logoRect = introLogo.getBoundingClientRect();
    const dx = (navRect.left + navRect.width / 2) - (logoRect.left + logoRect.width / 2);
    const dy = (navRect.top + navRect.height / 2) - (logoRect.top + logoRect.height / 2);
    const scale = navRect.height / logoRect.height;
    introLogo.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';
  }

  setTimeout(() => {
    intro.classList.add('done');
    revealSite();
  }, FLY_TIME);
}

if (intro && navLogo) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timer = setTimeout(flyToNav, reduced ? 800 : GLOW_TIME);
  // کلیک = رد کردن سریع اینترو
  intro.addEventListener('click', () => { clearTimeout(timer); flyToNav(); });
  // 🛡 ضمانت‌نامه: در هر شرایطی بعد از ۸ ثانیه سایت نمایش داده می‌شود
  setTimeout(revealSite, 8000);
}

// ===============================
// 🌟 ذرات طلایی شناور — هیرو
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

  if (navbar) navbar.classList.toggle('scrolled', y > 40);
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
if (burger && menu) {
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
}

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
// ===============================
// ===============================
// 🔢 شمارنده‌های آمار (اعداد فارسی) — انیمیشن ۵ ثانیه‌ای موقع رسیدن به دید
// ===============================
const counted = new WeakSet();

function animateCount(el) {
  if (counted.has(el)) return;      // هر شمارنده فقط یک‌بار انیمیت می‌شود
  counted.add(el);
  const target = +el.dataset.count;
  const duration = 5000;            // ✏️ مدت شمارش (میلی‌ثانیه) — الان ۵ ثانیه
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);   // حرکت نرم: تند شروع، آرام تمام
    el.textContent = Math.round(target * eased).toLocaleString('fa-IR');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// مسیر اصلی: وقتی بخش آمار وارد دید شد، شمارش شروع می‌شود
const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statIO.unobserve(e.target);
    }
  });
}, { threshold: .3 });

document.querySelectorAll('.stat-num').forEach(el => statIO.observe(el));

// 🛡 ضمانت: اگر تا ۱۰ ثانیه بعد از لود، شمارنده‌ای هنوز شمرده نشده
// (مثلاً کاربر مستقیم با لینک # آمار آمده)، اینجا اجرایش می‌کنیم
setTimeout(() => {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    document.querySelectorAll('.stat-num').forEach(animateCount);
  }
}, 10000);
// 🛡 مسیر پشتیبان: ۳ ثانیه بعد از ورود، هر شمارنده‌ی دست‌نخورده را اجباری بشمار
setTimeout(() => {
  document.querySelectorAll('.stat-num').forEach(animateCount);
}, 3000);

// ===============================
// ===============================
// 📊 نوارهای پیشرفت — شمارش معکوس روزانه با تقویم شمسی
// ✏️ تاریخ شروع و مدت هر پروژه در index.html:
//    data-start="jy-jm-jd"  data-months="N"
// ===============================
const jalBreaks = [-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];

function jDiv(a, b) { return ~~(a / b); }
function jMod(a, b) { return a - ~~(a / b) * b; }

function jalCal(jy) {
  const bl = jalBreaks.length;
  const gy = jy + 621;
  let leapJ = -14, jp = jalBreaks[0], jm, jump = 0, n, i;
  for (i = 1; i < bl; i += 1) {
    jm = jalBreaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + jDiv(jump, 33) * 8 + jDiv(jMod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + jDiv(n, 33) * 8 + jDiv(jMod(n, 33) + 3, 4);
  if (jMod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  const leapG = jDiv(gy, 4) - jDiv((jDiv(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + jDiv(jump + 4, 33) * 33;
  let leap = jMod(jMod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;
  return { leap: leap, gy: gy, march: march };
}

function g2d(gy, gm, gd) {
  let d = jDiv((gy + jDiv(gm - 8, 6) + 100100) * 1461, 4)
      + jDiv(153 * jMod(gm + 9, 12) + 2, 5)
      + gd - 34840408;
  d = d - jDiv(jDiv(gy + 100100 + jDiv(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn) {
  let j = 4 * jdn + 139361631;
  j = j + jDiv(jDiv(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = jDiv(jMod(j, 1461), 4) * 5 + 308;
  const gd = jDiv(jMod(i, 153), 5) + 1;
  const gm = jMod(jDiv(i, 153), 12) + 1;
  const gy = jDiv(j, 1461) - 100100 + jDiv(8 - gm, 6);
  return { gy: gy, gm: gm, gd: gd };
}

function j2d(jy, jm, jd) {
  const r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - jDiv(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let k = jdn - jdn1f, jm, jd;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + jDiv(k, 31);
      jd = jMod(k, 31) + 1;
      return { jy: jy, jm: jm, jd: jd };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + jDiv(k, 30);
  jd = jMod(k, 30) + 1;
  return { jy: jy, jm: jm, jd: jd };
}

function jalMonthLength(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return (jalCal(jy).leap === 0) ? 30 : 29;
}

// «امروز» به شماره‌ی روز شمسی
const nowDate = new Date();
const todayDay = g2d(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate());

function faNum(n) { return n.toLocaleString('fa-IR'); }

function computeSchedule(startStr, months) {
  const p = startStr.split('-').map(Number);
  const startDay = j2d(p[0], p[1], p[2]);

  // پایان = شروع + N ماه شمسی
  let ey = p[0], em = p[1] + months;
  ey += Math.floor((em - 1) / 12);
  em = ((em - 1) % 12) + 1;
  const ed = Math.min(p[2], jalMonthLength(ey, em));
  const endDay = j2d(ey, em, ed);

  const total = endDay - startDay;
  const elapsed = todayDay - startDay;
  const remaining = endDay - todayDay;

  let percent = Math.round((elapsed / total) * 100);
  percent = Math.max(0, Math.min(100, percent));

  return { percent: percent, remainingDays: remaining, done: remaining <= 0 };
}

// اعمال روی هر کارت پروژه
document.querySelectorAll('.ongoing-card').forEach(card => {
  const fill = card.querySelector('.progress-fill');
  if (!fill || !fill.dataset.start) return;

  const s = computeSchedule(fill.dataset.start, +fill.dataset.months);
  fill.dataset.final = s.percent;   // برای انیمیشن پر شدن هنگام دید

  const num = card.querySelector('.prog-num');
  if (num) num.textContent = faNum(s.percent) + '٪';

  const cd = card.querySelector('.countdown');
  if (cd) {
    if (s.done) {
      cd.innerHTML = '⏰ پروژه به مرحله‌ی تحویل رسیده است';
    } else if (s.remainingDays <= 45) {
      cd.innerHTML = '⏳ <b>' + faNum(s.remainingDays) + '</b> روز تا تحویل';
    } else {
      const m = Math.floor(s.remainingDays / 30.44);
      const d = s.remainingDays - Math.round(m * 30.44);
      cd.innerHTML = '⏳ <b>' + faNum(m) + '</b> ماه و <b>' + faNum(d) + '</b> روز تا تحویل';
    }
  }
});

// انیمیشن پر شدن نوار هنگام رسیدن به دید
const progIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.progress-fill');
      if (fill && fill.dataset.final) fill.style.width = fill.dataset.final + '%';
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
// ✉️ فرم تماس — باز کردن ایمیل آماده
// ===============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type=text]').value;
    const phone = this.querySelector('input[type=tel]').value;
    const msg = this.querySelector('textarea').value;
    const subject = encodeURIComponent('پیام از سایت — درخواست مشاوره');
    const body = encodeURIComponent('نام: ' + name + '\nشماره تماس: ' + phone + '\n\n' + msg);
    // ✏️ ایمیل شرکت را اینجا عوض کنید
    window.location.href = 'mailto:info@saadabad.ir?subject=' + subject + '&body=' + body;
  });
}

// ===============================
// 🖼 گالری پروژه‌ها — لایت‌باکس ۵ عکسی
// ✏️ عکس‌ها: images/gallery/<کلید>-1.jpg تا -5.jpg
// ===============================
(function () {
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML =
    '<div class="lb-back"></div>' +
    '<div class="lb-box">' +
      '<button class="lb-close" type="button" aria-label="بستن">✕</button>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="قبلی">→</button>' +
      '<div class="lb-stage"></div>' +
      '<button class="lb-nav lb-next" type="button" aria-label="بعدی">←</button>' +
      '<div class="lb-meta"><b class="lb-title"></b><span class="lb-count"></span></div>' +
    '</div>';
  document.body.appendChild(lb);

  const stage = lb.querySelector('.lb-stage');
  const titleEl = lb.querySelector('.lb-title');
  const countEl = lb.querySelector('.lb-count');
  let slides = [], cur = 0;

  function show(i) {
    cur = (i + slides.length) % slides.length;
    stage.innerHTML = '';
    stage.appendChild(slides[cur]);
    countEl.textContent = (cur + 1) + ' / ' + slides.length;
  }
  function open(key, title) {
    slides = [];
    for (let n = 1; n <= 5; n++) {
      const wrap = document.createElement('div');
      wrap.className = 'lb-slide';
      const img = new Image();
      img.src = 'images/gallery/' + key + '-' + n + '.jpg';
      img.alt = title + ' — تصویر ' + n;
      const ph = document.createElement('div');
      ph.className = 'lb-ph';
      ph.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/></svg>' +
        '<p>عکس شماره ' + n + ' این پروژه هنوز بارگذاری نشده</p>' +
        '<small>images/gallery/' + key + '-' + n + '.jpg</small>';
      img.onload = () => wrap.classList.add('ok');
      wrap.appendChild(ph);
      wrap.appendChild(img);
      slides.push(wrap);
    }
    titleEl.textContent = title;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    show(0);
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  lb.querySelector('.lb-back').addEventListener('click', close);
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(cur - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(cur + 1));
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(cur - 1);
    if (e.key === 'ArrowLeft') show(cur + 1);
  });
  let sx = null;
  lb.addEventListener('pointerdown', e => sx = e.clientX);
  lb.addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 50) show(cur + (dx > 0 ? 1 : -1));
    sx = null;
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.gallery || 'project';
      const h = card.querySelector('h3');
      open(key, h ? h.textContent : 'پروژه');
    });
  });
})();

// ===============================
// 🙏 قدردانی — نمایش همه‌ی عزیزان
// ===============================
(function () {
  const btn = document.getElementById('peopleToggle');
  const hidden = document.querySelectorAll('.person.extra');
  if (!btn || !hidden.length) return;

  btn.addEventListener('click', () => {
    const expanded = btn.classList.toggle('expanded');
    hidden.forEach(p => p.classList.toggle('hide', !expanded));
    btn.textContent = expanded ? 'نمایش کمتر ↑' : 'نمایش همه ↓';
  });
})();