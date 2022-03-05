<template>
  <transition name="fade">
  <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow': ifHideShadow}">
    <div class="shelf-title-text-wrapper" >
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode" >{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" >
        <span class="shelf-title-btn-text " @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right" >
        <span class="shelf-title-btn-text" @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
<!--      <div class="btn-text-wrapper" >-->
<!--        <span class="btn-text">{{$t('shelf.changeLanguage')}}0000</span>-->
<!--      </div>-->
<!--      <div class="btn-clear-wrapper" >-->
<!--        <span class="btn-clear">{{$t('shelf.clearCache')}}</span>-->
<!--      </div>-->
<!--      <div class="btn-back-wrapper" >-->
<!--        <span class="icon-back"></span>-->
<!--      </div>-->
<!--      <div class="btn-back-wrapper" >-->
<!--        <span class="btn-text">{{$t('shelf.editGroup')}}</span>-->
<!--      </div>-->
<!--      <popup ref="popup"-->
<!--             :title="popupTitle"-->
<!--             :thirdText="thirdText"-->
<!--             :confirmText="confirmText"-->
<!--             :isRemoveText="true"-->
<!--             :cancelText="$t('shelf.cancel')"-->
<!--             @confirm="onPopupDelete"-->
<!--             @third="onPopupChange"></popup>-->
<!--      <shelf-group-dialog :visible.sync="ifGroupDialogShow"-->
<!--                          :isEditGroupName="true"-->
<!--                          :category="category"-->
<!--                          @editGroupName="editGroupName"-->
<!--                          ref="groupDialog"></shelf-group-dialog>-->
    </div>
  </transition>
</template>

<script>
import { storeShelfMixin } from '@/utils/mixin'
import { clearLocalForage } from '@/utils/localForage'
import { clearLocalStorage } from '@/utils/localStorage'
export default {
  name: 'ShelfTitle',
  mixins: [storeShelfMixin],

  computed: {
    selectedText () {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook')
        .replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
    }
  },
  methods: {
    onEditClick () {
      this.setIsEditMode(!this.isEditMode)
    },
    clearCache () {
      clearLocalStorage()
      clearLocalForage()
      this.setShelfList([])
      this.setShelfSelected([])
      this.getShelfList()
      this.simpleToast(this.$t('shelf.clearCacheSuccess'))
    }
  },
  watch: {
    offsetY (offsetY) {
      if (offsetY > 0) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    }
  },
  data () {
    return {
      ifHideShadow: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.shelf-title{
  height: px2rem(42);
  background: white;
  z-index: 130;
  position: relative;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0,0,0,.1);
  &.hide-shadow{
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;

    .shelf-title-text {
      font-size: px2rem(16);
      line-height: px2rem(20);
      font-weight: bold;
      color: #333;
    }

    .shelf-title-sub-text {
      font-size: px2rem(10);
      color: #333;
    }
  }
    .shelf-title-btn-wrapper{
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text{
      font-size: px2rem(14);
      color: #666;
    }
      &.shelf-title-left{
        left: 0;
        padding-left: px2rem(15);
      }
      &.shelf-title-right{
        right: 0;
        padding-right: px2rem(15);
      }
    }
}
    //.btn-text-wrapper {
    //  position: absolute;
    //  right: 0;
    //  top: 0;
    //  z-index: 115;
    //  padding-right: px2rem(16.5);
    //  box-sizing: border-box;
    //  height: 100%;
    //  @include center;
    //  .btn-text {
    //    font-size: px2rem(14);
    //    color: #666;
    //  }
    //  &.title-left {
    //    left: 0;
    //    padding-left: px2rem(15);
    //  }
    //  &.title-right {
    //    right: 0;
    //    padding-left: px2rem(15);
    //  }
 //   }
    //.btn-clear-wrapper {
    //  position: absolute;
    //  left: 0;
    //  top: 0;
    //  z-index: 115;
    //  padding-left: px2rem(16.5);
    //  box-sizing: border-box;
    //  height: 100%;
    //  @include center;
    //  .btn-clear {
    //    font-size: px2rem(14);
    //    color: #666;
    //  }
    //}
    //.btn-back-wrapper {
    //  position: absolute;
    //  left: 0;
    //  top: 0;
    //  z-index: 115;
    //  padding-left: px2rem(16.5);
    //  box-sizing: border-box;
    //  height: 100%;
    //  font-size: px2rem(20);
    //  color: #666;
    //  @include center;
    //  &:active {
    //    color: rgba(102, 102, 102, .5);
    //  }
    //  .btn-text {
    //    font-size: px2rem(14);
    //    color: #666;
    //  }
    //}
</style>
