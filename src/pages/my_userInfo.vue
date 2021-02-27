<template>
    <div id="my_userInfo">
      <van-nav-bar
        left-text="个人信息"
        style="background-color: #f5f5f5;text-align: left;"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="myUI_imgTr">
        <span>头像</span>
        <div>
          <el-upload
            class="avatar-uploader"
            :action='FMNET+"/Api/SellerHome/upload_img_all"'
            :show-file-list="false"
            name="fm_image"
            :on-success="upDataChange"
            :before-upload="beforeUpload"
            :data="{temp_id:mubanId,template_type:template_type,sssss:'sssss'}"
          >
            <el-image
              style="width: 60px; height: 60px;margin-top: 10px;border-radius:50%;"
              :src="avatarUrl"
              id="myUI_userImg"
              @click="uploadChange('userImg',0)"
              fit="cover"></el-image>
          </el-upload>
        </div>
      </div>
      <div class="myUI_usermsg">
        <div class="myUI_umTr" @click="editUsername">
          <span>昵称</span>
          <div>
            <span>{{userName}}</span>
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/55.png"/>
          </div>
        </div>
        <div class="myUI_umTr">
          <van-field
            id="picke_my_ui"
            readonly
            clickable
            label="性别"
            :value="sex"
            placeholder="选择性别"
            @click="showPicker = true"
          />
          <div>
            <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/55.png"/>
          </div>
        </div>
        <div class="myUI_umTr">
          <span>手机</span>
          <div>
            <span>{{userPhone}}</span>
          </div>
        </div>
      </div>
      <div class="myUI_editPhone" @click="editPhone">
        <span>修改手机</span>
        <div>
          <img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/55.png"/>
        </div>
      </div>

      <!--性别模态框-->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
</template>

<script>
    export default {
      name: "my_userInfo",
      data(){
        return{
          userId:0,
          avatarUrl:'https://wx.qlogo.cn/mmopen/vi_32/VsTpHOyQuP5s1pM3goGibp5lxBRpFeTiasaYPqVXOmTWIpFwA7072P5dRGNzPychC1R7LlnLvgTGiaCWnUPJvU6wA/132',
          userName:'ō',
          userPhone:'12585854585',
          sex: '保密',
          showPicker: false,
          columns: ['保密', '男', '女'],
          template_type:'my_userInfo',
          FMNET:'https://www.zgsj1.com',
          mubanId:'10015',
          imageUploadStr:[],
          userInfo:{}
        }
      },
      mounted:function () {
        var userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        this.userInfo = userInfo;
        this.userId = userInfo.userId;

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

        if(this.userInfo.sex == null && this.userInfo.qqSex == null){
          if(this.userInfo.wxSex == 2){
            this.sex = '女'
          }else if(this.userInfo.wxSex == 1){
            this.sex = '男'
          }
        }else if(this.userInfo.sex == null && this.userInfo.wxSex == null){
          if(this.userInfo.qqSex == 2){
            this.sex = '女'
          }else if(this.userInfo.qqSex == 1){
            this.sex = '男'
          }
        }else{
          if(this.userInfo.sex == 1){
            this.sex = '女'
          }else if(this.userInfo.sex == 0){
            this.sex = '男'
          }else{
            this.sex = '保密'
          }
        }
        this.userPhone = userInfo.telephone;
        this.checkUserInfo();

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
            }
          })
        },
        onConfirm(value) {
          var _this = this;
          _this.sex = value;
          _this.showPicker = false;
          if(_this.sex == '男'){
            var sex = 0
          }else if(_this.sex == '女'){
            var sex = 1
          }else{
            var sex = 2
          }
          this.axios.post('/soccer/SoccerUser/save.do?',{
            mubanId:'10015',
            userId:_this.userId,
            sex:sex
          }).then((res) =>{
            console.log(res,'性别提交')
            localStorage.setItem('userInfo', JSON.stringify(res.data.data));
          })
        },

        //修改昵称--跳转页面
        editUsername:function () {
          this.$router.push({
            path:'/EditMyName',
            query:{userName:this.userName,userId:this.userId}
          })
        },
        //修改手机--跳转页面
        editPhone:function () {
          this.$router.push({
            path:'/EditMyPhone',
            query:{userId:this.userId,userPhone:this.userPhone}
          })
        },

        //保存图片
        save_userImg:function(){
          var _this = this;
          _this.axios.post('/soccer/SoccerUser/save.do?',{
            userId:_this.userId,
            photo:_this.avatarUrl,
            mubanId:'10015'
          }).then((res) =>{
            console.log(res,'保存图片')
            localStorage.setItem('userInfo', JSON.stringify(res.data.data));
          })
        },


        upDataChange:function(res){
          console.log('upDataChange',res)
          if(res.status==1){
            switch(this.imageUploadStr[0]){
              case "userImg":
                this.avatarUrl = 'https://www.zgsj1.com' + res.imgPath;
                this.save_userImg();
                break;
              default:
            }
          }
        },
        // 上传图片的限制
        beforeUpload:function(file){
          var s= file.size/1024<500;
          if(!s){
            this.$message({
              message:"图片上传必需小于500K",
              type: 'error'
            });
          }
          return s;
        },
        //获取到图上传的信息
        uploadChange:function(str,key){
          console.log('uploadChange')
          this.imageUploadStr[0]=str;
          this.imageUploadStr[1]=key;
        },
      }
    }
