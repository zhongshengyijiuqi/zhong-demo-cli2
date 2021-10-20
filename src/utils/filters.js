/**
 *
 * @desc 输入过滤，去除特殊字符
 * @return {String}
 */
export function filterSpecial(v) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]", 'g');
  return v.replace(pattern, '');
}
