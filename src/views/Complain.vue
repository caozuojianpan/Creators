<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">

      <h1 class="mui-title">{{title}}</h1>
      <a class=" mui-icon mui-icon-left-nav mui-pull-left"></a>
    </header>
    <section>
      <div style="padding: 10px 10px;">
        <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-primary">
        <span class="mui-control-item mui-active" @click.stop.prevent="complain">
          发起投诉
        </span>
          <span class="mui-control-item" @click.stop.prevent="complainList">
          投诉进度
        </span>
          <span class="mui-control-item">
          投诉历史
        </span>
        </div>
      </div>
      <router-view></router-view>
    </section>
  </div>

</template>

<script>
  export default {
    name: "Complain",
    data(){
      return{
        title:"投诉"
      }
    },
   methods:{
      complain(){
        this.$router.push("/make_complain")
      },
     complainList(){

       this.$router.push("/complain_list")
     }
   },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
