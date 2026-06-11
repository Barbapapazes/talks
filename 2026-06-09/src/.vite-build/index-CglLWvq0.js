(function () {
  const e = document.createElement(`link`).relList; if (e && e.supports && e.supports(`modulepreload`))
    return; for (const e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e); new MutationObserver((e) => {
    for (const t of e) {
      if (t.type === `childList`) {
        for (const e of t.addedNodes)e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
      }
    }
  }).observe(document, { childList: !0, subtree: !0 }); function t(e) { const t = {}; return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), e.crossOrigin === `use-credentials` ? t.credentials = `include` : e.crossOrigin === `anonymous` ? t.credentials = `omit` : t.credentials = `same-origin`, t } function n(e) {
    if (e.ep)
      return; e.ep = !0; const n = t(e); fetch(e.href, n)
  }
})(), console.log(`Image URL:`, `/assets/image-BTTwLOJ2.jpg`)
