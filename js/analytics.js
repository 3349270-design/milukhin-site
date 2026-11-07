/* ============================================================
   milukhin.ru — единый аналитический скрипт (все страницы)
   Метрика: события воронки
     Kwork_click     — клик по любой ссылке kwork.ru
     Telegram_click  — клик по любой ссылке t.me
     Blog_to_service — переход со статьи/блога на /services/
     Service_CTA     — клик по CTA на странице услуги (kwork/tg/services)
   ============================================================ */
(function () {
  "use strict";

  var YM_ID = 111453801;

  function initMetrika() {
    if (window.__ymInited) return;
    window.__ymInited = true;
    window.ym =
      window.ym ||
      function () {
        (window.ym.a = window.ym.a || []).push(arguments);
      };
    window.ym.l = Date.now();
    window.ym(YM_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(s);
  }

  function track(name, params) {
    if (typeof window.ym === "function") {
      window.ym(YM_ID, "reachGoal", name, params || {});
    }
  }

  function pageKind() {
    var p = location.pathname;
    if (p.indexOf("/services/") === 0 || p === "/services") return "service";
    if (p.indexOf("/blog/") === 0 || p === "/blog") return "blog";
    return "home";
  }

  initMetrika();
  if (window.__analyticsBound) return;
  window.__analyticsBound = true;

  var kind = pageKind();

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var params = {
      destination: href.substring(0, 200),
      link_text: (a.textContent || "").trim().replace(/\s+/g, " ").substring(0, 80),
    };

    if (href.indexOf("kwork.ru") !== -1) {
      track("Kwork_click", params);
    } else if (href.indexOf("t.me") !== -1) {
      track("Telegram_click", params);
    }

    if (kind === "blog" && href.indexOf("/services/") !== -1) {
      track("Blog_to_service", params);
    }

    if (kind === "service") {
      if (
        href.indexOf("kwork.ru") !== -1 ||
        href.indexOf("t.me") !== -1 ||
        href.indexOf("/services/") !== -1
      ) {
        track("Service_CTA", params);
      }
    }
  });
})();