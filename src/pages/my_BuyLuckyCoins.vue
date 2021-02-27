<template>
    <div id="myBuyLucky">
      <van-nav-bar
        left-text="幸运币"
        style="background-color: transparent;text-align: left;border: 0"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="MBL_banner">
        <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/28.png"/>
      </div>
      <div class="MBL_borderMsg">
        <div class="BM_top">
          <img class="BMT_userImg" :src="avatarUrl"/>
          <span class="BMT_userName">{{userName}}</span>
          <div>
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/27.png"/>
            <span>{{coinsNumber}}</span>
          </div>
        </div>
        <div class="BM_middle">
          <div v-for="(item,key) in list_1" class="BM_mIt" @click="tabEvent_1(key)">
            <div v-if="item.is_give == 1" class="BM_mIt_top">
              <img :src="item.giveIcon"/>
            </div>
            <div class="BM_mItBack">
              <img v-if="tabIndex != key" :src="item.icon"/>
              <img v-else :src="item.se_icon"/>
            </div>
          </div>
        </div>
        <div class="BM_bottom">
          <input placeholder="输入其他幸运币数量" type="text" @input="inputEvent" v-model="coniosInput"/>
        </div>
        <!--<div class="BM_goods" v-if="pageStatus == 0">-->
          <!--<img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/223.png"/>-->
        <!--</div>-->
      </div>
      <div class="MBL_bottomPay">
        <div class="MBL_BP_tr">
          <div class="MBL_BPT_left">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/31.png"/>
            <span>微信支付</span>
          </div>
         <div class="MBL_BPT_right" v-if="isWX == true" @click="se_wxIcon">
           <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/33.png"/>
         </div>
          <div class="MBL_BPT_right" v-if="isWX == false" @click="se_wxIcon">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/greey_icon.png"/>
          </div>
        </div>
        <div class="MBL_BP_tr">
          <div class="MBL_BPT_left">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/32.png"/>
            <span>支付宝</span>
          </div>
          <div class="MBL_BPT_right" v-if="isZF == true" @click="se_zfIcon">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/33.png"/>
          </div>
          <div class="MBL_BPT_right" v-if="isZF == false" @click="se_zfIcon">
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/greey_icon.png"/>
          </div>
        </div>
      </div>
      <div class="MBL_fix">
        <div>
          总计：<span>￥{{money}}</span>
        </div>
        <button @click="getOrderId">确认支付</button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "my_BuyLuckyCoins",
      data(){
        return{
          avatarUrl:'https://wx.qlogo.cn/mmopen/vi_32/VsTpHOyQuP5s1pM3goGibp5lxBRpFeTiasaYPqVXOmTWIpFwA7072P5dRGNzPychC1R7LlnLvgTGiaCWnUPJvU6wA/132',
          userName:'王小明',
          coinsNumber:'100', //当前幸运币数
          tabIndex:1,
          userId:0,
          money:0,
          coniosInput:'',
          list:[
            {
              coins:'60',
              money:'6',
              isGive:1,
              giveCoins:6
            },
            {
              coins:'120',
              money:'12',
              isGive:0
            },
            {
              coins:'30W',
              money:'30',
              isGive:0
            },
            {
              coins:'600',
              money:'60',
              isGive:0
            },
            {
              coins:'1000',
              money:'100',
              isGive:0
            },{
              coins:'3000',
              money:'300',
              isGive:1,
              giveCoins:6
            }
          ],
          list_1:[
            {
              icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins1.png',
              se_icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins_1.png',
              is_give:0,
              money:1,
              give:0
            },
            {
              icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins2.png',
              se_icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins_2.png',
              is_give:0,
              money:9,
              give:0
            },
            {
              icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins3.png',
              se_icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins_3.png',
              is_give:0,
              money:20,
              give:0
            },
            {
              icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins4.png',
              se_icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins_4.png',
              is_give:1,
              giveIcon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/give_1.png',
              money:30,
              give:10
            },
            {
              icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins5.png',
              se_icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins_5.png',
              is_give:1,
              giveIcon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/give_2.png',
              money:68,
              give:24
            },
            {
              icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins6.png',
              se_icon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/coins_6.png',
              is_give:1,
              giveIcon:'https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/give_3.png',
              money:128,
              give:52
            }
          ],
          isZF:true,
          isWX:false,
          userInfo:{},

          channels:[],
          osShow:false,
          pageStatus:0
        }
      },
      activated () {
        let loginInfo = localStorage.getItem('userInfo');
        loginInfo = JSON.parse(loginInfo);
        this.getChannel()
        if (window.plus) {
          if (plus.os.name === 'Android') {
            this.osShow = true
          } else {
            this.osShow = false
          }
        }
      },
      mounted:function () {
        this.money = this.list_1[this.tabIndex].money;

        var userInfo = localStorage.getItem('userInfo');
        this.userInfo = JSON.parse(userInfo);
        this.userId = this.userInfo.userId;
        this.coinsNumber = this.userInfo.luckyCoin;
        this.countCoins = this.userInfo.luckyCoin;
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

        this.checkUserInfo();
        this.getChannel();

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
          this.$router.push({
            path:'/MycenterPage'
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
              this.userInfo = res.data.data;
            }
          })
        },

        inputEvent:function(){
          if(this.coniosInput == ''){
            this.money = this.list_1[this.tabIndex].money;
          }else{
            this.money = this.coniosInput;
          }
        },
        tabEvent_1:function (e) {
          this.tabIndex = e;
          this.money = this.list_1[e].money;
        },
        //微信选择
        se_wxIcon:function(){
          this.isWX = true;
          this.isZF = false;
          console.log(this.isWX,this.isZF)
        },
        //支付选择
        se_zfIcon:function(){
          this.isWX = false;
          this.isZF = true;
          console.log(this.isWX,this.isZF)
        },

        //获取orderId
        getOrderId() {
          var _this = this;
          var giveCoin = _this.list_1[_this.tabIndex].give;
          var money = _this.money;
          this.axios.post('https://huang.zgsj1.com/soccer/SoccerOrder/save.do?',{
            mubanId:'10015',
            type:1,
            userId:_this.userId,
            give:giveCoin,
            price:money,
            coin:money
          }).then((res) =>{
            console.log(res,'获取orderId');
            if(res.data.code == 200){
              var orderId = res.data.data.orderId;
              var price = res.data.data.price;
              // _this.payFor(orderId,price);
              if(_this.isZF == true){
                _this.aPay(orderId,price,giveCoin);
                _this.isZF = true;
                _this.isWX = false;
              }else if(_this.isWX == true){
                _this.weixinPay(orderId,price);
                _this.isZF = false;
                _this.isWX = true;
              }
            }

          })
        },

        getChannel () {
          // 获取支付通道
          if (window.plus) {
            console.log('plus')
            plus.payment.getChannels((channels) => {
              console.log(channels,'getChannel')
              this.channels = channels;
            })
          }
        },

        // 支付宝支付
        aPay (order_sn,price,coin) {
          var channel = null;
          var coin = parseInt(price)+parseInt(coin);
          console.log(coin,price,order_sn,channel)
          plus.payment.getChannels((channels) => {
            if(channels[1].id == 'alipay'){
              var channel_1 = this.channels[1]; //安卓版本
            }else if(channels[0].id == 'alipay'){
              var channel_1 = this.channels[0]; //安卓版本
            }else{
              var channel_1 = this.channels[2]; //安卓版本
            }
            console.log(channels,'channels',channel_1,'channel',channel)
            this.axios.post('/soccer/alipay1/pay.do?',{
              OutTradeNo:order_sn,
              TotalAmount:price,
              Subject:coin
            }).then(res => {
              console.log(res,'支付宝支付');
              let url = res.data.replace('https://openapi.alipay.com/gateway.do?', '')
              if (window.plus){
                plus.payment.request(channel_1,url,(result) => {
                  console.log(result,'result');
                  this.$toast('付费成功');
                  this.checkUserInfo();
                },(e) => {
                  console.log(e,'支付失败')
                  this.$toast('付费失败')
                })
              }
            }).catch(err => {
            alert(err)
            alert('付费失败')
            })
          })
        },
        // 微信支付
        weixinPay (order_sn,price) {
          var channela = this.channels; //安卓版本
          if(channela[0].id == 'wxpay'){
            var channel_1 = this.channels[0]; //安卓版本
          }else if(channela[1].id == 'wxpay'){
            var channel_1 = this.channels[1]; //安卓版本
          }else{
            var channel_1 = this.channels[2]; //安卓版本
          }
          console.log(channel_1,'微信channel',this.channels);
          this.axios.post('https://huang.zgsj1.com/soccer/testPay/pay.do?',{
            OutTradeNo:order_sn,
            TotalAmount:price
          })
            .then(res => {
              console.log(res)
              let wdata = res.data;
              let mydata = {
                appid: wdata.appid,
                partnerid: wdata.partnerid,
                prepayid: wdata.prepayid,
                package: wdata.package,
                noncestr: wdata.noncestr,
                timestamp: wdata.timestamp,
                sign: wdata.sign
              }
              console.log(JSON.stringify(mydata))
              if(window.plus) {
                plus.payment.request(channel_1,mydata,(result) => {
                  console.log(result,'付款')
                  this.$toast('付费成功')
                  this.checkUserInfo();
                  // this.$router.replace({path: '/orderDetail', query: {order_sn: order_sn}})
                },(e) => {
                  this.$toast('付费失败')
                  console.log(e,'付费失败')
                  // this.$store.commit('indexChange', '/me')
                  // this.goBack()
                })
              }
            }).catch(err => {
            console.log(err)
          })
        },
      }
    }
