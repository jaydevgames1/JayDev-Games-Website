// Micro-interactions for neobrutalist feel
export function initializeInteractions(): void {
  // Button/link press animations
  document.querySelectorAll('button, a').forEach((el) => {
    el.addEventListener('mousedown', () => {
      if (el.classList.contains('neo-shadow')) {
        (el as HTMLElement).style.transform = 'translate(2px, 2px)';
      }
    });
    el.addEventListener('mouseup', () => {
      (el as HTMLElement).style.transform = '';
    });
  });

  // Simple fade-in effect for sections on scroll
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.opacity = '1';
        (entry.target as HTMLElement).style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for fade-in animation
  document.querySelectorAll('.bg-surface, .bg-white, .bg-primary-container, .bg-tertiary-container, .bg-secondary-fixed, .bg-on-surface').forEach((el) => {
    if (el.classList.contains('neo-shadow-lg')) {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
      (el as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      observer.observe(el);
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInteractions);
} else {
  initializeInteractions();
}
