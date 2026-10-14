/**
 * 3D Tilt / Rotate hover card effect
 * Max ~8 degrees tilt toward pointer, with perspective and soft moving specular highlight
 * Strictly disabled on touch devices (pointer: fine only)
 * Smooth return on mouse leave
 */
export function initTilt(): void {
  // Only enable on precise pointer devices (desktop mouse/trackpad)
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const cards = document.querySelectorAll<HTMLElement>('[data-tilt]');

  cards.forEach((card) => {
    // Add relative and perspective classes if needed
    card.classList.add('tilt-card');

    // Create highlight sheen overlay if not present
    let highlight = card.querySelector<HTMLElement>('.tilt-highlight');
    if (!highlight) {
      highlight = document.createElement('div');
      highlight.className = 'tilt-highlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300';
      highlight.style.background = 'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(107, 191, 154, 0.15), transparent 80%)';
      card.style.position = 'relative';
      card.appendChild(highlight);
    }

    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalized between -1 and 1
        const normX = (mouseX / cardWidth) * 2 - 1;
        const normY = (mouseY / cardHeight) * 2 - 1;

        // Max ~8 degrees
        const maxTilt = 8;
        const tiltX = -(normY * maxTilt);
        const tiltY = normX * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(6px)`;
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);

        if (highlight) {
          highlight.style.opacity = '1';
        }
      });
    };

    const onMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);

      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

      if (highlight) {
        highlight.style.opacity = '0';
      }

      // Reset transition after smooth return
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    };

    const onMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease-out';
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}
