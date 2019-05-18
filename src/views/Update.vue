<template>
    <div>
        <Head :title="title" :leftShow="leftShow"></Head>
        <section class="mui-content">
            <div class="content">
                <select class="mui-btn-block" ref="select" v-model="value" :disabled="!isShow">
                    <option :value="item.id" v-for="(item,index) in list" :key="item.id" v-show="isShow">
                        {{item.sname}}
                    </option>
                </select>
                <button type="button" class="mui-btn mui-btn-success mui-btn-block" v-show="isShow" @click="send">提交审核
                </button>
            </div>
        </section>
    </div>

</template>

<script>
    import Head from "@/components/Head"
    import qs from "qs"

    export default {
        name: "Update",
        data() {
            return {
                title: "升级",
                leftShow: true,
                value: 0,
                list: [{
                    id: 0,
                    sname: "请选择您要提升的级别"
                }],
                isShow: false,
                sid: ''
            }
        },
        components: {
            Head
        },
        methods: {
            getSelectList(){
                var _this = this;
                var datas = {"token": localStorage.getItem("token")};
                this.$axios({
                    method: 'post',
                    url: 'http://47.107.138.115:8081/Pyramid/user/level/list.do',
                    headers: {
                        "token": localStorage.getItem("token"),
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    data: qs.stringify(datas)
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 1000) {
                        _this.isShow = true;
                        _this.list.push(...res.data.data);
                    } else {
                        _this.isShow = false;
                        _this.list = [{
                            id: 0,
                            sname: "您暂时没有升级资格,继续努力"
                        }]
                    }

                }).catch(err => {
                    console.log(err)
                })
            },
            send() {
                var _this= this;
                if (this.value === 0) {
                    this.mui.toast("请选择您要提升的级别")
                    return;
                }
                console.log(this.value)
                this.$axios({
                    method: 'post',
                    url: 'http://47.107.138.115:8081/Pyramid/user/level/up.do',
                    headers: {
                        "token": localStorage.getItem("token"),
                    },
                    data: {
                        "sid": this.value,
                        "token": localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 1000) {
                        this.getSelectList()
                        this.mui.alert(res.data.msg+",请去我的消息查看审核人信息", "提示", "确认", function () {
                            _this.$router.push("/")
                        }, "div")
                    } else {
                        this.mui.alert(res.data.msg, "提示", "确认", null, "div")
                    }
                this.mui.alert()
                }).catch(err => {
                    console.log(err)
                })
            }

        },
        created(){
            this.$axios({
                method: 'post',
                url: 'http://47.107.138.115:8081/Pyramid/user/level/spec.do',
                headers: {
                    "token": localStorage.getItem("token"),
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                data: {
                    "token": qs.stringify(localStorage.getItem("token"))
                }
            }).then(res => {
                console.log(res.data)
                if (res.data.code == 1000) {
                } else {
                }
                this.mui.alert(res.data.msg)
            }).catch(err => {
                console.log(err)
            })
        },
        mounted() {
            this.getSelectList()
        }
    }
</script>

<style scoped>
    .content {
        padding: 50px 10px 10px;
    }

    select {
        padding-left: 10px;
    }

    button {
        margin-top: 200px;
    }
</style>
