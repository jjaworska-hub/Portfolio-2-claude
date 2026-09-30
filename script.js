// Highlight the nav item of the section currently in view
const navItems = document.querySelectorAll('.nav__item[href^="#"]');
const sections = [...navItems].map((a) => document.querySelector(a.getAttribute('href')));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((a) =>
        a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => s && sectionObserver.observe(s));

// Animate goal progress bars when they scroll into view
const goalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        goalObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll('.goal').forEach((g) => goalObserver.observe(g));

// Contact form: opens the visitor's mail client with the message prefilled
const form = document.getElementById('contact-form');
const CONTACT_EMAIL = 'your@email.com';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  form.querySelector('.form__status').textContent = 'Thanks! Your mail app should open now.';
  form.reset();
});
