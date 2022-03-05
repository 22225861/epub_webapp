<template>
  <div class="ebook-reader" >
    <div id="read"
         ></div>
<!--    <div class="ebook-reader-mask"-->
<!--         @click="onMaskClick"-->
<!--         @touchmove="move"-->
<!--         @touchend="moveEnd"-->
<!--         @mousedown.left="onMouseEnter"-->
<!--         @mousemove.left="onMouseMove"-->
<!--         @mouseup.left="onMouseEnd"-->
<!--         ></div>-->
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
import {
  getFontFamily,
  getFontSize,
  getLocation,
  getTheme,
  saveFontFamily,
  saveFontSize,
  saveTheme
} from '@/utils/localStorage'
import { flatten } from '@/utils/book'

global.ePub = Epub
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  methods: {
    // onMouseEnd (e) {
    //   if (this.mouseState === 2) {
    //     this.setOffsetY(0)
    //     this.firstOffsetY = null
    //     this.mouseState = 3
    //   } else {
    //     this.mouseState = 4
    //   }
    //   const time = e.timeStamp - this.mouseStartTime
    //   if (time < 100) {
    //     this.mouseState = 4
    //   }
    //   e.preventDefault()
    //   e.stopPropagation()
    // },
    // onMouseMove (e) {
    //   if (this.mouseState === 1) {
    //     this.mouseState = 2
    //   } else if (this.mouseState === 2) {
    //     let offsetY = 0
    //     if (this.firstOffsetY) {
    //       offsetY = e.clientY - this.firstOffsetY
    //       this.setOffsetY(offsetY)
    //     } else {
    //       this.firstOffsetY = e.clientY
    //     }
    //   }
    //   e.preventDefault()
    //   e.stopPropagation()
    // },
    // onMouseEnter (e) {
    //   this.mouseState = 1
    //   this.mouseStartTime = e.timeStamp
    //   e.preventDefault()
    //   e.stopPropagation()
    // },
    // move (e) {
    //   let offsetY = 0
    //   if (this.firstOffsetY) {
    //     offsetY = e.changedTouches[0].clientY - this.firstOffsetY
    //     this.setOffsetY(offsetY)
    //   } else {
    //     this.firstOffsetY = e.changedTouches[0].clientY
    //   }
    //   e.preventDefault()
    //   e.stopPropagation()
    // },
    // moveEnd (e) {
    //   this.setOffsetY(0)
    //   this.firstOffsetY = null
    // },
    // onMaskClick (e) {
    //   if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
    //     return
    //   }
    //   const offsetX = e.offsetX
    //   const width = window.innerWidth
    //   if (offsetX > 0 && offsetX < width * 0.3) {
    //     this.prevPage()
    //   } else if (offsetX > 0 && offsetX > width * 0.7) {
    //     this.nextPage()
    //   } else {
    //     this.toggleTitleAndMenu()
    //    // this.setSettingVisible()
    //   }
    // },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
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
    initFontSize () {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily () {
      const font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, 'default')
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
        // 兼容iOS
        // method: 'default'
        // flow: 'scrolled' // 滚动浏览 使用鼠标滑轮可以滚动页面
      })
           const location = getLocation(this.fileName)
          this.display(location, () => {
          this.initFontSize() // 字体大小
          this.initFontFamily() // 字体
          this.initTheme() // 背景色
          this.initGlobalStyle() // 全局样式
         // this.refreshLocation()
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
    },
    initGesture () {
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
    },
    parseBook () {
      this.book.loaded.cover.then(cover => { // 封面
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => { // 简介
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => { // 目录
       const navItem = flatten(nav.toc)
        function find (item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        this.setNavigation(navItem)
      })
    },
    initEpub () {
      // this.fileName = this.$route.params.fileName.split('|').join('/')
      // this.setFileName(this.fileName)
      const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition() // 显示图书信息操作宽高等
       this.initGesture() // 手势操作
      this.parseBook() // 获取图书信息 封面 作者等
      this.book.ready.then(() => { // 分页
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.setBookAvailable(true)
        this.refreshLocation()
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
@import "../../assets/styles/global";

.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 150;
    width: 100%;
    height: 100%;
  }
}
</style>
