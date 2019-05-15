<template>
  <header id="header" class="mui-bar mui-bar-nav">

    <h1 class="mui-title">{{title}}</h1>
    <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="leftShow" @click="back"></span>
  </header>
</template>

<script>
  export default {
    name: "Head",
    props:["title","leftShow"],
    data(){
      return{
      }
    },
    methods:{
      back(){
        console.log("aaaaaaaaaa")
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
