<!--模板-->
<template>
  <div class="template-index">
    <div class="nfc" @click="nfcClick">NFC读写测试</div>
    <div class="writeNFC" @click="writeNFCClick">NFC写入测试</div>
    <div class="preview" @click="previewFileClick">文件预览</div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { previewFile, checkNFCPermission, readNFC, writeNFC } from 'yiyun-app-sdk'
export default {
  name: "Template-index",

  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

    async nfcClick() {
      try {
        let ber = await checkNFCPermission()
        console.log('ber', ber)
        if (ber) {
          let res = await readNFC()
          console.log('res', res)
        } else {
          this.$toast('NFC未开启');
        }

      } catch (error) {
        console.log(error)
      }

    },
    async writeNFCClick() {
      try {
        let ber = await checkNFCPermission()
        if (ber) {
          let res = await writeNFC([{
            'tnf': 0,
            'data': '文本测试001'
          }, {
            'tnf': 1,
            'data': 'https://www.baidu.com/'
          }, {
            'tnf': 2,
            'type': 'text/plain',
            'data': '哈哈哈'
          }, {
            'tnf': 2,
            'type': 'json',
            'data': '{"a": 123}'
          }, {
            'tnf': 2,
            'type': 'img',
            'data': 'https://t12.baidu.com/it/u=3165178178,1926556480&fm=58'
          }, {
            'tnf': 3,
            'type': 'hhh',
            'data': '4sXoi112F'
          }])
          console.log('writeNFCClick', res)
        } else {
          this.$toast('NFC未开启');
        }
      } catch (error) {
        console.log(error, '写入')
      }
    },
    async previewFileClick() {
      try {
        let res = await previewFile('https://dl-platform.effio.cn/1207840139193802752/platform-app-inspect/1601426727354.xlsx')
        this.$toast('预览完成');

        console.log(222, res)
      } catch (error) {
        console.log(error)
      }
    },
    ...mapMutations([]),
    ...mapActions([])
  },
  computed: {
    ...mapGetters([]),
  },
  watch: {}
};
</script>
<style scoped lang='scss'>
// @import "~@/temp.scss";
.nfc,
.writeNFC,
.preview {
  padding: 2px 10px;
  line-height: 40px;
  text-align: center;
  background-color: #036ED5;
  color: #ffffff;
}
</style>