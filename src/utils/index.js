import { isEmail, isIdCard, isPhoneNum, isUrl } from '@/utils/validate.js'
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
  numberFormat,
} from '@/utils/common.js'
import { parseQueryString, stringifyQueryString, getPath, Cookie2Json } from '@/utils/queryString.js'
import { filterSpecial, filterNumber } from '@/utils/filters.js'

export default {
  isEmail,
  isIdCard,
  isPhoneNum,
  isUrl,

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
  numberFormat,

  parseQueryString,
  stringifyQueryString,
  getPath,
  Cookie2Json,


  filterSpecial,
  filterNumber,
}
