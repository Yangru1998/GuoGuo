<template>
  <!--主页面 *** 个人中心-->
  <div id="my_center">
    <div class="myC_banner">
      <div class="myC_title">个人中心</div>
      <div class="myC_Logout" @click="outLogin">
        <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/18.png"/>
        <span>退出登录</span>
      </div>
      <div class="myC_userInfo">
        <!--<img class="myC_uiImg" :src="avatarUrl" @click="editUserInfo"/>-->
        <el-image
          style="width: 66px; height: 66px;margin-top: 10px;border-radius:50%;"
          :src="avatarUrl"
          class="myC_uiImg"
          @click="editUserInfo"
          fit="cover"></el-image>
        <img class="myC_uiIcon" @click="editUserInfo" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/19.png" />
        <span>{{userName}}</span>
      </div>
    </div>

    <!--列表-->
    <div class="myC_list">
      <div v-for="(item,key) in list" class="myC_listItem" @click="tipNext(item.id,item.name)">
        <div class="myC_liLeft">
          <img :src="item.img"/>
          <span v-if="key == 0">{{item.name}}拥有{{countCoins}}枚</span>
          <span v-else>{{item.name}}</span>
        </div>
        <div class="myC_liRight">
          <div v-if="key == 0" class="key0class">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/25.png">
            <span>立即购买</span>
          </div>
          <div v-else class="keyElseclass">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/26.png">
          </div>
        </div>
      </div>
    </div>

    <navTabbar active="MycenterPage"></navTabbar>


    <!--分享模态框 *** 开始-->
    <div v-if="shareModal == true" class="MC_shareModal">
      <div class="MCSM_notborder" @click="notSharemodal"></div>
      <div class="MCSM_shareborder">
        <div class="topText"><span>分享到：</span></div>
        <div class="bottomList_mcsm">
          <div @click="shareAction('weixin','WXSceneSession')">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/34.png"/>
            <span>微信好友</span>
          </div>
          <div @click="shareAction('weixin','WXSceneTimeline')">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/35.png"/>
            <span>微信朋友圈</span>
          </div>
          <div @click="shareAction('qq')">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/36.png"/>
            <span>QQ好友</span>
          </div>
        </div>
      </div>
    </div>
    <!--分享模态框 *** 结束-->
  </div>

</template>

