<template>
    <div>
        <Head :title="title" :leftShow="leftShow"/>
        <MediaList></MediaList>
    </div>
</template>

<script>
    import Head from '@/components/Head'
    import MediaList from '@/components/MediaList'

    export default {
        name: "ComplainHistory",
        data() {
            return {
                title: "投诉记录",
                leftShow:true,
                url: "http://47.107.138.115:8081/Pyramid/complain/myhistory.do"
            }
        }
        ,
        components: {
            Head,
            MediaList
        },
        created() {
            this.$store.commit({
                type: 'mediaList',
                amount: {
                    mediaListUrl: "url",
                    mediaListSlide: true
                }

            });
        }
    }
</script>

<style scoped>

</style>
