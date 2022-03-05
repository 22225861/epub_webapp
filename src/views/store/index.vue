<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
div {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
