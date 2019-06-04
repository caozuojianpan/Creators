<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">

            <h1 class="mui-title">奖励</h1>
            <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="true" @click="back"></span>
        </header>
        <div v-if="list.length===0" class="mui-content"><p style="line-height: 200px;font-size: 18px;text-align: center">暂无奖励</p></div>

        <div id="pullrefresh" class="mui-content mui-scroll-wrapper" v-else>
            <div class="mui-scroll">
                <!--数据列表-->
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell" style="padding-right: 24px">
                        内容 <span class="mui-pull-right">时间</span>
                    </li>
                    <li class="mui-table-view-cell" style="padding-right: 24px" v-for="(item, index) in list" :key="index">
                        {{item.content}} <span class="mui-pull-right">{{item.createtime}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import qs from 'qs';

    export default {

        name: "MyReward",
        data: function () {
            return {
                count: 0,
                list: [],
                pageSize: 10,
                page: 1
            }
        },
        beforeDestroy(){
            this.mui.options.pullRefresh=null;
        }
        ,
        created() {


        },
        methods: {
            back(){
                this.$router.push('/user');
            },
            pulldownRefresh: function () {

                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false); //refresh completed
            },
            pullupRefresh: function () {


                var _this = this;
                axios({
                    url: 'http://47.107.138.115:8081/Pyramid/record/reward.do',
                    method: 'post',

                    data: qs.stringify({limit: _this.pageSize, page: _this.page, token: _this.token,})
                }).then(function (data) {
                    let result = data.data;

                    _this.page += 1;
                    if (result.data.records.length > 1) {
                        _this.list = _this.list.concat(result.data.records);
                    } else {


                        _this.mui.toast('没有更多数据')

                    }

                    mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                })

            }
        }
        ,
        beforeMount() {

        },
        mounted() {

            var token = localStorage.getItem('token');
            this.token = token;
            var _this = this;
            axios({
                url: 'http://47.107.138.115:8081/Pyramid/record/reward.do',
                method: 'post',

                data: qs.stringify({limit: _this.pageSize, page: _this.page, token: _this.token,})
            }).then(function (data) {
                var result = data.data;
                if (result.code == 1000) {
                    _this.page += 1;
                    _this.list = result.data.records;

                }else if(result.code == 1001){
                    _this.mui.toast('暂无数据')

                } else {
                    _this.mui.toast('网络错误')
                }


            })
            for (var i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
                item = mui.hooks.inits[i];
                if (item.name == "pullrefresh") {
                    item.repeat = true;
                }
            }
            var _this = this;
            mui.init({
                pullRefresh: {
                    container: '#pullrefresh',

                     down: {
                        /*  contentrefresh: '',

                         callback: _this.pulldownRefresh*/
                     },
                    up: {
                        contentrefresh: '正在加载...',
                        contentnomore: '没有更多数据了',
                        callback: _this.pullupRefresh
                    }
                }
            });


            /*            this.mui('#pullrefresh').pullRefresh().setStopped(true);*/
        }

    }
</script>

<style scoped>
    .mui-content.mui-scroll-wrapper {
        overflow: auto;
    }

    .mui-slider.mui-fullscreen .mui-slider-group .mui-control-content .mui-scroll-wrapper {
        overflow: auto;
    }
</style>
