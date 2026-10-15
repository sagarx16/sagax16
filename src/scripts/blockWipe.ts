/**
 * Green Block Wipe Text Reveal Animation (Levein Group style)
 * Target: 3 cards in the "ABOUT SAGA16" section on Home page
 *
 * Requirements:
 * - Solid mint-green (#6BBF9A) block grows left-to-right over each line (~350ms)
 * - Block retreats toward right (~450ms) as text appears underneath from left to right
 * - Smooth ease-in-out curve: cubic-bezier(0.65, 0, 0.35, 1)
 * - Round icon in each card fades and scales in slightly (0.85 -> 1) just before text
 * - Triggered once via IntersectionObserver at ~30% card visibility (does not replay)
 * - Stagger: 150ms per card, 90ms per next line
 * - Accessible: real text remains selectable DOM text, visible without JS, reduced-motion respected
 */

export function initBlockWipe(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-block-wipe]');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    cards.forEach((card) => card.classList.add('is-revealed'));
    return;
  }

  const splitCardLines = (card: HTMLElement, cardIndex: number) => {
    const cardBaseDelay = cardIndex * 150;
    card.style.setProperty('--card-delay', `${cardBaseDelay}ms`);

    let lineCounter = 0;
    const isAlreadyRevealed = card.classList.contains('is-revealed');
    const textElements = card.querySelectorAll<HTMLElement>('[data-block-wipe-text]');

    textElements.forEach((el) => {
      // Store original text once to allow clean re-splitting on resize
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent?.trim().replace(/\s+/g, ' ') || '';
      }
      const rawText = el.dataset.originalText;
      if (!rawText) return;

      const words = rawText.split(' ').filter(Boolean);
      el.innerHTML = '';

      // Create temporary inline measurement spans to detect word wraps
      const tempSpans: HTMLSpanElement[] = [];
      words.forEach((word, idx) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        el.appendChild(span);
        if (idx < words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
        tempSpans.push(span);
      });

      // Group words into lines based on offsetTop
      const lines: string[][] = [];
      let currentLine: string[] = [];
      let lastTop: number | null = null;

      tempSpans.forEach((span, idx) => {
        const top = span.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) <= 6) {
          currentLine.push(words[idx]);
          if (lastTop === null) lastTop = top;
        } else {
          lines.push(currentLine);
          currentLine = [words[idx]];
          lastTop = top;
        }
      });
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }

      // Render line wrappers with block wipe elements
      el.innerHTML = '';
      lines.forEach((lineWords) => {
        const lineDelay = cardBaseDelay + 100 + lineCounter * 90;
        lineCounter++;

        const row = document.createElement('span');
        row.className = 'block-wipe-line-row';

        const line = document.createElement('span');
        line.className = 'block-wipe-line';
        line.style.setProperty('--line-delay', `${lineDelay}ms`);

        const textSpan = document.createElement('span');
        textSpan.className = 'block-wipe-line-text';
        textSpan.textContent = lineWords.join(' ');

        const boxSpan = document.createElement('span');
        boxSpan.className = 'block-wipe-box';
        boxSpan.setAttribute('aria-hidden', 'true');

        if (isAlreadyRevealed) {
          textSpan.style.opacity = '1';
          textSpan.style.animation = 'none';
          boxSpan.style.display = 'none';
        }

        line.appendChild(textSpan);
        line.appendChild(boxSpan);
        row.appendChild(line);
        el.appendChild(row);
      });
    });
  };

  const splitAllCards = () => {
    cards.forEach((card, idx) => splitCardLines(card, idx));
  };

  // Wait for webfonts to settle for accurate line break measurements
  if ('fonts' in document) {
    document.fonts.ready.then(splitAllCards);
  } else {
    splitAllCards();
  }

  // IntersectionObserver to trigger once when card reaches ~30% visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('is-revealed');
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => observer.observe(card));

  // Debounced resize listener: recalculate line wrapping if viewport width changes
  let resizeTimer: number;
  let lastWindowWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWindowWidth) return;
    lastWindowWidth = window.innerWidth;

    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      splitAllCards();
    }, 150);
  });
}
