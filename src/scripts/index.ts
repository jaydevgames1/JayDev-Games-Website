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

const btn = document.getElementById('newsletter-btn');
const input = document.getElementById('newsletter-email') as HTMLInputElement;
const msg = document.getElementById('newsletter-msg');

btn?.addEventListener('click', async () => {
  const email = input?.value?.trim();
  if (!email) {
    if (msg) {
      msg.classList.remove('hidden');
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'text-sm mt-2 text-red-600';
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
        msg.textContent = "Check your email to verify! 🎉";
        msg.className = 'text-sm mt-2 text-green-600';
        input.value = '';
        btn.textContent = 'JOINED!';
      } else {
        const errorData = await res.text();
        msg.textContent = errorData || 'Something went wrong. Try again.';
        msg.className = 'text-sm mt-2 text-red-600';
        btn.textContent = 'JOIN';
        btn.disabled = false;
      }
    }
  } catch (error) {
    if (msg) {
      msg.classList.remove('hidden');
      msg.textContent = 'Network error. Please try again.';
      msg.className = 'text-sm mt-2 text-red-600';
    }
    btn.textContent = 'JOIN';
    btn.disabled = false;
  }
});