</script>

<style scoped lang="less">
   #my_userInfo{
     width: 100%;
     height: 100%;
     background: #F5F5F5;
     font-size:14px;
     letter-spacing: 1px;
     .van-nav-bar__text {
       color:#000 !important;
       font-size:16px;
       letter-spacing: 1px;
     }
     .van-icon{
       color:#000 !important;
     }
     .myUI_imgTr{
       width: 90%;
       height: 80px;
       padding: 10px 5%;
       background: #fff;
       margin-bottom: 4px;
       display: flex;
       justify-content: space-between;
       span{
         line-height: 80px;
       }
       div{
         display: flex;
         #myUI_userImg{
           width: 60px;
           height: 60px;
           border-radius: 50%;
           margin-top: 10px;
           .van-image__error, .van-image__img, .van-image__loading {
             display: block;
             width: 100%;
             height: 100%;
             border-radius: 50% !important;
           }
         }
       }
     }
     .myUI_usermsg{
       width: 100%;
       background: #fff;
       margin-bottom: 4px;
       .myUI_umTr{
         width: 90%;
         height: 40px;
         margin: 0 auto;
         padding: 5px 0;
         border-bottom: 1px solid #F5F5F5;
         display: flex;
         justify-content: space-between;
         line-height: 40px;
         div{
           display: flex;
           span{
             line-height: 40px;
             margin-right: 4px;
           }
           img{
             width: 18px;
             height: 18px;
             margin-top: 11px;
           }
         }
         .van-cell:not(:last-child)::after{
           border-bottom: 0;
         }
         .van-cell{
           padding: 10px 0;
           line-height: 20px;
         }
       }
       /deep/ #picke_my_ui {
         text-align: right !important;
         width: 100% !important;
       }
     }
     .myUI_editPhone{
       width: 90%;
       height: 40px;
       padding: 5px 5%;
       display: flex;
       justify-content: space-between;
       line-height: 40px;
       background: #fff;
       img{
         width: 18px;
         height: 18px;
         margin-top: 11px;
       }
     }

     #clipArea{
       width: 100px;
       height: 100px;
       background: red;
     }
     #clipBtn{
       width: 80px;
       height: 30px;
       text-align: center;
       line-height: 30px;
       -webkit-border-radius: 8px;
       -moz-border-radius: 8px;
       border-radius: 8px;
     }
     #view{
       width: 100px;
       height: 100px;
     }
   }
</style>
