<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <EbookReader></EbookReader>
    <ebook-menu></ebook-menu>
     <EbookBookmark></EbookBookmark>
    <Ebookfooter></Ebookfooter>
    <ebook-header></ebook-header>
  </div>
</template>

<script>
import EbookMenu from '@/components/ebook/EbookMenu'
import EbookReader from '@/components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
import EbookBookmark from '@/components/ebook/EbookBookmark'
import EbookHeader from '@/components/ebook/EbookHeader'
import Ebookfooter from '@/components/ebook/Ebookfooter'
export default {
  name: 'index',
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookBookmark,
    EbookHeader,
    Ebookfooter
  },
  mixins: [ebookMixin],
  methods: {
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move (v) { // 下拉
      this.$refs.ebook.style.top = v + 'px'
    },
    restore () { // 松手还原
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear' // 松手过渡动画
      setTimeout(() => {
        this.$refs.ebook.style.transition = '' // 如果不取消过过渡动画 再次下拉痕迹明显
      }, 200)
    }
  },
  mounted () {
    this.startLoopReadTime()
  },
  watch: {
    offsetY (v) { // 显示上下状态栏不可以下拉
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    }
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
