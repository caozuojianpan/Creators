<template>
    <div>
        <header id="header" class="mui-bar mui-bar-nav">

            <h1 class="mui-title">惩罚</h1>
            <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="true" @click="back"></span>
        </header>
        <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
            <div class="mui-scroll">
                <!--数据列表-->
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell" style="padding-right: 24px">
                        内容 <span class="mui-pull-right">时间</span>
                    </li>
                    <li class="mui-table-view-cell" style="padding-right: 24px" v-for="(item, index) in list">
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
                var _this = this;
                setTimeout(function () {
                    var addedArray = [];
                    for (var i = _this.items.length + 1, len = i + 3; i < len; i++) {
                        addedArray.push({title: 'item' + i});
                    }
                    _this.items = addedArray.concat(_this.items);
                    _this.mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                }, 1000);
            },
            pullupRefresh: function () {


                var _this = this;
                console.log(_this.page)
                axios({
                    url:'http://47.107.138.115:8081/Pyramid/record/punish.do',
                    method: 'post',

                    data: qs.stringify({limit: _this.pageSize, page: _this.page, token: _this.token,})
                }).then(function (data) {
                    let result = data.data;

                    _this.page += 1;
                    console.log(result.data.records)
                    if (result.data.records.length > 1) {
                        console.log(222)
                        _this.list = _this.list.concat(result.data.records);
                    } else {


                        _this.mui.toast('没有更多数据')

                    }

                    _this.mui('#pullrefresh').pullRefresh().endPullupToRefresh();
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
                url: 'http://47.107.138.115:8081/Pyramid/record/punish.do',
                method: 'post',

                data: qs.stringify({limit: _this.pageSize, page: _this.page, token: _this.token,})
            }).then(function (data) {
                var result = data.data;
                console.log(data.data);
                if (result.code == 1000) {
                    _this.page += 1;
                    _this.list = result.data.records;

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

                    /* down: {
                         contentrefresh: '正在下拉...',

                         callback: _this.pulldownRefresh
                     },*/
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
