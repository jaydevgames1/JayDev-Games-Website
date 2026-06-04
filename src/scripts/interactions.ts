// Micro-interactions for claymorphist feel
export function initializeInteractions(): void {
  // Clay button press animations — scale down on mousedown
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
 
  // Scroll-triggered fade-in for glass cards and clay cards
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
  };
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.opacity = '1';
        (entry.target as HTMLElement).style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
 
  // Observe glass-card and clay-card elements for fade-in
  document
    .querySelectorAll<HTMLElement>('.glass-card, .clay-card')
    .forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      observer.observe(el);
    });
}
 
// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInteractions);
} else {
  initializeInteractions();
}
 