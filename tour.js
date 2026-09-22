// ===============================
// 🌐 تور مجازی سعدآباد — نسخه پانورامای واقعی ۳۶۰°
// موتور WebGL + لود خودکار عکس‌های شما از images/pano/
// ✏️ ویرایش داده‌ها فقط در همین فایل
// ===============================
(function () {
  'use strict';

  // ---------- ✏️ داده‌های پروژه‌ها ----------
  // عکس‌های ۳۶۰ واقعی: هر فایل را در images/pano/<proje>/<mode>/<room>.jpg بگذارید
  // تا وقتی عکس نباشد، پانورامای نمونه گرافیکی نمایش داده می‌شود
  const TOURS = {
    aftab: {
      title: 'برج مسکونی آفتاب — واحد نوعی ۱۲۰ متری',
      specs: [
        ['تعداد طبقات', '۱۵ طبقه'],
        ['واحد در هر طبقه', '۴ واحد'],
        ['متراژ واحدها', '۱۱۵ تا ۱۸۰ متر'],
        ['زمان تحویل', 'بهار ۱۴۰۵'],
        ['پیشرفت فعلی', '٪۷۵'],
        ['سند', 'تک‌برگ — قابل انتقال'],
      ],
      features: ['لابی‌من مجهز', 'پارکینگ مسقف', 'انباری اختصاصی', 'آسانسور دو واحدی',
                 'روف‌گاردن', 'ژنراتور اضطراری', 'درب ضدسرقت', 'پکیج و رادیاتور', 'پنجره دوجداره UPVC'],
      plan: true,
      start: 'living',
      rooms: {
        living:  { name: 'نشیمن و پذیرایی', area: '۴۲ متر',
          desc: 'بزرگ‌ترین فضای واحد؛ نورگیر کامل با پنجره دوجداره و دید باز. کف پارکت بلوط و دیوارهای گچ‌وشسته آماده رنگ.',
          doors: [{ to: 'kitchen', label: 'آشپزخانه' }, { to: 'hall', label: 'راهرو' }, { to: 'balcony', label: 'بالکن' }] },
        kitchen: { name: 'آشپزخانه', area: '۱۴ متر',
          desc: 'اُپن با کابینت تمام‌قد، هود و صفحه شیشه‌ای و نورپردازی مخفی زیر کابینت.',
          doors: [{ to: 'living', label: 'نشیمن' }] },
        hall:    { name: 'راهرو', area: '۱۰ متر',
          desc: 'دسترسی به اتاق‌ها و سرویس با کمد دیواری تعبیه‌شده.',
          doors: [{ to: 'living', label: 'نشیمن' }, { to: 'master', label: 'اتاق مستر' }, { to: 'bed2', label: 'اتاق خواب' }, { to: 'bath', label: 'سرویس' }] },
        balcony: { name: 'بالکن', area: '۱۸ متر',
          desc: 'سرپوشیده با نمای باز؛ کف سرامیک ضدلغزش و جالباسی سقفی.',
          doors: [{ to: 'living', label: 'نشیمن' }] },
        bath:    { name: 'سرویس و حمام', area: '۶ متر',
          desc: 'سرامیک تا سقف، شیشه سکوریت و روشنایی ضدبخار.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        bed2:    { name: 'اتاق خواب', area: '۱۶ متر',
          desc: 'مناسب اتاق کودک یا میهمان با پنجره‌ی نورگیر.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        master:  { name: 'اتاق خواب مستر', area: '۲۰ متر',
          desc: 'کمد دیواری سراسری و جای استاندارد تخت دوبل با پنجره‌ی دید باز.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
      },
    },

    negar: {
      title: 'مجتمع تجاری-اداری نگار — واحد نوعی اداری',
      specs: [
        ['تعداد طبقات', '۹ طبقه'],
        ['نوع کاربری', 'اداری — تجاری'],
        ['متراژ واحدها', '۶۰ تا ۲۴۰ متر'],
        ['زمان تحویل', 'پاییز ۱۴۰۵'],
        ['پیشرفت فعلی', '٪۴۵'],
        ['تهویه', 'چیلر مرکزی'],
      ],
      features: ['لابی‌من', 'سالن کنفرانس مشترک', 'پارکینگ رباتیک', 'سیستم BMS',
                 'آسانسور سریع', 'فایبر‌اپتیک', 'دیزل ژنراتور', 'دسترسی مترو'],
      plan: false,
      start: 'lobby',
      rooms: {
        lobby:   { name: 'لابی و پذیرش', area: '۶۰ متر',
          desc: 'میز پذیرش سنگی، دیوار ونچر و روشنایی خطی مخفی.',
          doors: [{ to: 'open', label: 'فضای اداری' }, { to: 'meeting', label: 'اتاق جلسات' }, { to: 'manag', label: 'اتاق مدیریت' }] },
        open:    { name: 'فضای اداری باز', area: '۲۴۰ متر',
          desc: 'چیدمان باز برای ۱۲ ایستگاه کار با پارتیشن شیشه‌ای و تهویه مرکزی.',
          doors: [{ to: 'lobby', label: 'لابی' }] },
        meeting: { name: 'اتاق جلسات', area: '۳۰ متر',
          desc: 'میز ۱۲ نفره، ویدئوپروژکتور و دیوار آکوستیک.',
          doors: [{ to: 'lobby', label: 'لابی' }] },
        manag:   { name: 'اتاق مدیریت', area: '۴۰ متر',
          desc: 'دید سراسری به فضای اداری با سرویس اختصاصی.',
          doors: [{ to: 'lobby', label: 'لابی' }] },
      },
    },

    zeytoon: {
      title: 'شهرک ویلایی زیتون — ویلای دوبلکس نمونه',
      specs: [
        ['تعداد واحدها', '۴۰ ویلای دوبلکس'],
        ['متراژ هر ویلا', '۲۲۰ متر + حیاط'],
        ['زمان تحویل', 'تابستان ۱۴۰۶'],
        ['پیشرفت فعلی', '٪۲۰'],
        ['محوطه', '۲۴ ساعته امنیت'],
        ['سند', 'تک‌برگ'],
      ],
      features: ['حیاط اختصاصی', 'آلاچیق و باربیکیو', 'پارکینگ سرپوشیده', 'استخر فصلی مشاع',
                 'نمای سنگ تراورتن', 'شومینه', 'محوطه‌سازی سرسبز', 'درب برقی'],
      plan: false,
      start: 'vliving',
      rooms: {
        vliving: { name: 'نشیمن ویلا', area: '۵۵ متر',
          desc: 'شومینه سنگی و نمای سراسری به جنگل؛ قلب ویلا با ارتفاع سقف ۳/۲۰ متر.',
          doors: [{ to: 'vkitchen', label: 'آشپزخانه' }, { to: 'vmaster', label: 'طبقه بالا' }, { to: 'terr', label: 'تراس' }] },
        vkitchen:{ name: 'آشپزخانه', area: '۱۸ متر',
          desc: 'کابینت چوب گردو با صفحه سنگ مرمریت و نور مخفی.',
          doors: [{ to: 'vliving', label: 'نشیمن' }] },
        terr:    { name: 'تراس جنگلی', area: '۳۰ متر',
          desc: 'دکینگ چوبی با آلاچیق و چشم‌انداز ابرهای جنگل نور.',
          doors: [{ to: 'vliving', label: 'نشیمن' }] },
        vmaster: { name: 'اتاق مستر — طبقه دوم', area: '۲۵ متر',
          desc: 'پنجره سراسری با چشم‌انداز دره و بالکن اختصاصی.',
          doors: [{ to: 'vliving', label: 'طبقه همکف' }] },
      },
    },
  };

  // ---------- المان‌ها ----------
  const modal    = document.getElementById('tourModal');
  const titleEl  = document.getElementById('tourTitle');
  const infoBody = document.getElementById('tourInfoBody');
  const planWrap = document.getElementById('planWrap');
  const planNote = document.getElementById('planNote');
  const planHint = document.getElementById('planHint');
  const planDet  = document.getElementById('planDetail');
  const planGo   = document.getElementById('planEnter');
  const canvas   = document.getElementById('panoCanvas');
  const hsBox    = document.getElementById('hotspots');
  const badge    = document.getElementById('panoBadge');
  const fade     = document.getElementById('walkFade');
  const rName    = document.getElementById('roomName');
  const rArea    = document.getElementById('roomArea');
  const rDesc    = document.getElementById('roomDesc');
  const bSkel    = document.getElementById('skSkel');
  const bFin     = document.getElementById('skFin');
  if (!modal) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- وضعیت ----------
  let currentKey = null;
  let curRoom = null;
  let curTab = 'info';
  let skel = false;
  let walkInit = false;
  let selectedRoom = null;

  // ===============================
  // 📸 موتور پانوراما (WebGL — بدون کتابخانه)
  // ===============================
  const gl = canvas.getContext('webgl', { antialias: true }) || canvas.getContext('experimental-webgl');
  let prog = null, uni = {}, tex = null;
  let yaw = -90, pitch = 0, fov = 75;      // yaw بر حسب درجه
  let yawT = yaw, pitchT = pitch, fovT = fov;
  const MAX_FOV = 100, MIN_FOV = 45;

  const VSH = `
    attribute vec2 aPos;
    varying vec2 vUV;
    void main(){ vUV = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
  `;
  const FSH = `
    precision mediump float;
    varying vec2 vUV;
    uniform sampler2D uTex;
    uniform vec2 uRes;
    uniform float uYaw;
    uniform float uPitch;
    uniform float uFov;
    void main(){
      float lon = radians((vUV.x - 0.5) * uFov * (uRes.x / uRes.y) + uYaw);
      float lat = radians((0.5 - vUV.y) * uFov + uPitch);
      // اکوری‌کتنگولار: نگاشت به کره
      vec3 dir = vec3(
        sin(lon) * cos(lat),
        sin(lat),
        -cos(lon) * cos(lat)
      );
      vec2 uv = vec2(
        0.5 + atan(dir.x, -dir.z) / 6.2831853,
        0.5 - asin(clamp(dir.y, -1.0, 1.0)) / 3.1415926
      );
      gl_FragColor = texture2D(uTex, uv);
    }
  `;

  function shader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('shader:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function initGL() {
    if (!gl) return false;
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VSH));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FSH));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('link:', gl.getProgramInfoLog(prog));
      prog = null;
      return false;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1,  1,-1,  -1,1,  -1,1,  1,-1,  1,1
    ]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    uni.uTex  = gl.getUniformLocation(prog, 'uTex');
    uni.uRes  = gl.getUniformLocation(prog, 'uRes');
    uni.uYaw  = gl.getUniformLocation(prog, 'uYaw');
    uni.uPitch= gl.getUniformLocation(prog, 'uPitch');
    uni.uFov  = gl.getUniformLocation(prog, 'uFov');

    tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return true;
  }

  function resizeGL() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth * dpr | 0;
    const h = canvas.clientHeight * dpr | 0;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  function renderGL() {
    if (!prog) return;
    // حرکت نرم به سمت هدف
    yaw   += (yawT - yaw) * 0.14;
    pitch += (pitchT - pitch) * 0.14;
    fov   += (fovT - fov) * 0.12;

    resizeGL();
    gl.uniform2f(uni.uRes, canvas.width, canvas.height);
    gl.uniform1f(uni.uYaw, yaw);
    gl.uniform1f(uni.uPitch, pitch);
    gl.uniform1f(uni.uFov, fov);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(renderGL);
  }

  // ---------- پانورامای نمونه (تا عکس‌های واقعی نرسند) ----------
  const SAMPLE_CACHE = {};
  function makeSample(room, mode, key) {
    const id = key + '|' + mode + '|' + room;
    if (SAMPLE_CACHE[id]) return SAMPLE_CACHE[id];

    const W = 2048, H = 1024;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');

    const palette = {
      living:  { wall: '#F6EFDF', trim: '#DCCBA4' }, kitchen:{ wall: '#EDF0ED', trim: '#C9CEC9' },
      hall:    { wall: '#F1EBDC', trim: '#D8CDB4' }, balcony: { wall: '#E8ECDD', trim: '#C2CCA9' },
      bath:    { wall: '#E7F1F0', trim: '#BFD6D3' }, bed2:    { wall: '#EFEBE0', trim: '#D5CBB6' },
      master:  { wall: '#F1E7D7', trim: '#DCCBA8' }, lobby:   { wall: '#EFE9DC', trim: '#D6CCB4' },
      open:    { wall: '#EDF0F3', trim: '#C6CDD6' }, meeting: { wall: '#ECEAE3', trim: '#CCC9BE' },
      manag:   { wall: '#F0E8DA', trim: '#D8CBAD' }, vliving: { wall: '#F0E8D6', trim: '#D9C8A4' },
      vkitchen:{ wall: '#EDE8DC', trim: '#CFC5AE' }, terr:    { wall: '#E6E9DC', trim: '#BFC7A9' },
      vmaster: { wall: '#EFE5D4', trim: '#D8C6A2' },
    };
    const pal = palette[room] || { wall: '#F0EAD9', trim: '#D8CCAF' };
    const isSkel = (mode === 'skel');

    // آسمان/نور سقف
    const g = c.createLinearGradient(0, 0, 0, H);
    if (isSkel) {
      g.addColorStop(0, '#8E8779'); g.addColorStop(0.5, '#A69E90'); g.addColorStop(1, '#6E675C');
    } else {
      g.addColorStop(0, '#FDFBF4'); g.addColorStop(0.42, pal.wall); g.addColorStop(1, '#8C7A5C');
    }
    c.fillStyle = g; c.fillRect(0, 0, W, H);

    // خط افق و کف
    const fy = H * 0.68;
    c.fillStyle = isSkel ? '#7E776B' : '#B08D5E';
    c.fillRect(0, fy, W, H - fy);

    // پارکت / بتن
    if (isSkel) {
      c.strokeStyle = 'rgba(0,0,0,.14)';
      for (let x = 0; x < W; x += 90) { c.beginPath(); c.moveTo(x, fy); c.lineTo(x - 160, H); c.stroke(); }
    } else {
      c.strokeStyle = 'rgba(0,0,0,.10)';
      for (let x = 0; x < W; x += 110) { c.beginPath(); c.moveTo(x, fy); c.lineTo(x - 220, H); c.stroke(); }
      for (let y = fy; y < H; y += 46) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    }

    // ستون‌ها و درگاه‌های ساده (حس فضا)
    for (let i = 0; i < 6; i++) {
      const x = (i + 0.5) * (W / 6);
      c.fillStyle = isSkel ? 'rgba(60,55,48,.35)' : 'rgba(120,100,70,.14)';
      c.fillRect(x - 26, H * 0.18, 52, fy - H * 0.18);
    }

    // پنجره نورگیر در یک سمت
    const winX = W * 0.2;
    const wg = c.createLinearGradient(0, H * 0.22, 0, fy);
    if (isSkel) { wg.addColorStop(0, '#B9C2BB'); wg.addColorStop(1, '#98A29B'); }
    else { wg.addColorStop(0, '#DFF0FA'); wg.addColorStop(1, '#BED9E8'); }
    c.fillStyle = wg;
    c.fillRect(winX, H * 0.24, W * 0.16, fy - H * 0.24);
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 10;
    c.strokeRect(winX, H * 0.24, W * 0.16, fy - H * 0.24);

    if (isSkel) {
      // نوار خطر و قالب‌بندی
      c.fillStyle = 'rgba(232,161,60,.85)';
      for (let x = 0; x < W; x += 80) c.fillRect(x, fy - 26, 44, 12);
      c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 4;
      for (let x = 0; x < W; x += 130) { c.beginPath(); c.moveTo(x, H * 0.18); c.lineTo(x + 60, fy); c.stroke(); }
    } else {
      // قرنیز و ابزار نور
      c.fillStyle = pal.trim;
      c.fillRect(0, fy - 16, W, 16);
      c.fillStyle = 'rgba(255,246,214,.8)';
      for (let i = 0; i < 5; i++) {
        const x = (i + 0.5) * (W / 5);
        c.beginPath(); c.ellipse(x, H * 0.14, 44, 15, 0, 0, 6.29); c.fill();
      }
    }

    // برچسب «نمونه»
    c.fillStyle = 'rgba(0,0,0,.4)';
    c.fillRect(0, H * 0.86, W, 54);
    c.fillStyle = '#EFE8D6';
    c.font = 'bold 34px Vazirmatn, Tahoma, sans-serif';
    c.textAlign = 'center';
    c.fillText('تصویر نمونه ۳۶۰° — با عکس واقعی پروژه جایگزین می‌شود', W / 2, H * 0.86 + 38);

    const img = new Image();
    img.src = cv.toDataURL('image/jpeg', 0.82);
    SAMPLE_CACHE[id] = img;
    return img;
  }

  // لود عکس واقعی یا نمونه
  function loadPano(room, mode, key) {
    return new Promise(resolve => {
      const real = 'images/pano/' + key + '/' + mode + '/' + room + '.jpg';
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { badge.textContent = '🖼 پانورامای واقعی ۳۶۰°'; resolve(img); };
      img.onerror = () => {
        const s = makeSample(room, mode, key);
        s.onload = () => { badge.textContent = '🖼 تصویر نمونه ۳۶۰°'; resolve(s); };
        if (s.complete) { badge.textContent = '🖼 تصویر نمونه ۳۶۰°'; resolve(s); }
      };
      img.src = real;
    });
  }

  function setTexture(img) {
    if (!gl || !img) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    // عکس‌های خیلی بزرگ باید توان دوم باشند؛ برای سادگی NPOT با CLAMP کار می‌کنیم
  }

  // ---------- نقاط حرکت (Hotspot) ----------
  // هر نقطه یک زاویه‌ی ثابت (درجه) دارد؛ موقع چرخش، جای روی صفحه محاسبه می‌شود
  let spots = []; // {to,label,yawDeg}
  function layoutSpots() {
    hsBox.innerHTML = '';
    spots.forEach(s => {
      const el = document.createElement('button');
      el.className = 'hs';
      el.innerHTML = '🚶<span>' + s.label + '</span>';
      el.addEventListener('click', () => goToRoom(s.to));
      hsBox.appendChild(el);
      s.el = el;
    });
    placeSpots();
  }

  function placeSpots() {
    const w = stage.clientWidth, h = stage.clientHeight;
    spots.forEach(s => {
      // اختلاف زاویه نسبت به نگاه فعلی
      let d = s.yawDeg - yaw;
      // نرمال‌سازی به بازه -180..180
      while (d > 180) d -= 360;
      while (d < -180) d += 360;
      const halfFovH = fov * (w / h) / 2;
      const el = s.el;
      if (!el) return;
      if (Math.abs(d) > halfFovH) { el.style.display = 'none'; return; }
      const rel = d / halfFovH;              // -1..1
      const x = (0.5 + rel * 0.5) * w;
      const y = h * 0.62 - pitch * (h / fov) * 1.1;
      el.style.display = 'grid';
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
    });
  }

  // ---------- باز و بسته ----------
  function openTour(key) {
    const data = TOURS[key];
    if (!data) return;
    currentKey = key;
    titleEl.textContent = data.title;
    buildInfo(data);
    preparePlan(data);
    selectTab('info');
    skel = false; walkInit = false;
    bFin.classList.add('active'); bSkel.classList.remove('active');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.tour-close').focus();
  }
  function closeTour() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeTour));
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeTour();
    if (curTab === 'walk') {
      if (e.key === 'ArrowRight') yawT -= 15;
      if (e.key === 'ArrowLeft')  yawT += 15;
      if (e.key === 'ArrowUp')    pitchT = clampP(pitchT + 8);
      if (e.key === 'ArrowDown')  pitchT = clampP(pitchT - 8);
    }
  });

  document.querySelectorAll('[data-tour]').forEach(btn =>
    btn.addEventListener('click', () => openTour(btn.dataset.tour))
  );

  // ---------- تب‌ها ----------
  const tabBtns = modal.querySelectorAll('.tour-tabs button');
  tabBtns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
  function selectTab(name) {
    curTab = name;
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    modal.querySelectorAll('.tour-pane').forEach(p =>
      p.classList.toggle('active', p.id === 'pane-' + name)
    );
    if (name === 'walk') {
      if (!walkInit && currentKey) {
        initGL(); walkInit = true;
        if (prog) requestAnimationFrame(renderGL);
        setupRoom(TOURS[currentKey].start);
      } else {
        // بازگشت به تب: اندازه‌ها ممکن است تغییر کرده باشند
        setTimeout(placeSpots, 50);
      }
      fitZoom();
    }
  }

  // ---------- مشخصات ----------
  function buildInfo(data) {
    const rows = data.specs.map(s =>
      '<div class="spec-item"><span>' + s[0] + '</span><b>' + s[1] + '</b></div>').join('');
    const chips = data.features.map(f => '<span>' + f + '</span>').join('');
    infoBody.innerHTML =
      '<div class="spec-grid">' + rows + '</div>' +
      '<h4 class="tour-sub">امکانات پروژه</h4>' +
      '<div class="feat-chips">' + chips + '</div>' +
      '<p class="tour-note">💡 این تور شبیه‌سازی گرافیکی از واحد نوعی است تا پیش از تحویل، فضا را تجربه کنید — و جایگزین بازدید حضوری نیست. برای هماهنگی بازدید با ما تماس بگیرید.</p>';
  }

  // ---------- نقشه ----------
  function preparePlan(data) {
    if (data.plan) {
      planWrap.style.display = '';
      planNote.style.display = 'none';
      planDet.style.display = 'none';
      planGo.style.display = 'none';
      planHint.style.display = '';
      planWrap.querySelectorAll('.p-g').forEach(g => g.classList.remove('active'));
      selectedRoom = null;
    } else {
      planWrap.style.display = 'none';
      planNote.style.display = '';
    }
  }
  const planWrapEl = document.getElementById('planWrap');
  if (planWrapEl) {
    planWrapEl.querySelectorAll('.p-g').forEach(g => {
      g.addEventListener('click', () => {
        const data = TOURS.aftab;
        const room = data.rooms[g.dataset.room];
        if (!room) return;
        planWrapEl.querySelectorAll('.p-g').forEach(x => x.classList.remove('active'));
        g.classList.add('active');
        selectedRoom = g.dataset.room;
        planHint.style.display = 'none';
        planDet.style.display = 'block';
        planDet.innerHTML = '<b>' + room.name + ' — ' + room.area + '</b>' + room.desc;
        planGo.style.display = '';
      });
    });
  }
  if (planGo) {
    planGo.addEventListener('click', () => {
      if (!selectedRoom) return;
      selectTab('walk');
      goToRoom(selectedRoom);
    });
  }

  // ---------- گشت‌وگذار ----------
  const stage = document.getElementById('walkStage');
  function clampP(p) { return Math.max(-40, Math.min(40, p)); }
  function clampY(v) { return v; } // آزاد ۳۶۰

  function fitZoom() { fovT = MAX_FOV; }

  function setupRoom(id) {
    const data = TOURS[currentKey];
    const room = data.rooms[id];
    if (!room) return;
    curRoom = id;
    rName.textContent = room.name;
    rArea.textContent = '📏 ' + room.area;
    rDesc.textContent = room.desc;

    // نقاط حرکت: پخش افقی بر اساس تعداد درها
    spots = room.doors.map((d, i) => {
      const n = room.doors.length;
      return { to: d.to, label: d.label, yawDeg: -90 + (i - (n - 1) / 2) * 55 };
    });
    layoutSpots();

    loadPano(id, skel ? 'skel' : 'fin', currentKey).then(img => setTexture(img));
  }

  function goToRoom(id) {
    if (!TOURS[currentKey].rooms[id] || id === curRoom) return;
    const dur = reduced ? 0 : 300;
    fade.classList.add('on');
    setTimeout(() => {
      yaw = yawT = -90; pitch = pitchT = 0; fovT = MAX_FOV;
      setupRoom(id);
      setTimeout(() => fade.classList.remove('on'), 80);
    }, dur);
  }

  // درگ
  let dragging = false, px = 0, py = 0;
  stage.addEventListener('pointerdown', e => {
    dragging = true; px = e.clientX; py = e.clientY;
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    yawT   += (e.clientX - px) * 0.18;
    pitchT  = clampP(pitchT - (e.clientY - py) * 0.18);
    px = e.clientX; py = e.clientY;
  });
  ['pointerup', 'pointercancel'].forEach(ev =>
    stage.addEventListener(ev, () => { dragging = false; })
  );

  // زوم با اسکرول و پینچ
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    fovT = Math.max(MIN_FOV, Math.min(MAX_FOV, fovT + Math.sign(e.deltaY) * 6));
  }, { passive: false });

  let pinch = null;
  stage.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                         e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: true });
  stage.addEventListener('touchmove', e => {
    if (pinch && e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                           e.touches[0].clientY - e.touches[1].clientY);
      fovT = Math.max(MIN_FOV, Math.min(MAX_FOV, fovT - (d - pinch) * 0.25));
      pinch = d;
    }
  }, { passive: true });
  stage.addEventListener('touchend', () => { pinch = null; }, { passive: true });

  // جای‌گذاری نقاط هنگام چرخش نرم
  (function loop() {
    if (prog) placeSpots();
    requestAnimationFrame(loop);
  })();

  // سوییچ اسکلت / تکمیل‌شده
  bSkel.addEventListener('click', () => { skel = true;  bSkel.classList.add('active'); bFin.classList.remove('active'); reloadPano(); });
  bFin.addEventListener('click',  () => { skel = false; bFin.classList.add('active');  bSkel.classList.remove('active'); reloadPano(); });
  function reloadPano() {
    if (!curRoom) return;
    loadPano(curRoom, skel ? 'skel' : 'fin', currentKey).then(img => setTexture(img));
  }
})();