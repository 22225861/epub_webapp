<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <EbookReader></EbookReader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookMenu from '@/components/ebook/EbookMenu'
import EbookReader from '@/components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
export default {
  name: 'index',
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
