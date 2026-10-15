/**
 * Accessible, high-performance Expand / Collapse Controller
 * - Smooth CSS Grid 0fr -> 1fr height transition with cubic-bezier(0.22, 1, 0.36, 1)
 * - Staggered card entrance: opacity 0->1, translateY(32px->0), scale(0.98->1), clip-path unfolding
 * - Reverse stagger card exit: last card first (350ms, 50ms stagger)
 * - Container collapse over 600ms cubic-bezier(0.22, 1, 0.36, 1)
 * - Smooth scroll restoration to top of project section with navbar scroll-margin
 * - Button text crossfade (150ms), icon rotation (300ms) and double-click protection (900ms)
 * - Keyboard focus management and prefers-reduced-motion support
 */

export interface ExpandCollapseConfig {
  wrapper: HTMLElement;
  button: HTMLButtonElement;
  buttonText: HTMLElement;
  buttonIcon?: HTMLElement | null;
  cards: HTMLElement[];
  scrollTarget?: HTMLElement | null;
  moreText?: string;
  lessText?: string;
  onStateChange?: (isExpanded: boolean) => void;
}

export interface ExpandCollapseInstance {
  expand: (isKeyboard?: boolean) => void;
  collapse: () => void;
  toggle: (isKeyboard?: boolean) => void;
  isExpanded: () => boolean;
  isAnimating: () => boolean;
  destroy: () => void;
}

