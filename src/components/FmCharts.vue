<template>
  <div v-if="options">
    <div :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
    export default {
        name: "FmCharts",
      props: {
          id: {
            type: String
          },
        options: {
            type: Object,
          default: {}
        }
      },
      data() {
          return {
            myChart: null
          }
      },
      mounted() {
        setTimeout(() => {
          this.drawLine();
        }, 2000)
      },
      methods: {
        drawLine(){

          // 基于准备好的dom，初始化echarts实例
          // this.myChart = this.$echarts.init(document.getElementById(this.id))


        }
      },
      watch: {
        options(val) {
          // 绘制图表
          // console.log(val, 121)
          // if (val) {
          //   console.log(val)
          //   this.myChart.setOption(val);
          // }

        }
      }
    }
</script>

<style scoped>

</style>
