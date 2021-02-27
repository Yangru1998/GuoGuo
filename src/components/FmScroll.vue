<template>
  <div ref="wrapperScroll">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {

    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: []
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        // const options = {
        //   scrollY: true,
        //   scrollX: false,
        //   mouseWheel: true,
        //   click: true,
        //   taps: true
        // }
        // this.scroll = new BScroll(this.$refs.wrapperScroll, options)
        this._initSlider();
        this.refresh();
        this.scrollToBottom();
      }, 200)
    },
    methods: {
      _initSlider() {
        if (!this.$refs.wrapperScroll) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapperScroll, {
          probeType: 1,
          click: this.click,
          scrollY: true,
          scrollX: false,
          taps: true
        })

        let me = this
        this.scroll.on('scroll', (pos) => {
          // debugger;
          me.$emit('scroll', pos)
        });

        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            me.$emit('scrollToEnd')
          }
        })

        setTimeout(() => {
          this.scroll.scrollTo(0, -2000, .3)
        }, 200)

        // this.scroll.pullingDown(() => {
        //   console.log('下拉加载更多')
        //   this.$emit('scrollDown')
        // })
        this.scroll.on('pullingDown', () => {
          console.log(12)
          this.$emit('scrollDown')
        })
        this.scroll.on('pullingUp', () => {
          console.log(77)
          this.$emit('pullingUp')
        })

      },
      enable() {
        this.scroll && this.scroll.enable();
      },
      disble() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollBottom() {
        this.scroll.scrollTo(0,this.scroll.maxScrollY)
      },
      scrollToBottom() {
        this.scroll.scrollTo(0, -2000, .3)
        this.$emit('scrollToBottom')
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh();
          // this.scrollToBottom();
        }, 200)
        this.scrollToBottom();
      }
    }
  }
</script>

<style scoped>

</style>
