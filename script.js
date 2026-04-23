// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.4)' : 'none';
});

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent2)' : '';
  });
});

// Typing animation
const texts = ['Full Stack Developer', 'AI/ML Enthusiast', 'Problem Solver'];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = texts[textIndex];
  typedEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => isDeleting = true, 1500);
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById('hero').offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.5 + 0.2
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(45,212,191,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .achievement-card, .soft-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = '#059669';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
