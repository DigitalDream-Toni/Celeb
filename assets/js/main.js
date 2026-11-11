/* =========================================================
   Daniel Joseph Levy — Fan Archive
   Vanilla JS: nav, reveals, image loading, lightbox, forms.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Config
     Set formEndpoint to a real handler (Formspree, Basin,
     Netlify Forms, or your own API) and submissions will be
     POSTed as JSON. Left empty, the forms show a success state
     locally so the site can be demoed without a backend.
     --------------------------------------------------------- */
  var CONFIG = {
    formEndpoint: "",
    newsletterEndpoint: ""
  };

  var d = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     1. Header state + mobile nav
     --------------------------------------------------------- */
  var header = d.getElementById("site-header");
  var nav = d.getElementById("primary-nav");
  var navToggle = d.getElementById("nav-toggle");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------------------------------------------------------
     3. Scroll spy — highlight the section you're reading
     --------------------------------------------------------- */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll("a")) : [];
  var sections = ["about", "work", "press", "contact"]
    .map(function (id) { return d.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------
     4. Reveal on scroll
     --------------------------------------------------------- */
  var revealables = Array.prototype.slice.call(d.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = Math.min(parseInt(el.dataset.delay || "0", 10), 400);
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------------------------------------------------------
     5. Image loading
     Real photos live in /images. If a file is missing the
     styled placeholder stays visible underneath.
     --------------------------------------------------------- */
  function watchImage(img) {
    var done = function () {
      if (img.naturalWidth > 0) img.classList.add("is-loaded");
    };
    if (img.complete) done();
    img.addEventListener("load", done);
    img.addEventListener("error", function () { img.classList.remove("is-loaded"); });
  }

  Array.prototype.forEach.call(d.querySelectorAll("img[data-ph]"), watchImage);

  /* ---------------------------------------------------------
     6. Gallery lightbox
     --------------------------------------------------------- */
  var tiles = Array.prototype.slice.call(d.querySelectorAll(".tile"));
  var lb = d.getElementById("lightbox");
  var lbImg = d.getElementById("lightbox-img");
  var lbTitle = d.getElementById("lightbox-title");
  var lbMeta = d.getElementById("lightbox-meta");
  var lbCount = d.getElementById("lightbox-count");
  var current = 0;
  var lastFocus = null;

  function renderSlide(index) {
    if (!tiles.length) return;
    current = (index + tiles.length) % tiles.length;

    var tile = tiles[current];
    var img = tile.querySelector("img");
    var caption = tile.querySelector("figcaption");
    var title = caption && caption.querySelector("span") ? caption.querySelector("span").textContent : "";
    var meta = caption && caption.querySelector("em") ? caption.querySelector("em").textContent : "";

    lbImg.classList.remove("is-loaded");
    lbImg.src = img ? (img.currentSrc || img.src) : "";
    lbImg.alt = img ? img.alt : "";
    watchImage(lbImg);

    lbTitle.textContent = title;
    lbMeta.textContent = meta;
    lbCount.textContent = (current + 1) + " / " + tiles.length;
  }

  function openLightbox(index) {
    if (!lb) return;
    lastFocus = d.activeElement;
    renderSlide(index);
    lb.hidden = false;
    d.body.classList.add("is-locked");
    var closeBtn = lb.querySelector("[data-lb-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.hidden = true;
    d.body.classList.remove("is-locked");
    if (!gate || gate.hidden) { /* nothing else holding the scroll lock */ }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lbImg.removeAttribute("src");
  }

  tiles.forEach(function (tile, i) {
    tile.setAttribute("tabindex", "0");
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", "View image " + (i + 1) + " of " + tiles.length + " full size");

    tile.addEventListener("click", function () { openLightbox(i); });
    tile.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.closest("[data-lb-close]")) closeLightbox();
      if (e.target.closest("[data-lb-prev]")) renderSlide(current - 1);
      if (e.target.closest("[data-lb-next]")) renderSlide(current + 1);
    });

    d.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") renderSlide(current - 1);
      if (e.key === "ArrowRight") renderSlide(current + 1);
      if (e.key === "Tab") {
        // Keep focus inside the viewer.
        var focusables = lb.querySelectorAll("button");
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------------------------------------------------
     7. Forms
     --------------------------------------------------------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(field, message) {
    if (!field) return;
    var slot = field.querySelector(".field__error");
    field.classList.toggle("has-error", Boolean(message));
    if (slot) slot.textContent = message || "";
  }

  function validate(form) {
    var errors = [];
    var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));

    fields.forEach(function (field) {
      var input = field.querySelector("input, textarea, select");
      if (!input || !input.required) { setError(field, ""); return; }

      var value = (input.type === "checkbox" ? input.checked : input.value.trim());
      var ok = true;
      var msg = "";

      if (input.type === "checkbox") {
        if (!value) { ok = false; msg = "Please confirm to continue."; }
      } else if (!value) {
        ok = false;
        msg = "This field is required.";
      } else if (input.type === "email" && !EMAIL_RE.test(value)) {
        ok = false;
        msg = "Please enter a valid email address.";
      } else if (input.tagName === "TEXTAREA" && value.length < 10) {
        ok = false;
        msg = "A little more detail, please (10+ characters).";
      }

      setError(field, ok ? "" : msg);
      if (!ok) errors.push(input);
    });

    return errors;
  }

  function postJSON(endpoint, payload) {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("Request failed: " + res.status);
      return res;
    });
  }

  function handleForm(form, endpoint, successText) {
    if (!form) return;
    var status = form.querySelector(".form__status");
    var submitBtn = form.querySelector('button[type="submit"]');
    var original = submitBtn ? submitBtn.textContent : "";

    // Clear errors as the visitor types.
    form.addEventListener("input", function (e) {
      var field = e.target.closest(".field");
      if (field && field.classList.contains("has-error")) setError(field, "");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) status.textContent = "";

      var errors = validate(form);
      if (errors.length) {
        errors[0].focus();
        if (status) status.textContent = "Please check the highlighted fields.";
        return;
      }

      var payload = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        payload[el.name] = el.type === "checkbox" ? el.checked : el.value.trim();
      });
      payload.page = window.location.href;
      payload.sentAt = new Date().toISOString();

      form.classList.add("is-sending");
      if (submitBtn) submitBtn.textContent = "Sending…";

      var request = endpoint
        ? postJSON(endpoint, payload)
        : new Promise(function (resolve) { window.setTimeout(resolve, 850); });

      request
        .then(function () {
          form.reset();
          Array.prototype.forEach.call(form.querySelectorAll(".field"), function (f) { setError(f, ""); });
          if (status) status.textContent = successText;
        })
        .catch(function () {
          if (status) {
            status.textContent =
              "That didn’t send. Please try again in a moment.";
          }
        })
        .then(function () {
          form.classList.remove("is-sending");
          if (submitBtn) submitBtn.textContent = original;
        });
    });
  }

  handleForm(
    d.getElementById("fanmail-form"),
    CONFIG.formEndpoint,
    "Thanks — the form works, but this draft isn’t connected to an inbox yet, so nothing was delivered."
  );

  /* Newsletter: inline validation only */
  var news = d.getElementById("newsletter-form");
  if (news) {
    var newsStatus = news.querySelector(".form__status");
    var newsInput = news.querySelector('input[type="email"]');
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = newsInput.value.trim();
      if (!EMAIL_RE.test(value)) {
        if (newsStatus) newsStatus.textContent = "Please enter a valid email address.";
        newsInput.focus();
        return;
      }
      var request = CONFIG.newsletterEndpoint
        ? postJSON(CONFIG.newsletterEndpoint, { email: value })
        : new Promise(function (resolve) { window.setTimeout(resolve, 600); });

      if (newsStatus) newsStatus.textContent = "Adding you…";
      request
        .then(function () {
          news.reset();
          if (newsStatus) newsStatus.textContent = "You’re on the list. Watch your inbox.";
        })
        .catch(function () {
          if (newsStatus) newsStatus.textContent = "Something went wrong. Please try again.";
        });
    });
  }

  /* ---------------------------------------------------------
     8. Footer year
     --------------------------------------------------------- */
  var year = d.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
