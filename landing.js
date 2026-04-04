// ══════════════════════════
// 1. CUSTOM CURSOR
// ══════════════════════════
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

function animateCursor() {
  cx += (mx - cx) * 0.15;
  cy += (my - cy) * 0.15;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform  = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = 'rgba(0,255,231,0.15)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform  = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'transparent';
  });
});

// ══════════════════════════
// 2. STARFIELD
// ══════════════════════════
const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');
let stars    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); createStars(300); });

function createStars(n) {
  stars = [];
  for (let i = 0; i < n; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.6 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    });
  }
}
createStars(300);

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

// ══════════════════════════
// 3. FLOATING PARTICLES
// ══════════════════════════
function createParticle() {
  const el = document.createElement('div');
  el.className = 'particle';

  const size    = Math.random() * 4 + 1;
  const colors  = ['rgba(0,255,231,0.6)', 'rgba(168,85,247,0.6)', 'rgba(255,107,107,0.4)'];
  const color   = colors[Math.floor(Math.random() * colors.length)];
  const left    = Math.random() * 100;
  const dur     = Math.random() * 12 + 8;
  const delay   = Math.random() * 8;

  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    box-shadow: 0 0 ${size * 3}px ${color};
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
  `;
  document.getElementById('particles').appendChild(el);

  setTimeout(() => el.remove(), (dur + delay) * 1000);
}

// Generate particles continuously
setInterval(createParticle, 600);
for (let i = 0; i < 15; i++) createParticle();

// ══════════════════════════
// 4. SHOOTING STARS
// ══════════════════════════
function shootingStar() {
  const el   = document.createElement('div');
  const len  = 100 + Math.random() * 180;
  el.style.cssText = `
    position: fixed;
    top:  ${Math.random() * window.innerHeight * 0.5}px;
    left: ${Math.random() * window.innerWidth}px;
    width: ${len}px; height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0), white);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
  `;
  document.body.appendChild(el);
  const dx = Math.cos(0.6) * len;
  const dy = Math.sin(0.6) * len;
  const anim = el.animate([
    { opacity: 0, transform: 'translate(0,0)' },
    { opacity: 1, transform: `translate(${-dx/2}px, ${dy/2}px)`, offset: 0.2 },
    { opacity: 0, transform: `translate(${-dx}px, ${dy}px)` },
  ], { duration: 700 + Math.random() * 500, easing: 'ease-in' });
  anim.onfinish = () => el.remove();
}
setInterval(shootingStar, 2500);

// ══════════════════════════
// 5. TYPING ANIMATION
// ══════════════════════════
const roles = [
  'BCA Student',
  'Web Developer',
  'Python Coder',
  'Frontend Dev',
  'Problem Solver',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  const current = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
    roleEl.textContent = current.slice(0, charIndex);
  } else {
    charIndex++;
    roleEl.textContent = current.slice(0, charIndex);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    roleIndex   = (roleIndex + 1) % roles.length;
    delay       = 400;
  }

  setTimeout(typeRole, delay);
}
typeRole();

// ══════════════════════════
// 6. NEBULA PARALLAX
// ══════════════════════════
document.addEventListener('mousemove', (e) => {
  const xR = e.clientX / window.innerWidth  - 0.5;
  const yR = e.clientY / window.innerHeight - 0.5;
  document.querySelector('.n1').style.transform = `translate(${xR * 25}px, ${yR * 25}px)`;
  document.querySelector('.n2').style.transform = `translate(${xR * -18}px, ${yR * -18}px)`;
  document.querySelector('.n3').style.transform = `translate(${xR * 12}px, ${yR * 12}px)`;
});

// ══════════════════════════
// 7. ENTER BUTTON ANIMATION
// ══════════════════════════
const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const href = enterBtn.getAttribute('href');

    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity    = '0';

    setTimeout(() => {
      window.location.href = href;
    }, 600);
  });
}