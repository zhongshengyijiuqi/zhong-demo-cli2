<template>
  <div ref="head" class="head" :style="'background-color:' + headBack">
    <div class="head-state-one" v-if="headState == 0">
      <div class="head-h1" @click="headData.length != 0?headBtmShow = !headBtmShow:''">
        <p v-text="headTitle.substring(0,8)" :style="'color:' + headColor" ></p>
        <img src="../assets/images/common/lower.png" alt :class="headBtmShow?'cur':''" v-if="headData.length != 0" />
      </div>
      <div class="head-right-img" :style="headBack !='#ffffff'?'border:1px solid #ffffff':''">
        <p class="head-not1" @click="eliminate" :style="headBack !='#ffffff'?'border-right:1px solid #ffffff':''">
          <i class="iconfont" :style="'color:' + headColor">&#xe61e;</i>
        </p>
        <p class="head-not2" @click="closes">
          <i class="iconfont" :style="'color:' + headColor">&#xe61f;</i>
        </p>
      </div>
    </div>
    <div class="head-state-two" v-else>
      <div class="head-left-img">
        <p class="head-not1" @click="goPath">
          <i class="iconfont" :style="'color:' + headColor">&#xe61d;</i>
        </p>
      </div>
      <div :class="headBtnText?'head-h2':'head-h1'" @click="headData.length != 0?headBtmShow = !headBtmShow:''">
        <p v-text="headTitle.substring(0,8)" :style="'color:' + headColor"></p>
        <img src="../assets/images/common/lower.png" alt :class="headBtmShow?'cur':''" v-if="headData.length != 0" />
      </div>
      <div class="head-right" v-if="headBtnText" @click="BtnText" v-text="headBtnText.substring(0,4)" :style="'color:' + headColor"></div>
    </div>
    <div :class="headBtmShow?'head-bottom':'head-bottom cur'" v-show="headData.length != 0 && headBtmShow" >
      <div v-for="(item,index) in headData" :key="index" class="head-bottom-div" @click="headChoice(item)">
        <span v-text="item.name" ></span>
        <img src="../assets/images/common/headChoice.png" alt v-if="headId == item.id" />
      </div>
    </div>
    <div class="mask" v-show="headData.length != 0 && headBtmShow" @click="headBtmShow = false"></div>
  </div>
</template>
<script>
import { closeApp } from "yiyun-app-sdk";
export default {
  name: "AHead",
  props: {
    headState: {//头模式 0-首页头，1-支页头
      type: Number,
      default:0
    },
    headSign: {//返回按钮判断，0-返回上一页，1-返回设置路径页面，2-返回设置路径页面，系统返回键再次返回为上上个页面
      type: Number,
      default:0
    },
    headTitle: {//最多8个字符
      type: String,
      default:"标题"
    },
    headPath: {
      type: String,
      default:'/'
    },
    headColor: {
      type: String,
      default:"#ffffff"
    },
    headBack: {
      type: String,
      default:"#ffffff"
    },
    headData:{//下拉选项
      type:Array,
      default:[]
    },
    headBtnText:{//按钮按键 最多4个字符
      type:String,
      default:''
    }
  },
  data() {
    return {
      headBtmShow: false,
      headId: 1
    };
  },
  mounted() {
    // console.log(this.headStartY)
    
  },
  methods: {
    closes() {
      closeApp();
    },
    eliminate(){
      // YiYunAPI.postMessage(JSON.stringify({
      //   type: 'clearCache',
      // }));
    },
    headChoice(item) {
      this.headId = item.id;
      this.headBtmShow = false;
      this.$emit("headDataFun", item);
    },
    BtnText(){
      this.$emit("BtnText");
    },
    goPath() {
      this.$emit('headSign');
      if (this.headSign == 0) {
        this.$router.go(-1);
      } else if (this.headSign == 1) {
        this.$router.push({
          path: this.headPath
        });
      } else if(this.headSign == 2) {
        this.$router.replace({
          path: this.headPath
        });
      }
    }
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
}

.head-state-one,
.head-state-two {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 0.45rem;
}

.head-not1 i,
.head-not2 i {
  font-size: 1rem;
}
//one
.head-state-one {
  .head-h1 {
    width: calc(100% - 4.3rem);
    padding-left: 4.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 400;
    p {
      font-size: 0.8rem;
      color: #333333;
      // letter-spacing: 0.1rem;
      font-weight: 400;
    }
    img {
      width: 0.6rem;
      margin-left: 0.2rem;
      margin-top: 0.1rem;
      transition: all 0.5s;
      &.cur {
        transform: rotate(180deg);
      }
    }
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
  justify-content: space-between;
  .head-h1 {
    width: calc(100% - 1rem);
    padding-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 400;
  }
  .head-h2 {
    width: calc(100% - 5rem);
    padding-left: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 400;
  }
  .head-right{
    width: 4rem;
    text-align: right;
    font-weight: 400;
    font-size: 0.8rem;
  }
  p {
    font-size: 0.8rem;
    color: #333333;
    // letter-spacing: 0.1rem;
    font-weight: 400;
  }
  img {
    width: 0.6rem;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    transition: all 0.5s;
    &.cur {
      transform: rotate(180deg);
    }
  }
}

.head-bottom {
  width: 100%;
  position: absolute;
  top: 2.2rem;
  left: 0;
  background-color: #ffffff;
  z-index: 9;
  -webkit-animation: fadeInDown 0.5s;
  animation: fadeInDown 0.5s;
  .head-bottom-div {
    padding: 0.5rem 1.3rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1rem;
    }
    span {
      font-size: 0.7rem;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
@keyframes fadeInDown {
  0% {
    -webkit-transform: translate3d(0, -10%, 0);
    -webkit-transform: translate3d(0, -10%, 0);
    transform: translate3d(0, -10%, 0);
    transform: translate3d(0, -10%, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
    transform: none;
    opacity: 1;
  }
}

@-webkit-keyframes fadeInDown {
  0% {
    -webkit-transform: translate3d(0, -10%, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
    opacity: 1;
  }
}

.mask {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  background-color: #000000;
  opacity: 0.6;
  position: fixed;
  top: 2.2rem;
  left: 0;
  z-index: 8;
}
</style>
