<template>
    <section id="refreshContainer" class="mui-content mui-scroll-wrapper">
        <div class="mui-scroll">
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
                                <img :src="'http://47.107.138.115:8081/file/'+imgUrl" alt="" v-img-error="'../../static/img/img-error.jpg'">
                                <i class="mui-icon mui-icon-close"></i>
                            </div>

                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ComplainList",
        data() {
            return {
                total: 1,//总数
                pages: 1,//总页数
                current: 0,//页码
                size: 10,//每页个数
                datas: [],
            }
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
        methods: {
            getDatas(type) {
                this.$axios({
                    method: 'get',
                    url: 'http://47.107.138.115:8081/Pyramid/complain/myhistory.do',
                    headers: {"token": localStorage.getItem("token")},
                    params: {
                        limit: this.size,
                        page: this.current,
                        token: localStorage.getItem("token"),
                    }
                }).then((res) => {
                    console.log(res.data)
                    if (res.data.code === 1000) {
                        this.total = res.data.data.total;
                        this.pages = res.data.data.pages;

                        if (type === 1) {
                            this.datas = res.data.data.records;
                            this.mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        } else {
                            this.datas.push(...res.data.data.records);
                            this.mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    } else {
                        this.mui.toast("加载失败")
                    }


                }).catch(err => {
                    this.mui.toast("加载失败")
                })
            }
        },
        mounted() {
            for (var i = this.mui.hooks.inits.length - 1, item; i >= 0; i--) {
                item = this.mui.hooks.inits[i];
                if (item.name == "pullrefresh") {
                    item.repeat = true;
                }
                this.mui.init({
                    pullRefresh: {
                        swipeBack: false, //关闭左滑关闭功能
                        container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                        down: {
                            style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                            color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                            callback: () => {
                                this.current = 1;
                                this.getDatas(1)
                            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        },
                        up: {
                            auto: true,
                            contentrefresh: '正在加载...',
                            contentnomore: '没有更多数据了',
                            callback: () => {
                                if (this.current >= this.pages) {
                                    this.mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    return;
                                }
                                this.current++;
                                this.getDatas(2);
                            } //上拉加载下一页
                        }
                    }
                });
            }

        },

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
