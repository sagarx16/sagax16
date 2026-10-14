/**
 * Count-up animation for fact band
 * EaseOut cubic/expo over ~1.6s, runs once
 * Fixes prefix (like '₹') and counts integer up to target
 */
export function initCounters(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-counter]');

  // If reduced motion, jump straight to target value
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => {
      const target = el.dataset.counterTarget || el.textContent || '0';
      const prefix = el.dataset.counterPrefix || '';
      el.textContent = `${prefix}${target}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          startCounter(el);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
}

function startCounter(el: HTMLElement): void {
  const targetStr = el.dataset.counterTarget || '0';
  const prefix = el.dataset.counterPrefix || '';
  const targetNum = parseInt(targetStr, 10);
  if (isNaN(targetNum)) return;

  const duration = 1600; // ~1.6s as specified
  const startTime = performance.now();

  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentVal = Math.round(easedProgress * targetNum);

    el.textContent = `${prefix}${currentVal}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Ensure the final value strictly equals target
      el.textContent = `${prefix}${targetNum}`;
    }
  }

  requestAnimationFrame(update);
}
