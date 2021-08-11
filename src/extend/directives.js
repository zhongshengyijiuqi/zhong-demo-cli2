export default {
  install(Vue) {
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
