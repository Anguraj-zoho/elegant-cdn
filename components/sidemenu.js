/* ============================================================
   SIDEMENU — Predefined JavaScript
   Reads data-active-item from <aside class="sidemenu"> and
   auto-activates the matching item + expands its parent section.
   Handles: desktop collapse/expand, mobile/tablet overlay drawer,
   section toggle, click highlight, and search filtering.

   Include via: <script src="../predefined-components/sidemenu.js"><\/script>
   ============================================================ */

(function () {
  'use strict';

  var CHEVRON_DOWN  = 'https://cdn.jsdelivr.net/gh/Anguraj-zoho/elegant-cdn@main/assets/icons/icon-sm-chevron-down.svg';
  var CHEVRON_RIGHT = 'https://cdn.jsdelivr.net/gh/Anguraj-zoho/elegant-cdn@main/assets/icons/icon-sm-chevron-right.svg';
  var TABLET_BREAKPOINT = 1024;

  function isOverlayMode() {
    return window.innerWidth <= TABLET_BREAKPOINT;
  }

  /* ── Read data-active-item and set the active menu item (per sidebar) ── */
  function initActiveFromData() {
    document.querySelectorAll('.sidemenu').forEach(function (sidebar) {
      var activeItemName = sidebar.getAttribute('data-active-item');
      if (!activeItemName) return;

      sidebar.querySelectorAll('.sidemenu__item').forEach(function (item) {
        if (item.textContent.trim() === activeItemName) {
          item.classList.add('sidemenu__item--active');
        } else {
          item.classList.remove('sidemenu__item--active');
        }
      });
    });
  }

  /* ── Shared: animated show / hide using max-height + opacity ── */
  function animateOpen(el) {
    el.style.display = '';
    // Set starting frame
    el.style.overflow = 'hidden';
    el.style.maxHeight = '0px';
    el.style.opacity = '0';
    el.style.transition = 'max-height 0.25s ease, opacity 0.2s ease';
    // Force reflow so transition kicks in
    void el.offsetHeight;
    // Animate to full natural height
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
    // Clean inline styles after transition so nested items can grow freely
    setTimeout(function () {
      el.style.maxHeight = '';
      el.style.overflow = '';
      el.style.opacity = '';
      el.style.transition = '';
    }, 260);
  }

  function animateClose(el) {
    el.style.overflow = 'hidden';
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
    el.style.transition = 'max-height 0.25s ease, opacity 0.2s ease';
    void el.offsetHeight;
    el.style.maxHeight = '0px';
    el.style.opacity = '0';
    setTimeout(function () {
      el.style.display = 'none';
      el.style.maxHeight = '';
      el.style.overflow = '';
      el.style.opacity = '';
      el.style.transition = '';
    }, 260);
  }

  /* ── Auto-expand the section that contains the active item (per sidebar) ── */
  function initAutoExpand() {
    document.querySelectorAll('.sidemenu__item--active').forEach(function (active) {
      var section = active.closest('.sidemenu__section');
      if (!section) return;
      var chevron  = section.querySelector('.sidemenu__chevron');
      var children = section.querySelectorAll(
        '.sidemenu__l2-subheader, .sidemenu__item'
      );
      children.forEach(function (el) { el.style.display = ''; });
      if (chevron) chevron.src = CHEVRON_DOWN;
    });
  }

  /* ── Collapse / Expand sidebar (desktop + overlay close) ── */
  function initSidebarToggle() {
    var backdrop = document.querySelector('.sidemenu-backdrop');
    var expandBtn = document.getElementById('sidebarExpand');

    // Use event delegation on <document> so it works regardless of DOM parse timing.
    // Any click on a .sidemenu__bottom-btn (or its children) toggles the parent sidebar.
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.sidemenu__bottom-btn');
      if (!btn) return;
      var sidebar = btn.closest('.sidemenu');
      if (!sidebar) return;

      if (sidebar.classList.contains('sidemenu--collapsed')) {
        sidebar.classList.remove('sidemenu--collapsed');
        if (expandBtn) expandBtn.classList.remove('sidemenu-expand--visible');
        btn.title = 'Collapse sidebar';
      } else {
        if (isOverlayMode()) {
          sidebar.classList.remove('sidemenu--overlay-open');
          if (backdrop) backdrop.classList.remove('sidemenu-backdrop--visible');
          document.body.style.overflow = '';
        }
        sidebar.classList.add('sidemenu--collapsed');
        if (expandBtn) expandBtn.classList.add('sidemenu-expand--visible');
        btn.title = 'Expand sidebar';
      }
    });

    // Page-level expand handle only relevant when present (real Shell layouts).
    if (expandBtn) {
      expandBtn.addEventListener('click', function () {
        document.querySelectorAll('.sidemenu--collapsed').forEach(function (s) {
          s.classList.remove('sidemenu--collapsed');
        });
        expandBtn.classList.remove('sidemenu-expand--visible');
      });
    }
  }

  /* ── Mobile/Tablet: overlay drawer toggle ── */
  function initOverlayDrawer() {
    var sidebar  = document.querySelector('.sidemenu');
    var backdrop = document.querySelector('.sidemenu-backdrop');
    var hamburger = document.querySelector('.topnavbar__hamburger');

    if (!sidebar || !backdrop || !hamburger) return;

    function openDrawer() {
      sidebar.classList.add('sidemenu--overlay-open');
      backdrop.classList.add('sidemenu-backdrop--visible');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      sidebar.classList.remove('sidemenu--overlay-open');
      backdrop.classList.remove('sidemenu-backdrop--visible');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (sidebar.classList.contains('sidemenu--overlay-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    backdrop.addEventListener('click', closeDrawer);

    window.addEventListener('resize', function () {
      if (!isOverlayMode() && sidebar.classList.contains('sidemenu--overlay-open')) {
        closeDrawer();
      }
    });
  }

  /* ── L1 Section Expand / Collapse with animation (skip --flat, handled by initFlatAccordion) ── */
  function initSectionToggle() {
    document.querySelectorAll('.sidemenu__l1:not(.sidemenu__l1--flat)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section  = btn.closest('.sidemenu__section');
        var chevron  = btn.querySelector('.sidemenu__chevron');
        var children = section.querySelectorAll(
          '.sidemenu__l2-subheader, .sidemenu__item'
        );

        var isOpen = children.length > 0 && children[0].style.display !== 'none';

        children.forEach(function (el) {
          if (isOpen) animateClose(el); else animateOpen(el);
        });

        if (chevron) {
          chevron.src = isOpen ? CHEVRON_RIGHT : CHEVRON_DOWN;
          chevron.style.transition = 'transform 0.2s ease';
        }
      });
    });
  }

  /* ── Active Item Highlight on click (scoped to each sidebar) ── */
  function initActiveItem() {
    document.querySelectorAll('.sidemenu').forEach(function (sidebar) {
      sidebar.querySelectorAll('.sidemenu__item').forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          sidebar.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
            el.classList.remove('sidemenu__item--active');
          });
          item.classList.add('sidemenu__item--active');
          sidebar.setAttribute('data-active-item', item.textContent.trim());
        });
      });
    });
  }

  /* ── Search Filter (scoped to each sidebar) ── */
  function initSearchFilter() {
    document.querySelectorAll('.sidemenu').forEach(function (sidebar) {
      var input = sidebar.querySelector('.sidemenu__search input');
      if (!input) return;
      input.addEventListener('input', function () {
        var query = input.value.toLowerCase().trim();
        sidebar.querySelectorAll('.sidemenu__item').forEach(function (item) {
          var text = item.textContent.toLowerCase();
          item.style.display = (!query || text.includes(query)) ? '' : 'none';
        });
      });
    });
  }

  /* ── Type 2: OS Dropdown toggle + menu swap ── */
  function initOsDropdown() {
    document.querySelectorAll('.sidemenu__os-dropdown').forEach(function (dd) {
      var opts = dd.querySelector('.sidemenu__os-options');
      if (!opts) return;

      var sidebar = dd.closest('.sidemenu');

      dd.addEventListener('click', function (e) {
        e.stopPropagation();
        opts.classList.toggle('sidemenu__os-options--open');
      });

      opts.querySelectorAll('.sidemenu__os-option').forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          var osLabel = dd.querySelector('.sidemenu__os-label');
          var osIcon  = dd.querySelector('.sidemenu__os-icon');
          if (osLabel) osLabel.textContent = opt.getAttribute('data-label');
          if (osIcon && opt.getAttribute('data-icon')) osIcon.src = opt.getAttribute('data-icon');
          opts.classList.remove('sidemenu__os-options--open');

          // Derive OS key from label text ("Windows" -> "windows", "Unix/Linux" -> "unix")
          var rawLabel = (opt.getAttribute('data-label') || '').toLowerCase();
          var osKey = rawLabel.indexOf('unix') !== -1 || rawLabel.indexOf('linux') !== -1 ? 'unix' : 'windows';

          if (!sidebar) return;

          // Swap visible sections based on data-os — and collapse any expanded L1
          sidebar.querySelectorAll('.sidemenu__section[data-os]').forEach(function (sec) {
            var secOs = sec.getAttribute('data-os');
            if (secOs === osKey) {
              sec.style.display = '';
            } else {
              sec.style.display = 'none';
            }
            // Reset chevrons + hide child items so accordion state is clean on swap
            var chev = sec.querySelector('.sidemenu__chevron');
            if (chev) chev.src = CHEVRON_RIGHT;
            sec.querySelectorAll('.sidemenu__item').forEach(function (it) {
              it.style.display = 'none';
              it.style.maxHeight = '';
              it.style.opacity = '';
              it.style.transition = '';
              it.style.overflow = '';
            });
          });
        });
      });

      document.addEventListener('click', function () {
        opts.classList.remove('sidemenu__os-options--open');
      });
    });
  }

  /* ── Type 2: Flat L1 accordion toggle ── */
  function initFlatAccordion() {
    document.querySelectorAll('.sidemenu--type2 .sidemenu__l1--flat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section = btn.closest('.sidemenu__section');
        var chevron = btn.querySelector('.sidemenu__chevron');
        var children = section.querySelectorAll('.sidemenu__item');
        if (children.length === 0) return;
        var isOpen = children[0].style.display !== 'none';

        children.forEach(function (el) {
          if (isOpen) animateClose(el); else animateOpen(el);
        });
        if (chevron) {
          chevron.src = isOpen ? CHEVRON_RIGHT : CHEVRON_DOWN;
        }
      });
    });
  }

  /* ── Type 2: Active L1 from data-active-item ── */
  function initType2Active() {
    document.querySelectorAll('.sidemenu--type2').forEach(function (sidebar) {
      var activeItemName = sidebar.getAttribute('data-active-item');
      if (!activeItemName) return;

      sidebar.querySelectorAll('.sidemenu__l1--flat').forEach(function (btn) {
        var span = btn.querySelector('span');
        if (span && span.textContent.trim() === activeItemName) {
          btn.classList.add('sidemenu__l1--active');
          var section = btn.closest('.sidemenu__section');
          var chevron = btn.querySelector('.sidemenu__chevron');
          var children = section.querySelectorAll('.sidemenu__item');
          children.forEach(function (el) { el.style.display = ''; });
          if (chevron) chevron.src = CHEVRON_DOWN;
        }
      });

      sidebar.querySelectorAll('.sidemenu__item').forEach(function (item) {
        if (item.textContent.trim() === activeItemName) {
          item.classList.add('sidemenu__item--active');
          var section = item.closest('.sidemenu__section');
          if (section) {
            var chevron = section.querySelector('.sidemenu__chevron');
            var children = section.querySelectorAll('.sidemenu__item');
            children.forEach(function (el) { el.style.display = ''; });
            if (chevron) chevron.src = CHEVRON_DOWN;
          }
        }
      });
    });
  }

  /* ── Type 2: Click highlight for flat L1 items ── */
  function initType2ClickHighlight() {
    document.querySelectorAll('.sidemenu--type2 .sidemenu__l1--flat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sidebar = btn.closest('.sidemenu--type2');
        sidebar.querySelectorAll('.sidemenu__l1--active').forEach(function (el) {
          el.classList.remove('sidemenu__l1--active');
        });
        sidebar.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
          el.classList.remove('sidemenu__item--active');
        });
      });
    });

    document.querySelectorAll('.sidemenu--type2 .sidemenu__item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var sidebar = item.closest('.sidemenu--type2');
        sidebar.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
          el.classList.remove('sidemenu__item--active');
        });
        sidebar.querySelectorAll('.sidemenu__l1--active').forEach(function (el) {
          el.classList.remove('sidemenu__l1--active');
        });
        item.classList.add('sidemenu__item--active');
      });
    });
  }

  /* ── Type 2: Search filter for flat items ── */
  function initType2Search() {
    document.querySelectorAll('.sidemenu--type2 .sidemenu__search input').forEach(function (input) {
      input.addEventListener('input', function () {
        var query = input.value.toLowerCase().trim();
        var sidebar = input.closest('.sidemenu--type2');
        sidebar.querySelectorAll('.sidemenu__section').forEach(function (section) {
          var l1 = section.querySelector('.sidemenu__l1--flat');
          var items = section.querySelectorAll('.sidemenu__item');
          var l1Text = l1 ? l1.textContent.toLowerCase() : '';
          var anyVisible = false;

          if (!query) {
            if (l1) l1.style.display = '';
            items.forEach(function (it) { it.style.display = 'none'; });
            return;
          }

          if (l1Text.includes(query)) {
            if (l1) l1.style.display = '';
            anyVisible = true;
          }

          items.forEach(function (it) {
            if (it.textContent.toLowerCase().includes(query)) {
              it.style.display = '';
              anyVisible = true;
            } else {
              it.style.display = 'none';
            }
          });

          if (l1) l1.style.display = anyVisible ? '' : 'none';
        });
      });
    });
  }

  /* ── Bootstrap ── */
  function init() {
    initActiveFromData();
    initAutoExpand();
    initSidebarToggle();
    initOverlayDrawer();
    initSectionToggle();
    initActiveItem();
    initSearchFilter();
    initOsDropdown();
    initFlatAccordion();
    initType2Active();
    initType2ClickHighlight();
    initType2Search();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
