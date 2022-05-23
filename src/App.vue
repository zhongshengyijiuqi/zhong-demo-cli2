<template>
  <div class="app">
    <keep-alive exclude="">
      <transition :name="'slide-' + (direction === 'forward' ? 'left' : 'right')">
        <router-view :class="showFooter ? 'router-view footers' : 'router-view'" />
      </transition>
    </keep-alive>
    <div id="footer" class="footer" v-show="showFooter">
      <ul>
        <li>
          <router-link to="/common">
            <i class="iconfont cur" v-if="path == '/common'">&#xe6ba;</i>
            <i class="iconfont" v-else>&#xe643;</i>
            <p :class="path == '/common' ? 'p' : ''">模板</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import { closeApp } from 'yiyun-app-sdk'

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
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === "0" && fromIndex === "0")) {
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
      setTimeout(() => { }, 50);
    }
  },
  data() {
    return {
      path: this.$route.path,
    };
  },
  created() { },
  beforeRouteUpdate(to, from, next) { },
  mounted() {
    this.uncomfortable()
  },
  methods: {
    judgingModel() { //判断环境
      var u = navigator.userAgent;
      // 安卓
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      // IOS
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        this.$store.commit("environmentFun", window.sessionStorage.ModelStatus == 'PDA' ? 'PDA' : 'Android');
      } else if (isiOS) {
        this.$store.commit("environmentFun", 'ios');
      }
    },
    async uncomfortable() {
      if (window.sessionStorage.OrganizationId) {
        try {
          let res = await this.postAuthorize({
            token: '',
            // token:window.sessionStorage.MemberToken,
            orgGuid: window.sessionStorage.OrganizationId,
            mbGuid: window.sessionStorage.MemberId,
            appType: 15,
          });//app授权
          this.$axios.defaults.headers.common["Authorization"] = res.token_type + " " + res.access_token;
          await this.judgingModel()
          await this.getUserInformation()//企业信息
          // if(JSON.parse(window.sessionStorage.getItem('Route'))&&JSON.parse(window.sessionStorage.getItem('Route')).actionType){//消息推送
          //   let routeObj = JSON.parse(window.sessionStorage.getItem('Route'))
          //   if(routeObj.actionType == 1017){
          //     this.$router.push({path:'/common/common-details',query:{guid:routeObj.objectId}})
          //   }
          // }
        } catch (error) {
          console.log(error)
          this.$dialog.alert({ title: '提示', message: '客户端错误' })
        }
      } else {
        this.$dialog.alert({ title: '提示', message: '登录状态失效，请重新登录' }).then(action => {
          closeApp()
        });
      }
    },
    ...mapActions(["postAuthorize", "getUserInformation"])
  },
  computed: {
    ...mapGetters(["env", 'userInformationId', 'direction']),
    showFooter() {
      if (this.path == "/common") {
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
  top: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  -webkit-overflow-scroll: touch;
  -webkit-overflow-scrolling: touch;

}
</style>