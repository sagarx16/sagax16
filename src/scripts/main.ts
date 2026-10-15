import { initTextReveal } from './reveal';
import { initBoxReveal } from './boxReveal';
import { initCounters } from './counters';
import { initTilt } from './tilt';
import { initLettersReveal } from './lettersReveal';
import { initBlockWipe } from './blockWipe';
import { initSmoothScroll } from './smoothScroll';
import { createExpandCollapse } from './expandCollapse';
import { initMarquees } from './marquee';

export function initSite(): void {
  initSmoothScroll();
  initNavbar();
  initMarquees();
  initTextReveal();
  initBoxReveal();
  initCounters();
  initTilt();
  initLettersReveal();
  initBlockWipe();
  initFaqAccordion();
  initProjectFilters();
  initContactForm();
}

/**
 * Sticky Navbar: transparent over dark hero at top, glassy solid white when scrolled (>40px)
 */
function initNavbar(): void {
  const header = document.querySelector<HTMLElement>('header[data-site-header]');
  const menuButton = document.querySelector<HTMLButtonElement>('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const mobileBackdrop = document.querySelector<HTMLElement>('[data-mobile-backdrop]');
  const iconMenu = menuButton?.querySelector<SVGElement>('[data-icon-menu]');
  const iconClose = menuButton?.querySelector<SVGElement>('[data-icon-close]');

  const updateHeaderState = () => {
    if (!header) return;
    const isMenuOpen = menuButton?.getAttribute('aria-expanded') === 'true';
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const isScrolled = scrollY > 30 || isMenuOpen;
    header.setAttribute('data-scrolled', String(isScrolled));
    header.classList.toggle('is-scrolled', isScrolled);
  };

  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeaderState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHeaderState, { passive: true });

    // Connect with Lenis smooth scroll if active
    if (window.lenis) {
      window.lenis.on('scroll', () => {
        updateHeaderState();
      });
    }

    // Initial check on page load & after DOM is ready
    updateHeaderState();
  }

  // Mobile menu toggle & backdrop
  const openMobileMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'true');
    iconMenu?.classList.add('hidden');
    iconClose?.classList.remove('hidden');

    // Pause smooth scrolling while menu is open
    window.lenis?.stop();

    // Force solid white state while mobile menu is open
    if (header) {
      header.setAttribute('data-scrolled', 'true');
      header.classList.add('is-scrolled');
    }

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

    // Resume smooth scrolling
    window.lenis?.start();

    // Return header to transparent if still at top (<30px)
    if (header) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const isScrolled = scrollY > 30;
      header.setAttribute('data-scrolled', String(isScrolled));
      header.classList.toggle('is-scrolled', isScrolled);
    }

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
 * Filter chips & View More toggle for Our Work bento grid
 */
function initProjectFilters(): void {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter-btn]');
  const projectTiles = document.querySelectorAll<HTMLElement>('[data-project-category]');
  const moreContainer = document.querySelector<HTMLElement>('[data-bento-more-container]');
  const moreBtn = document.querySelector<HTMLButtonElement>('[data-bento-more-btn]');
  const moreText = document.querySelector<HTMLElement>('[data-bento-more-text]');
  const moreIcon = document.querySelector<HTMLElement>('[data-bento-more-icon]');
  const extraWrapper = document.querySelector<HTMLElement>('[data-bento-extra-wrapper]');

  if (!projectTiles.length) return;

  let currentFilter = 'all';

  const extraCards = Array.from(extraWrapper?.querySelectorAll<HTMLElement>('[data-bento-extra-card]') || []);
  const scrollTarget = document.querySelector<HTMLElement>('[data-bento-grid]') || document.querySelector<HTMLElement>('#projects-grid');

  let expandCollapseController: ReturnType<typeof createExpandCollapse> | null = null;

  if (extraWrapper && moreBtn && moreText) {
    expandCollapseController = createExpandCollapse({
      wrapper: extraWrapper,
      button: moreBtn,
      buttonText: moreText,
      buttonIcon: moreIcon,
      cards: extraCards,
      scrollTarget: scrollTarget,
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filterBtn || 'all';

      // Update active button styling
      filterButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active-filter-pill', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      if (currentFilter === 'all') {
        // Show View More button container
        if (moreContainer) moreContainer.classList.remove('hidden');

        // Reset tiles visibility
        projectTiles.forEach((tile) => {
          tile.classList.remove('hidden');
        });

        if (extraWrapper) {
          if (!expandCollapseController?.isExpanded()) {
            extraWrapper.classList.remove('is-open', 'is-collapsing');
            extraWrapper.setAttribute('hidden', '');
            extraWrapper.setAttribute('inert', '');
          } else {
            extraWrapper.removeAttribute('hidden');
            extraWrapper.removeAttribute('inert');
            extraWrapper.classList.add('is-open');
            extraWrapper.classList.remove('is-collapsing');
          }
        }
      } else {
        // Specific category filtered:
        // Hide View More button since filter shows all matching projects
        if (moreContainer) moreContainer.classList.add('hidden');

        if (extraWrapper) {
          extraWrapper.removeAttribute('hidden');
          extraWrapper.removeAttribute('inert');
          extraWrapper.classList.add('is-open');
          extraWrapper.classList.remove('is-collapsing');
        }

        projectTiles.forEach((tile) => {
          const category = tile.dataset.projectCategory;
          const shouldShow = category === currentFilter;
          tile.classList.toggle('hidden', !shouldShow);
        });
      }
    });
  });
}