<script>
    export default {
      name: "MycenterPage",
      data(){
        return{
          avatarUrl:'https://wx.qlogo.cn/mmopen/vi_32/VsTpHOyQuP5s1pM3goGibp5lxBRpFeTiasaYPqVXOmTWIpFwA7072P5dRGNzPychC1R7LlnLvgTGiaCWnUPJvU6wA/132',
          userName:'ō',
          shareModal:false,//分享模态框
          list:[
            {
              img:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/20.png',
              name:'幸运币：',
              id:1
            },
            {
              img:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/21.png',
              name:'我的数据',
              id:2
            },
            {
              img:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/22.png',
              name:'分享好友',
              id:3
            },
            {
              img:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/23.png',
              name:'账号绑定',
              id:4
            },
            {
              img:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/24.png',
              name:'联系我们',
              id:5
            }
          ],
          countCoins:0,
          // count:'',
          userInfo:{},
          shares:null,
          pageStatus:0
        }
      },
      mounted:function () {
        console.log('111111')
        var userInfo = localStorage.getItem('userInfo');
        this.userInfo = JSON.parse(userInfo);
        this.countCoins = this.userInfo.luckyCoin;
        this.checkUserInfo();
        // this.check_Unread();
        this.checkStatus();
        if(this.userInfo.photo == null){
          if(this.userInfo.wxHeadimageUrl == null){
            this.avatarUrl = this.userInfo.qqHeadimageUrl;
          }else if(this.userInfo.qqHeadimageUrl == null){
            this.avatarUrl = this.userInfo.wxHeadimageUrl;
          }else{
            this.avatarUrl = 'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/2.png';
          }
        }else{
          this.avatarUrl = this.userInfo.photo;
        }


        if(this.userInfo.nickName == null || this.userInfo.nickName == '昵称'){
          if(this.userInfo.wxNickName == null){
            this.userName = this.userInfo.qqNickName;
          }else if(this.userInfo.qqNickName == null){
            this.userName = this.userInfo.wxNickName;
          }else{
            this.userName = '国国侃球'
          }
        }else{
          this.userName = this.userInfo.nickName;
        }


        this.updateSerivces();
        this.checkWX();
        this.checkQQ();
      },
      methods:{
        //查询用户信息
        checkUserInfo:function () {
          var that = this;
          this.axios.post('/soccer/SoccerUser/findById.do?',{
            mubanId:'10015',
            userId:that.userInfo.userId,
          }).then((res) =>{
            console.log(res,'查询用户信息')
            if(res.data.code == 200){
              localStorage.setItem('userInfo', JSON.stringify(res.data.data));
              that.userInfo = res.data.data;
            }else{
              var auths = null;
              plus.oauth.getServices(function(services){
                auths = services;
                console.log(services, 1001)
                for(var i in auths) {
                  var s = auths[i];
                  s.logout(function(e) {
                    console.log(e,'auths.logout')
                  })
                  that.$router.push({
                    path:'/LoginPage'
                  });
                  localStorage.clear();
                }

              }, function(e){
                plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
              } );
            }
          })
        },

        checkStatus(){
          var that = this;
          this.axios.post('/clothing/ClothingStatus/find.do?',{
            mubanId:'10015',
            status:0
          }).then((res) =>{
            console.log(res,'查询状态信息')
            if(res.data.code == 200){
              that.pageStatus = res.data.data[0].status;
            }else{
              that.pageStatus = 0;
            }
          })
        },

        checkWX(){
          this.axios.post('/soccer/SoccerUser/bindingWx.do?',{
            userId:this.userInfo.userId,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'微信');
            if(res.data.code == 200){
              var userInfo = res.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
          })
        },

        checkQQ(){
          this.axios.post('/soccer/SoccerUser/bindingQq.do?',{
            userId:this.userInfo.userId,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'QQ')
            if(res.data.code == 200){
              var userInfo = res.data.data;
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
          })
        },

        //修改个人信息---跳转页面
        editUserInfo:function () {
          this.$router.push({
            path:'/my_userInfo'
          })
        },

        //跳转子页面
        tipNext:function (id,name) {
          console.log(id,name)
          if(id == 2){
            this.$router.push({
              path:'/my_dataBuy?name='+name
            })
          }else if(id == 3){
            this.shareModal = true;
          }else if(id == 4){
            this.$router.push({
              path:'/my_bindAccount?name='+name
            })
          }else if(id == 5){
            this.$router.push({
              path:'/my_contactUs?name='+name
            })
          }else if(id == 1){
            this.$router.push({
              path:'/my_BuyLuckyCoins'
            })
          }
        },

        //分享微信朋友圈
        updateSerivces() {
          plus.share.getServices((s) => {
            this.shares = {};
            for (var i in s) {
              var t = s[i];
              this.shares[t.id] = t;
            }
            console.log("获取分享服务列表成功");
          }, function(e) {
            console.log("获取分享服务列表失败：" + e.message);
          });
        },
        //分享操作
        shareAction(id, ex) {
          console.log(id,ex,'shareAction')
          var s = null;
          if (!id || !(s = this.shares[id])) {
            console.log("无效的分享服务！");
            return;
          }
          if (s.authenticated) {
            console.log("---已授权---");
            this.shareMessage(s, ex);
          } else {
            console.log("---未授权---");
            s.authorize(()=> {
              this.shareMessage(s, ex);
            }, function(e) {
              console.log("认证授权失败");
            });
          }
        },
        //发送分享消息
        shareMessage(s, ex) {
          let vm = this;
          var msg = {
            content: '分享-详情',
            href: 'https://mp.weixin.qq.com/s/cTeYRe2dxlaAwHQLqUrw2A',
            title: '下载国国侃球-体育爱好者的数据平台',
            content: '全面足球情报，覆盖80种赛事数据，35万+数据匹配，150种变化模型分时运算',
            thumbs: ['https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/shareTitle.jpg'],
            pictures: ['https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/shareTitle.jpg'],
            extra: {
              scene: ex
            }
          };
          s.send(msg, function() {
            console.log("分享成功!");
            vm.shareModal = false;
            // vm.$toast('分享成功!')
          }, function(e) {
            console.log(e,"分享失败!");
            vm.shareModal = false;
            vm.$toast('分享失败!')
          });
        },

        //退出登录
        outLogin:function(){
			var _this = this;
          this.$dialog.confirm({
            title: '提示',
            message: '确认退出登录？'
          }).then((res) => {
            console.log(res,'--退出登录')
			
			_this.$router.push({
			  path:'/LoginPage'
			});
			localStorage.clear();
			
			
            // 微信授权登录对象
            // auths = JSON.parse(aweixin);
            // console.log(auths,'auths',aweixin,'aweixin')
            // 调用plus.oauth.getServices获取保存
            // 调用authorize、login先授权登录认证
            // 注销登录认证
            var auths = null;
            plus.oauth.getServices(function(services){
              auths = services;
              console.log(services, 1001)
              for(var i in auths) {
                var s = auths[i];
                s.logout(function(e) {
                  console.log(e,'auths.logout')
                })
                _this.$router.push({
                  path:'/LoginPage'
                });
                localStorage.clear();
              }

            }, function(e){
                plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
            } );
            // for(var i in auths) {
            //   var s = auths[i];
              // if(s.authResult) {
              //   s.logout(function(e) {
              //     console.log(e,"退出成功");

              //     localStorage.clear();
              //   }, function(e) {
              //     this.$toast("注销登录认证失败！" + e);
              //   });
              // }

            // }
            // aweixin.logout(function(e){
            //   plus.nativeUI.alert("注销登录认证成功!");
            //   console.log(e,'注销')
            //
            // }, function(e){
            //   plus.nativeUI.alert("注销登录认证失败: "+JSON.stringify(e));
            // });

            // on confirm
          }).catch(() => {
            // on cancel
          });

        },


        //关闭分享模态框
        notSharemodal:function () {
          this.shareModal = false;
        },

        //查询未读消息
        check_Unread() {
          var that = this;
          this.axios.post('/soccer/SoccerChat/getSize.do?',{
            mubanId:'10015',
            fromId:0,
            toId:0,
            isRead:that.userInfo.userId
          }).then((res) =>{
            console.log(res,'未读消息查询');
            if(res.data.code == 200){
              if(res.data.size > 0){
                that.count = res.data.size;
              }else{
                that.count = '';
              }
            }else{
              that.count = '';
            }
          })
        }
      }
    }
