<template>
  <div>
    <MediaList></MediaList>
  </div>
</template>

<script>
  import MediaList from '@/components/MediaList'

  export default {
    name: "ComplainHistory",
    data(){
      return{
        url:"http://47.107.138.115:8081/Pyramid/complain/myhistory.do"
      }
    }
    ,
    components: {
      MediaList
    },
    created() {
      this.$store.commit({
        type: 'mediaList',
        amount: {
          mediaListUrl: "url",
          mediaListSlide:true
        }

      });
    }
  }
</script>

<style scoped>

</style>
