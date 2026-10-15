import Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

let lenisInstance: Lenis | null = null;

/**
 * Initializes ultra-efficient momentum smooth scroll using Lenis (Apple / Awwwards motion standard).
 * Designed for 60/120fps fluid scrolling, GPU-accelerated transforms, and battery conservation.
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Respect system accessibility preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  // Prevent duplicate initialization
  if (lenisInstance) {
    return lenisInstance;
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-style exponential deceleration curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  });

  lenisInstance = lenis;
  window.lenis = lenis;

  // Unified single-RAF loop for optimal performance & zero CPU waste
  let isRunning = true;
  function raf(time: number) {
    if (!isRunning) return;
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smooth scroll handler for anchor links
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: -80, // account for fixed navbar height
          duration: 1.2,
        });
      }
    });
  });

  // Pause smooth scroll ticker when page is backgrounded to save CPU and battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
