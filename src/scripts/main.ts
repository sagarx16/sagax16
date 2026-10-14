import { initTextReveal } from './reveal';
import { initBoxReveal } from './boxReveal';
import { initCounters } from './counters';
import { initTilt } from './tilt';
import { initLettersReveal } from './lettersReveal';

export function initSite(): void {
  initNavbar();
  initTextReveal();
  initBoxReveal();
  initCounters();
  initTilt();
  initLettersReveal();
  initFaqAccordion();
  initProjectFilters();
  initContactForm();
}

/**
 * Sticky Navbar scroll blur and mobile menu
 */
function initNavbar(): void {
  const header = document.querySelector<HTMLElement>('header[data-site-header]');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle & backdrop
  const menuButton = document.querySelector<HTMLButtonElement>('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const mobileBackdrop = document.querySelector<HTMLElement>('[data-mobile-backdrop]');
  const iconMenu = menuButton?.querySelector<SVGElement>('[data-icon-menu]');
  const iconClose = menuButton?.querySelector<SVGElement>('[data-icon-close]');

  const openMobileMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'true');
    iconMenu?.classList.add('hidden');
    iconClose?.classList.remove('hidden');

    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('hidden');
      requestAnimationFrame(() => {
        mobileBackdrop.classList.remove('opacity-0');
        mobileBackdrop.classList.add('opacity-100');
      });
    }

    mobileMenu.classList.remove('hidden');
    requestAnimationFrame(() => {
      mobileMenu.classList.remove('-translate-y-4', 'opacity-0');
      mobileMenu.classList.add('translate-y-0', 'opacity-100');
    });

    document.body.classList.add('overflow-hidden');
  };

  const closeMobileMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    iconClose?.classList.add('hidden');
    iconMenu?.classList.remove('hidden');

    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('opacity-100');
      mobileBackdrop.classList.add('opacity-0');
      setTimeout(() => {
        mobileBackdrop.classList.add('hidden');
      }, 300);
    }

    mobileMenu.classList.remove('translate-y-0', 'opacity-100');
    mobileMenu.classList.add('-translate-y-4', 'opacity-0');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);

    document.body.classList.remove('overflow-hidden');
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileBackdrop?.addEventListener('click', closeMobileMenu);

    // Close when clicking nav links
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    });
  }
}

/**
 * Accessible FAQ accordion with smooth height animation and rotating chevron
 */
function initFaqAccordion(): void {
  const accordionItems = document.querySelectorAll<HTMLElement>('[data-faq-item]');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
    const content = item.querySelector<HTMLElement>('[data-faq-content]');
    const icon = item.querySelector<HTMLElement>('[data-faq-icon]');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items for a clean accordion experience
      accordionItems.forEach((other) => {
        if (other !== item) {
          const otherTrigger = other.querySelector<HTMLButtonElement>('[data-faq-trigger]');
          const otherContent = other.querySelector<HTMLElement>('[data-faq-content]');
          const otherIcon = other.querySelector<HTMLElement>('[data-faq-icon]');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/**
 * Filter chips for Our Work bento grid
 */
function initProjectFilters(): void {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter-btn]');
  const projectTiles = document.querySelectorAll<HTMLElement>('[data-project-category]');

  if (!filterButtons.length || !projectTiles.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filterBtn;

      // Update active button styling
      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active-filter-pill', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      // Filter project tiles with smooth transition
      projectTiles.forEach((tile) => {
        const category = tile.dataset.projectCategory;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          tile.classList.remove('hidden');
          requestAnimationFrame(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'scale(1)';
          });
        } else {
          tile.style.opacity = '0';
          tile.style.transform = 'scale(0.96)';
          setTimeout(() => {
            if (tile.style.opacity === '0') {
              tile.classList.add('hidden');
            }
          }, 250);
        }
      });
    });
  });
}

/**
 * Contact Form validation and WhatsApp prefill
 */
function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const thankYouBox = document.querySelector<HTMLElement>('[data-form-thank-you]');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const nameInput = form.querySelector<HTMLInputElement>('#fullName');
    const phoneInput = form.querySelector<HTMLInputElement>('#phone');
    const emailInput = form.querySelector<HTMLInputElement>('#email');
    const projectTypeInput = form.querySelector<HTMLSelectElement>('#projectType');
    const detailsInput = form.querySelector<HTMLTextAreaElement>('#projectDetails');

    // Validation helper
    const setError = (input: HTMLElement | null, errorId: string, hasError: boolean) => {
      const errorEl = document.getElementById(errorId);
      if (hasError) {
        input?.classList.add('border-red-500');
        input?.classList.remove('border-[#326262]/20');
        if (errorEl) errorEl.classList.remove('hidden');
        isValid = false;
      } else {
        input?.classList.remove('border-red-500');
        input?.classList.add('border-[#326262]/20');
        if (errorEl) errorEl.classList.add('hidden');
      }
    };

    // Validate fields
    setError(nameInput, 'nameError', !nameInput?.value.trim());
    setError(phoneInput, 'phoneError', !phoneInput?.value.trim() || phoneInput.value.trim().length < 8);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError(emailInput, 'emailError', !emailInput?.value.trim() || !emailRegex.test(emailInput.value.trim()));
    setError(projectTypeInput, 'typeError', !projectTypeInput?.value);
    setError(detailsInput, 'detailsError', !detailsInput?.value.trim());

    if (!isValid) return;

    // Build WhatsApp message
    const message = `Hello SAGA16 team,\n\nName: ${nameInput?.value.trim()}\nPhone: ${phoneInput?.value.trim()}\nEmail: ${emailInput?.value.trim()}\nProject Type: ${projectTypeInput?.value}\nDetails: ${detailsInput?.value.trim()}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917050836284?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show thank you state
    form.classList.add('hidden');
    if (thankYouBox) {
      thankYouBox.classList.remove('hidden');
    }
  });
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
  } else {
    initSite();
  }
}
