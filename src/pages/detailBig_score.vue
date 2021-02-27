<template>
  <div id="detailBig_score">
    <van-nav-bar
      left-text="比分详情"
      style="background-color: #fff;text-align: left;"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="detailBorder">
      <div class="DB_top">比分：首选【{{winFirst}}】，次选【{{winSen}}】</div>
      <div class="table">
        <div class="table_1">
          <div class="table1Item"  v-for="(item,idx) in winOther" :class="Selectkey == idx ? 'styleColor':''" :style="{borderBottom: winOther.length>7 && idx < (Math.floor(winOther.length/7))*7?'1px solid #000':'', borderRight: idx%7 == 6 ?'none':''}">
            <span>{{item.num_1}} : {{item.num_2}}</span>
            <span>{{item.sorce}}</span>
          </div>
          <div :style="{width: (100-(winOther.length - Math.floor(winOther.length/7)*7)*15) < 25?'100%':(100-(winOther.length - Math.floor(winOther.length/7)*7)*15) + '%'}" class="table1Right">
            <span>胜其他</span>
            <span>{{winOtherNumber}}</span>
          </div>
        </div>

        <div class="table_1">
          <div class="table1Item" v-for="(item,idx) in dogfallOther" :style="{borderBottom: dogfallOther.length>7 && idx < (Math.floor(dogfallOther.length/7))*7?'1px solid #000':'', borderRight: idx%7 == 6 ?'none':''}">
            <span>{{item.num_1}} : {{item.num_2}}</span>
            <span>{{item.sorce}}</span>
          </div>
          <div :style="{width: (100-(dogfallOther.length - Math.floor(dogfallOther.length/7)*7)*15) < 25?'100%':(100-(dogfallOther.length - Math.floor(dogfallOther.length/7)*7)*15) + '%'}" class="table1Right">
            <span>平其他</span>
            <span>{{dogfallOtherNumber}}</span>
          </div>
        </div>

        <div class="table_1">
          <div class="table1Item" v-for="(item,idx) in loseOther" :style="{borderBottom: loseOther.length>7 && idx < (Math.floor(loseOther.length/7))*7?'1px solid #000':'', borderRight: idx%7 == 6 ?'none':''}">
            <span>{{item.num_1}} : {{item.num_2}}</span>
            <span>{{item.sorce}}</span>
          </div>
          <div :style="{width: (100-(loseOther.length - Math.floor(loseOther.length/7)*7)*15) < 25?'100%':(100-(loseOther.length - Math.floor(loseOther.length/7)*7)*15) + '%'}" class="table1Right">
            <span>负其他</span>
            <span>{{loseOtherNumber}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detailBig_score",
    data(){
      return{
        winOther:[],
        dogfallOther:[],
        loseOther:[],
        winFirst:'',
        winSen:'',
        winOtherNumber:'',
        dogfallOtherNumber:'',
        loseOtherNumber:'',
        Selectkey:''
      }
    },
    mounted:function () {
      var list = localStorage.getItem('bigData');
      list = JSON.parse(list);
      this.winOther = JSON.parse(list.winOther);
      this.dogfallOther = JSON.parse(list.dogfallOther);
      this.loseOther = JSON.parse(list.loseOther);
      this.winFirst = list.scoreFirstChoice;
      this.winSen = list.scoreSecondChoice;
      this.winOtherNumber = list.winOtherNumber;
      this.dogfallOtherNumber = list.dogfallOtherNumber;
      this.loseOtherNumber = list.loseOtherNumber;
      console.log(list,'list',this.winFirst);
      this.winOther.forEach((item,key) =>{
        if(this.winFirst == item.num_1+'：'+item.num_2){
          this.Selectkey =  key
        }else if(this.winFirst == item.num_1+':'+item.num_2){
          this.Selectkey =  key
        }
      })
    },
    methods:{
      onClickLeft() {
        this.$router.back()
      },
    }
  }
</script>

<style scoped lang="less">
  #detailBig_score{
    width: 100%;
    min-height: 100%;
    background: #fff;
    .van-nav-bar__text {
      color:#000 !important;
      font-size:16px;
      letter-spacing: 1px;
    }
    .van-icon{
      color:#000 !important;
    }
    .detailBorder{
      width: 90%;
      margin: 10px auto;
      .DB_top{
        width: 100%;
        height: 40px;
        line-height: 30px;
        border-bottom: 1px solid #ECECEC;
      }
      .table{
        width: 100%;
        margin-top: 10px;
        .table_1{
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 2px solid #000;
          margin-bottom: 10px;
          display: flex;
          flex-wrap: wrap;
          /*&:last-child{*/
            /*border-bottom: none;*/
          /*}*/
          .table1Item{
            /*box-sizing: border-box;*/
            width: 13.9%;
            height: 45px;
            padding-top: 6px;
            border-right: 1px solid #000;
            /*border-bottom: 1px solid #000;*/
            text-align: center;
            font-size:14px;
            span{
              width: 100%;
              text-align: center;
              display: block;
            }
          }
          .styleColor{
            color:red
          }
          .table1Right{
            /*box-sizing: border-box;*/
            width: 25%;
            text-align: center;
            line-height: 45px;
            font-size:14px;
            padding-top: 6px;
            span{
              display: block;
              text-align: center;
              width: 100%;
              height: 20px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
</style>
