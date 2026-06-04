// Micro-interactions for claymorphist feel
export function initializeInteractions(): void {
  // Clay button press: JS reinforcement on top of CSS :active
  document.querySelectorAll<HTMLElement>('button, a').forEach((el) => {
    el.addEventListener('mousedown', () => {
      if (el.classList.contains('clay-button')) {
        el.style.transform = 'scale(0.95)';
      }
    });
    const reset = () => {
      if (el.classList.contains('clay-button')) {
        el.style.transform = '';
      }
    };
    el.addEventListener('mouseup', reset);
    el.addEventListener('mouseleave', reset);
  });
 
  // Scroll-triggered fade-in for glass-card and clay-card elements
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
 
  document.querySelectorAll<HTMLElement>('.glass-card, .clay-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
  });
}
 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInteractions);
} else {
  initializeInteractions();
}
 