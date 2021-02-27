<template>
    <div id="EditMyPhone">
      <van-nav-bar
        left-text="修改手机"
        style="background-color: #f5f5f5;text-align: left;"
        left-arrow
        @click-left="onClickLeft"
      />

      <div class="EM_pborder">
        <div class="EMP_tr">
          <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/40.png"/>
          <input placeholder="请输入旧手机号" v-model="oldPhone"/>
        </div>
        <div class="EMP_tr">
          <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/40.png"/>
          <input placeholder="请输入新手机号" v-model="newPhone"/>
        </div>
        <div class="EMP_tr_1">
          <div>
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/41.png"/>
            <input placeholder="请输入验证码" v-model="code"/>
          </div>
          <button v-if="codeStatus == false" class="input1" @click="getCode">获取验证码</button>
          <button v-else class="input1" style="background: #F89633;color: white;padding: 3px 4px;">{{timeOut}}S后重新获取</button>
        </div>
      </div>

      <button class="EM_button" @click="quEvent">确 认</button>

      <div class="EM_tips">
        <span>温馨提示：</span>
        <div>手机号修改成功后，原手机号将不支持登录</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "EditMyPhone",
      data(){
        return{
          userId:0,
          oldPhone:'',
          newPhone:'',
          code:'',
          codeStatus:false,
          timeOut:60,
          oldCode:''
        }
      },
      mounted:function () {
        this.userId = this.$route.query.userId;
        this.oldPhone = this.$route.query.userPhone;
        console.log(this.userId,'this.userId')
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

        //获取验证码
        getCode:function () {
          var _this = this;
          if(_this.newPhone == ''){
            _this.$toast('请输入新手机号')
            _this.codeStatus = false;
            _this.timeOut = 60;
          }else if(_this.newPhone.length != 11){
            _this.$toast('请输入正确的手机号')
            _this.codeStatus = false;
            _this.timeOut = 60;
          }else{
            this.axios.post('/soccer/SoccerUser/getcode.do?',{
              telephone:_this.oldPhone,
              mubanId:'10015'
            }).then((res) =>{
              console.log(res,'获取验证吗')
              _this.$toast('已发送')
              _this.oldCode = res.data.data;
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
                }
              },1000);
            })
          }
        },
        //确认
        quEvent:function () {
          var _this = this;
          this.axios.post('soccer/SoccerUser/findByTelephone.do?',{
            telephone:_this.newPhone
          }).then((res) =>{
            if(res.data.code == 200){
              _this.$toast('该手机号已注册!')
              _this.code = '';
              _this.newPhone = '';
              clearInterval(_this.timer);
              _this.codeStatus = false;
              _this.timeOut = 60;
            }else{
              var code = _this.code.trim();
              _this.oldCode = _this.oldCode.trim();
              if(_this.oldCode == code){
                this.axios.post('/soccer/SoccerUser/save.do?',{
                  telephone:_this.newPhone,
                  userId:_this.userId,
                  telephoneCode:_this.code,
                  mubanId:'10015'
                }).then((res) =>{
                  localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                  _this.codeStatus = false;
                  _this.$toast('修改成功！请用新手机号登录')
                  setTimeout(()=>{
                    _this.$router.push({
                      path:'/LoginPage'
                    })
                  },100)
                })
              }else{
                _this.$toast('验证码错误')
              }
            }
          })
        },

      }
    }
</script>

<style scoped lang="less">
  #EditMyPhone{
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
    .EM_pborder{
      width: 90%;
      padding: 10px 5%;
      background: #fff;
      .EMP_tr{
        width: 100%;
        height:40px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 8px 0;
        img{
          width: 25px;
          height: 25px;
          margin-top: 6.5px;
          margin-right: 8px;
        }
        input{
          outline: none;
          border: none;
          line-height: 40px;
          font-size:14px;
          height: 40px;
        }
      }
      .EMP_tr_1{
        width: 100%;
        height:40px;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        div{
          line-height: 40px;
          display: flex;
          img{
            width: 25px;
            height: 25px;
            margin-top: 6.5px;
            margin-right: 8px;
          }
          input{
            outline: none;
            border: none;
            line-height: 40px;
            font-size:14px;
            height: 40px;
          }
        }
        .input1{
          padding: 3px 10px;
          border: 1px solid #F89633;
          color: #F89633;
          height: 30px;
          background: white;
          font-size:12px;
          border-radius: 4px;
          margin-top: 5px;
        }
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
    .EM_tips{
      width: 80%;
      margin-left: 10%;
      margin-top: 40px;
      font-size:14px;
      letter-spacing: 1px;
      span{
        font-weight: bold;
        line-height: 30px;
      }
      div{
        color: #808080;
        line-height: 30px;
      }
    }
  }
</style>
