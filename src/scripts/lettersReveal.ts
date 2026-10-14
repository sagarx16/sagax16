/**
 * Oversized brand typography reveal effect
 * Letters rise in one by one when SAGA16 scrolls into view
 */
export function initLettersReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal="letters"]');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  elements.forEach((el) => {
    if (el.dataset.lettersInit === 'true') return;
    el.dataset.lettersInit = 'true';

    const text = el.textContent?.trim() || 'SAGA16';
    el.setAttribute('aria-label', text);
    el.innerHTML = '';

    const container = document.createElement('span');
    container.setAttribute('aria-hidden', 'true');
    container.className = 'inline-flex items-end justify-center overflow-hidden';

    // Split each character
    text.split('').forEach((char, index) => {
      const charMask = document.createElement('span');
      charMask.className = 'inline-block overflow-hidden';

      const charSpan = document.createElement('span');
      charSpan.className = 'brand-letter inline-block transition-transform duration-700 ease-out will-change-transform';
      charSpan.style.transitionDelay = `${index * 80}ms`;
      charSpan.textContent = char;

      charMask.appendChild(charSpan);
      container.appendChild(charMask);
    });

    el.appendChild(container);
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
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}
