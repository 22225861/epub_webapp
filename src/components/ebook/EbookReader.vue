<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'

global.ePub = Epub
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      // this.$store.dispatch('setMenuVisible', false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    initEpub () {
      // 192.168.43.110为本机地址 8090则为nginx服务器设置
      const url = 'http://192.168.43.110:8090/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
        // 兼容iOS
        // method: 'default'
      })
      this.rendition.display()

      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()// 上一页
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()// 下一页
        } else {
          this.toggleTitleAndMenu()
        }
        // event.preventDefault()
        event.stopPropagation()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all(
          [
            contents.addStylesheet(` ${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(` ${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(` ${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(` ${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]
        ).then(() => {
          console.log('字体加载完毕')
        })
      })
    }
  },
  mounted () {
    this.setFileName(this.$route.params.fileName).then(() => {
      this.initEpub()
    })
  }

}
</script>

<style lang="scss" scoped>

</style>
