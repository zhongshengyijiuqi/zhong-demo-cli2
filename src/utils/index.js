import { isEmail, isIdCard, isPhoneNum, isUrl } from '@/utils/validate.js'
import { 
  sleep, 
  getUniqueId, 
  getPlatform,
  isIosInput,
  selectInput,
  newdata,
  toChinesNum,
  imgError,
  judgeObj,
  numberFormat,
} from '@/utils/common.js'
import { parseQueryString, stringifyQueryString, getPath, Cookie2Json } from '@/utils/queryString.js'
import { filterSpecial, filterNumber } from '@/utils/filters.js'

export default {
  isEmail,
  isIdCard,
  isPhoneNum,
  isUrl,


  sleep,
  getUniqueId,
  getPlatform,
  isIosInput,
  selectInput,
  newdata,
  toChinesNum,
  imgError,
  judgeObj,
  numberFormat,

  parseQueryString,
  stringifyQueryString,
  getPath,
  Cookie2Json,


  filterSpecial,
  filterNumber,
}
