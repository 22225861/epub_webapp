import { mapActions, mapGetters } from 'vuex'
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
    ])
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
    ])
  }
}
