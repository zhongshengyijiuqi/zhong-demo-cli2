
import { 
  awaitToken,
  sleep, 
  getUniqueId, 
  getPlatform,
  isIosInput,
  inputInput,
  selectInput,
  newdata,
  toChinesNum,
  judgeObj,
  debounce,
  numberFormat,
} from '@/utils/common.js'
import { 
  isEmail, 
  isIdCard, 
  isPhoneRigorous, 
  isPhoneLoose,
  isLandline, 
  isUrl,  
  isImageFormat,
  isBase64,  
  isAlphanumeric,
  isNumber,
  isAmount,
  isEnglish,
  isChinese 
} from '@/utils/validate.js'
import { parseQueryString, stringifyQueryString, getPath, Cookie2Json } from '@/utils/queryString.js'
import { filterSpecial } from '@/utils/filters.js'
import { cloneDeep} from '@/utils/cloneDeep.js'

export default {
  //常用函数
  awaitToken,
  sleep,
  getUniqueId,
  getPlatform,
  isIosInput,
  inputInput,
  selectInput,
  newdata,
  toChinesNum,
  judgeObj,
  debounce,
  numberFormat,
  //常用正则
  isEmail, 
  isIdCard, 
  isPhoneRigorous, 
  isPhoneLoose,
  isLandline, 
  isUrl,  
  isImageFormat,
  isBase64,  
  isAlphanumeric,
  isNumber,
  isAmount,
  isEnglish,
  isChinese,

  
  parseQueryString,
  stringifyQueryString,
  getPath,
  Cookie2Json,


  filterSpecial,

  //深拷贝
  cloneDeep
}
