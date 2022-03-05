<template>
<div class="store-home">
  <search-bar></search-bar>
  <FlapCard :data="random"></FlapCard>
  <Scroll :top="scrollTop" ref="scroll" @onScroll="onScroll">
    <div class="banner-wrapper">
      <img  class="banner-img" :style="{backgroundImage:`url('${banner}')`}">
    </div>
    <guess-you-like :data="guessYouLike"></guess-you-like>
    <Recommend :data="recommend" class="recommend"></Recommend>
    <Featured  :data="featured" class="featured" :titleText="$t('home.featured')" :btn-text="$t('home.seeAll')"></Featured>
    <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
      <category-book :data="item"></category-book>
    </div>
    <category  class="categories" :data="categories"></category>
  </Scroll>
</div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import Scroll from '@/components/common/Scroll'
import { storeHomeMixin } from '@/utils/mixin'
import FlapCard from '@/components/home/FlapCard'
import GuessYouLike from '@/components/home/GuessYouLike'
import Recommend from '@/components/home/Recommend'
import Featured from '@/components/home/Featured'
import { home } from '@/api/store'
import CategoryBook from '@/components/home/CategoryBook'
import Category from '@/components/home/Category'
export default {
  name: 'StoreHome',
  mixins: [storeHomeMixin],
  components: {
    Category,
    CategoryBook,
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend, // 热门推荐
    Featured
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 94
      }
      this.$refs.scroll.refresh() // 重新计算滚动条高度
    }
  },
  data () {
    return {
      scrollTop: 94,
      random: null,
      banner: null, // 大屏图片
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null // 书籍分类
    }
  },
  mounted () {
    home().then(response => {
     if (response && response.status === 200) {
       const data = response.data
       console.log(data)
       const randomIndex = Math.floor(Math.random() * data.random.length)
       this.random = data.random[randomIndex]// 动画结束后的随机书本
       this.banner = data.banner
       this.guessYouLike = data.guessYouLike
       this.recommend = data.recommend
       this.featured = data.featured
       this.categoryList = data.categoryList
       this.categories = data.categories
     }
    })
  }
}
</script>

<style lang="scss" scoped>
 @import "../../assets/styles/global";
 .store-home {
   width: 100%;
   height: 100%;
   .banner-wrapper {
     width: 100%;
     padding: px2rem(10);
     box-sizing: border-box;
     .banner-img {
       width: 100%;
       height: px2rem(150);
       background-repeat: no-repeat;
       background-size: 100% 100%;
     }
     .recommend {
       margin-top: px2rem(20);
     }
     .featured {
       margin-top: px2rem(20);
     }
     .category-list-wrapper {
       margin-top: px2rem(20);
     }
     .categories {
       margin-top: px2rem(20);
     }
   }
 }
</style>
