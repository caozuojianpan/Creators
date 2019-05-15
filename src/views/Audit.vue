<template>
  <div>
    <Head :title="title" :leftShow="leftShow"></Head>
    <MediaList></MediaList>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import MediaList from '@/components/MediaList'
    export default {
        name: "Audit",
      data() {
        return {
          title: "审核",
          leftShow:true
        }
      },
      components: {
        Head,
        MediaList
      },
      created() {
        this.$store.commit({
          type: 'mediaList',
          amount: {
            mediaListUrl: "",
            mediaListSlide:false
          }

        });
      }
    }
</script>

<style scoped>

</style>
