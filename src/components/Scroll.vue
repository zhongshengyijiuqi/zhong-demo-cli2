<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>

import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    bounce: {
      type: [Boolean, Object],
      default: false,
    },
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    listenScroll: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [Array, Object, Number, String],
      default: null,
    },
    pullUpLoad: {
      type: Number,
      default: -50
    },
    pullDownRefresh:{
      type: Number,
      default: -50
    },
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    refreshDelay: {
      type: Number,
      default: 200,
    },
    scrollbar: {
      type: [Object, Boolean],
      default() {
        return {
          fade: true,
          interactive: true,
        }
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      setTimeout(() => {
        if (this.$refs.wrapper && this.$refs.wrapper.offsetHeight < this.$refs.wrapper.firstChild.offsetHeight) {
          this._initScroll()
        }
      }, 100)
    },
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        mouseWheel: true,
        preventDefault: false,
        autoBlur: false,
        stopPropagation: true,
        pullUpLoad: {
          threshold: this.pullUpLoad
        },
        pullDownRefresh: {
          threshold: this.pullDownRefresh,
          stop: 40,
          moreTxt: '加载更多',
          noMoreTxt: '没有更多数据了'
        },
        bounce: this.bounce
          ? this.bounce
          : {
            top: false,
            bottom: false,
            left: false,
            right: false,
          },
        scrollbar: this.scrollbar,
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUpEnd')
        })
      }

      if (this.pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDownEnd')
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }

      if (document.querySelector('.bscroll-vertical-scrollbar')) {
        document.querySelector('.bscroll-vertical-scrollbar').style.zIndex = '999'
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    destroy() {
      this.scroll && this.scroll.destroy()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    finishPullUp() {
      this.scroll &&  this.scroll.finishPullUp()
    },
    finishPullDown() {
      this.scroll &&  this.scroll.finishPullDown()
    },
    resizeScrollDetetion() {
      setTimeout(() => {
        if (this.scroll) {
          this.refresh()
        } else {
          this._initScroll()
        }
      }, this.refreshDelay)
    }
  },
  watch: {
    data(v) {
      setTimeout(() => {
        if (this.$refs.wrapper.offsetHeight >= this.$refs.wrapper.firstChild.offsetHeight) {
          this.destroy()
          this.scroll = null
        } else {
          if (this.scroll) {
            this.refresh()
          } else {
            this._initScroll()
          }
        }
      }, this.refreshDelay)
    },
  },
}
</script>
<style scoped lang='scss'>
</style>