export function createExpandCollapse(config: ExpandCollapseConfig): ExpandCollapseInstance {
  const {
    wrapper,
    button,
    buttonText,
    buttonIcon,
    cards,
    scrollTarget,
    moreText = 'View More',
    lessText = 'View Less',
    onStateChange,
  } = config;

  let isExpandedState = false;
  let isAnimatingState = false;
  let animationTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let scrollRafId: number | null = null;

  const prefersReducedMotion = (): boolean =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Crossfade button text in 150ms total */
  const crossfadeButtonText = (targetText: string) => {
    buttonText.style.transition = 'opacity 75ms ease';
    buttonText.style.opacity = '0';
    setTimeout(() => {
      buttonText.textContent = targetText;
      buttonText.style.opacity = '1';
    }, 75);
  };

  /** Open / Expand */
  const expand = (isKeyboard = false) => {
    if (isAnimatingState || isExpandedState) return;
    isAnimatingState = true;
    isExpandedState = true;

    // 1. Disable button during animation (900ms) to prevent double-click glitches
    button.disabled = true;
    button.setAttribute('aria-expanded', 'true');
    button.style.pointerEvents = 'none';

    // 2. Animate button label (150ms crossfade) and icon rotation (300ms)
    crossfadeButtonText(lessText);
    if (buttonIcon) {
      buttonIcon.style.transition = 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)';
      buttonIcon.classList.add('rotate-180');
    }

    // 3. Make wrapper accessible and prepare grid opening
    wrapper.removeAttribute('hidden');
    wrapper.removeAttribute('inert');
    wrapper.setAttribute('aria-hidden', 'false');
    wrapper.classList.remove('is-collapsing');

    // Force reflow so starting from 0fr is guaranteed
    void wrapper.offsetHeight;
    wrapper.classList.add('is-open');

    // 4. Staggered card entrance
    if (prefersReducedMotion()) {
      cards.forEach((card) => {
        card.style.transition = 'opacity 150ms ease';
        card.style.opacity = '1';
        card.style.transform = 'none';
        card.style.clipPath = 'none';
      });

      animationTimeoutId = setTimeout(() => {
        button.disabled = false;
        button.style.pointerEvents = '';
        isAnimatingState = false;
        if (isKeyboard && cards[0]) {
          cards[0].focus({ preventScroll: true });
        }
        if (onStateChange) onStateChange(true);
      }, 150);
      return;
    }

    // Unfold animation for cards with 90ms stagger
    cards.forEach((card, index) => {
      const delay = index * 90;
      card.style.willChange = 'transform, opacity, clip-path';

      // Set initial values in case of re-opening
      card.style.opacity = '0';
      card.style.transform = 'translateY(32px) scale(0.98)';
      card.style.clipPath = 'inset(8% 0 0 0 round 24px)';

      void card.offsetHeight; // Flush styles

      card.style.transition = `
        opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
        transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
        clip-path 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms
      `;

      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      card.style.clipPath = 'inset(0 round 24px)';
    });

    // Clean up will-change and re-enable button after 900ms
    animationTimeoutId = setTimeout(() => {
      cards.forEach((card) => {
        card.style.willChange = 'auto';
      });
      button.disabled = false;
      button.style.pointerEvents = '';
      isAnimatingState = false;

      // Gently move keyboard focus to first new card only if keyboard was used
      if (isKeyboard && cards[0]) {
        cards[0].focus({ preventScroll: true });
      }

      if (onStateChange) onStateChange(true);
    }, 900);
  };

  /** Close / Collapse */
  const collapse = () => {
    if (isAnimatingState || !isExpandedState) return;
    isAnimatingState = true;
    isExpandedState = false;

    // 1. Disable button during collapse
    button.disabled = true;
    button.setAttribute('aria-expanded', 'false');
    button.style.pointerEvents = 'none';

    // 2. Animate button label crossfade (150ms) and icon rotation back (300ms)
    crossfadeButtonText(moreText);
    if (buttonIcon) {
      buttonIcon.style.transition = 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)';
      buttonIcon.classList.remove('rotate-180');
    }

    // Capture the button's exact viewport top before collapse starts
    const initialButtonTop = button.getBoundingClientRect().top;

    if (prefersReducedMotion()) {
      cards.forEach((card) => {
        card.style.transition = 'opacity 150ms ease';
        card.style.opacity = '0';
      });

      wrapper.classList.remove('is-open', 'is-collapsing');
      wrapper.setAttribute('hidden', '');
      wrapper.setAttribute('inert', '');
      wrapper.setAttribute('aria-hidden', 'true');

      // Compensate scroll so button stays right where it was
      const delta = button.getBoundingClientRect().top - initialButtonTop;
      if (Math.abs(delta) >= 1) {
        window.scrollBy({ top: delta, behavior: 'instant' });
      }

      animationTimeoutId = setTimeout(() => {
        button.disabled = false;
        button.style.pointerEvents = '';
        isAnimatingState = false;
        if (onStateChange) onStateChange(false);
      }, 150);
      return;
    }

    // 3. Reverse stagger exit: last card first (350ms duration, 50ms stagger)
    const reversedCards = [...cards].reverse();
    reversedCards.forEach((card, index) => {
      const delay = index * 50;
      card.style.willChange = 'transform, opacity, clip-path';

      card.style.transition = `
        opacity 350ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
        transform 350ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
        clip-path 350ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms
      `;

      card.style.opacity = '0';
      card.style.transform = 'translateY(24px) scale(0.98)';
      card.style.clipPath = 'inset(8% 0 0 0 round 24px)';
    });

    // 4. Collapse container height over 600ms
    wrapper.classList.remove('is-open');
    wrapper.classList.add('is-collapsing');

    // 5. Keep the button pinned at its exact viewport position throughout collapse
    // This guarantees the mouse cursor / arrow remains directly over the button without jumping
    if (scrollRafId !== null) {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = null;
    }

    const startTime = performance.now();
    const pinDuration = 680;

    const stopPinning = () => {
      if (scrollRafId !== null) {
        cancelAnimationFrame(scrollRafId);
        scrollRafId = null;
      }
      window.removeEventListener('wheel', stopPinning);
      window.removeEventListener('touchmove', stopPinning);
    };

    window.addEventListener('wheel', stopPinning, { passive: true, once: true });
    window.addEventListener('touchmove', stopPinning, { passive: true, once: true });

    const keepButtonPinned = (now: number) => {
      const elapsed = now - startTime;
      const currentButtonTop = button.getBoundingClientRect().top;
      const delta = currentButtonTop - initialButtonTop;

      if (Math.abs(delta) >= 0.5) {
        window.scrollBy({ top: delta, behavior: 'instant' });
      }

      if (elapsed < pinDuration) {
        scrollRafId = requestAnimationFrame(keepButtonPinned);
      } else {
        stopPinning();
      }
    };
    scrollRafId = requestAnimationFrame(keepButtonPinned);

    // 6. Complete cleanup after animation finishes (750ms)
    animationTimeoutId = setTimeout(() => {
      stopPinning();
      wrapper.classList.remove('is-collapsing');
      wrapper.setAttribute('hidden', '');
      wrapper.setAttribute('inert', '');
      wrapper.setAttribute('aria-hidden', 'true');

      cards.forEach((card) => {
        card.style.willChange = 'auto';
        card.style.transition = '';
      });

      button.disabled = false;
      button.style.pointerEvents = '';
      isAnimatingState = false;

      if (onStateChange) onStateChange(false);
    }, 750);
  };

  /** Toggle */
  const toggle = (isKeyboard = false) => {
    if (isExpandedState) {
      collapse();
    } else {
      expand(isKeyboard);
    }
  };

  const handleClick = (e: MouseEvent) => {
    // Detect keyboard activation: detail is 0 on Enter / Space in standard browsers
    const isKeyboard = e.detail === 0 || button.matches(':focus-visible');
    toggle(isKeyboard);
  };

  button.addEventListener('click', handleClick);

  return {
    expand,
    collapse,
    toggle,
    isExpanded: () => isExpandedState,
    isAnimating: () => isAnimatingState,
    destroy: () => {
      button.removeEventListener('click', handleClick);
      if (animationTimeoutId) clearTimeout(animationTimeoutId);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
    },
  };
}
