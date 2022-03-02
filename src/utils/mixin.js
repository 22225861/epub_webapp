import { mapActions, mapGetters } from 'vuex'
import { addCss, removeAllCss, themeList, getReadTimeByMinute } from '@/utils/book'
import { saveLocation } from '@/utils/localStorage'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      // 'menuVisible',
      // 'fileName',
      // 'settingVisible',
      // 'defaultFontSize'
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ]),
    themeList () {
      return themeList(this)
    },
    getSectionName () { // 获取章节名称
      // if (this.section) {
      //   const sectionInfo = this.currentBook.section(this.section)
      //   if (sectionInfo && sectionInfo.href && this.currentBook && this.currentBook.navigation) {
      //     return this.currentBook.navigation.get(sectionInfo.href).label
      //   }
      // }
      return this.section ? this.navigation[this.section].label : ''
    }
  },
  methods: {
    ...mapActions([
      // 'setMenuVisible',
      // 'setFileName',
      // 'setSettingVisible',
      // 'setDefaultFontSize'
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom'
    ]),
    initGlobalStyle () {
       removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    refreshLocation () { // 实现上/下翻页进度条更新
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        console.log(startCfi)
        const progress = this.currentBook.locations.percentageFromCfi(startCfi) // 获得一张的首字母占本书的的百分比
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
      }
    },
    display (target, cb) {
      if (target) {
         this.currentBook.rendition.display(target).then(() => {
           this.refreshLocation()
           if (cb) cb()
         })
      } else {
         this.currentBook.rendition.display().then(() => {
           this.refreshLocation()
           if (cb) cb()
         })
      }
    },
    hideTitleAndMenu () {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    getReadTimeText () {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    }
  }
}
