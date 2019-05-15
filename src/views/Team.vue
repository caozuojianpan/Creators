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
    name: "Team",
    data() {
      return {
        title: "团队",
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
          mediaListSlide:true
        }

      });
    }
  }
</script>

<style scoped>

</style>
