<template>
  <div id="my_contactUs">
    <van-nav-bar
      :left-text="titleName"
      style="background-color: #F9F9F9;text-align: left;border: 0"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="MCU_banner">
      <img :src="'https://www.zgsj1.com'+list.image"/>
    </div>

    <div class="MCU_tr">
      <span>客服QQ</span>
      <div>{{list.qq}}</div>
    </div>
    <div class="MCU_tr">
      <span>商务合作</span>
      <div>{{list.email}}</div>
    </div>
    <div class="MCU_text">@{{list.copyRight}}</div>
  </div>
</template>

<script>
  export default {
    name: "my_contactUs",
    data(){
      return{
        list:{}
      }
    },
    mounted:function () {
      this.titleName = this.$route.query.name;
      this.check_Contact();
      // var webview = plus.webview.currentWebview();
      // plus.key.addEventListener('backbutton', function() {
      //   webview.canBack(function(e) {
      //     if(e.canBack) {
      //       webview.back();
      //     } else {
      //       webview.close(); //hide,quit
      //       //plus.runtime.quit();
      //     }
      //   })
      // });
    },
    methods:{
      onClickLeft(){
        this.$router.back()
      },
      check_Contact:function () {
        var _this = this;
        this.axios.post('/soccer/SoccerContact/getPageList.do?',{
          mubanId:'10015',
          pageIndex:1
        }).then((res) =>{
          console.log(res,'查询联系我们')
          if(res.data.code == 200){
            _this.list = res.data.data[0];
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #my_contactUs {
    width: 100%;
    height: 100%;
    background: #F9F9F9;
    .van-nav-bar__text {
      color: #000 !important;
      font-size: 16px;
      letter-spacing: 1px;
    }
    .van-icon {
      color: #000 !important;
    }
    .MCU_banner{
      width: 100%;
      height: 180px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .MCU_tr{
      width: 90%;
      height: 60px;
      border-bottom: 1px solid #e1e1e1;
      line-height: 60px;
      margin: 10px auto;
      display: flex;
      font-size:14px;
      letter-spacing: 1px;
      span{
        width: 28%;
        color: #818181;
        font-size:16px;
        margin-left: 1%;
      }
    }
    .MCU_text{
      width: 100%;
      text-align: center;
      font-size:14px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      bottom: 20px;
    }
  }
</style>
