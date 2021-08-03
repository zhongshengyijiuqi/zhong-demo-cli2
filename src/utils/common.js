/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
function getPlatform() {
  var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';

  if (/iphone/i.test(userAgent)) return 'iphone';
  if (/ipad/i.test(userAgent)) return 'ipad';
  if (/android/i.test(userAgent)) return 'android';
}

/**
 *
 * @desc 睡眠
 * @param {String} unit:ms
 */
function sleep(time) {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}

/**
 *
 * @desc 获取id
 * @return {Symbol} 
 */
function getUniqueId() {
  return Symbol('id')
}
function isIosInput(e){ //ios失去焦点 焦点不下移
  var u = navigator.userAgent;
  var flag;
  var timer;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // console.log(e)
  if(e&&e.target.nameValueMaterial){
    if(!e.target.typeMaterial){
      e.target.value = e.target.nameValueMaterial
    }
  }
  if (isIOS) {
    document.body.addEventListener('focusin', () => {  //软键盘弹起事件
      flag = true;
      clearTimeout(timer);
    })
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
      flag = false;
      if (!flag) {
        timer = setTimeout( ()=> {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" })//重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
        }, 200);
      } else {
        return false;
      }
    })
  } else {
    return false;
  }
}
function inputInput(e){
  if(e){
      e.target.typeMaterial = true
  }

}
function selectInput(e){
  if(e){
    e.target.nameValueMaterial = JSON.parse(JSON.stringify(e.target.value))
    e.target.typeMaterial = false
    e.target.value = ''
  }
}
function newdata(level, time) {
  let new_data = time ? new Date(time) : new Date();
  let getHours = new_data.getMinutes() < 10 ? "0" + new_data.getMinutes() : new_data.getMinutes();
  let data
  if (level == 'NNSS') {
    data = (new_data.getFullYear() + "/" + (parseInt(new_data.getMonth()) + 1) + "/" + new_data.getDate() + "  " + new_data.getHours() + ":" + getHours);
  } else if (level == 'NN') {
    data = (new_data.getFullYear() + "/" + (parseInt(new_data.getMonth()) + 1) + "/" + new_data.getDate());
  } else if (level == 'yyss') {
    data = ((parseInt(new_data.getMonth()) + 1) + "/" + new_data.getDate() + "  " + new_data.getHours() + ":" + getHours);
  } else if (level == 'nnyy') {
    data = (new_data.getFullYear() + "/" + (parseInt(new_data.getMonth()) + 1));
  } else if (level == 'nn') {
    data = (new_data.getFullYear());
  } else if (level == 'yy') {
    data = (parseInt(new_data.getMonth()) + 1) + '/' + new_data.getDate()
  } else if (level == 'SS') {
    data = new_data.getHours() + ":" + getHours
  } else if (level == 'Time') {
    data = time < 60 ? parseInt(time) + '秒' : time >= 60 && time < 3600 ? parseInt(time / 60) + '分钟' : time >= 3600 ? parseInt(time / 60 / 60) + '小时' : 0
  } else if (level == 'hms') {
    let h = Math.floor(time / 1000 / 60 / 60);
    let m = Math.floor(time / 1000 / 60 % 60);
    let s = Math.floor(time / 1000 % 60);
    h = h < 10 ? ("0" + h) : h;
    m = m < 10 ? ("0" + m) : m;
    s = s < 10 ? ("0" + s) : s;
    data = h + ':' + m + ':' + s
  }
  return data
}
function toChinesNum(num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
function imgError(e) {
  e.target.src = 'https://dl-yiyunappclient.effio.cn/resource/common/avatar.png'
  e.οnerrοr = null;
}
function judgeObj(str) {//判断是否为json字符串
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      return false;
    }
  }
}
/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 * */
function numberFormat(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.floor(n * k) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
export {
  getPlatform,
  sleep,
  getUniqueId,
  isIosInput,
  inputInput,
  selectInput,
  newdata,
  toChinesNum,
  imgError,
  judgeObj,
  numberFormat,
}
