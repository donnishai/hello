const services = [
  { key: 'personal', icon: '💼', title: 'Personal Banking', desc: 'Checking, savings, and money tools for everyday life.', eta: '5 min application' },
  { key: 'home', icon: '🏠', title: 'Home Loans', desc: 'Pre-qualify quickly with transparent options.', eta: '8 min application' },
  { key: 'invest', icon: '📈', title: 'Investment Growth', desc: 'Goal-based investing and advisory services.', eta: '7 min application' },
  { key: 'business', icon: '💼', title: 'Business Banking', desc: 'Treasury, payments, and operating accounts.', eta: '10 min application' },
  { key: 'protect', icon: '🛡️', title: 'Insurance & Protection', desc: 'Coverage bundles for life and assets.', eta: '6 min application' },
  { key: 'retirees', icon: '🌅', title: 'Retirement Planning', desc: 'Personalized retirement roadmaps and trusts.', eta: '9 min application' }
];

const stories = [
  { type: 'home', body: 'Sarah paid off $40K in student loans 2 years early.', by: 'Verified • Austin, TX' },
  { type: 'business', body: 'Marcus grew from garage startup to 3 locations.', by: 'Member since 2018 • Seattle, WA' },
  { type: 'retirees', body: 'Elena retired with confidence through guided planning.', by: 'Verified • Miami, FL' }
];

const serviceGrid = document.getElementById('serviceGrid');
services.forEach((s) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.type = s.key;
  card.innerHTML = `<h3>${s.icon} ${s.title}</h3><p>${s.desc}</p><p><small>${s.eta}</small></p><a href="#">Learn More →</a>`;
  serviceGrid.append(card);
});

const testimonialGrid = document.getElementById('testimonialGrid');
stories.forEach((s) => {
  const card = document.createElement('article');
  card.className = 'story';
  card.dataset.type = s.type;
  card.innerHTML = `<p>⭐️⭐️⭐️⭐️⭐️</p><p>${s.body}</p><small>${s.by}</small>`;
  testimonialGrid.append(card);
});

document.querySelectorAll('.filters button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    document.querySelectorAll('.story').forEach((item) => {
      item.hidden = !(f === 'all' || item.dataset.type === f);
    });
  });
});

document.getElementById('goalInput').addEventListener('input', (e) => {
  const text = e.target.value.toLowerCase();
  const map = [
    { keys: ['house', 'home', 'mortgage'], msg: 'Recommended: Home Loans, pre-qualification, and first-time buyer checklist.' },
    { keys: ['college', 'education', 'kid'], msg: 'Recommended: 529 plans, high-yield savings, and education advisors.' },
    { keys: ['business', 'company'], msg: 'Recommended: Business banking, merchant services, and credit lines.' }
  ];
  const hit = map.find((m) => m.keys.some((k) => text.includes(k)));
  document.getElementById('recommendation').textContent = hit ? hit.msg : 'Type your goal for intelligent recommendations.';
});

const showToast = (msg) => {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
};

document.getElementById('copyRouting').addEventListener('click', async () => {
  await navigator.clipboard.writeText('011000138');
  showToast('Routing number copied!');
});

document.getElementById('mobileToggle').addEventListener('click', (e) => {
  const nav = document.getElementById('mobileNav');
  nav.hidden = !nav.hidden;
  e.currentTarget.setAttribute('aria-expanded', String(!nav.hidden));
});

document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchOverlay').hidden = false;
});
document.getElementById('closeSearch').addEventListener('click', () => {
  document.getElementById('searchOverlay').hidden = true;
});

document.getElementById('openAccountBtn').addEventListener('click', () => {
  document.getElementById('accountModal').showModal();
});

document.getElementById('accountModal').addEventListener('close', (e) => {
  if (e.target.returnValue === 'success') showToast('Profile created. MFA setup initiated.');
});

document.getElementById('launchDemo').addEventListener('click', () => {
  showToast('Sandbox launched: demo account funded and withdrawable.');
});

document.getElementById('withdrawBtn').addEventListener('click', () => {
  const el = document.getElementById('demoBalance');
  const amount = Number(el.textContent.replace(/[$,]/g, '')) - 5000;
  el.textContent = amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  showToast('Withdrawal successful: $5,000');
});

document.getElementById('creditSlider').addEventListener('input', (e) => {
  const v = Number(e.target.value);
  const tier = v > 740 ? 'Excellent' : v > 670 ? 'Good' : 'Building';
  document.getElementById('creditOutput').textContent = `${v} - ${tier}`;
});

const canvas = document.getElementById('spendChart');
const ctx = canvas.getContext('2d');
const bars = [40, 90, 60, 130, 70];
ctx.fillStyle = '#0A192F';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#D4AF37';
bars.forEach((b, i) => ctx.fillRect(20 + i * 58, canvas.height - b - 20, 36, b));
ctx.fillStyle = '#F7FAFC';
ctx.fillText('Spending breakdown', 12, 16);

let prevY = window.scrollY;
window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  header.classList.toggle('solid', window.scrollY > 20);
  if (window.scrollY > prevY && window.scrollY > 120) header.style.transform = 'translateY(-100%)';
  else header.style.transform = 'translateY(0)';
  prevY = window.scrollY;
});

document.getElementById('year').textContent = new Date().getFullYear();

let seconds = 48 * 3600;
setInterval(() => {
  seconds -= 1;
  const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60);
  document.getElementById('countdown').textContent = `${h}h ${m}m remaining`;
}, 1000);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

const langSelect = document.getElementById('languageSelect');
langSelect.value = localStorage.getItem('fg_lang') || 'EN';
langSelect.addEventListener('change', () => localStorage.setItem('fg_lang', langSelect.value));

document.getElementById('locationBtn').addEventListener('click', () => {
  if (!navigator.geolocation) return showToast('Geolocation unsupported');
  navigator.geolocation.getCurrentPosition(
    () => showToast('Nearest branch: 0.8 mi • 12 min wait'),
    () => showToast('Location permission denied')
  );
});
