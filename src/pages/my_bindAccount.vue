<template>
  <div id="my_bindAccount">
    <van-nav-bar
      :left-text="titleName"
      style="background-color: #F9F9F9;text-align: left;border: 0"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="MBA_tr">
      <div style="border-bottom: 2px solid #F8F8F8">
        <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/37.png" />
        <span v-if="isWxAdd == 0" @click="WXClick">绑定微信（送10个金币）</span>
        <span  v-if="isWxAdd != 0">微信已绑定</span>
      </div>
      <div>
        <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/38.png" />
        <span v-if="isQqAdd == 0" @click="QQClick">绑定QQ</span>
        <span v-if="isQqAdd != 0">QQ已绑定</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "my_bindAccount",
      data(){
        return{
          titleName:'',
          userId:0,
          isQqAdd:0,
          isWxAdd:0,
          userInfo:{}
        }
      },
      mounted:function () {
        this.titleName = this.$route.query.name;
        var userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        this.userId = userInfo.userId;
        this.isQqAdd = userInfo.isQqAdd;
        this.isWxAdd = userInfo.isWxAdd;
        this.userInfo = userInfo;
        this.checkWX();
        this.checkQQ();

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

        checkWX(){
          this.axios.post('/soccer/SoccerUser/bindingWx.do?',{
            userId:this.userId,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'微信');
            if(res.data.code == 200){
              var userInfo = res.data.data;
              this.isWxAdd = userInfo.isWxAdd;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }else{
              if(res.data.msg == "已赠送金币！"){
                this.isWxAdd = 1;
              }else{
                this.isWxAdd = 0;
              }
            }
          })
        },

        checkQQ(){
          this.axios.post('/soccer/SoccerUser/bindingQq.do?',{
            userId:this.userId,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'QQ')
            if(res.data.code == 200){
              var userInfo = res.data.data;
              this.isQqAdd = userInfo.isQqAdd;
              console.log(this.isQqAdd,'this.isQqAdd')
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }else{
              if(res.data.msg == "已赠送金币！"){
                this.isQqAdd = 1;
              }else{
                this.isQqAdd = 0;
              }
            }
          })
        },

        //绑定微信
        WXClick(){
          var auths=null;
          var that = this;
          plus.oauth.getServices( function(services) {
            auths = services;
            console.log(services, 'services')
            for (var k in auths) {
              console.log(auths[k].id)
            }
            //auths解释0QQ 1微信 2微博 3小米，但是不建议使用auths[1]类似的写法，因为各个设备排序不一样，比较坑爹
            //注意获取使用unionid，此id通用后期的微信端等它会用户共享，（openid完全唯一）
            //var s = auths[1];
            var s;
            for (var i = 0; i < auths.length; i++) {
              //用这样的写法指定第三方，参照：
              //[LOG] : xiaomi
              //[LOG] : qq
              //[LOG] : sinaweibo
              //[LOG] : weixin

              if (auths[i].id == 'weixin') {
                s = auths[i];
                break;
              }
            }
            s.login(function (e) {
              console.log(e,'s.login')
              // 获取登录操作结果
              s.getUserInfo(function (e) {
                console.log("获取用户信息成功：" + JSON.stringify(s.userInfo));
                var userInfo = JSON.stringify(s.userInfo);
                userInfo = JSON.parse(userInfo);
                that.getUse_WX(userInfo)
              }, function (e) {
                console.log("获取用户信息失败：" + e.message + " - " + e.code);
              });

            }, function (e) {
              console.log(e,'第二部分E')
            });
            if (!s.authResult) {

            } else {
            }
            console.log(s, 'ssss')

            that.aweixin = s
          })
        },
        //提交微信绑定信息
        getUse_WX(userInfo){
          var _this = this;
          _this.axios.post('/soccer/SoccerUser/getWxOpenId.do?',{
            wxOpenId:userInfo.openid,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'绑定微信');
            if(res.data.code == 200){
              _this.$toast('此微信号已绑定手机号')
            }else{
              _this.bindingWX(userInfo)
            }
          })

        },
        bindingWX(userInfo){
          var _this = this;
          this.axios.post('/soccer/SoccerUser/save.do?',{
            wxNickName:userInfo.nickname,
            mubanId:'10015',
            wxOpenId:userInfo.openid,
            wxSex:userInfo.sex,
            wxCity:userInfo.city,
            wxProvince:userInfo.province,
            wxHeadimageUrl:userInfo.headimgurl,
            isWxAdd:1,
            userId:_this.userId
          }).then((res) =>{
            if(res.data.code == 200){
              var userInfo = res.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              _this.checkWX();
              _this.checkQQ();
              _this.checkWX();
            }
          })
        },

        //绑定QQ
        QQClick(){
          var auths=null;
          var that = this;
          plus.oauth.getServices( function(services) {
            auths = services;
            console.log(services, 'services')
            for (var k in auths) {
              console.log(auths[k].id)
            }
            //auths解释0QQ 1微信 2微博 3小米，但是不建议使用auths[1]类似的写法，因为各个设备排序不一样，比较坑爹
            //注意获取使用unionid，此id通用后期的微信端等它会用户共享，（openid完全唯一）
            //var s = auths[1];
            var s;
            for (var i = 0; i < auths.length; i++) {
              //用这样的写法指定第三方，参照：
              //[LOG] : xiaomi
              //[LOG] : qq
              //[LOG] : sinaweibo
              //[LOG] : weixin

              if (auths[i].id == 'qq') {
                s = auths[i];
                break;
              }
            }
            s.login(function (e) {
              console.log(e,'s.login')
              // 获取登录操作结果
              s.getUserInfo(function (e) {
                console.log("获取用户信息成功：" + JSON.stringify(s.userInfo));
                var userInfo = JSON.stringify(s.userInfo);
                userInfo = JSON.parse(userInfo);
                var openid = s.authResult.openid;
                that.getUse_QQ(userInfo,openid)
              }, function (e) {
                console.log("获取用户信息失败：" + e.message + " - " + e.code);
              });

            }, function (e) {
              console.log(e,'第二部分E')
            });
            if (!s.authResult) {

            } else {
            }
            console.log(s, 'ssss')

            that.aweixin = s
          })
        },
        getUse_QQ(userInfo,openid){
          var _this = this;
          _this.axios.post('/soccer/SoccerUser/getQqOpenId.do?',{
            qqOpenId:openid,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'绑定qq')
            if(res.data.code == 200){
              _this.$toast('此QQ已绑定手机号')
            }else{
              _this.bindingQQ(userInfo,openid)
            }
          })

        },
        bindingQQ(userInfo,openid){
          var _this = this;
          this.axios.post('/soccer/SoccerUser/save.do?',{
            qqNickName:userInfo.nickname,
            mubanId:'10015',
            qqOpenId:openid,
            qqSex:userInfo.gender,
            qqProvince:userInfo.province,
            qqHeadimageUrl:userInfo.headimgurl,
            isQqAdd:1,
            userId:_this.userId
          }).then((res) =>{
            if(res.data.code == 200){
              var userInfo = res.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              _this.checkQQ();
              _this.checkWX();
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
  #my_bindAccount{
    width: 100%;
    height: 100%;
    background: #F9F9F9;
    .van-nav-bar__text {
      color:#000 !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .van-icon{
      color:#000 !important;
    }
    .MBA_tr{
      width: 90%;
      height: 120px;
      background: white;
      padding: 4px 5%;
      div{
        width: 94%;
        height: 60px;
        display: flex;
        font-size:14px;
        line-height: 60px;
        padding: 0 3%;
        img{
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-top: 17px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
