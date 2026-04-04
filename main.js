// ── 1. CUSTOM CURSOR ──
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-card, .proj-card, .planet, .tag').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform  = 'translate(-50%,-50%) scale(2.2)';
    cursor.style.background = 'rgba(0,255,231,0.15)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform  = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'transparent';
  });
});

// ── 2. STARFIELD ──
const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');
let stars    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); createStars(350); });

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    });
  }
}
createStars(350);

function drawStars(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(timestamp * s.speed + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

// ── 3. SHOOTING STARS ──
function spawnShootingStar() {
  const el     = document.createElement('div');
  el.className = 'shooting-star';
  const length = 120 + Math.random() * 200;
  el.style.cssText = `
    top: ${Math.random() * window.innerHeight * 0.6}px;
    left: ${Math.random() * window.innerWidth}px;
    width: ${length}px;
    background: linear-gradient(to right, rgba(255,255,255,0), white);
    opacity: 0;
  `;
  document.body.appendChild(el);
  const dx = Math.cos(0.6) * length;
  const dy = Math.sin(0.6) * length;
  const anim = el.animate([
    { opacity: 0, transform: 'translate(0, 0)' },
    { opacity: 1, transform: `translate(${-dx/2}px, ${dy/2}px)`, offset: 0.2 },
    { opacity: 0, transform: `translate(${-dx}px, ${dy}px)` },
  ], { duration: 800 + Math.random() * 600, easing: 'ease-in' });
  anim.onfinish = () => el.remove();
}
setInterval(spawnShootingStar, 2200);


// ── ONLY HOVERED PLANET'S ORBIT PAUSES ──
document.querySelectorAll('.planet-wrapper').forEach((wrapper) => {
  const parentOrbit = wrapper.closest('.orbit');

  wrapper.addEventListener('mouseenter', () => {
    parentOrbit.style.animationPlayState = 'paused';
  });

  wrapper.addEventListener('mouseleave', () => {
    parentOrbit.style.animationPlayState = 'running';
  });
});


// ── 4. 3D PLANET TILT ──

document.querySelectorAll('.planet').forEach((planet) => {
  planet.addEventListener('mousemove', (e) => {
    const rect = planet.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    planet.style.transform = `scale(1.35) rotateX(${-y * 40}deg) rotateY(${x * 40}deg)`;
    planet.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(0,255,231,0.35)`;
  });
  planet.addEventListener('mouseleave', () => {
    planet.style.transform = '';
    planet.style.boxShadow = '';
  });
});

// ── 5. SCROLL FADE-IN ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));

// ── 6. SKILL BARS ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-card').forEach((card) => {
        const bar = card.querySelector('.skill-bar');
        setTimeout(() => { bar.style.width = (card.dataset.skill || 70) + '%'; }, 300);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ── 7. PARALLAX NEBULA ──
document.addEventListener('mousemove', (e) => {
  const xR = e.clientX / window.innerWidth  - 0.5;
  const yR = e.clientY / window.innerHeight - 0.5;
  document.querySelector('.nebula1').style.transform = `translate(${xR * 30}px, ${yR * 30}px)`;
  document.querySelector('.nebula2').style.transform = `translate(${xR * -20}px, ${yR * -20}px)`;
});

// ── 8. HERO ENTRANCE ──
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.animate([
    { opacity: 0, transform: 'translateY(60px) scale(0.9)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' },
  ], { duration: 1200, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'both' });
}

// ── 9. ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((l) => { l.style.color = ''; l.style.textShadow = ''; });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) { active.style.color = 'var(--accent)'; active.style.textShadow = '0 0 10px var(--accent)'; }
    }
  });
}, { threshold: 0.5 });
sections.forEach((s) => navObserver.observe(s));

// mobile nav toggle