</script>

<style scoped lang="less">
  #myBuyLucky{
    width: 100%;
    min-height: 100% !important;
    background: #F5F5F5;
    .van-nav-bar__text {
      color:#fff !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .van-icon{
      color:#fff !important;
    }
    .van-hairline--bottom::after{
      border-bottom: 0;
    }
    .MBL_banner{
      width: 100%;
      height: 137px;
      position: absolute;
      top: 0;
      left: 0;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .MBL_borderMsg{
      width: 96%;
      padding: 10px 2%;
      background: #fff;
      margin-top: 91px;
      margin-bottom: 10px;
      .BM_top{
        width: 100%;
        border-bottom: 1px dashed #E5E5E5;
        position: relative;
        .BMT_userImg{
          width: 85px;
          height: 85px;
          border-radius:50%;
          position: absolute;
          top: -60px;
          left: 38%;
        }
        .BMT_userName{
          width: 100%;
          position: relative;
          top: 25px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          display: block;
          font-size: 15px;
        }
        div{
          display: flex;
          position: relative;
          height: 70px;
          line-height: 80px;
          text-align: center;
          /*flex-direction: column;!*!**!可写可不写*!*/
          justify-content: center;
          align-items: center;
          img{
            width: 18px;
            height: 18px;
            /*margin-top: 32px;*/
            border-radius:50%;
            margin-right: 4px;
            /*margin-left: 36%;*/
          }
          span{
            font-size:23.75px;
            color:#F4633B;
            font-weight: bold;
          }
        }
      }
      .BM_middle{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 16px 0;
        position: relative;
        .BM_mItem{
          width:31%;
          border: 1px solid #F4633B;
          border-radius:10px;
          position: relative;
          margin-bottom: 10px;
          .BMI_top{
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #F4633B;
            background: #FDDFD7;
            color: #F46038;
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            .BMIT_icon{
              width: 80%;
              height: 18px;
              border-top-left-radius: 10px;
              border-bottom-right-radius: 18px;
              background-image: linear-gradient(to right, #FF9817 30%, #F2D941 100%);
              color: #fff;
              font-size:10px;
              text-align: center;
              line-height: 18px;
              position: relative;
              top: -8px;
              left: -1px;
            }
            .BMIT_text{
              display: flex;
              /*text-align: center;*/
              justify-content: center;
              align-items: center;
              div{
                font-size: 26px;
                line-height: 60px;
                /*margin-left: 26%;*/
                margin-right: 2px;
                font-weight: bold;
              }
              img{
                width: 11px;
                height: 32px;
                color: #F46038;
              }
            }
            .BMIT_text_1{
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: -18px;
              height: 60px;
              div{
                font-size: 28px;
                line-height: 20px;
                /*margin-left: 26%;*/
                margin-right: 2px;
                font-weight: bold;
              }
              img{
                width: 11px;
                height: 32px;
                color: #F46038;
              }
            }
          }
          .BMI_top_1{
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #F4633B;
            background: #F46038;
            border-top-left-radius:10px;
            border-top-right-radius:9px;
            color: #FFF;
            .BMIT_icon{
              width: 80%;
              height: 20px;
              border-top-left-radius: 10px;
              border-bottom-right-radius: 18px;
              background-image: linear-gradient(to right, #FF9817 30%, #F2D941 100%);
              color: #fff;
              font-size:12px;
              text-align: center;
              line-height: 20px;
              position: relative;
              top: -8px;
              left: -1px;
            }
            .BMIT_text{
              display: flex;
              justify-content: center;
              align-items: center;
              div{
                font-size: 26px;
                line-height: 60px;
                /*margin-left: 26%;*/
                margin-right: 2px;
                font-weight: bold;
              }
              img{
                width: 11px;
                height: 32px;
              }
            }
            .BMIT_text_1{
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: -18px;
              height: 60px;
              div{
                font-size: 28px;
                line-height: 20px;
                /*margin-left: 26%;*/
                margin-right: 2px;
                font-weight: bold;
              }
              img{
                width: 11px;
                height: 32px;
              }
            }
          }
          .BMI_bottom{
            width: 100%;
            line-height: 24px;
            font-size:14px;
            text-align: center;
            letter-spacing: 1px;
            border-bottom-left-radius:10px;
            border-bottom-right-radius:10px;
          }
        }
        .BM_mIt{
          width: 32%;
          height: 80px;
          position: relative;
          margin-bottom: 10px;
          .BM_mIt_top{
            width: 66px;
            height: 15px;
            position: absolute;
            top: -6px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .BM_mItBack{
            width: 100%;
            height: 77px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .BM_bottom{
        width: 94%;
        height: 32px;
        padding: 5px 3%;
        line-height: 30px;
        font-size:14px;
        border: 1px solid #E6E6E6;
        input{
          height: 30px;
          line-height: 30px;
          outline: none;
          border: 0;
          width: 100%;
        }
      }
      .BM_goods{
        width: 100%;
        padding: 5px 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .MBL_bottomPay{
      width: 90%;
      height: 140px;
      padding: 10px 5%;
      background: #fff;
      margin-bottom: 60px;
      font-size: 14px;
      .MBL_BP_tr{
        width: 100%;
        height: 40px;
        padding: 5px 0;
        display: flex;
        border-bottom: 1px solid #F5F5F5;
        justify-content: space-between;
        .MBL_BPT_left{
          display: flex;
          img{
            width:36px;
            height: 36px;
            margin-top: 2px;
            margin-right: 4px;
          }
          span{
            line-height: 40px;
          }
        }
        .MBL_BPT_right{
          height: 40px;
          img{
            width: 20px;
            height: 20px;
            margin-top: 10px;
            margin-right: 4px;
          }
        }
      }
    }
    .MBL_fix{
      width: 90%;
      height: 30px;
      padding: 10px 5%;
      background: #fff;
      display: flex;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      left: 0;
      div{
        line-height: 30px;
        span{
          color:red;
          font-size: 17px;
        }
      }
      button{
        outline: none;
        background: #F36038;
        color:#fff;
        text-align: center;
        border: 0;
        font-size:13px;
        height: 30px;
        border-radius: 8px;
        padding: 0 10px;
      }
    }
  }
</style>
