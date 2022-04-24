export default {
  install(Vue) {
    let vueInstance = Vue.prototype

    Vue.directive('focus', { //获取焦点
      inserted(el) {
        el.focus()
      },
    })

    Vue.directive('filterSpecial', { //输入过滤，去除特殊字符
      bind(el, binding) {
        el.handler = () => {
          el.value = vueInstance.$utils.filterSpecial(el.value)
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })

    Vue.directive('toFixed', {//v-toFixed="[7,2]"
      inserted(el, binding, vNode) {
        let regExp = /[^0-9.]/g;
        el.handler = (e) => {
          let index = e.target.value.indexOf('.');
          let prefix = '';
          let inputValue = ''
          if (index === -1) {
            inputValue = String(Number(e.target.value))
          } else {
            if (e.target.value.match(/^(\.|-\.)/)) {
              prefix = '0'
            }
            inputValue = prefix + e.target.value.slice(0, index + 1) + e.target.value.slice(index).replace(/\./g, '').slice(0, 2);
          }
          let totalLength = binding.value[0] + binding.value[1] + 1
          e.target.value = inputValue.replace(regExp, '');
          if (e.target.value.indexOf('.') !== -1) {
            if (e.target.value.length > totalLength) {
              e.target.value = String(e.target.value).substring(0, e.target.value.length - 1)
            }
          } else {
            if (e.target.value.length > binding.value[0]) {
              e.target.value = String(e.target.value).substring(0, e.target.value.length - 1)
            }
          }
          const eve = document.createEvent('HTMLEvents')
          eve.initEvent('input', true, true)
          vNode.tag === "input" ? el.dispatchEvent(eve) : el.querySelector("input").dispatchEvent(eve)
        }
        el.addEventListener('keyup', el.handler)
      },
      unbind(el) {
        el.removeEventListener('keyup', el.handler)
      },
    })
  },
}
