/**
 * Scroll-triggered text reveal effect
 * Accessible: original text kept in aria-label, split spans aria-hidden
 * Masks words/lines and staggers their rise into view
 */
export function initTextReveal(): void {
  // If reduced motion is requested, do not split/animate
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>('[data-reveal="text"]');

  elements.forEach((el) => {
    // Prevent double initialization
    if (el.dataset.revealInit === 'true') return;
    el.dataset.revealInit = 'true';

    const originalText = el.textContent?.trim() || '';
    if (!originalText) return;

    el.setAttribute('aria-label', originalText);

    // Split text into words while preserving line breaks or paragraphs
    const words = originalText.split(/\s+/);
    el.innerHTML = '';

    const wrapper = document.createElement('span');
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.className = 'reveal-text-wrapper inline';

    words.forEach((word, index) => {
      const maskSpan = document.createElement('span');
      maskSpan.className = 'inline-block overflow-hidden align-top mr-[0.25em] pb-[0.05em]';

      const innerSpan = document.createElement('span');
      innerSpan.className = 'reveal-word inline-block';
      innerSpan.style.transitionDelay = `${Math.min(index * 35, 600)}ms`;
      innerSpan.textContent = word;

      maskSpan.appendChild(innerSpan);
      wrapper.appendChild(maskSpan);
    });

    el.appendChild(wrapper);
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
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
