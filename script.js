/* ==========================================================
   script.js — render data dari data.js + semua interaksi.
   Tidak ada dependensi eksternal.
   ========================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) { console.error("data.js tidak termuat."); return; }

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- helper DOM aman (tanpa innerHTML untuk data) ---------- */
  function el(tag, props, children) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "dataset") Object.keys(v).forEach(function (d) { node.dataset[d] = v[d]; });
      else node.setAttribute(k, v === true ? "" : v);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- Toast & copy ---------- */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-show"); }, 2200);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = el("textarea", { "aria-hidden": "true", tabindex: "-1" });
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var h1 = $("#hero-title");
    D.heroTitle.forEach(function (line) {
      h1.appendChild(el("span", { class: line === D.heroAccent ? "is-accent" : "", text: line }));
    });
    $("#heroLead").textContent = D.shortBio;
    renderTerminal();
  }

  function pad(s, n) { while (s.length < n) s += " "; return s; }

  function renderTerminal() {
    var body = $("#terminalBody");
    var line = function (parts) {
      var d = el("div", { class: "t-line" });
      parts.forEach(function (p) { d.appendChild(el("span", { class: p[0], text: p[1] })); });
      body.appendChild(d);
    };
    line([["t-prompt", "$ "], ["", "cat now.txt"]]);
    line([["t-key", "name  "], ["t-dim", "= "], ["", D.name]]);
    line([["t-key", "role  "], ["t-dim", "= "], ["", "SMK RPL student"]]);
    line([["t-key", "mode  "], ["t-dim", "= "], ["t-ok", "learning by building"]]);
    line([["", " "]]);
    line([["t-prompt", "$ "], ["", "ls projects --status"]]);
    var width = 0;
    D.projects.forEach(function (p) { width = Math.max(width, p.id.length); });
    D.projects.forEach(function (p) {
      var cls = p.status === "Completed" ? "t-ok" : p.status === "Concept" ? "t-dim" : p.status === "Prototype" ? "t-warn" : "t-ok";
      line([["", pad(p.id, width + 3)], [cls, p.status.toLowerCase()]]);
    });
    line([["", " "]]);
    var last = el("div", { class: "t-line" }, [el("span", { class: "t-prompt", text: "$ " }), el("span", { class: "t-cursor", "aria-hidden": "true" })]);
    body.appendChild(last);
  }

  /* ---------- About ---------- */
  function renderAbout() {
    var wrap = $("#aboutText");
    D.about.paragraphs.forEach(function (t) { wrap.appendChild(el("p", { text: t })); });
    var dl = $("#aboutFacts");
    D.about.facts.forEach(function (f) {
      dl.appendChild(el("div", {}, [el("dt", { text: f.label }), el("dd", { text: f.value })]));
    });
  }

  /* ---------- Preview mockups ---------- */
  var SHIELD_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>';

  function buildPreview(type) {
    var box = el("div", { class: "project__preview", "aria-hidden": "true" });
    var inner = el("div", { class: "pv" });
    if (type === "kana") {
      var g = el("div", { class: "pv-kana" });
      ["あ", "ア", "い", "イ", "う", "ウ", "え", "エ"].forEach(function (c) { g.appendChild(el("span", { text: c })); });
      inner.appendChild(g);
    } else if (type === "chat") {
      inner.appendChild(el("div", { class: "pv-chat" }, [el("i"), el("i"), el("i"), el("i")]));
    } else if (type === "shield") {
      var s = el("div", { class: "pv-shield" });
      s.innerHTML = SHIELD_SVG; // konstanta statis, bukan data pengguna
      s.appendChild(el("div", {}, [el("i"), el("i"), el("i")]));
      inner.appendChild(s);
    } else {
      inner.appendChild(el("div", { class: "pv-launcher" }, [
        el("i"),
        el("div", {}, [el("i"), el("i"), el("i"), el("i"), el("i"), el("i")])
      ]));
    }
    box.appendChild(inner);
    return box;
  }

  /* ---------- Projects ---------- */
  var modal = $("#projectModal"), modalContent = $("#modalContent"), lastFocus = null;

  function renderProjects(filter) {
    var grid = $("#projectGrid");
    clear(grid);
    D.projects
      .filter(function (p) { return !filter || filter === "Semua" || p.group === filter; })
      .forEach(function (p, i) {
        var card = el("article", { class: "project reveal", style: "transition-delay:" + (i * 60) + "ms" }, [
          buildPreview(p.preview),
          el("div", { class: "project__body" }, [
            el("div", { class: "project__meta" }, [
              el("span", { class: "project__cat", text: p.category }),
              el("span", { class: "status", "data-status": p.status, text: p.status })
            ]),
            el("h3", { text: p.name }),
            el("p", { text: p.description }),
            el("div", { class: "project__actions" }, [
              el("button", { class: "btn btn--ghost btn--sm", type: "button", "data-project": p.id, "aria-haspopup": "dialog", text: "Lihat Detail" })
            ])
          ])
        ]);
        grid.appendChild(card);
      });
    observeReveal(grid);
  }

  function renderFilters() {
    var box = $("#filters");
    if (D.projects.length <= 6) return; // filter hanya muncul jika proyek banyak
    var groups = ["Semua"];
    D.projects.forEach(function (p) { if (groups.indexOf(p.group) < 0) groups.push(p.group); });
    groups.forEach(function (g, i) {
      var b = el("button", { class: "chip", type: "button", "aria-pressed": i === 0 ? "true" : "false", text: g });
      b.addEventListener("click", function () {
        $$(".chip", box).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
        renderProjects(g);
      });
      box.appendChild(b);
    });
    box.hidden = false;
  }

  function section(title, node) { return el("div", {}, [el("h4", { text: title }), node]); }
  function list(items, doneClass) {
    return el("ul", {}, items.map(function (t) {
      var text = typeof t === "string" ? t : t.text;
      return el("li", { class: doneClass ? "is-done" : "", text: text });
    }));
  }

  function openProject(id, trigger) {
    var p = D.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    lastFocus = trigger || document.activeElement;
    clear(modalContent);

    var done = p.features.filter(function (f) { return f.done; });
    var planned = p.features.filter(function (f) { return !f.done; });
    var body = el("div", { class: "modal__body" });

    body.appendChild(el("div", {}, [
      el("div", { class: "project__meta", style: "margin-bottom:10px" }, [
        el("span", { class: "project__cat", text: p.category }),
        el("span", { class: "status", "data-status": p.status, text: p.status })
      ]),
      el("h2", { id: "modalTitle", text: p.name })
    ]));
    if (p.summary) body.appendChild(section("Ringkasan ide", el("p", { text: p.summary })));
    if (p.problem) body.appendChild(section("Masalah yang ingin diselesaikan", el("p", { text: p.problem })));
    if (p.goal) body.appendChild(section("Tujuan proyek", el("p", { text: p.goal })));
    if (done.length) body.appendChild(section("Sudah berjalan", list(done, true)));
    if (planned.length) body.appendChild(section("Direncanakan / dieksplorasi", list(planned, false)));

    var techNode = p.tech && p.tech.length
      ? el("div", { class: "modal__tags" }, p.tech.map(function (t) { return el("span", { text: t }); }))
      : el("p", { class: "modal__note", text: "Belum dikonfirmasi." });
    body.appendChild(section("Teknologi", techNode));

    if (p.challenges && p.challenges.length) body.appendChild(section("Tantangan", list(p.challenges)));

    var statusText = p.status === "Concept" ? "Masih berupa konsep dan belum dibangun penuh."
      : p.status === "Prototype" ? "Berupa prototype eksperimen, belum versi final."
      : p.status === "In Progress" ? "Sedang dalam pengembangan."
      : "Sudah selesai.";
    body.appendChild(section("Status terbaru", el("p", { text: statusText })));

    var links = el("div", { class: "modal__links" });
    var demo = safeUrl(p.demo), src = safeUrl(p.source);
    if (demo) links.appendChild(el("a", { class: "btn btn--primary btn--sm", href: demo, target: "_blank", rel: "noopener noreferrer", text: "Live Demo" }));
    if (src) links.appendChild(el("a", { class: "btn btn--ghost btn--sm", href: src, target: "_blank", rel: "noopener noreferrer", text: "Source Code" }));
    if (!demo && !src) links.appendChild(el("p", { class: "modal__note", text: "Demo dan source code belum tersedia." }));
    body.appendChild(links);

    modalContent.appendChild(buildPreview(p.preview));
    modalContent.appendChild(body);

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.documentElement.style.overflow = "hidden";
    modal.querySelector(".modal__panel").scrollTop = 0;
    $("#modalClose").focus();
  }

  function closeModal() {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
    onModalClosed();
  }
  function onModalClosed() {
    document.documentElement.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
  }

  function initModal() {
    $("#projectGrid").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-project]");
      if (btn) openProject(btn.getAttribute("data-project"), btn);
    });
    $("#modalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); }); // klik backdrop
    modal.addEventListener("close", onModalClosed); // Esc bawaan <dialog>
    modal.addEventListener("cancel", function () { /* Esc: biarkan <dialog> menutup sendiri */ });
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    var wrap = $("#skillGroups");
    D.skills.forEach(function (g) {
      wrap.appendChild(el("div", { class: "skill-group" }, [
        el("h3", { text: g.category }),
        el("ul", {}, g.items.map(function (it) {
          return el("li", {}, [
            el("span", { text: it.name }),
            el("span", { class: "level", "data-level": it.level, text: it.level })
          ]);
        }))
      ]));
    });
  }

  /* ---------- Journey & focus ---------- */
  function renderJourney() {
    var tl = $("#timeline");
    D.learningMilestones.forEach(function (m) {
      var meta = [];
      if (m.date) meta.push(el("span", { text: m.date }));
      if (m.state) meta.push(el("span", { text: m.state }));
      tl.appendChild(el("li", {}, [
        meta.length ? el("div", { class: "tl-meta" }, meta) : null,
        el("h3", { text: m.title }),
        el("p", { text: m.text })
      ]));
    });
    var fl = $("#focusList");
    D.currentFocus.forEach(function (t) { fl.appendChild(el("li", { text: t })); });
  }

  /* ---------- Contact & footer ---------- */
  function renderContact() {
    var box = $("#contactLinks");
    var any = false;
    if (D.email) {
      any = true;
      box.appendChild(el("a", { class: "btn btn--primary", href: "mailto:" + D.email, text: "Kirim Email" }));
      var cp = el("button", { class: "btn btn--ghost", type: "button", text: "Salin Email" });
      cp.addEventListener("click", function () {
        copyText(D.email).then(function () { toast("Email disalin ke clipboard"); }, function () { toast("Gagal menyalin: " + D.email); });
      });
      box.appendChild(cp);
    }
    var names = { github: "GitHub", instagram: "Instagram", linkedin: "LinkedIn" };
    var social = $("#footerSocial");
    Object.keys(names).forEach(function (k) {
      var url = safeUrl(D.socialLinks[k]);
      if (!url) return;
      any = true;
      box.appendChild(el("a", { class: "btn btn--ghost", href: url, target: "_blank", rel: "noopener noreferrer", text: names[k] }));
      social.appendChild(el("li", {}, [el("a", { href: url, target: "_blank", rel: "noopener noreferrer", text: names[k] })]));
    });
    if (!any) box.appendChild(el("p", { class: "contact__empty", text: "// kontak belum diisi — edit email & socialLinks di data.js" }));
    if (!social.children.length) social.hidden = true;
  }

  function renderFooter() {
    $("#footerName").textContent = D.name;
    $("#footerNote").textContent = D.footerNote;
    $("#footerOwner").textContent = D.name;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Navbar, menu, active section, back-to-top ---------- */
  function initNav() {
    var nav = $("#navbar"), toTop = $("#toTop"), btn = $("#menuBtn"), list = $("#navList");

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        nav.classList.toggle("is-scrolled", y > 8);
        toTop.hidden = false;
        toTop.classList.toggle("is-visible", y > 600);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () { window.scrollTo({ top: 0 }); });

    function setMenu(open) {
      list.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    }
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    $$("a", list).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setMenu(false); btn.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (btn.getAttribute("aria-expanded") === "true" && !nav.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 820) setMenu(false); });

    // Indikator section aktif
    var links = $$("[data-nav]", list);
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
          var a = map[en.target.id];
          if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var revealIO = null;
  function observeReveal(root) {
    var items = $$(".reveal:not(.is-in)", root || document);
    if (!("IntersectionObserver" in window)) { items.forEach(function (n) { n.classList.add("is-in"); }); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    items.forEach(function (n) { revealIO.observe(n); });
  }

  /* ---------- Init ---------- */
  document.title = D.name + " — Siswa RPL & Aspiring Developer";
  renderHero();
  renderAbout();
  renderFilters();
  renderProjects("Semua");
  renderSkills();
  renderJourney();
  renderContact();
  renderFooter();
  initModal();
  initNav();
  observeReveal(document);
})();