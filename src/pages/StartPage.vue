<template>
  <!--启动页面-->
	<div id="Start_pageStyle">
		<div class="bannerIcon" :style="{width:(356/375*windowWidth)+'px'}">
			<img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/startIcon.png" />
		</div>
		<div class="signIcon">
			<img src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/start07.png" />
		</div>
    <!--<div class="bannerLogo">-->
      <!--<img class="img_1" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/logo.png"/>-->
    <!--</div>-->
    <!--<div class="bannerLogo_1">-->
      <!--<img class="img_2" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/logo_title.png"/>-->
    <!--</div>-->
    <!--<div class="bannerLogo_2">-->
      <!--<img class="img_3" src="https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/logo_text.png"/>-->
    <!--</div>-->
	</div>

</template>
<script>
	export default{
		data(){
			return{
        windowWidth:0
			}
		},
		mounted:function(){
      var that = this;
      that.windowWidth = document.documentElement.offsetWidth;
      console.log(document.documentElement.offsetWidth)
      window.addEventListener('resize', function() {
        that.windowWidth = document.documentElement.offsetWidth;
        console.log(document.documentElement.offsetWidth)
      });

      var userInfo = localStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      if(userInfo){
        if(!userInfo.telephone){
          setTimeout(()=>{
            this.$router.push({
              path:'/loginPage'
            })
          },3000)
        }else{
          setTimeout(() =>{
            this.$router.push({
              path:'/IndexPage'
            })
          },3000)
        }
      }else{
        setTimeout(()=>{
          this.$router.push({
            path:'/loginPage'
          })
        },3000)
      }


		},
		methods:{

		}

	}
</script>

<style lang="less">
	#Start_pageStyle{
		width:100%;
		height:100%;
		background: white;
    /*background-image: url("https://www.zgsj1.com/Public/fm_static/bg_img/oysf/GGKQ/startImg.png");*/
    /*background-size: 100% 100%;*/
		.bannerIcon{
			/*height: 271.5px;*/
      margin: 22px auto;
      margin-top: 80px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.signIcon{
			width: 100%;
			position: absolute;
			bottom: 4%;
			text-align: center;
      height: 83px;
			img{
				height: 60px;
			}
			span{
				width: 100%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size:14px;
				padding: 8px 0;
				display: block;
        font-family:"Times New Roman", Times, serif;
			}
		}
    .bannerLogo{
      position: relative;
      top: 20%;
      margin: 0 auto;
      width: 100%;
      text-align: center;
      .img_1{
        width: 76px;
        height: 76.5px;
      }
    }
    .bannerLogo_1{
      width: 100%;
      position: relative;
      top: 22%;
      text-align: center;
      .img_2{
        width: 206.5px;
        height: 49.5px;
      }
    }
    .bannerLogo_2{
      width: 100%;
      position: relative;
      top: 26%;
      text-align: center;
      .img_3{
        width: 242.5px;
        height: 18px;
      }
    }
	}
</style>
