import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'
import isBoolean from 'lodash/isBoolean'
import isDate from 'lodash/isDate'
import isElement from 'lodash/isElement'
import isNil from 'lodash/isNil'
import throttle from 'lodash/throttle'
import uniqBy from 'lodash/uniqBy'

Object.assign(
  Vue.prototype,
  {
    $_: {
      cloneDeep,
      isEqual,
      uniqWith,
      isBoolean,
      isDate,
      isElement,
      isNil,
      throttle,
      uniqBy
    }
  }
)
