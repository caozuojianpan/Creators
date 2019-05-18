<template>
    <div >
        <Head :title="title" :leftShow="leftShow"></Head>
        <div class="mui-content">

            <div style="padding: 10px 10px;" class="tab">
                <div id="segmentedControl" class="mui-segmented-control">
                    <a class="mui-control-item mui-active" href="#item1">
                        我的邀请
                    </a>
                    <a class="mui-control-item" href="#item2">
                        我的审核
                    </a>

                </div>
            </div>
            <div>
                <div id="item1" class="mui-control-content mui-active">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="(item,i) in records" :key='i' @click="turn1(item.id)">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" :src="'http://47.107.138.115:8081/file/'+item.headpic" v-img-error="'../../static/img/head.png'">
                                <p class="mui-media-object mui-pull-right" style='margin-right:25% ;'>{{item.createdate}}</p>
                                <div class="mui-media-body">
                                    {{item.username}}
                                    <p class='mui-ellipsis'>{{item.phone}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="item2" class="mui-control-content">
                    <ul class="mui-table-view">

                        <li class="mui-table-view-cell mui-media" v-for="(item,i) in records1" :key='i' @click="turn(item.id)">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" :src="['http://47.107.138.115:8081/file/'+item.headpic]" v-img-error="'../../static/img/head.png'">
                                <p class="mui-media-object mui-pull-right" style='margin-right:25% ;'>{{item.createdate}}</p>
                                <div class="mui-media-body">
                                    {{item.username}}
                                    <p class='mui-ellipsis'>{{item.phone}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Head from '@/components/Head'
    //import MediaList from '@/components/MediaList'
    export default {
        name: "Team",
        data() {
            return {
                title: "团队",
                leftShow:true,
                records:'',
                records1:'',
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
        },
        methods:{
            turn(id){
                this.$router.push({name:'Team_findInvited',params:{id:id}});

            },
            turn1(id1){
                this.$router.push({name:'Team_findInvitor',params:{id:id1}})
            }
        },
        mounted(){
            //我邀请的
            axios({
                method:'post',
                url:'http://47.107.138.115:8081/Pyramid/user/findInvitor.do',
                params:{limit:9999,page:1,token:localStorage.getItem("token")}
            }).then((data)=>{
                this.records = data.data.data.records
            }),
                //我的审核
                axios({
                    method:'post',
                    url:'http://47.107.138.115:8081/Pyramid/user/findInvited.do',
                    params:{limit:9999,page:1,token:localStorage.getItem("token")}
                }).then((data)=>{
                    this.records1 = data.data.data.records
                })
        }
    }
</script>

<style scoped>
    .mui-content{touch-action: none;}
</style>
