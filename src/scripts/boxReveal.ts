/**
 * Box reveal effect
 * Images, mockups and avatar placeholders uncovered by colored curtain box
 * wiping across using clip-path/scaleX mask, then content settles in
 */
export function initBoxReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal="box"]');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  elements.forEach((el) => {
    if (el.dataset.boxInit === 'true') return;
    el.dataset.boxInit = 'true';

    // Ensure relative positioning and overflow hidden
    el.classList.add('box-reveal-container');

    // Create colored curtain if not already present
    if (!el.querySelector('.box-curtain')) {
      const curtain = document.createElement('div');
      const isGreen = el.dataset.boxColor === 'green';
      curtain.className = `box-curtain absolute inset-0 z-20 pointer-events-none ${
        isGreen ? 'bg-[#6BBF9A]' : 'bg-[#326262]'
      }`;
      el.appendChild(curtain);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
