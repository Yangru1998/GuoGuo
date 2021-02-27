<template>
    <div id="editMyname">
      <van-nav-bar
        left-text="修改昵称"
        style="background-color: #f5f5f5;text-align: left;"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="EM_top">当前昵称：{{userName}}</div>
      <div class="EM_input">
        <input placeholder="请填写新的昵称" v-model="newName"/>
      </div>

      <input class="EM_button" value="保 存" @click="save_newName" type="button"/>
    </div>
</template>

<script>
    export default {
      name: "EditMyName",
      data(){
          return{
            userName:'ō',
            newName:'',
            userId:0
          }
      },
      mounted:function () {
        this.userName = this.$route.query.userName;
        this.userId = this.$route.query.userId;
        console.log(this.userName,'userName',this.userId)
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
        save_newName:function () {
          this.axios.post('/soccer/SoccerUser/save.do?',{
            mubanId:'10015',
            userId:this.userId,
            nickName:this.newName
          }).then((res) =>{
            console.log(res,'更改名称')
            if(res.data.code == 200){
              localStorage.setItem('userInfo', JSON.stringify(res.data.data));
              this.$router.push({
                path:'/my_userInfo'
              })
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
  #editMyname{
    width: 100%;
    height: 100%;
    background: #F5F5F5;
    .van-nav-bar__text {
      color:#000 !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .van-icon{
      color:#000 !important;
    }
    .EM_top{
      width: 90%;
      height: 40px;
      margin: 5px auto;
      line-height: 40px;
      font-size:14px;
    }
    .EM_input{
      width: 90%;
      height: 40px;
      padding: 10px 5%;
      background: #fff;
      input{
        outline: none;
        border: none;
        line-height: 40px;
        font-size:14px;
        letter-spacing: 1px;
        height: 40px;
      }
    }
    .EM_button{
      width: 86%;
      height: 44px;
      margin-left: 7%;
      margin-top: 40px;
      line-height:44px;
      background: #F89633;
      color: #fff;
      text-align: center;
      font-size:14px;
      letter-spacing: 1px;
      outline: none;
      border: none;
      display: block;
      border-radius: 2px;
    }

  }
</style>
