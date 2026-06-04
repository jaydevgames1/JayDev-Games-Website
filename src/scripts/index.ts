// ─── Smooth scroll for data-scroll-to buttons ───────────────────────────────
document.querySelectorAll<HTMLButtonElement>('[data-scroll-to]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTo;
    if (!targetId) return;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  });
});
 
// ─── Carousel scroll buttons ─────────────────────────────────────────────────
document.querySelectorAll<HTMLButtonElement>('[data-scroll-carousel]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const carousel = document.getElementById('game-scroll');
    if (!carousel) return;
    carousel.scrollBy({
      left: btn.dataset.scrollCarousel === 'left' ? -424 : 424,
      behavior: 'smooth',
    });
  });
});
 
// ─── Newsletter subscription ──────────────────────────────────────────────────
const newsletterBtn   = document.getElementById('newsletter-btn')   as HTMLButtonElement | null;
const newsletterInput = document.getElementById('newsletter-email') as HTMLInputElement  | null;
const newsletterMsg   = document.getElementById('newsletter-msg');
 
function showNewsletterMessage(text: string) {
  if (!newsletterMsg) return;
  newsletterMsg.textContent = text;
  newsletterMsg.classList.remove('hidden');
  newsletterMsg.classList.add('text-sm', 'mt-2', 'text-on-primary-container');
}
 
newsletterBtn?.addEventListener('click', async () => {
  const email = newsletterInput?.value?.trim();
 
  if (!email) {
    showNewsletterMessage('Please enter a valid email address.');
    return;
  }
 
  newsletterBtn.textContent = 'JOINING...';
  newsletterBtn.disabled = true;
 
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
 
    if (res.ok) {
      showNewsletterMessage('Check your email to verify!');
      if (newsletterInput) newsletterInput.value = '';
      newsletterBtn.textContent = 'JOINED!';
    } else {
      let errorMessage = 'Something went wrong. Please refresh the page and try again.';
      try {
        const body = await res.text();
        if (body && !body.includes('<!doctype') && !body.includes('<html')) {
          errorMessage = body;
        }
      } catch (_) { /* ignore */ }
      showNewsletterMessage(errorMessage);
      newsletterBtn.textContent = 'JOIN';
      newsletterBtn.disabled = false;
    }
  } catch (_) {
    showNewsletterMessage('Network error. Please refresh the page and try again.');
    newsletterBtn.textContent = 'JOIN';
    newsletterBtn.disabled = false;
  }
});
 
// ─── Section fade-in on scroll ────────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.1 }
);
 
document.querySelectorAll<HTMLElement>('section > div > div').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  observer.observe(el);
});
 