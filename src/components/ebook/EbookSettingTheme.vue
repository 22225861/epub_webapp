<template>
  <transition name="slide-up">
    <div class="setting-bar" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme" >
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
          <div class="preview"
               :style="{background: item.style.body.background}"
               :class="{'selected': item.name=== defaultTheme}"
               ></div>
          <div class="text" :class="{'selected': item.name=== defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { saveTheme } from '@/utils/localStorage'

export default {
  name: 'EbookSettingTheme',
  mixins: [ebookMixin],
  computed: {
  },
  methods: {
    setTheme (index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        this.innitGlobalStyle()
      })
       saveTheme(this.fileName, theme.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.setting-bar {
  z-index: 101;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: px2rem(48);
  height: px2rem(90);
  background-color: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  &.slide-up-enter,&.slide-up-leave-to {
    transform: translate3d(0, px2rem(108), 0); // 从下往上进入，进入前应该在外面所以下移故为正，坐标轴是↓→
  }
  &.slide-up-enter-to,&.slide-up-leave {
    transform: translate3d(0, 0, 0);
  }
  &.slide-up-enter-active,&.slide-up-leave-active {
    transition: all 0.3s linear;
  }
  .setting-font-size {
    display: flex;
    height: 100%; // 撑开这个设置整个的高度，不然顶到上面去了
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .select {
      display: flex; // 整个横条加竖线的集合
      flex: 1; // 如果不设置这个会缩成一块，没有宽度
      .select-wrapper { // 每一个横条加竖线
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none; // 取消第一个的横线
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none; // 取消最后一个的横线
            }
          }
        }
        .line { // 横线
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .point-wrapper { // 竖线
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid #ccc;
          .point { // 小白圆
            position: absolute;
            top: px2rem(-8);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            background-color: white;
            border: px2rem(1) solid #ccc;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
            @include center;
            .small-point { // 小黑点
              width: px2rem(5);
              height: px2rem(5);
              background-color: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #cccccc;
        box-sizing: border-box;
        &.select {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0,0,0,.1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
