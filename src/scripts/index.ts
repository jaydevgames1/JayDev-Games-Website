// ─── Smooth scroll for data-scroll-to buttons ──────────────────────────────
document.querySelectorAll<HTMLButtonElement>('[data-scroll-to]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTo;
    if (!targetId) return;
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});
 
// ─── Carousel scroll buttons ────────────────────────────────────────────────
document.querySelectorAll<HTMLButtonElement>('[data-scroll-carousel]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const carousel = document.getElementById('game-scroll');
    if (!carousel) return;
    const direction = btn.dataset.scrollCarousel;
    carousel.scrollBy({ left: direction === 'left' ? -424 : 424, behavior: 'smooth' });
  });
});
 
// ─── Newsletter subscription ─────────────────────────────────────────────────
const btn   = document.getElementById('newsletter-btn')   as HTMLButtonElement | null;
const input = document.getElementById('newsletter-email') as HTMLInputElement  | null;
const msg   = document.getElementById('newsletter-msg');
 
const updateMessage = (text: string, _isError: boolean) => {
  if (!msg) return;
  msg.textContent = text;
  msg.classList.remove('hidden');
  msg.classList.add('text-sm', 'mt-2', 'text-on-primary-container');
};
 
btn?.addEventListener('click', async () => {
  const email = input?.value?.trim();
 
  if (!email) {
    updateMessage('Please enter a valid email address.', true);
    return;
  }
 
  btn.textContent = 'JOINING...';
  btn.disabled = true;
 
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
 
    if (res.ok) {
      updateMessage('Check your email to verify!', false);
      if (input) input.value = '';
      btn.textContent = 'JOINED!';
    } else {
      let errorMessage = 'Something went wrong. Please refresh the page and try again.';
      try {
        const errorData = await res.text();
        if (errorData && !errorData.includes('<!doctype') && !errorData.includes('<html')) {
          errorMessage = errorData;
        }
      } catch (_e) {
        // ignore parse errors
      }
      updateMessage(errorMessage, true);
      btn.textContent = 'JOIN';
      btn.disabled = false;
    }
  } catch (_error) {
    updateMessage('Network error. Please refresh the page and try again.', true);
    btn.textContent = 'JOIN';
    btn.disabled = false;
  }
});
 
// ─── Clay button press micro-interactions ────────────────────────────────────
document.querySelectorAll<HTMLElement>('button, a').forEach((el) => {
  el.addEventListener('mousedown', () => {
    if (el.classList.contains('clay-button')) {
      el.style.transform = 'scale(0.95)';
      el.style.boxShadow =
        'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.5)';
    }
  });
 
  el.addEventListener('mouseup', () => {
    if (el.classList.contains('clay-button')) {
      el.style.transform = '';
      el.style.boxShadow = '';
    }
  });
 
  el.addEventListener('mouseleave', () => {
    if (el.classList.contains('clay-button')) {
      el.style.transform = '';
      el.style.boxShadow = '';
    }
  });
});
 
// ─── Scroll-triggered fade-in for sections ───────────────────────────────────
const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
};
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement;
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
      observer.unobserve(target);
    }
  });
}, observerOptions);
 
document.querySelectorAll<HTMLElement>('section > div > div').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  observer.observe(el);
});
 