export default {
  install(Vue) {
    let vueInstance = Vue.prototype

    Vue.directive('focus', {
      inserted(el) {
        el.focus()
      },
    })

    Vue.directive('filterSpecial', {
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

    Vue.directive('number', {
      // v-number.positive.decimals2
/*       this.$utils.filterNumber(e.target.value, {
        modifiers: {
          decimals2: true,
          positive: true
        }
      }) */
      bind(el, binding) {
        el.handler = () => {
          el.value = vueInstance.$utils.filterNumber(el.value, binding)
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })
    Vue.directive("toFixed", { //多位小数点数字v-toFixed(2)
      componentUpdated(el, binding) {
        let toFixedLength = binding.value;
        if (!toFixedLength) {
          return false;
        }
    
        const ele = el.tagName === "INPUT" ? el : el.querySelector("input");
        ele.addEventListener("input", () => {
          let val = ele.value;
          if (isNaN(val)) {
            ele.value = "";
            return false;
          }
          if (typeof val === "number") {
            val = val.toString();
          }
          if (typeof val === "string") {
            switch (toFixedLength) {
              case 2:
                val = val.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
                break;
              case 4:
                val = val.replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3");
                break;
            }
            ele.value = val;
          }
        });
      },
    });
  },
}
