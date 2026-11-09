(function () {
  var path = document.currentScript && document.currentScript.src;
  var base = "/";
  if (path) {
    base = path.replace(/\/ads\.js(\?.*)?$/, "/");
  }
  fetch(base + "ads.json", { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (cfg) {
      if (!cfg || !cfg.enabled || !cfg.pubId || cfg.pubId.indexOf("000000") >= 0) return;
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + cfg.pubId;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
      var slots = cfg.slots || {};
      document.querySelectorAll(".tr-ad").forEach(function (el) {
        var k = el.getAttribute("data-slot") || "inarticle";
        if (slots[k] === false) return;
        el.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + cfg.pubId + '" data-ad-slot="" data-ad-format="auto" data-full-width-responsive="true"></ins>';
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      });
    })
    .catch(function () {});
})();
