<template>
  <div>
    <Head :title="title" :leftShow="leftShow"></Head>
    <section class="mui-content">
      <!--<div style="padding: 10px 10px;">
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
      </div>-->
      <router-view></router-view>
    </section>
  </div>

</template>

<script>
  import Head from "@/components/Head"
  export default {
    name: "Complain",
    data(){
      return{
        title:"投诉",
        leftShow:true
      }
    },
    components:{
      Head
    },
   methods:{
      complain(){
        this.$router.push("/make_complain")
      },
     complainList(){

       this.$router.push("/complain_status")
     }
   },
    created() {

    }
  }
</script>

<style scoped>

</style>
