(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.getBoundingClientRect().width
      if (!clientWidth) return
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

document.body.addEventListener('touchstart', (e) => {
  if (Array.from(e.target.classList).includes('btn')) {
    e.target.classList.add('hover')
  }
}, false)

document.body.addEventListener('touchend', (e) => {
  if (Array.from(e.target.classList).includes('btn')) {
    e.target.classList.remove('hover')
  }
}, false)
