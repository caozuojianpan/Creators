<template>
    <div>
        <Head :title="title" :leftShow="leftShow"/>
        <div>
            <img src="../../static/img/banner.png"/>
        </div>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" class="mui-input-clear" placeholder="请输入用户名" v-model="inputinfo">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="mui-button-row">
                <button type="button" data-loading-icon-position="right" class="mui-btn btn mui-btn-success"
                        @click="tap">确认
                </button>

                <button type="button" class="mui-btn mui-btn-danger" @click="register">注册</button>
            </div>
            <div class="mui-button-row">
                <button type="button" data-loading-icon-position="right" class="mui-btn btn1" @click="tap1">切换登录方式
                </button>

            </div>
        </form>
    </div>
</template>

<script>
    import Head from '@/components/Head'

    export default {
        name: 'Login',
        data() {
            return {
                title: "登录",
                leftShow: false,
                inputinfo: '',
                password: '',
                infos: {
                    "inputinfo": "",
                    "password": ""
                }
            }
        },
        components: {
            Head
        },
        methods: {
            tap() {
                this.infos.inputinfo = this.inputinfo;
                // this.infos.password = this.$md5(this.password);
                this.infos.password = this.password;
                if (this.username != "" && this.password != '') {
                    this.mui.showLoading("登录中...", "div");
                    this.$axios({
                        method: 'post',
                        url: 'http://47.107.138.115:8081/Pyramid/user/login.do',
                        data: this.infos
                    }).then((res) => {
                        if (res.data.code == 1000) {
                            localStorage.setItem("token", res.data.data)
                            this.mui.toast('登录成功')
                            this.$router.push('/home')

                        } else {
                            this.mui.toast('账号或密码错误，请重试！')
                        }
                        this.mui.hideLoading(null);
                    }).catch(()=>{
                        this.mui.hideLoading(null);
                        this.mui.toast('网络异常')
                    })
                } else {
                    this.mui.toast('用户名和密码不能为空')
                }


                //this.$router.push('/home')
            },
            tap1() {
                this.$router.push('/whcat')
            },
            register() {
                this.$router.push('/register')
            }

        },
        mounted() {


        }

    }
</script>

<style scoped="">

    img {
        margin-top: 46px;
        display: block;
        width: 100%;
        height: 250px;
    }

    .mui-input-group {

        background: #efeff5;
    }

    .mui-btn {
        width: 150px;
    }
</style>
