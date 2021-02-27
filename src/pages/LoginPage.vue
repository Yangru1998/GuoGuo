<template>
  <!--登录页面-->
  <div id="LoginStyle">
    <van-nav-bar left-text="国国侃球" style="background-color:  #fe5919;text-align: left;color: #fff;" fixed :border="false"/>
    <div class="login_top">
		<div class="loginT_img1"><img src="../../static/66.png" /></div>
		<div class="loginT_img2"><img src="../../static/logo_title.png" /></div>
		<div class="loginT_img3"><img src="../../static/logo_text.png" /></div>
	</div>
	<div class="trDiv">
	  <div class="td">
	    <img src="../../static/telIcon.png"/>
	    <input type="number" placeholder="请输入手机号" maxlength="11" v-model="telephone"/>
	  </div>
	  <div class="td">
	    <img src="../../static/codeIcon.png"/>
	    <input type="text" placeholder="请输入验证码" v-model="verificationCode"/>
	    <button v-if="codeStatus == false" @click="getCode">获取验证码</button>
	    <button v-else style="padding: 0 10px;background: #000;color: white;">{{timeOut}}S后重新发送</button>
	  </div>
	  <div class="serverDiv">
	    <div>
	      <img @click="chooseEvent" v-if="server_choose == false" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/greey_icon.png"/>
	      <img @click="chooseEvent" v-if="server_choose == true" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/sel_icon.png"/>
	    </div>
	    <span>同意</span>
	    <span style="text-decoration: underline;" @click="jumpAgreement">国国侃球用户协议</span>
	  </div>
	  <button @click="into_page" class="trDivButton">进入国国侃球</button>
	  
	</div>
    <div class="loginDiv">
      <div class="loginTop">
        <img src="../../static/lineIcon.png"/>
        <!--<span>快速登录</span>-->
      </div>
      <div class="loginBottom">
        <img @click="handlerClick" src="../../static/wxIcon.png"/>
        <img @click="handlerQQ" src="../../static/qqIcon.png"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginPage",
    data(){
        return{
          telephone:'',       //手机号
          verificationCode:'',//验证码
          server_choose:true,
          codeStatus:false,
          timeOut:60,
          houCode:''
        }
    },
    methods:{
      //进入主页面
      into_page:function () {
        var _this = this;
        if(_this.server_choose == true){
          if(_this.telephone.length != 11){
            _this.$toast('请填写手机号')
          }else{
            var hou = _this.houCode.trim();
            var ver = _this.verificationCode.trim();
            console.log(hou,'_this.houCode',ver,'----0',typeof(hou),typeof (ver))
            if(hou == ver){
              _this.checkLogin();
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

      //查询是否注册
      checkLogin(){
        var _this = this;
        this.axios.post('soccer/SoccerUser/findByTelephone.do?',{
          telephone:_this.telephone
        }).then((res) =>{
          console.log(res,'是否注册过')
          if(res.data.code == 200){
            var userInfo = res.data.data;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            _this.$router.push({
              path:'/IndexPage'
            })
          }else{
            this.axios.post('/soccer/SoccerUser/save.do?',{
              mubanId:'10015',
              telephone:_this.telephone,
              telephoneCode:_this.verificationCode
            }).then((res) =>{
              console.log(res,'登录')
              if(res.data.code == 200){
                var userInfo = res.data.data;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                _this.$router.push({
                  path:'/IndexPage'
                })
                _this.verificationCode = '';
                _this.telephone = '';
                clearInterval(_this.timer);
                _this.codeStatus = false;
                _this.timeOut = 60;
              }else{
                _this.$toast(res.data.data)
              }
            })
          }
        })
      },


      chooseEvent:function () {
        this.server_choose = !this.server_choose
      },

      //获取验证码
      getCode() {
        var _this = this;
        if(_this.telephone == ''){
          _this.$toast('请输入手机号')
          _this.codeStatus = false;
          _this.timeOut = 60;
        }else if(_this.telephone.length != 11){
          _this.$toast('请输入正确的手机号')
          _this.codeStatus = false;
          _this.timeOut = 60;
        }else{
          this.axios.post('/soccer/SoccerUser/getcode.do?',{
            telephone:this.telephone,
            mubanId:10015
          }).then((res) =>{
            console.log(res.data.data,'获取验证码');
            _this.$toast('已发送')
            if(res.data.code == 200){
              _this.houCode = res.data.data;
              _this.verificationCode = '';
              console.log(_this.houCode,'获取的验证码')
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
            }else{
              _this.houCode = ''
            }
          })
        }
      },

      handlerClick() {
        var auths=null;
        var that = this;
        setTimeout(()=>{
          plus.oauth.getServices( function(services) {
            auths = services;
            console.log(services, 'services');
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
                localStorage.setItem('userMsgWX',userInfo)
                console.log(userInfo,'userMsgWX');
                userInfo = JSON.parse(userInfo);
                that.getUse_WX(userInfo.openid)
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
        },2000)
      },
      getUse_WX(openid){
        var that = this;
        console.log(openid,'打印传值')
        this.axios.post('/soccer/SoccerUser/getWxOpenId.do?',{
          mubanId:'10015',
          wxOpenId:openid
        }).then((res) =>{
          console.log(res,'获取userId')
          if(res.data.code == 200){
            var userInfo = res.data.data[0];
            if(userInfo.telephone == null){
              that.$router.push({
                path:'/LoginBinding',
                query:{type:'wx'}
              })
            }else{
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              that.$router.push({
                path:'/IndexPage'
              })
            }
          }else{
            that.$router.push({
              path:'/LoginBinding',
              query:{type:'wx'}
            })
          }
        })
      },


      //QQ授权
      handlerQQ(){
        var auths=null;
        var that = this;
        // setTimeout(()=>{
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
                var openid = s.authResult.openid;
                localStorage.setItem('userMsgQQ',userInfo)
                console.log(userInfo,'userMsgQQ');
                userInfo = JSON.parse(userInfo);
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
        // },2000)
      },
      getUse_QQ(userInfo,openid){
        var that = this;
        console.log(openid,'打印传值')
        this.axios.post('/soccer/SoccerUser/getQqOpenId.do?',{
          mubanId:'10015',
          qqOpenId:openid
        }).then((res) =>{
          console.log(res,'获取userId')
          if(res.data.code == 200){
            var userInfo = res.data.data[0];
            if(userInfo.telephone == null){
              that.$router.push({
                path:'/LoginBinding',
                query:{type:'qq',openid:openid}
              })
            }else{
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              that.$router.push({
                path:'/IndexPage'
              })
            }
          }else{
            that.$router.push({
              path:'/LoginBinding',
              query:{type:'qq',openid:openid}
            })
          }
        })
      },

      //跳转用户协议
      jumpAgreement(){
        this.$router.push({
          path:'/AgreementPage'
        })
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" scoped>
  #LoginStyle{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 46px;
    background: #FAFAFA;
	.login_top{
		width: 100%;
		height: 260px;
		background-image: url('https://www.zgsj1.com//Public/Upload/images/moban/xiyuezhijing/uid_97/moban_id_10081/1612354394.png');
		background-size: 100% 100%;
		position: relative;
		top: 0;
		left:0;
		.loginT_img1{
			width: 75px;
			height: 75px;
			margin: 0 auto;
			position: relative;
			top: 140px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.loginT_img2{
			width: 166.5px;
			height: 38.5px;
			margin: 0 auto;
			position: relative;
			top: 160px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.loginT_img3{
			width: 242.5px;
			height: 18px;
			margin: 0 auto;
			position: relative;
			top: 175px;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
    .van-nav-bar__text {
      color:#fff !important;
      font-size:16px;
      letter-spacing: 1px;
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
          height: 40px;
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
          position: relative;
          top: 37%;
          right: 0;
          font-size:12px;
          height: 30px;
          border: 1px solid #000;
          text-align: center;
          line-height:28px;
          margin-top: 10px;
          color: #000;
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
        width: 50%;
        height: 44px;
        border-radius:24px;
        line-height: 44px;
        text-align: center;
        font-size:14px;
        color: #fff;
        background: url('https://www.zgsj1.com//Public/Upload/images/moban/xiyuezhijing/uid_97/moban_id_10104/1613291839.png');
		background-size: 100% 100%;
        position: relative;
        left: 25%;
        outline: none;
        border: none;
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
    }
    .loginDiv{
      width: 82%;
      height: 24%;
      position: relative;
      top: 10%;
      left: 9%;
	  background-image: url('https://www.zgsj1.com//Public/Upload/images/moban/xiyuezhijing/uid_97/moban_id_10081/1612611275.png');
      background-size: 100% 100%;
	  .loginTop{
        width:70%;
        height: 48px;
        display: flex;
        position: relative;
		top: 20%;
		left: 15%;
        justify-content: space-between;
        img{
          width: 100%;
          margin-top: 14px;
        }
      }
      .loginBottom{
        width: 40%;
        height: 91px;
        display: flex;
        justify-content: space-between;
        position: relative;
        left: 30%;
        top: 34%;
        img{
          width: 41px;
          height: 41px;
        }
      }
    }
  }
</style>
