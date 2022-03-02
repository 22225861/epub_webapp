<template>
  <div>
  <transition name="slide-up">
    <div class="menu-wrapper"
         v-show="menuVisible"
         :class="{'hide-box-shadow': !menuVisible || settingVisible>=0}">
      <div class="icon-wrapper">
        <span class="icon-menu " @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress " @click="showSetting(2)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright " @click="showSetting(1)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-A " @click="showSetting(0)"></span>
      </div>
    </div>
  </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <EbookSlide></EbookSlide>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSettingFont from '@/components/ebook/EbookSettingFont'
import EbookSettingFontPopup from '@/components/ebook/EbookSettingFontPopup'
import EbookSettingTheme from '@/components/ebook/EbookSettingTheme'
import EbookSettingProgress from '@/components/ebook/EbookSettingProgress'
import EbookSlide from '@/components/ebook/EbookSlide'
export default {
  name: 'EbookMenu',
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide
  },

  mixins: [ebookMixin],
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(48);
  display: flex;
  z-index: 102;
  background-color: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  font-size: px2rem(20);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-bright {
      font-size: px2rem(22);
    }
  }
}
</style>
