<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    debugger
    console.log('进入App的created')
  },
}
</script>

<style lang="less" scoped>
#app{
  width: 100%;
  height: 100%;
}
</style>
