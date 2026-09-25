// ===============================
// 🌐 تور مجازی سعدآباد — v7
// پروژه‌های واقعی: سعدآباد ۱/۲/۳ (بهشهر)
// ===============================
console.log('%c SAAD-TOUR v7 ', 'background:#d4c4a8;color:#0d1b2a;font-weight:bold');

(function () {
  'use strict';

  // ---------- ✏️ داده‌های پروژه‌ها ----------
  const TOURS = {
    sadabad1: {
      title: 'سعدآباد ۱ — واحد دوخواب ۸۷ متری',
      specs: [
        ['متراژ کل ساختمان', '۷۳۶ متر'],
        ['تعداد طبقات', '۴ طبقه'],
        ['تعداد واحدها', '۶ واحد'],
        ['ترکیب واحدها', 'طبقات ۱ و ۲: دو واحد ۸۷ متری دوخواب (شمالی و جنوبی) — طبقات ۳ و ۴: یک واحد ۱۷۹ متری سه‌خواب'],
        ['محل پروژه', 'بهشهر، زمین‌های چیت‌سازی'],
        ['زمان تحویل', 'بهار ۱۴۰۷'],
      ],
      features: ['درب ضدسرقت مرغوب', 'کاشی و سرامیک ابعاد بزرگ', 'دستگیره هوشمند لمسی',
                 'سقف‌ها کامل کناف', 'سیستم اطفای حریق', 'اعلان حریق هوشمند',
                 'پارکینگ اختصاصی', 'لاین نوری حتی در پارکینگ', 'نمای تلفیقی مدرن'],
      plan: true,
      start: 'living',
      rooms: {
        living:  { name: 'نشیمن و پذیرایی', area: '۲۸ متر',
          desc: 'بزرگ‌ترین فضای واحد؛ با دیوار TV و فضای شومینه. کف سرامیک ابعاد بزرگ و سقف کناف با نور مخفی.',
          doors: [{ to: 'kitchen', label: 'آشپزخانه' }, { to: 'hall', label: 'راهرو' }] },
        kitchen: { name: 'آشپزخانه', area: '۱۱ متر',
          desc: 'آشپزخانه‌ی اُپن با کاشی و سرامیک ابعاد بزرگ و نورپردازی مدرن.',
          doors: [{ to: 'living', label: 'نشیمن' }] },
        hall:    { name: 'راهرو و ورودی', area: '۸ متر',
          desc: 'دسترسی به اتاق‌ها، سرویس‌ها و پله‌ی مشترک طبقه.',
          doors: [{ to: 'living', label: 'نشیمن' }, { to: 'bed1', label: 'اتاق خواب ۱' }, { to: 'bed2', label: 'اتاق خواب ۲' }, { to: 'bath', label: 'حمام' }, { to: 'wc', label: 'سرویس' }] },
        trass:   { name: 'تراس', area: '۴ متر',
          desc: 'فضای باز کنار اتاق خواب ۱.',
          doors: [{ to: 'bed1', label: 'اتاق خواب ۱' }] },
        bed1:    { name: 'اتاق خواب ۱', area: '۱۲ متر',
          desc: 'اتاق خواب با دسترسی مستقیم به تراس؛ دستگیره‌ی هوشمند لمسی.',
          doors: [{ to: 'hall', label: 'راهرو' }, { to: 'trass', label: 'تراس' }] },
        bed2:    { name: 'اتاق خواب ۲', area: '۱۴ متر',
          desc: 'اتاق خواب بزرگ‌تر با کمد سراسری و پنجره‌ی دید باز.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        bath:    { name: 'حمام', area: '۴ متر',
          desc: 'حمام با سرامیک تا سقف و شیشه سکوریت.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        wc:      { name: 'سرویس بهداشتی', area: '۳ متر',
          desc: 'سرویس بهداشتی جدا از حمام — راحتی روزمره‌ی مهمان‌ها.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
      },
    },

    sadabad2: {
      title: 'سعدآباد ۲ — واحد سه‌خواب ۱۳۷ متری',
      specs: [
        ['تعداد طبقات', '۴ طبقه'],
        ['واحد در هر طبقه', '۱ واحد'],
        ['متراژ هر واحد', '۱۳۷ متر'],
        ['ترکیب واحد', 'سه‌خواب با دو خواب مستر'],
        ['محل پروژه', 'بهشهر، تقاطع خیابان فرهنگیان و رجایی'],
        ['زمان تحویل', 'تابستان ۱۴۰۷'],
      ],
      features: ['درب ضدسرقت مرغوب', 'کاشی و سرامیک ابعاد بزرگ', 'دستگیره هوشمند لمسی',
                 'سقف‌ها کامل کناف', 'سیستم اطفای حریق', 'اعلان حریق هوشمند',
                 'پارکینگ اختصاصی', 'لاین نوری حتی در پارکینگ', 'نمای تلفیقی مدرن'],
      plan: false,
      start: 'living',
      rooms: {
        living:  { name: 'نشیمن و پذیرایی', area: '۳۵ متر',
          desc: 'فضای نشیمن بزرگ واحد ۱۳۷ متری با نورگیر سراسری.',
          doors: [{ to: 'kitchen', label: 'آشپزخانه' }, { to: 'hall', label: 'راهرو' }] },
        kitchen: { name: 'آشپزخانه', area: '۱۵ متر',
          desc: 'آشپزخانه با کاشی و سرامیک ابعاد بزرگ.',
          doors: [{ to: 'living', label: 'نشیمن' }] },
        hall:    { name: 'راهرو', area: '۱۰ متر',
          desc: 'دسترسی به اتاق‌ها و سرویس.',
          doors: [{ to: 'living', label: 'نشیمن' }, { to: 'master', label: 'اتاق مستر ۱' }, { to: 'bed2', label: 'اتاق مستر ۲' }, { to: 'bed3', label: 'اتاق خواب' }, { to: 'bath', label: 'سرویس' }] },
        bath:    { name: 'سرویس و حمام', area: '۸ متر',
          desc: 'سرامیک تا سقف و شیشه سکوریت.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        master:  { name: 'اتاق مستر ۱', area: '۱۸ متر',
          desc: 'خواب مستر اصلی با سرویس اختصاصی.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        bed2:    { name: 'اتاق مستر ۲', area: '۱۶ متر',
          desc: 'خواب مستر دوم.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        bed3:    { name: 'اتاق خواب', area: '۱۴ متر',
          desc: 'اتاق خواب سوم با نورگیر.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
      },
    },

    sadabad3: {
      title: 'سعدآباد ۳ — واحد ۹۲ متری (نبش)',
      specs: [
        ['تعداد طبقات', '۵ طبقه'],
        ['واحد در هر طبقه', '۱ واحد'],
        ['متراژ هر واحد', '۹۲ متر'],
        ['ویژگی پروژه', 'ساختمان سه‌نبش با نمای در هر سه جهت'],
        ['محل پروژه', 'بهشهر، خیابان هنر، کوچه بشارتی'],
        ['زمان تحویل', 'تابستان ۱۴۰۷'],
      ],
      features: ['درب ضدسرقت مرغوب', 'کاشی و سرامیک ابعاد بزرگ', 'دستگیره هوشمند لمسی',
                 'سقف‌ها کامل کناف', 'سیستم اطفای حریق', 'اعلان حریق هوشمند',
                 'پارکینگ اختصاصی', 'لاین نوری حتی در پارکینگ', 'نمای تلفیقی مدرن'],
      plan: false,
      start: 'living',
      rooms: {
        living:  { name: 'نشیمن و پذیرایی', area: '۲۶ متر',
          desc: 'نشیمن واحد نبش با نورگیری از دو جهت به دلیل موقعیت سه‌نبش.',
          doors: [{ to: 'kitchen', label: 'آشپزخانه' }, { to: 'hall', label: 'راهرو' }] },
        kitchen: { name: 'آشپزخانه', area: '۱۲ متر',
          desc: 'آشپزخانه با کاشی و سرامیک ابعاد بزرگ.',
          doors: [{ to: 'living', label: 'نشیمن' }] },
        hall:    { name: 'راهرو', area: '۹ متر',
          desc: 'دسترسی به اتاق‌ها و سرویس.',
          doors: [{ to: 'living', label: 'نشیمن' }, { to: 'master', label: 'اتاق مستر' }, { to: 'bed2', label: 'اتاق خواب' }, { to: 'bath', label: 'سرویس' }] },
        bath:    { name: 'سرویس و حمام', area: '۷ متر',
          desc: 'سرامیک تا سقف و شیشه سکوریت.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        master:  { name: 'اتاق مستر', area: '۱۶ متر',
          desc: 'خواب مستر با دید نبش.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
        bed2:    { name: 'اتاق خواب', area: '۱۴ متر',
          desc: 'اتاق خواب دوم.',
          doors: [{ to: 'hall', label: 'راهرو' }] },
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
  const flatBox  = document.getElementById('panoFlat');
  const hsBox    = document.getElementById('hotspots');
  const badge    = document.getElementById('panoBadge');
  const fade     = document.getElementById('walkFade');
  const rName    = document.getElementById('roomName');
  const rArea    = document.getElementById('roomArea');
  const rDesc    = document.getElementById('roomDesc');
  const bFin     = document.getElementById('skFin');
  const stage    = document.getElementById('walkStage');
  if (!modal) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_FILE = location.protocol === 'file:';

  let mode2D = false;
  let flatImg = null;
  let currentKey = null, curRoom = null, curTab = 'info', skel = false;
  let walkInit = false, selectedRoom = null;

  // ===============================
  // موتور WebGL (هاست)
  // ===============================
  const gl = canvas ? (canvas.getContext('webgl', { antialias: true }) ||
                       canvas.getContext('experimental-webgl')) : null;
  let prog = null, uni = {}, tex = null;
  let yaw = -90, pitch = 0, fov = 90;
  let yawT = yaw, pitchT = pitch, fovT = fov;
  const MAX_FOV = 100, MIN_FOV = 45;

  const VSH =
    'attribute vec2 aPos;' +
    'varying vec2 vUV;' +
    'void main(){ vUV = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }';
  const FSH =
    'precision mediump float;' +
    'varying vec2 vUV;' +
    'uniform sampler2D uTex;' +
    'uniform vec2 uRes;' +
    'uniform float uYaw;' +
    'uniform float uPitch;' +
    'uniform float uFov;' +
    'void main(){' +
    '  float lon = radians((vUV.x - 0.5) * uFov * (uRes.x / uRes.y) + uYaw);' +
    '  float lat = radians((0.5 - vUV.y) * uFov + uPitch);' +
    '  vec3 dir = vec3(sin(lon) * cos(lat), sin(lat), -cos(lon) * cos(lat));' +
    '  vec2 uv = vec2(fract(0.5 + atan(dir.x, -dir.z) / 6.2831853),' +
    '                 0.5 - asin(clamp(dir.y, -1.0, 1.0)) / 3.1415926);' +
    '  gl_FragColor = texture2D(uTex, uv);' +
    '}';

  function shader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[TOUR] shader:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function initGL() {
    if (!gl) { console.warn('[TOUR] WebGL پشتیبانی نمی‌شود → 2D'); return false; }
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, VSH));
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FSH));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
      gl.useProgram(prog);
      gl.uniform1i(gl.getUniformLocation(prog, 'uTex'), 0);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1,-1,  1,-1,  -1,1,  -1,1,  1,-1,  1,1
      ]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      uni.uRes   = gl.getUniformLocation(prog, 'uRes');
      uni.uYaw   = gl.getUniformLocation(prog, 'uYaw');
      uni.uPitch = gl.getUniformLocation(prog, 'uPitch');
      uni.uFov   = gl.getUniformLocation(prog, 'uFov');
      tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                    new Uint8Array([40, 40, 40, 255]));
      console.log('[TOUR] WebGL آماده ✅');
      return true;
    } catch (e) {
      console.warn('[TOUR] WebGL در دسترس نیست → 2D');
      prog = null;
      return false;
    }
  }

  function prepareImage(img) {
    const MAXW = 4096;
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h || w <= MAXW) return img;
    const cv = document.createElement('canvas');
    cv.width = MAXW;
    cv.height = Math.max(2, Math.round(h * (MAXW / w)));
    cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
    return cv;
  }

  function setPano(img) {
    if (!img) return;
    if (mode2D) {
      flatImg = img;
      show2D();
      return;
    }
    try {
      const src = prepareImage(img);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      console.log('[TOUR] تکسچر WebGL آپلود شد ✅');
    } catch (err) {
      console.warn('[TOUR] محدودیت امنیتی → سوییچ به 2D');
      use2D();
      flatImg = img;
      show2D();
    }
  }

  // ===============================
  // 🖼 موتور 2D (سیستم خودتان — file://)
  // ===============================
  function use2D() {
    if (mode2D) return;
    mode2D = true;
    canvas.style.display = 'none';
    flatBox.style.display = 'block';
    badge.textContent = '🖼 پانورامای واقعی — حالت ساده (روی هاست: کامل ۳۶۰°)';
    console.log('[TOUR] حالت 2D فعال شد ✅');
  }

  function show2D() {
    if (!flatImg || !flatImg.naturalWidth) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    const sc = Math.max((w * 3.2) / flatImg.naturalWidth, (h * 1.2) / flatImg.naturalHeight);
    const dw = flatImg.naturalWidth * sc;
    const dh = flatImg.naturalHeight * sc;
    const maxShift = Math.max(1, dw - w);
    const shift = (((yaw % 360) + 360) % 360) / 360 * maxShift;
    const yMax = Math.max(0, dh - h);
    let y0 = -(dh - h) / 2 - (pitch / 40) * (yMax / 2);
    y0 = Math.min(0, Math.max(-yMax, y0));
    flatBox.style.backgroundImage = 'url("' + flatImg.src + '")';
    flatBox.style.backgroundSize = dw + 'px ' + dh + 'px';
    flatBox.style.backgroundPosition = (-shift) + 'px ' + y0 + 'px';
  }

  // ===============================
  // پانورامای نمونه
  // ===============================
  const SAMPLE_CACHE = {};
  function makeSample(room, mode, key) {
    const id = key + '|' + mode + '|' + room;
    if (SAMPLE_CACHE[id]) return SAMPLE_CACHE[id];
    const W = 2048, H = 1024;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#FDFBF4'); g.addColorStop(.42, '#F1E9D6'); g.addColorStop(1, '#8C7A5C');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const fy = H * 0.68;
    c.fillStyle = '#B08D5E';
    c.fillRect(0, fy, W, H - fy);
    c.strokeStyle = 'rgba(0,0,0,.1)';
    for (let x = 0; x < W; x += 110) { c.beginPath(); c.moveTo(x, fy); c.lineTo(x - 220, H); c.stroke(); }
    for (let i = 0; i < 6; i++) {
      const x = (i + .5) * (W / 6);
      c.fillStyle = 'rgba(120,100,70,.14)';
      c.fillRect(x - 26, H * .18, 52, fy - H * .18);
    }
    const wg = c.createLinearGradient(0, H * .22, 0, fy);
    wg.addColorStop(0, '#DFF0FA'); wg.addColorStop(1, '#BED9E8');
    c.fillStyle = wg;
    c.fillRect(W * .2, H * .24, W * .16, fy - H * .24);
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 10;
    c.strokeRect(W * .2, H * .24, W * .16, fy - H * .24);
    c.fillStyle = 'rgba(0,0,0,.4)';
    c.fillRect(0, H * .86, W, 54);
    c.fillStyle = '#EFE8D6';
    c.font = 'bold 34px Tahoma, sans-serif';
    c.textAlign = 'center';
    c.fillText('تصویر نمونه ۳۶۰° — با عکس واقعی پروژه جایگزین می‌شود', W / 2, H * .86 + 38);
    const img = new Image();
    img.src = cv.toDataURL('image/jpeg', .82);
    SAMPLE_CACHE[id] = img;
    return img;
  }

  // ---------- لود عکس ----------
  function loadPano(room, mode, key) {
    return new Promise(resolve => {
      let done = false;
      const finish = img => { if (!done) { done = true; resolve(img); } };
      const useSample = msg => {
        badge.textContent = msg;
        const s = makeSample(room, mode, key);
        if (s.complete) finish(s); else s.onload = () => finish(s);
      };
      const src = 'images/pano/' + key + '/fin/' + room + '.jpg';
      badge.textContent = '⏳ در حال بارگذاری…';
      const img = new Image();
      img.onload = () => {
        console.log('[TOUR] عکس لود شد ✅', src);
        badge.textContent = IS_FILE
          ? '🖼 پانورامای واقعی — حالت ساده (روی هاست: کامل ۳۶۰°)'
          : '🖼 پانورامای واقعی ۳۶۰°';
        finish(img);
      };
      img.onerror = () => {
        console.warn('[TOUR] عکس پیدا نشد ❌', src);
        useSample('🖼 نمونه — عکس یافت نشد: ' + src);
      };
      img.src = src;
    });
  }

  // ---------- نقاط حرکت ----------
  let spots = [];
  function layoutSpots() {
    hsBox.innerHTML = '';
    spots.forEach(s => {
      const el = document.createElement('button');
      el.className = 'hs';
      el.type = 'button';
      el.innerHTML = '🚶<span>' + s.label + '</span>';
      el.addEventListener('click', ev => {
        ev.stopPropagation();
        goToRoom(s.to);
      });
      hsBox.appendChild(el);
      s.el = el;
    });
    placeSpots();
  }
  function placeSpots() {
    if (!stage || !spots.length) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    spots.forEach(s => {
      let d = s.yawDeg - yaw;
      while (d > 180) d -= 360;
      while (d < -180) d += 360;
      const halfFovH = fov * (w / h) / 2;
      const el = s.el;
      if (!el) return;
      if (Math.abs(d) > halfFovH) { el.style.display = 'none'; return; }
      const rel = d / halfFovH;
      el.style.display = 'grid';
      el.style.left = (0.5 + rel * 0.5) * w + 'px';
      el.style.top  = (h * 0.62 - pitch * (h / fov) * 1.1) + 'px';
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
        const ok = initGL();
        if (!ok) use2D();
        walkInit = true;
        requestAnimationFrame(renderLoop);
        setupRoom(TOURS[currentKey].start);
      } else {
        if (mode2D) show2D();
        setTimeout(placeSpots, 60);
      }
      fovT = MAX_FOV;
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
      '<p class="tour-note">💡 این تور شبیه‌سازی گرافیکی از واحد نوعی است تا پیش از تحویل، فضا را تجربه کنید — و جایگزین بازدید حضوری نیست.</p>';
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
  if (planWrap) {
    planWrap.querySelectorAll('.p-g').forEach(g => {
      g.addEventListener('click', () => {
        const room = TOURS.sadabad1.rooms[g.dataset.room];
        if (!room) return;
        planWrap.querySelectorAll('.p-g').forEach(x => x.classList.remove('active'));
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
  function clampP(p) { return Math.max(-40, Math.min(40, p)); }

  function setupRoom(id) {
    const data = TOURS[currentKey];
    const room = data.rooms[id];
    if (!room) return;
    curRoom = id;
    rName.textContent = room.name;
    rArea.textContent = '📏 ' + room.area;
    rDesc.textContent = room.desc;

    const n = room.doors.length;
    spots = room.doors.map((d, i) => ({
      to: d.to, label: d.label,
      yawDeg: -90 + (i - (n - 1) / 2) * 55
    }));
    layoutSpots();

    loadPano(id, 'fin', currentKey).then(setPano);
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
    if (e.target && e.target.closest && e.target.closest('.hs')) return;
    dragging = true; px = e.clientX; py = e.clientY;
    try { stage.setPointerCapture(e.pointerId); } catch (err) {}
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    yawT  += (e.clientX - px) * 0.18;
    pitchT = clampP(pitchT - (e.clientY - py) * 0.18);
    px = e.clientX; py = e.clientY;
  });
  ['pointerup', 'pointercancel'].forEach(ev =>
    stage.addEventListener(ev, () => { dragging = false; })
  );

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    fovT = Math.max(MIN_FOV, Math.min(MAX_FOV, fovT + Math.sign(e.deltaY) * 6));
  }, { passive: false });
  let pinch = null;
  stage.addEventListener('touchstart', e => {
    if (e.touches.length === 2)
      pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                         e.touches[0].clientY - e.touches[1].clientY);
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

  // دکمه نمای تکمیل‌شده
  if (bFin) bFin.addEventListener('click', reloadPano);
  function reloadPano() {
    if (!curRoom) return;
    loadPano(curRoom, 'fin', currentKey).then(setPano);
  }
})();
