<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" >
      <bookmark :color="color" :width="15" :height="35"></bookmark>
  </div>
  </div>
</template>

<script>
   import { realPx } from '@/utils/utils'
  import Bookmark from '../common/Bookmark'
   import { ebookMixin } from '@/utils/mixin'
  // import { getBookmark, saveBookmark } from '../../utils/localStorage'
  // const BLUE = '#346cbc'
  // const WHITE = '#fff'
  export default {
    components: {
      Bookmark
    },
    mixins: [ebookMixin],
    data () {
      return {
        text: this.$t('book.pulldownAddMark'),
        color: 'black'
      }
    },
    computed: {
      height () {
        return realPx(35)
      },
      threshold () {
        return realPx(55)
      }
    },
    watch: {
      offsetY (v) {
        if (v >= this.height && v <= this.threshold) {
            console.log('到达第二阶段')
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: black;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: black;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }
</style>
