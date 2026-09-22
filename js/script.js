// ===================================================
// Happy Birthday Maham Sial — made with love by Arslan Ahmad
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 0. Intro splash ---------- */
  const introOverlay = document.getElementById('introOverlay');
  const introBtn = document.getElementById('introBtn');
  if(introOverlay && introBtn){
    introBtn.addEventListener('click', () => {
      document.body.classList.remove('lock-scroll');
      introOverlay.classList.add('closing');
      setTimeout(() => introOverlay.remove(), 900);
    });
  }

  /* ---------- 1. Floating hearts background ---------- */
  const heartsBg = document.getElementById('heartsBg');
  const heartChars = ['❤️','💖','💕','💗','💓','💘'];

  function spawnHeart(){
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
    const left = Math.random()*100;
    const size = 14 + Math.random()*22;
    const duration = 7 + Math.random()*8;
    const drift = (Math.random()*140 - 70) + 'px';
    heart.style.left = left + 'vw';
    heart.style.fontSize = size + 'px';
    heart.style.setProperty('--drift', drift);
    heart.style.animationDuration = duration + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), duration*1000 + 200);
  }
  setInterval(spawnHeart, 500);
  for(let i=0;i<8;i++) setTimeout(spawnHeart, i*300);

  function spawnHeartFrom(x, y){
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
    const size = 14 + Math.random()*16;
    heart.style.left = (x + (Math.random()*50 - 25)) + 'px';
    heart.style.bottom = (window.innerHeight - y) + 'px';
    heart.style.fontSize = size + 'px';
    heart.style.setProperty('--drift', (Math.random()*100-50)+'px');
    heart.style.animationDuration = (4+Math.random()*3) + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }

  /* ---------- 2. Cursor sparkle trail (desktop only) ---------- */
  if(window.matchMedia && window.matchMedia('(pointer: fine)').matches){
    let lastSpark = 0;
    const sparkChars = ['✨','💫','⭐'];
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if(now - lastSpark < 70) return;
      lastSpark = now;
      const spark = document.createElement('span');
      spark.className = 'cursor-spark';
      spark.textContent = sparkChars[Math.floor(Math.random()*sparkChars.length)];
      spark.style.left = e.clientX + 'px';
      spark.style.top = e.clientY + 'px';
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    });
  }

  /* ---------- 3. Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- 4. Dot navigation active state ---------- */
  const sections = document.querySelectorAll('.section, .hero');
  const dots = document.querySelectorAll('.dot');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        dots.forEach(d => d.classList.toggle('active', d.dataset.section === id));
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- 5. Countdown to 24 September ---------- */
  function getNextBirthday(){
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 8, 24, 0, 0, 0); // month is 0-indexed -> 8 = September
    if(now > target && !isSameDay(now, target)){
      target = new Date(year + 1, 8, 24, 0, 0, 0);
    }
    return target;
  }
  function isSameDay(a,b){
    return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
  }

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');
  const countdownBox = document.getElementById('countdownBox');
  const birthdayBanner = document.getElementById('birthdayBanner');

  function pad(n){ return String(n).padStart(2,'0'); }

  function updateCountdown(){
    const now = new Date();
    if(isSameDay(now, new Date(now.getFullYear(),8,24))){
      countdownBox.classList.add('hidden');
      birthdayBanner.classList.remove('hidden');
      return;
    }
    const target = getNextBirthday();
    const diff = target - now;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    cdDays.textContent = pad(days);
    cdHours.textContent = pad(hours);
    cdMins.textContent = pad(mins);
    cdSecs.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- 6. Typewriter love letter ---------- */
  const letterText = `Happy Birthday to the girl who turned my ordinary life into something worth smiling about every single day.

You bring warmth to every room, peace to my chaos, and a kind of love I never thought I'd be lucky enough to find. Watching you grow, laugh, and simply be yourself is my favorite thing in this world.

Today is all about you, Maham. I hope this year brings you everything your heart is quietly hoping for, and I hope I get to be right there beside you for all of it.

Happy Birthday, my love. Here's to many, many more with you.`;

  const typewriterEl = document.getElementById('typewriterText');
  let typed = false;
  const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !typed){
        typed = true;
        typeWriter(letterText, typewriterEl, 22);
        letterObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const letterCardEl = document.querySelector('.letter-card');
  if(letterCardEl) letterObserver.observe(letterCardEl);

  function typeWriter(text, el, speed){
    let i = 0;
    el.textContent = '';
    (function step(){
      if(i < text.length){
        el.textContent += text.charAt(i);
        i++;
        setTimeout(step, speed);
      }
    })();
  }

  /* ---------- 7. Gallery + Lightbox (polaroid scrapbook) ---------- */
  const galleryImages = Array.from({length:9}, (_,i) => `images/memory-0${i+1}.jpg`);
  const galleryGrid = document.getElementById('galleryGrid');
  galleryImages.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'polaroid reveal';
    item.innerHTML = `<img src="${src}" alt="Memory ${idx+1}" loading="lazy"><div class="caption">Memory ${String(idx+1).padStart(2,'0')} 💕</div>`;
    item.addEventListener('click', () => openLightbox(idx));
    galleryGrid.appendChild(item);
    revealObserver.observe(item);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let currentIndex = 0;

  function openLightbox(idx){
    currentIndex = idx;
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.classList.add('open');
  }
  function closeLightbox(){ lightbox.classList.remove('open'); }
  function showNext(){
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }
  function showPrev(){
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext').addEventListener('click', showNext);
  document.getElementById('lightboxPrev').addEventListener('click', showPrev);
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') showNext();
    if(e.key === 'ArrowLeft') showPrev();
  });

  /* ---------- 8. Will You Marry Me — Yes/No logic ---------- */
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const proposeButtons = document.getElementById('proposeButtons');
  const proposeHint = document.getElementById('proposeHint');
  const noModal = document.getElementById('noModal');
  const btnOkayFine = document.getElementById('btnOkayFine');
  const celebration = document.getElementById('celebration');
  const btnReplay = document.getElementById('btnReplay');

  const noPhrases = ["No", "Are you sure?", "Really?", "Think again 👀", "Last chance!", "Nope, can't catch me 😏"];
  let dodgeCount = 0;
  const maxDodges = noPhrases.length - 1;

  function moveNoButton(){
    const rect = proposeButtons.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = Math.max(rect.width - btnRect.width, 20);
    const maxY = Math.max(120, 20);
    const randX = Math.random() * maxX;
    const randY = (Math.random() * maxY) - maxY/2;
    btnNo.style.position = 'absolute';
    btnNo.style.left = randX + 'px';
    btnNo.style.top = randY + 'px';
  }

  function handleDodge(){
    if(dodgeCount < maxDodges){
      dodgeCount++;
      btnNo.textContent = noPhrases[dodgeCount];
      moveNoButton();
      proposeHint.textContent = "hehe, try again? 😄";
    }
  }

  btnNo.addEventListener('mouseenter', handleDodge);
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleDodge();
  }, { passive:false });

  btnNo.addEventListener('click', () => {
    // only reachable once dodges are exhausted
    noModal.classList.add('open');
  });

  btnOkayFine.addEventListener('click', () => {
    noModal.classList.remove('open');
    launchCelebration();
  });

  btnYes.addEventListener('click', launchCelebration);

  function launchCelebration(){
    celebration.classList.add('open');
    startConfetti();
  }
  btnReplay.addEventListener('click', () => {
    celebration.classList.remove('open');
    stopConfetti();
  });

  /* ---------- 9. Confetti (canvas, no external libs) ---------- */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let confettiParticles = [];
  let confettiAnim = null;
  const confettiColors = ['#ff4d6d','#ffd966','#ff9f43','#ffb3c6','#ffffff'];

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createParticles(){
    confettiParticles = [];
    for(let i=0;i<140;i++){
      confettiParticles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*-canvas.height,
        size: 6 + Math.random()*8,
        color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
        speedY: 2 + Math.random()*3,
        speedX: Math.random()*2 - 1,
        rotation: Math.random()*360,
        rotSpeed: Math.random()*6 - 3,
        shape: Math.random() > 0.5 ? 'heart' : 'square'
      });
    }
  }

  function drawHeart(x,y,size,color,rotation){
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(rotation * Math.PI/180);
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size/2;
    ctx.moveTo(0, s*0.3);
    ctx.bezierCurveTo(0,-s*0.4, -s, -s*0.4, -s, s*0.1);
    ctx.bezierCurveTo(-s, s*0.6, 0, s*0.8, 0, s*1.2);
    ctx.bezierCurveTo(0, s*0.8, s, s*0.6, s, s*0.1);
    ctx.bezierCurveTo(s, -s*0.4, 0, -s*0.4, 0, s*0.3);
    ctx.fill();
    ctx.restore();
  }

  function animateConfetti(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    confettiParticles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;
      if(p.y > canvas.height + 20){
        p.y = -20;
        p.x = Math.random()*canvas.width;
      }
      if(p.shape === 'heart'){
        drawHeart(p.x, p.y, p.size, p.color, p.rotation);
      } else {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
      }
    });
    confettiAnim = requestAnimationFrame(animateConfetti);
  }

  function startConfetti(){
    createParticles();
    if(confettiAnim) cancelAnimationFrame(confettiAnim);
    animateConfetti();
  }
  function stopConfetti(){
    if(confettiAnim) cancelAnimationFrame(confettiAnim);
    ctx.clearRect(0,0,canvas.width, canvas.height);
  }

  /* ---------- 10. Surprise button (easter egg) ---------- */
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseToast = document.getElementById('surpriseToast');
  const surpriseMessages = [
    "Just so you know, you're my favorite notification. 📱💕",
    "I'd choose you in every timeline, every universe. 🌌",
    "You make ordinary days feel like a celebration. 🎈",
    "Still not over how lucky I am to have you. 🍀❤️",
    "P.S. you look beautiful in every single photo above. 📸",
    "You're my favorite hello and my hardest goodbye. 🌷",
    "Somewhere between 'hi' and now, you became my favorite person. 💫"
  ];
  let toastTimer;
  if(surpriseBtn){
    surpriseBtn.addEventListener('click', () => {
      const msg = surpriseMessages[Math.floor(Math.random()*surpriseMessages.length)];
      surpriseToast.textContent = msg;
      surpriseToast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => surpriseToast.classList.remove('show'), 4000);

      const rect = surpriseBtn.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      for(let i=0;i<6;i++){
        setTimeout(() => spawnHeartFrom(cx, cy), i*90);
      }
    });
  }

  /* ---------- 11. Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

});
