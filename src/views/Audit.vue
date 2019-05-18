<template>
    <div>
        <Head :title="title" :leftShow="leftShow"></Head>
        <section id="refreshContainer" class="mui-content mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-transitioning mui-selected" v-for="(item,index) in datas"
                        :key="item.id">
                        <div class="mui-slider-right mui-disabled mui-selected">
                            <a class="mui-btn mui-btn-success " style="transform: translate(0px, 0px);"
                               @click="onAgreeClick(index)">同意</a>
                            <a class="mui-btn mui-btn-danger" style="transform: translate(-90px, 0px);"
                               @click="onRefuseClick(index)">拒绝</a>
                        </div>
                        <a href="javascript:;" class="mui-slider-handle" style="transform: translate(0px, 0px);">
                            <!--<img class="mui-media-object mui-pull-left"
                                 src="http://www.dcloud.io/hellomui/images/shuijiao.jpg" v-if="item.img">-->
                            <p class="mui-media-object mui-pull-right">&ll;</p>
                            <div class="mui-media-body">
                                {{item.uname}}
                                <p class='mui-ellipsis'>{{item.sname}}&nbsp;&nbsp;{{item.phone}}</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import Head from '@/components/Head'
    import qs from 'qs'

    export default {
        name: "Audit",
        data() {
            return {
                title: "审核",
                leftShow: true,
                datas: [],
            }
        },
        components: {
            Head,
        },
        methods: {
            onAgreeClick(index) {
                this.audit(index, 1)
            },
            onRefuseClick(index) {
                this.audit(index, 2)
            },
            audit(index, flag) {
                var _this = this;
                console.log(index, flag)
                _this.mui.confirm("您确认" + (flag === 1 ? "同意" : "拒绝") + "该请求吗", "提示", ['取消', "确认"], function (msg) {
                    console.log(msg)
                    if (msg.index === 1) {
                        _this.mui.showLoading("正在加载...", "div");
                        _this.$axios({
                            method: 'post',
                            url: 'http://47.107.138.115:8081/Pyramid/user/level/checkok.do',
                            headers: {"token": localStorage.getItem("token")},
                            data: {"id": _this.datas[index].id, "flag": flag}

                        }).then((res) => {
                            if (res.data.code === 1000) {
                                _this.datas.splice(index, 1);
                                _this.mui.toast(res.data.msg)
                            } else {
                                _this.mui.toast("加载失败")
                            }
                            _this.mui.hideLoading(null);
                            console.log(res)
                        }).catch(err => {
                            _this.mui.hideLoading(null);
                            _this.mui.toast("加载失败")
                        })
                    }
                }, "div");

            },
        },
        created() {
            this.mui.showLoading("正在加载...", "div");
            console.log(localStorage.getItem("token"))
            this.$axios({
                method: 'POST',
                url: 'http://47.107.138.115:8081/Pyramid/user/level/checklist.do',
                // url: 'http://10.8.159.40:8086/user/level/checklist.do',
                headers: {
                    "token": localStorage.getItem("token"),
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                data: qs.stringify({"token": localStorage.getItem("token")}),

            }).then((res) => {
                if (res.data.code === 1000) {
                    this.datas = res.data.data
                } else {
                    this.mui.toast("加载失败")
                }
                this.mui.hideLoading(null);
                console.log(res)
            }).catch(err => {
                this.mui.hideLoading(null);
                this.mui.toast("加载失败")
            })
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>
