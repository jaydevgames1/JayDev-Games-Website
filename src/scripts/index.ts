document.querySelectorAll<HTMLButtonElement>('[data-scroll-to]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTo;
    if (!targetId) return;
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll<HTMLButtonElement>('[data-scroll-carousel]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const carousel = document.getElementById('game-scroll');
    if (!carousel) return;
    const direction = btn.dataset.scrollCarousel;
    carousel.scrollBy({ left: direction === 'left' ? -424 : 424, behavior: 'smooth' });
  });
});

const btn = document.getElementById('newsletter-btn') as HTMLButtonElement;
const input = document.getElementById('newsletter-email') as HTMLInputElement;
const msg = document.getElementById('newsletter-msg');

btn?.addEventListener('click', async () => {
  const email = input?.value?.trim();
  if (!email) {
    if (msg) {
      msg.classList.remove('hidden');
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'text-sm mt-2 text-on-primary-container';
    }
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

    if (msg) {
      msg.classList.remove('hidden');
      if (res.ok) {
        msg.textContent = "Check your email to verify!";
        msg.className = 'text-sm mt-2 text-on-primary-container';
        input.value = '';
        btn.textContent = 'JOINED!';
      } else {
        let errorMessage = 'Something went wrong. Please refresh the page and try again.';
        try {
          const errorData = await res.text();
          // Only use error data if it's not HTML (404 page)
          if (errorData && !errorData.includes('<!doctype') && !errorData.includes('<html')) {
            errorMessage = errorData;
          }
        } catch (e) {
          // If parsing fails, use default message
        }
        msg.textContent = errorMessage;
        msg.className = 'text-sm mt-2 text-on-primary-container';
        btn.textContent = 'JOIN';
        btn.disabled = false;
      }
    }
  } catch (error) {
    if (msg) {
      msg.classList.remove('hidden');
      msg.textContent = 'Network error. Please refresh the page and try again.';
      msg.className = 'text-sm mt-2 text-on-primary-container';
    }
    btn.textContent = 'JOIN';
    btn.disabled = false;
  }
});