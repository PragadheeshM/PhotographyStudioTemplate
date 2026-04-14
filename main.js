/* ============================================================
   HIGH-END PHOTOGRAPHY STUDIO — Global JavaScript
   ============================================================ */

'use strict';

/* ── DOM Ready ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCounters();
  initAccordion();
  initToastSystem();
  initRTLToggle();
  initThemeToggle();
  initPricingToggle();
  initPortfolioFilter();
  initForms();
  initDashboardSidebar();
  initCountdown();
  initParallax();
});

/* ══════════════════════════════════════════════════════════════
   THEME (DARK / LIGHT)
   ══════════════════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('heps-theme') || 'dark';
  applyTheme(saved);
}

function applyTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  localStorage.setItem('heps-theme', mode);
  document.querySelectorAll('[data-theme-icon]').forEach(el => {
    el.innerHTML = mode === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
  
  // Update chart defaults if loaded
  if (window.HEPS) {
    HEPS.chartDefaults.color = mode === 'dark' ? '#E11D48' : '#BE123C';
  }
}

function initThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('heps-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   RTL / LTR TOGGLE
   ══════════════════════════════════════════════════════════════ */
function initRTLToggle() {
  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    const saved = localStorage.getItem('heps-dir') || 'ltr';
    document.documentElement.setAttribute('dir', saved);
    updateRTLIcon(btn, saved);

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('heps-dir', next);
      document.querySelectorAll('[data-rtl-toggle]').forEach(b => updateRTLIcon(b, next));
    });
  });
}

function updateRTLIcon(btn, dir) {
  btn.innerHTML = dir === 'rtl'
    ? '<i class="fa-solid fa-globe" title="LTR"></i>'
    : '<i class="fa-solid fa-globe" title="RTL"></i>';
  btn.title = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
}

