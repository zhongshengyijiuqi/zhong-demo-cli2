/**
 *
 * @desc 输入过滤，去除特殊字符
 * @return {String}
 */
export function filterSpecial(v) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]", 'g');
  return v.replace(pattern, '');
}

/**
 *
 * @desc 输入过滤，只能输入数字
 * @return {String}
 */
export function filterNumber(v, binding) {
  let formatV = v;
  formatV = formatV.replace(/[^-\.\d]+/g, '');
  formatV = formatV.replace(/^\./g,""); 
  // 去除多余符号
  let symbol = formatV.substring(0, 1);
  let leftValue = formatV.substring(1);
  formatV = symbol + leftValue.replace(/[-]+/g,""); 

  // 去除多余小数点
  let dots = formatV.match(/\./g);
  if (dots && dots.length >1) {
    formatV = formatV.substr(0, formatV.length-1);
  }
  formatV = formatV.replace(/([-])\./, ($0, $1) => {
    return $1;
  })

  let modifiers = Object.keys(binding.modifiers);
  // 判断是否需要符号位
  if (modifiers.includes('positive')) {
    formatV = formatV.replace(/[-]/g, '')
  }

  // 需要保留的小数位数
  modifiers.forEach(v => {
    if (v.includes('decimals')) {
      let decimals = Math.floor(v.substring(8));
      formatV = formatV.replace(/^([-]?\d+)(\.\d+)?/, ($0, $1, $2) => {
        if ($2) {
          return $1 + $2.substr(0, decimals + 1);
        } else {
          return $1;
        }
      })
      if (decimals === 0) {
        formatV = formatV.replace(/\.$/, '');
      }
    }
  })
  return formatV;
}