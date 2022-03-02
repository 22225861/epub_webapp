<template>
  <transition name="slide-up">
  <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
  <div class="setting-progress" >
    <div class="read-time-wrapper">
               <span class="read-time-text">{{getReadTimeText()}}</span>
               <span class="icon-forward"></span>
          </div>
    <div class="progress-wrapper">
      <div class="progress-icon-wrapper" @click="prevSection()" >
        <span class="icon-back" ></span>
      </div>
      <input class="progress" type="range"
             max="100"
             min="0"
             step="1"
             @change="onProgressChange($event.target.value)"
             @input="onProgressInput($event.target.value)"
             :value="progress"
             :disabled="!bookAvailable"
             ref="progress"
      >
      <div class="progress-icon-wrapper" @click="nextSection()">
               <span class="icon-forward"></span>
      </div>
    </div>
    <div class="text-wrapper">
      <span class="progress-section-text">{{getSectionName}}</span>
      <span>{{bookAvailable ? progress + '%' : 'loading...'}}</span>
    </div>
  </div>
  </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  name: 'EbookSettingProgress',
  mixins: [ebookMixin],
  methods: {
    onProgressChange (progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    onProgressInput (progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBg()
      })
    },
    prevSection () {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          // this.displaySection(() => {
          //   this.updateProgressBg()
          //   this.isProgressLoading = false
          // })
          this.displaySection()
        })
      }
    },
    nextSection () {
     // console.log(this.currentBook.spine)
     if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) { // spine.length 表示图书一共有多少张
       this.setSection(this.section + 1).then(() => {
         this.displaySection()
       })
     }
    },
    displaySection () {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        // this.currentBook.rendition.display(sectionInfo.href).then(() => {
        //   this.refreshLocation()
        // })
        this.display(sectionInfo.href)
      }
    },
    displayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100) // 表示改变图书的百分比
      // this.currentBook.rendition.display(cfi).then(() => { // 根据cfi改变图书的内容显示
      //   this.refreshLocation()
      // })
      this.display(cfi)
    },
    updateProgressBg () {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    }
  },
  updated () {
     this.updateProgressBg() // 解决初始化进度条为0% 却显示横线问题
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      @include center;
      font-size: px2rem(12);
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress {
        flex: 1;
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
        background-size: 0 100%;
        margin: 0 px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #ceced0;
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .15);
          border: none;
        }
      }
      .progress-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(22);
        @include center;
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(5);
      width: 100%;
      font-size: px2rem(12);
      text-align: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        line-height: px2rem(15);
        @include ellipsis;
      }
      .progress-text {
      }
    }
  }
}
</style>
