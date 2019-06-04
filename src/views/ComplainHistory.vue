<template>
    <div>
        <Head :title="title" :leftShow="leftShow"/>
        <section class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media mui-collapse" v-for="(item,index) in datas" :key="item.id">
                    <a class="mui-navigate-right" href="#" style="padding-right: 50px">
                        <p class="mui-media-object mui-pull-right">{{item.status|statusStr}}</p>
                        <div class="mui-media-body">
                            {{item.createdate}}
                            <p class='mui-ellipsis'>{{item.content}}</p>
                        </div>
                    </a>
                    <div class="mui-collapse-content">
                        <div><p style="font-size: 14px;color: #101010">投诉内容:</p>
                            <p>{{item.content}}</p></div>
                        <div class="img-box">

                            <div class="add-img img-sty" v-for="(imgUrl,index) in item.imglist" :key="index"
                                 v-if="imgUrl">
                                <img v-lazy="'http://47.107.138.115:8081/file/'+imgUrl" :key="'http://47.107.138.115:8081/file/'+imgUrl">
                                <i class="mui-icon mui-icon-close"></i>
                            </div>

                        </div>
                    </div>
                </li>

            </ul>
        </section>
    </div>
</template>

<script>
    import Head from '@/components/Head'

    export default {
        name: "ComplainHistory",
        data() {
            return {
                title: "投诉记录",
                leftShow: true,
                url: "http://47.107.138.115:8081/Pyramid/complain/myhistory.do",
                datas:[]
            }
        }
        ,
        components: {
            Head
        },
        filters: {
            statusStr: function (value) {
                var status = ""
                switch (value) {
                    case 0:
                        status = "未受理";
                        break;
                    case 1:
                        status = "已受理";
                        break;
                    case 2:
                        status = "驳回";
                        break;
                }
                return status;
            }
        },
        mounted() {
            /*this.$store.commit({
                type: 'mediaList',
                amount: {
                    mediaListUrl: "url",
                    mediaListSlide: true
                }

            });*/

            this.$axios({
                method: 'get',
                url: this.url,
                headers: {"token": localStorage.getItem("token")},
                params: {
                    limit: 20,
                    page: 1,
                    token: localStorage.getItem("token"),
                }
            }).then((res) => {
                if (res.data.code === 1000) {
                    this.datas = res.data.data.records;
                } else {
                    this.mui.toast("加载失败")
                }


            }).catch(err => {
                this.mui.toast("加载失败")
            })
        }
    }
</script>

<style scoped>
    .img-box {
        display: flex;
        margin-left: -10px;
        margin-top: 10px;
    }

    .img-sty {
        position: relative;
    }

    .img-sty .mui-icon-close {
        display: none;
        font-size: 24px;
        position: absolute;
        right: -6px;
        top: -6px;
    }

    .img-sty img {
        height: 60px;
        width: 60px;
    }

    .add-img {
        width: 62px;
        height: 62px;
        margin-left: 10px;
        text-align: center;
        border: 1px dashed rgba(0, 0, 0, .2);
    }
</style>
