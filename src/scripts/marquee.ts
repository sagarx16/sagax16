/**
 * Marquee Performance & Visibility Controller
 * 
 * - Guarantees zero user-interaction pauses: marquees never stop or slow down on
 *   hover, pointer, touch, click, drag, or focus.
 * - Performance-only optimization: pauses when completely off-screen (IntersectionObserver)
 *   or when the tab is backgrounded (visibilitychange).
 * - Resumes seamlessly from the exact same position via animationPlayState without restarting.
 * - Respects prefers-reduced-motion.
 */

export function initMarquees(): void {
  // If user requested reduced motion, CSS handles static display
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const marqueeTracks = document.querySelectorAll<HTMLElement>(
    '.marquee-track, .marquee-track-left, .marquee-track-right, .tech-track, [data-marquee-track]'
  );

  if (!marqueeTracks.length) return;

  // Track visibility state for each element
  const visibilityMap = new WeakMap<HTMLElement, boolean>();

  // IntersectionObserver: pause ONLY when 100% off-screen, resume when entering viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const track = entry.target as HTMLElement;
        const inView = entry.isIntersecting;
        visibilityMap.set(track, inView);

        if (!document.hidden) {
          track.style.animationPlayState = inView ? 'running' : 'paused';
        }
      });
    },
    { threshold: 0 }
  );

  marqueeTracks.forEach((track) => {
    visibilityMap.set(track, true);
    observer.observe(track);
  });

  // Tab visibility change: pause when tab hidden, resume when tab visible (if in viewport)
  document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    marqueeTracks.forEach((track) => {
      if (isHidden) {
        track.style.animationPlayState = 'paused';
      } else {
        const inView = visibilityMap.get(track) ?? true;
        if (inView) {
          track.style.animationPlayState = 'running';
        }
      }
    });
  });
}
