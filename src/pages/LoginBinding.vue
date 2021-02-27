<template>
  <div id="loginBinding">
    <van-nav-bar
      left-text="绑定手机号"
      style="background-color: #FAFAFA;text-align: left;"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="trDiv">
      <div class="td">
        <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/40_1.png"/>
        <input type="number" placeholder="请输入手机号" maxlength="11" v-model="telephone"/>
      </div>
      <div class="td">
        <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/41_1.png"/>
        <input type="text" placeholder="请输入验证码" v-model="verificationCode"/>
        <button v-if="codeStatus == false" @click="getCode">获取验证码</button>
        <button v-else style="padding: 0 10px;background: #F46138;color: white;">{{timeOut}}S后重新发送</button>
      </div>
      <button @click="bindingPhone" class="trDivButton">绑 定</button>

      <div class="serverDiv">
        <div>
          <img @click="chooseEvent" v-if="server_choose == false" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/greey_icon.png"/>
          <img @click="chooseEvent" v-if="server_choose == true" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/sel_icon.png"/>
        </div>
        <span>同意</span>
        <span style="text-decoration: underline;" @click="jumpAgreement">国国侃球用户协议</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "LoginBinding",
      data(){
          return{
            telephone:'',       //手机号
            verificationCode:'',//验证码
            type:1,
            QQopenid:'',
            codeStatus:false,
            timeOut:60,
            server_choose:true,
            houCode:''
          }
      },
      mounted(){
        this.type = this.$route.query.type;
        console.log(this.type,'mounted----this.type')
        if(this.type == 'qq'){
          this.QQopenid = this.$route.query.openid;
        }
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
          var _this = this;
          var auths = null;
          plus.oauth.getServices(function(services){
            auths = services;
            console.log(services, 1001)
            for(var i in auths) {
              var s = auths[i];
              s.logout(function(e) {
                console.log(e,'auths.logout')
              })
              _this.$router.back();
              localStorage.clear();
            }

          }, function(e){
            plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
          } );
        },
        chooseEvent:function () {
          this.server_choose = !this.server_choose
        },
        //跳转用户协议
        jumpAgreement(){
          this.$router.push({
            path:'/AgreementPage'
          })
        },
        //获取验证码
        getCode:function () {
          var _this = this;
          if(_this.telephone == ''){
            _this.$toast('请输入手机号');
            _this.codeStatus = false;
            clearInterval(_this.timer);
            _this.codeStatus = false;
            _this.timeOut = 60;
            _this.houCode = ''
          }else if(_this.telephone.length != 11){
            _this.$toast('请输入正确的手机号');
            _this.codeStatus = false;
            _this.timeOut = 60;
            clearInterval(_this.timer);
            _this.codeStatus = false;
            _this.houCode = ''
          }else{
            this.axios.post('/soccer/SoccerUser/getcode.do?',{
              telephone:_this.telephone,
              mubanId:'10015'
            }).then((res) =>{
              console.log(res.data.data,'获取验证码');
              if(res.data.code == 200){
                _this.$toast('已发送');

                _this.houCode = res.data.data;

                //倒计时
                var second = _this.timeOut;
                _this.timer = null;
                _this.timer = setInterval(function(){
                  second -= 1;
                  if(second >0 ){
                    _this.codeStatus = true;
                    console.log(second,'second',_this.codeStatus)
                    _this.timeOut = second;
                  }else{
                    console.log(_this.timer,'timer')
                    clearInterval(_this.timer);
                    _this.codeStatus = false;
                    _this.timeOut = 60;
                    _this.houCode = ''
                  }
                },1000);
              }
            })
          }
        },
        bindingPhone(){
          var _this = this;
          if(_this.server_choose == true){
            if(_this.telephone.length != 11){
              _this.$toast('请填写手机号')
              clearInterval(_this.timer);
              _this.codeStatus = false;
              _this.timeOut = 60;
              _this.houCode = '';
            }else{
              var ver = _this.verificationCode.trim();
              var hou = _this.houCode.trim();
              if(hou == ver){
                _this.checkPhone()
              }else if(ver.length == 0){
                _this.$toast('验证码不能为空');
              }else{
                _this.$toast('验证码错误');
              }
            }
          }else{
            _this.$toast('用户协议未勾选');
          }
        },

        //手机是否注册过
        checkPhone(){
          var _this = this;
          this.axios.post('soccer/SoccerUser/findByTelephone.do?',{
            telephone:_this.telephone
          }).then((res) =>{
            if(res.data.code == 200){
              var userInfo = res.data.data;
              var userId = userInfo.userId;
              if(_this.type == 'wx' && userInfo.isWxAdd == 0){
                console.log('wx===')
                _this.saveUserInfo(userInfo,userId)

              }else if(_this.type == 'qq' && userInfo.isQqAdd == 0){
                console.log('qq===')
                _this.saveQQinfo(userInfo,userId)

              }else if(_this.type == 'wx' && userInfo.isWxAdd != 0){
                _this.$toast('该微信已绑定')
                clearInterval(_this.timer);
                _this.codeStatus = false;
                _this.timeOut = 60;
                _this.houCode = '';
              }else if(_this.type == 'qq' && userInfo.isQqAdd != 0){
                _this.$toast('该QQ已绑定')
                clearInterval(_this.timer);
                _this.codeStatus = false;
                _this.timeOut = 60;
                _this.houCode = '';
              }
            }else{
              this.axios.post('/soccer/SoccerUser/save.do?',{
                telephone:_this.telephone,
                telephoneCode:_this.verificationCode,
                mubanId:'10015'
              }).then((res) =>{
                console.log(res,'登录')
                if(res.data.code == 200){
                  var userInfo = res.data.data;
                  var userId = userInfo.userId;
                  if(_this.type == 'wx' && userId != null){
                    var userInfo = localStorage.getItem('userMsgWX');
                    userInfo = JSON.parse(userInfo);
                    _this.saveUserInfo(userInfo,userId);

                    _this.verificationCode = '';
                    _this.telephone = '';
                    clearInterval(_this.timer);
                    _this.codeStatus = false;
                    _this.timeOut = 60;
                  }else if(_this.type == 'qq' && userId != null){
                    var userInfo = localStorage.getItem('userMsgQQ');
                    userInfo = JSON.parse(userInfo);
                    _this.saveQQinfo(userInfo,userId);

                    _this.verificationCode = '';
                    _this.telephone = '';
                    clearInterval(_this.timer);
                    _this.codeStatus = false;
                    _this.timeOut = 60;
                  }else{
                    _this.$toast(_this.type)
                    _this.$toast(userId)
                  }
                }else{
                  _this.$toast(res.data.data)
                }
              })
            }
          })
        },

        //微信
        saveUserInfo(userInfo,userId){
          var _this = this;
          _this.axios.post('/soccer/SoccerUser/save.do?',{
            wxNickName:userInfo.nickname,
            mubanId:'10015',
            wxOpenId:userInfo.openid,
            wxSex:userInfo.sex,
            wxCity:userInfo.city,
            wxProvince:userInfo.province,
            wxHeadimageUrl:userInfo.headimgurl,
            isWxAdd:1,
            userId:userId
          }).then((res) =>{
            if(res.data.code == 200){
              var userInfo = res.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              _this.$router.push({
                path:'/IndexPage'
              })
            }else{
              _this.$toast('提交失败，请重新获取验证码')
            }
          })
        },
        //QQ
        saveQQinfo(userInfo,userId){
          console.log(userInfo,'qq_userInfo')
          var _this = this;
          _this.axios.post('/soccer/SoccerUser/save.do?',{
            qqNickName:userInfo.nickname,
            mubanId:'10015',
            qqOpenId:_this.QQopenid,
            qqSex:userInfo.gender,
            qqProvince:userInfo.province,
            qqHeadimageUrl:userInfo.headimgurl,
            isQqAdd:1,
            userId:userId
          }).then((res) =>{
            if(res.data.code == 200){
              var userInfo = res.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              _this.$router.push({
                path:'/IndexPage'
              })
            }else{
              _this.$toast('提交失败，请重新获取验证码')
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
  #loginBinding{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    /*background-image: url('https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/50.png');*/
    background-size: 100% 100%;
    background: #FAFAFA;
    .van-nav-bar__text {
      color:#fff !important;
      font-size:16px;
      letter-spacing: 1px;
      background: #FAFAFA;
    }
    .van-icon{
      color:#000 !important;
    }
    .trDiv{
      width: 84%;
      position: relative;
      top: 10%;
      left: 8%;
      .td{
        position: relative;
        width: 100%;
        height: 46px;
        padding: 6px 0;
        border-bottom: 1px solid #F2EFE6;
        display: flex;
        color: #000;
        img{
          width: 23px;
          height: 23px;
          margin-top: 11.5px;
        }
        input{
          outline: none;
          line-height: 60px;
          height: 46px;
          color: #000;
          margin-left: 10px;
          font-size:15px;
          letter-spacing: 1px;
          border: none;
          background-color:transparent;
          &::-webkit-input-placeholder {
            color: #9c9c9c;
          }
        }
        button{
          position: absolute;
          top: 37%;
          right: 0;
          font-size:12px;
          height: 30px;
          border: 1px solid #F46138;
          text-align: center;
          line-height:28px;
          border-radius: 2px;
          margin-top: 10px;
          color: #F46138;
          margin-right: 4px;
          padding: 0 20px;
          background: transparent;
          white-space: nowrap;
          border-radius: 4px;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
        }
      }
      .trDivButton{
        width: 94%;
        height: 44px;
        border-radius:24px;
        line-height: 44px;
        text-align: center;
        font-size:16px;
        color: #fff;
        background: #F46038;
        position: relative;
        left: 3%;
        outline: none;
        border: none;
        margin-top: 30px;
        letter-spacing: 1px;
      }
      .serverDiv{
        width: 60%;
        margin: 10px auto;
        display: flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        div{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        span{
          color: #F46038;
          line-height: 40px;
          font-size: 12px;
        }
      }
      .serverDiv{
        width: 60%;
        margin: 10px auto;
        display: flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        div{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        span{
          color: #F46038;
          line-height: 40px;
          font-size: 12px;
        }
      }
    }
  }
</style>
