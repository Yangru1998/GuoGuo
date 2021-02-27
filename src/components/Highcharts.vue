<template>
  <div class="x-bar">
    <div :id="id" :option="option" :style="{height:(windowHeight-46-68-240-60-20)+'px'}"></div>
  </div>
</template>

<script>
  import HighCharts from 'highcharts'
  export default {
    // 验证类型
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      },
      optionHeight:{
        type:String
      }
    },
    data(){
      return{
        windowHeight:0, //屏幕高度
      }
    },
    watch: {
      option() {
        HighCharts.chart(this.id, this.option);
      }
    },
    mounted() {
      console.log(this.id, this.option, 10002)
      HighCharts.chart(this.id, this.option);
      var that = this;
      that.windowHeight = document.documentElement.offsetHeight;
      console.log(document.documentElement.offsetHeight)
      window.addEventListener('resize', function() {
        that.windowHeight = document.documentElement.offsetHeight;
        console.log(document.documentElement.offsetHeight)
      });
    }
  }
</script>

<style scoped>

</style>