</script>

<style scoped lang="less">
  #my_center{
    background: #ECECEC;
    width: 100%;
    min-height: 100%;
    .van-nav-bar__text {
      color:#fff !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .myC_banner{
      width: 100%;
      height: 235px;
      background: url("https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/17.png");
      background-size: 100% 100%;
      position: relative;
      .myC_title{
        display: flex;
        position: fixed;
        top: 2%;
        left: 4%;
        color: white;
      }
      .myC_Logout{
        display: flex;
        position: fixed;
        top: 2%;
        right: 4%;
        img{
          width: 23px;
          height: 23px;
        }
        span{
          font-size:12px;
          color: #fff;
          line-height: 20px;
          letter-spacing: 1px;
          margin-left: 2px;
        }
      }
      .myC_userInfo{
        display: table-cell;
        vertical-align: middle;
        position: absolute;
        top: 36%;
        left: 36%;
        .myC_uiImg{
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin-left: 14px;
          img{
            border-radius: 50%;
          }
        }
        .myC_uiIcon{
          width: 18px;
          height: 18px;
          border-radius: 50%;
          position: relative;
          left: -14px;
        }
        span{
          text-align: center;
          line-height: 40px;
          color: #fff;
          width: 100%;
          display: block;
        }
      }
    }
    .myC_list{
      width: 100%;
      margin-bottom: 80px;
      .myC_listItem{
        width: 90%;
        height: 50px;
        padding: 4px 5%;
        background: #fff;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        .myC_liLeft{
          display: flex;
          img{
            width: 30px;
            height: 30px;
            margin-top: 10px;
          }
          span{
            line-height: 50px;
            font-size:14px;
            margin-left: 4px;
          }
        }
        .myC_liRight{
          .key0class{
            display: flex;
            img{
              width: 28px;
              height: 28px;
              margin-top: 11px;
            }
            span{
              color: #F67B58;
              font-size:14px;
              line-height: 50px;
            }
          }
          .keyElseclass{
            width: 20px;
            height: 20px;
            margin-top: 15px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    /*模态框*/
    .MC_shareModal{
      width: 100%;
      height: 100%;
      background: rgba(000,000,000,0.4);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      .MCSM_notborder{
        width: 100%;
        height: 80%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .MCSM_shareborder{
        width: 100%;
        height: 20%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #EEEEEE;
        .topText{
          width: 100%;
          height: 40px;
          background: white;
          color: grey;
          font-size:13px;
          letter-spacing: 1px;
          vertical-align: middle;
          span{
            line-height: 40px;
            margin-left: 20px;
          }
        }
        .bottomList_mcsm{
          width: 90%;
          height: 70%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          position: relative;
          div{
            width: 30%;
            height: 100%;
            position: relative;
            bottom: 0;
            img{
              width: 33px;
              height: 33px;
              border-radius: 50%;
              margin-left: 34%;
              margin-top: 18%;
            }
            span{
              width: 100%;
              text-align: center;
              color: #808080;
              font-size:14px;
              display: block;
            }
          }
        }
      }
    }
  }
</style>
