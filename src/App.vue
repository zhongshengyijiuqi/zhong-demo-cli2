<template>
    <div class="app">
        <keep-alive exclude="">
            <transition :name="'slide-' + (direction === 'forward' ? 'left' : 'right')">
                <router-view :class="showFooter?'router-view footers':'router-view'" />
            </transition>
        </keep-alive>
        <div id="footer" class="footer" v-show="showFooter">
            <ul>
                <!-- <li>
                    <router-link to="/my/my-index">
                        <img src="./assets/images/baobiao2.png" v-if="path=='/my/my-index'" alt />
                        <img src="./assets/images/baobiao1.png" alt v-else />
                        <p :class="path =='/my/my-index'?'p':''">我的</p>
                    </router-link>
                </li> -->
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import {closeApp,onScanning} from 'yiyun-app-sdk'

import VConsole from "vconsole";
export default {
  name: "App",
  head: {
    title: "模板"
  },
  watch: {
    $route(to, from) {
      const history = window.sessionStorage;
      let historyCount = history.getItem("count") * 1 || 0;
      history.setItem("/", 0);
      const toIndex = history.getItem(to.path);
      const fromIndex = history.getItem(from.path);
      if (toIndex) {
        if ( !fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === "0" && fromIndex === "0")) {
          this.$store.commit("updateDirection", { direction: "forward" });
        } else {
          this.$store.commit("updateDirection", { direction: "reverse" });
        }
      } else {
        ++historyCount;
        history.setItem("count", historyCount);
        to.path !== "/" && history.setItem(to.path, historyCount);
        this.$store.commit("updateDirection", { direction: "forward" });
      }
      this.path = to.path;
      setTimeout(() => {}, 50);
    }
  },
  data() {
    return {
      path: this.$route.path,
      Time:'',
      nums:1,
    };
  },
  async created() {


  },
  beforeRouteUpdate(to, from, next) {},
  mounted() {
    let vConsole = new VConsole();
    let environment = this.judgingModel()
     this.$store.commit("environmentFun", environment);
    // console.log(this.userInformationId)
    //  this.Time = setInterval(this.uncomfortable,1000)
    // console.log(this.env)

  },
  methods: {
    judgingModel(){ //判断环境
      var u = navigator.userAgent;
      // 安卓
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      // IOS
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
      if(isAndroid){
        return 'Android'
      }else if(isiOS){
        return 'ios'
      }
    },
    async uncomfortable(){
      if (window.sessionStorage.OrganizationId) {
        try {
          clearInterval(this.Time)
          let num = await this.postAuthorize({
            token:'',
            // token:window.sessionStorage.MemberToken,
            orgGuid:window.sessionStorage.OrganizationId,
            mbGuid:window.sessionStorage.MemberId,
            appType:3,
          });//app授权
          this.$axios.defaults.headers.common["Authorization"] = num.token_type + " " + num.access_token;
            await this.getUserInformation()//企业信息
            // if(JSON.parse(window.sessionStorage.getItem('Route'))&&JSON.parse(window.sessionStorage.getItem('Route')).actionType){//消息推送
            //   let routeObj = JSON.parse(window.sessionStorage.getItem('Route'))
            //   if(routeObj.actionType == 1017){
            //     this.$router.push({path:'/common/common-details',query:{guid:routeObj.objectId}})
            //   }
            // }
        }catch(error){
          console.log(error)
          this.$dialog.alert({title: '标题', message:'客户端错误'})
        }
      }else if(this.nums>=10){
        clearInterval(this.Time)
        this.$dialog.alert({title: '标题', message:'登录状态失效，请重新登录'}).then(action => {
        // closeApp()
        });
      }else{
        this.nums = this.nums + 1
      }
      console.log(this.nums)
    },
    ...mapActions(["postAuthorize","getUserInformation"])
  },
  computed: {
    ...mapGetters(["env",'userInformationId','direction']),
    showFooter() {
      if (this.path == "/statistics/statistics-index" || this.path == "/setUp/setUp-index" || this.path == "/fillIn/fillIn-index") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
.app {
  height: 100%;
  overflow: hidden;
  position: fixed;
  top:0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  -webkit-overflow-scroll:touch;
  -webkit-overflow-scrolling: touch;
  
}
</style>