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
function awaitToken(state, r) {
  return new Promise(async (resolve, reject) => {
    if (!r) r = resolve
    if (!state.session) {
      await sleep(100)
      return awaitToken(state, r)
    } else {
      r()
    }
  })
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
  if(e&&e.target.nameValueMaterial){ //输入时值消失方法配套
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
function inputInput(e){ //输入时值消失方法配套
  if(e){
      e.target.typeMaterial = true
  }

}
function selectInput(e){//输入时值消失方法配套
  if(e){
    e.target.nameValueMaterial = JSON.parse(JSON.stringify(e.target.value))
    e.target.typeMaterial = false
    e.target.value = ''
  }
}
function newdata(level, time) {
  if(level == 'TIME'){
    return time<60 ? time + '秒': time>=60 && time<3600 ? Math.floor((time/60)) + '分钟' : time>=3600 ? Math.floor(time/(60*60)) + '小时':''
  }
  let h = Math.floor(time / 1000 / 60 / 60);
  let m = Math.floor(time / 1000 / 60 % 60);
  let s = Math.floor(time / 1000 % 60);
  h = h < 10 ? ("0" + h) : h;
  m = m < 10 ? ("0" + m) : m;
  s = s < 10 ? ("0" + s) : s;
  return h + ':' + m + ':' + s
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
// function imgError(e) {
//   e.target.src = 'https://dl-yiyunappclient.effio.cn/resource/common/avatar.png'
//   e.οnerrοr = null;
// }
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
const debounce = (() => {
  let timer = null
  return (fn, wait) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer)
      timer = null
    }, wait)
  };
})()
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
function echartsScale(maxData,value){//报表数量单位规则
  let maxY = 5
  let zY = 1 
  let ECompany = ''
  let ENum = 0
  if(0<=maxData&&maxData<=50000){
    ECompany = ''
    ENum = maxData
  }else if(50000<=maxData&&maxData<=500000000){
    ECompany = '万'
    ENum = parseFloat((maxData/10000).toFixed(2))
  }else if(maxData>500000000){
    ECompany = '亿'
    ENum = parseFloat((maxData/100000000).toFixed(2))
  }
  if(ENum>maxY){
    zY = Math.ceil(ENum/maxY)
  }
  return value == 1?zY*maxY:ECompany
}
function scaleNum(max,company,value,maxy){ //报表时间单位规则
  let maxY = maxy || 5
  let zY = 1
  let SCompany = 'm'
  let Svalue = 0
  if(company == 'SS'){
    let STime = parseFloat(max/60)
    if(0<=STime&&STime<=300){
      SCompany = 'm'
      Svalue = STime
    }
    if(STime>300&&STime<=7200){
      SCompany = 'h'
      Svalue = Math.ceil(STime/60)
    }
    if(STime>7200){
      SCompany = 'd'
      Svalue = Math.ceil(STime/60/24)
    }
  }else if(company == 'MM'){
    let STime = max
    if(0<=STime&&STime<=300){
      SCompany = 'm'
      Svalue = STime
    }
    if(STime>300&&STime<=7200){
      SCompany = 'h'
      Svalue = Math.ceil(STime/60)
    }
    if(STime>7200){
      SCompany = 'd'
      Svalue = Math.ceil(STime/60/24)
    }
  }
  if(Svalue>maxY){
    zY = Math.ceil(Svalue/maxY)
  }
  return value == 1?zY*maxY:value == 2?SCompany:Svalue
}
export {
  awaitToken,
  getPlatform,
  sleep,
  getUniqueId,
  isIosInput,
  inputInput,
  selectInput,
  newdata,
  toChinesNum,
  judgeObj,
  debounce,
  numberFormat,
}
