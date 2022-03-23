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
    Vue.directive('toIsMax', { //只输入数字并且设置最大值
      bind(el, binding) {
        let regExp = /[^-0-9]/g;
        el.handler = () => {
          console.log(el.value)
          el.value = el.value.replace(regExp, '');
          if (el.value.length > binding.value[0] || el.value > binding.value[1]) {
            el.value = binding.value[1]
          }
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })
    Vue.directive('toIsEmail', { //只输入数字
      bind(el, binding) {
        let regExp = /[^-0-9]/g;
        el.handler = () => {
          el.value = el.value.replace(regExp, '');
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })
    Vue.directive('toIsAmount', { //金额（小数点无限制）
      bind(el, binding) {
        let regExp = /[^-0-9.]/g;
        el.handler = () => {
          let index = el.value.indexOf('.');
          let prefix = '';
          let value = ''
          if (index === -1) {
            value = el.value
          } else {
            if (el.value.match(/^(\.|-\.)/)) {
              prefix = index ? '-0' : '0';
            }
            value = prefix + el.value.slice(0, index + 1) + el.value.slice(index).replace(/\./g, '');
          }

          el.value = value.replace(regExp, '');
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })
    Vue.directive('toFixed', { //金额（自定义位数）
      bind(el, binding) {
        let regExp = /[^-0-9.]/g;
        el.handler = () => {
          let index = el.value.indexOf('.');
          let prefix = '';
          let value = ''
          if (index === -1) {
            value = el.value
          } else {
            if (el.value.match(/^(\.|-\.)/)) {
              prefix = '0'
            }
            value = prefix + el.value.slice(0, index + 1) + el.value.slice(index).replace(/\./g, '');
          }
          let totalNum = binding.value[0] + binding.value[1] + 1
          el.value = value.replace(regExp, '');
          if (el.value.indexOf('.') !== -1) {
            if (el.value.length > totalNum) {
              el.value = String(el.value).substring(0, el.value.length - 1)
            }
          } else {
            if (el.value.length > binding.value[0]) {
              el.value = String(el.value).substring(0, el.value.length - 1)
            }
          }
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })
  },
}
