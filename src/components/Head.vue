<template>
  <div ref="head" class="head" :style="'background-color:' + headBack" id="headS">
    <div class="head-state-one" v-if="headState == 0 || headState == 2">
      <div class="setUp" @click="setUpOn" v-if="headState == 2">
        <i class="iconfont">&#xe671;</i>
      </div>
      <div :class="headState == 2?'head-h1 cur':'head-h1'">
        <h1 v-text="headTitle" :style="'color:' + headColor"></h1>
      </div>
      <!-- <div class="head-right-img" :style="headBack !='#ffffff'?'border:1px solid #ffffff':''">
        <p class="head-not1" @click="eliminate" :style="headBack !='#ffffff'?'border-right:1px solid #ffffff':''">
          <i class="iconfont" :style="'color:' + headColor">&#xe61e;</i>
        </p>
        <p class="head-not2" @click="closes">
          <i class="iconfont" :style="'color:' + headColor">&#xe61f;</i>
        </p>
      </div> -->
    </div>
    <div class="head-state-two" v-else>
      <div class="head-left-img">
        <p class="head-not1" @click="goPath">
          <i class="iconfont" :style="'color:' + headColor">&#xe6b0;</i>
        </p>
      </div>
      <div class="head-h1">
        <h1 v-text="headTitle" :style="'color:' + headColor"></h1>
      </div>
    </div>
  </div>
</template>
<script>
import { closeApp } from "yiyun-app-sdk";
export default {
  name: "AHead",
  props: {
    headState: {//头模式 0-首页头，1-支页头，2管理员头
      type: Number,
      default: 0
    },
    headSign: {//返回按钮判断，0-返回上一页，1-返回设置路径页面，2-返回设置路径页面，系统返回键再次返回为上上个页面
      type: Number,
      default: 0
    },
    headTitle: {
      type: String,
      default: "标题"
    },
    headPath: {
      type: String,
      default: '/'
    },
    headColor: {
      type: String,
      default: "#ffffff"
    },
    headBack: {
      type: String,
      default: "#ffffff"
    }
  },
  data() {
    return {

    };
  },
  mounted() {
    // console.log(this.headStartY)

  },
  methods: {
    closes() {
      closeApp();
    },
    eliminate() {
      YiYunAPI.postMessage(JSON.stringify({
        type: 'clearCache',
      }));
    },
    goPath() {
      this.$emit('headSignFun');
      if (this.headSign == 0) {
        this.$router.go(-1);
      } else if (this.headSign == 1) {
        this.$router.push({
          path: this.headPath
        });
      } else if (this.headSign == 2) {
        this.$router.replace({
          path: this.headPath
        });
      }
    },
    setUpOn() {
      this.$emit('setUpOn');
    },
  },
  watch: {
  }
};
</script>
<style scoped lang='scss'>
//头
.head {
  width: 100%;
  position: relative;
  z-index: 22;
  height: 2.2rem;
  padding: 0.2rem 0.4rem 0.4rem;
  transition: all 0.5s;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}
.setUp {
  i {
    font-size: 0.9rem;
    color: #ffffff;
  }
}
.head-state-one,
.head-state-two {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  // padding: 0 0.45rem;
}

.head-not1 i,
.head-not2 i {
  font-size: 1rem;
}
//one
.head-state-one {
  .head-h1 {
    width: 100%;
    text-align: center;
    // padding-right: 1.1rem;
    // padding-left: 4.3rem;
    h1 {
      font-size: 0.8rem;
      color: #333333;
      // letter-spacing: 0.1rem;
      font-weight: 400;
    }
  }
  .head-h1.cur {
    width: calc(100% - 1.1rem);
    padding-right: 1.1rem;
  }
}
.head-right-img {
  display: flex;
  align-items: center;
  width: 4.3rem;
  border: 1px solid rgba(15, 15, 15, 0.4);
  justify-content: space-between;
  padding: 0.3rem 0.5rem;
  height: 1.6rem;
  border-radius: 2.5rem;
  position: relative;
  z-index: 9;
}
.head-right-img .head-not1 {
  width: 50%;
  border-right: 1px solid rgba(15, 15, 15, 0.4);
  display: flex;
  align-items: center;
  height: 100%;
}
.head-right-img .head-not1 img {
  // transform: rotate(90deg);
  width: 1rem;
}
.head-right-img .head-not2 img {
  width: 1rem;
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