/* ══════════════════════════════════════════════════════════════
   STICKY NAVBAR
   ══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════════════════════════
   MOBILE MENU
   ══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');

  if (!hamburger || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Handle Mobile Dropdowns
  mobileMenu.querySelectorAll('.mobile-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector('.fa-chevron-down');

      // Close other mobile dropdowns (Optional accordion behavior)
      mobileMenu.querySelectorAll('.mobile-dropdown-content').forEach(other => {
        if (other !== content && !other.classList.contains('hidden')) {
          other.classList.add('hidden');
          const otherTrigger = other.previousElementSibling;
          const otherIcon = otherTrigger.querySelector('.fa-chevron-down');
          if (otherIcon) otherIcon.style.transform = '';
        }
      });

      // Toggle current
      if (content) {
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : '';
        }
      }
    });
  });

  // Close menu on link click (only for direct links, not triggers)
  mobileMenu.querySelectorAll('a:not(.mobile-dropdown-trigger)').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS (IntersectionObserver)
   ══════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   NUMBER COUNTER
   ══════════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target  = parseFloat(el.dataset.counter);
  const suffix  = el.dataset.suffix || '';
  const prefix  = el.dataset.prefix || '';
  const isFloat = el.dataset.counter.includes('.');
  const duration = 2200;
  const start   = performance.now();

  const update = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = eased * target;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

/* ══════════════════════════════════════════════════════════════
   ACCORDION FAQ
   ══════════════════════════════════════════════════════════════ */
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(open => {
        open.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
   ══════════════════════════════════════════════════════════════ */
let toastContainer;

function initToastSystem() {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  document.body.appendChild(toastContainer);
}

function showToast(message, type = 'success', duration = 4000) {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      document.body.appendChild(toastContainer);
    }
  }

  const icons = {
    success: '<i class="fa-solid fa-circle-check toast-icon"></i>',
    error:   '<i class="fa-solid fa-circle-xmark toast-icon"></i>',
    info:    '<i class="fa-solid fa-circle-info toast-icon"></i>',
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${icons[type] || icons.info}
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;color:inherit;cursor:pointer;font-size:1rem;opacity:0.6;">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('dismissing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Expose globally
window.showToast = showToast;

/* ══════════════════════════════════════════════════════════════
   PRICING TOGGLE (Monthly / Annual)
   ══════════════════════════════════════════════════════════════ */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isFullDay = toggle.checked;
    document.querySelectorAll('[data-monthly]').forEach(el => {
      const raw = isFullDay ? el.dataset.annual : el.dataset.monthly;
      // Format with commas for large numbers
      const num = parseInt(raw, 10);
      el.textContent = '$' + num.toLocaleString();
    });
    document.querySelectorAll('.pricing-period').forEach(el => {
      el.textContent = isFullDay ? '/ day' : '/ hr';
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO FILTER
   ══════════════════════════════════════════════════════════════ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.display = show ? '' : 'none';
          if (show) {
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          }
        }, 200);
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   FORM HANDLING (Mock)
   ══════════════════════════════════════════════════════════════ */
function initForms() {
  document.querySelectorAll('[data-mock-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        const type = form.dataset.mockForm;
        if (type === 'login') {
          showToast('Welcome back! Redirecting…', 'success');
        } else if (type === 'register') {
          showToast('Account created successfully!', 'success');
        } else {
          showToast('Message sent! We\'ll respond within 24 hours.', 'success');
        }
        form.reset();
      }, 1800);
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD SIDEBAR TOGGLE
   ══════════════════════════════════════════════════════════════ */
function initDashboardSidebar() {
  const sidebar      = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const overlay      = document.getElementById('sidebar-overlay');

  if (!sidebar) return;

  // Mobile open
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // Close sidebar on menu link click
  sidebar.querySelectorAll('.sidebar-nav-item').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   COUNTDOWN TIMER
   ══════════════════════════════════════════════════════════════ */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  // Target: 90 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 90);

  const update = () => {
    const now  = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      countdownEl.innerHTML = '<p class="gradient-text text-3xl font-bold">We\'re Live!</p>';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const fmt = v => String(v).padStart(2, '0');
    document.getElementById('cd-days')    && (document.getElementById('cd-days').textContent    = fmt(days));
    document.getElementById('cd-hours')   && (document.getElementById('cd-hours').textContent   = fmt(hours));
    document.getElementById('cd-minutes') && (document.getElementById('cd-minutes').textContent = fmt(minutes));
    document.getElementById('cd-seconds') && (document.getElementById('cd-seconds').textContent = fmt(seconds));
  };

  update();
  setInterval(update, 1000);
}

/* ══════════════════════════════════════════════════════════════
   PARALLAX SHAPES
   ══════════════════════════════════════════════════════════════ */
function initParallax() {
  const shapes = document.querySelectorAll('.parallax-shape');
  if (!shapes.length) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = (i % 3 + 1) * 0.15;
      shape.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   CHART.JS HELPERS
   ══════════════════════════════════════════════════════════════ */
window.HEPS = {
  chartDefaults: {
    color: '#E11D48',
    fontFamily: "'Inter', sans-serif",
  },
  initDoughnut(canvasId, data, labels) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !window.Chart) return;
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#E11D48', '#FB7185', '#BE123C', '#1A1A2E', '#0D0D0D'],
          borderColor: 'transparent',
          hoverOffset:  10,
        }],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: { 
              color: document.body.classList.contains('light-mode') ? '#4A2D38' : '#b0a89a', 
              font: { family: 'Inter', size: 12 }, 
              padding: 16 
            },
          },
        },
        cutout: '72%',
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },
  initBar(canvasId, data, labels) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !window.Chart) return;
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenue ($)',
          data,
          backgroundColor: 'rgba(225,29,72,0.7)',
          borderColor: '#E11D48',
          borderWidth: 1,
          borderRadius: 6,
        }],
      },
      options: {
        plugins: { legend: { labels: { color: '#b0a89a', font: { family: 'Inter' } } } },
        scales: {
          x: { 
            ticks: { color: document.body.classList.contains('light-mode') ? '#7A5560' : '#6b6460' }, 
            grid: { color: document.body.classList.contains('light-mode') ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)' } 
          },
          y: { 
            ticks: { color: document.body.classList.contains('light-mode') ? '#7A5560' : '#6b6460' }, 
            grid: { color: document.body.classList.contains('light-mode') ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)' } 
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },
  initPie(canvasId, data, labels) {
    const ctx = document.getElementById(canvasId);
    if (!ctx || !window.Chart) return;
    return new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#E11D48', '#FB7185', '#BE123C', '#881337', '#1A1A2E'],
          borderColor: 'rgba(13,13,13,0.5)',
          borderWidth: 2,
        }],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#b0a89a', font: { family: 'Inter', size: 12 }, padding: 16 },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },
};
