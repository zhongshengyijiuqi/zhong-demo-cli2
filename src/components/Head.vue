<template>
  <div
    ref="head"
    class="head"
    :style="'background-color:' + headBack"
  >
    <div
      class="head-state-one"
      v-if="headState == 0 || headState == 2"
    >
      <div
        class="setUp"
        @click="setUpOn"
        v-if="headState == 2"
      >
        <i
          class="iconfont"
          :style="'color:' + headColor"
        >&#xe6a5;</i>
      </div>
      <div :class="headState == 2?'head-h1 cur':'head-h1'">
        <h1
          v-text="headTitle"
          :style="'color:' + headColor"
        ></h1>
      </div>
    </div>
    <div
      class="head-state-two"
      v-else
    >
      <div class="head-left-img">
        <p
          class="head-not1"
          @click="goPath"
        >
          <i
            class="iconfont"
            :style="'color:' + headColor"
          >&#xe6a5;</i>
        </p>
      </div>
      <div class="head-h1">
        <h1
          v-text="headTitle"
          :style="'color:' + headColor"
        ></h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AHead',
  props: {
    headState: {
      //头模式 0-首页头，1-支页头，2管理员头
      type: Number,
      default: 0
    },
    headSign: {
      //返回按钮判断，0-返回上一页，1-返回设置路径页面，2-返回设置路径页面，系统返回键再次返回为上上个页面
      type: Number,
      default: 0
    },
    headTitle: {
      type: String,
      default: '标题'
    },
    headPath: {
      type: String,
      default: '/'
    },
    headColor: {
      type: String,
      default: '#FFFFFF'
    },
    headBack: {
      type: String,
      default: '#213361'
    }
  },
  data() {
    return {}
  },
  mounted() {
    // console.log(this.headStartY)
  },
  methods: {
    goPath() {
      this.$emit('headSignFun')
      if (this.headSign == 0) {
        this.$router.go(-1)
      } else if (this.headSign == 1) {
        this.$router.push({
          path: this.headPath
        })
      } else if (this.headSign == 2) {
        this.$router.replace({
          path: this.headPath
        })
      }
    },
    setUpOn() {
      this.$emit('setUpOn')
    }
  },
  watch: {}
}
</script>
<style scoped lang='scss'>
//头
.head {
  width: 100%;
  position: relative;
  z-index: 22;
  height: 2.2rem;
  padding: 0 0.4rem;
}
.setUp {
  display: flex;
  align-items: center;
  width: 1.1rem;
  i {
    font-size: 1rem;
  }
}
.head-state-one,
.head-state-two {
  display: flex;
  align-items: center;
  height: 100%;
}

.head-not1 i {
  font-size: 1rem;
}
//one
.head-state-one {
  .head-h1 {
    width: 100%;
    text-align: center;
    h1 {
      font-size: 0.8rem;
      color: #333333;
      font-weight: 400;
    }
  }
  .head-h1.cur {
    width: calc(100% - 1.1rem);
    padding-right: 1.1rem;
  }
}
//two
.head-state-two {
  .head-h1 {
    width: calc(100% - 1rem);
    text-align: center;
    padding-right: 1rem;
    h1 {
      font-size: 0.8rem;
      color: #333333;
      // letter-spacing: 0.1rem;
      font-weight: 400;
    }
  }
}
</style>