/**
 * Contact Form submission via Web3Forms API
 */
function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const thankYouBox = document.querySelector<HTMLElement>('[data-form-thank-you]');
  const errorBox = document.querySelector<HTMLElement>('[data-form-error]');
  const submitButton = form?.querySelector<HTMLButtonElement>('[data-submit-button]');
  const submitText = form?.querySelector<HTMLElement>('[data-submit-text]');

  if (!form) return;

  const originalSubmitText = submitText?.textContent || 'Send Enquiry';
  let isSubmitting = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Reset general error box
    if (errorBox) errorBox.classList.add('hidden');

    let isValid = true;

    const nameInput = form.querySelector<HTMLInputElement>('#fullName');
    const phoneInput = form.querySelector<HTMLInputElement>('#phone');
    const emailInput = form.querySelector<HTMLInputElement>('#email');
    const projectTypeInput = form.querySelector<HTMLSelectElement>('#projectType');
    const detailsInput = form.querySelector<HTMLTextAreaElement>('#projectDetails');
    const botcheckInput = form.querySelector<HTMLInputElement>('#botcheck');

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

    // Phone validation: require at least 10 digits
    const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
    setError(phoneInput, 'phoneError', phoneDigits.length < 10);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError(emailInput, 'emailError', !emailInput?.value.trim() || !emailRegex.test(emailInput.value.trim()));

    // Dropdown validation
    setError(projectTypeInput, 'typeError', !projectTypeInput?.value);

    // Details validation
    setError(detailsInput, 'detailsError', !detailsInput?.value.trim());

    if (!isValid) return;

    // Honeypot check: silently exit and pretend success if bot filled honeypot
    if (botcheckInput && botcheckInput.checked) {
      form.reset();
      form.classList.add('hidden');
      if (thankYouBox) thankYouBox.classList.remove('hidden');
      return;
    }

    // Access key from environment variable (inlined at build time by Astro)
    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      console.error('[SAGA16 Contact] Missing PUBLIC_WEB3FORMS_KEY environment variable.');
      if (errorBox) {
        const descEl = errorBox.querySelector<HTMLElement>('[data-form-error-desc]');
        if (descEl) {
          descEl.innerHTML = 'Form service is temporarily unavailable. Please contact us directly at <a href="tel:+917050836284" class="underline font-medium hover:text-red-900">+91 7050836284</a> or via WhatsApp.';
        }
        errorBox.classList.remove('hidden');
      }
      return;
    }

    // UI state: Sending...
    isSubmitting = true;
    if (submitButton) submitButton.disabled = true;
    if (submitText) submitText.textContent = 'Sending...';

    const payload = {
      access_key: accessKey,
      name: nameInput?.value.trim(),
      phone: phoneInput?.value.trim(),
      email: emailInput?.value.trim(),
      service: projectTypeInput?.value,
      message: detailsInput?.value.trim(),
      subject: 'New enquiry from SAGA16 website',
      from_name: 'SAGA16 Website',
      botcheck: false,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        form.classList.add('hidden');
        if (errorBox) errorBox.classList.add('hidden');
        if (thankYouBox) {
          thankYouBox.classList.remove('hidden');
          thankYouBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('[SAGA16 Contact] Web3Forms submission error:', err);
      if (errorBox) {
        errorBox.classList.remove('hidden');
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } finally {
      isSubmitting = false;
      if (submitButton) submitButton.disabled = false;
      if (submitText) submitText.textContent = originalSubmitText;
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
