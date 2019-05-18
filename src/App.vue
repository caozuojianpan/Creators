<template>
  <div id="app">
      <keep-alive include="MyReward">
          <!-- 将缓存name为test-keep-alive的组件 -->
          <router-view/>
      </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
