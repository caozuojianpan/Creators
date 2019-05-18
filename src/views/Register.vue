<template>
    <div id>
        <Head :title="title" :leftShow="leftShow"/>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>邀请码</label>
                <input type="text" class="mui-input-clear" placeholder="请输入邀请码" v-model="invitecode">
            </div>
            <div class="mui-input-row">
                <label>手机号</label>
                <input type="number" class="mui-input-clear" placeholder="请输入手机号" v-model="phone">
            </div>
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" class="mui-input-clear" placeholder="请输入真实姓名" v-model="username">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="text" class="mui-input-clear" placeholder="请输入密码" v-model="password">
            </div>

            <div class="mui-button-row">
                <button
                    type="button"
                    data-loading-icon-position="right"
                    class="mui-btn btn"
                    @click="tap"
                >已有账号？返回登录</button>

                <button type="button" class="mui-btn mui-btn-danger" @click="register">注册为准创客</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Head from "@/components/Head";
    export default {
        name: "Register",
        data() {
            return {
                title: "注册",
                leftShow:true,
                password:'',
                username:'',
                phone:'',
                invitecode:'',
                phoneReg: "^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\\d{8}$",
            };
        },
        components: {
            Head
        },
        methods: {
            tap() {
                this.mui(".btn").button("loading");
                this.$router.go(-1);
                //this.$router.push('/home')
            },
            register() {
                var reg = new RegExp(this.phoneReg)
                if (reg.test(this.phone) && this.invitecode !== "") {
                    if (this.username == "" && this.password == ''){
                        this.mui.toast("请输入用户名和密码");
                        return;
                    }
                    // 添加请求头
                    this.mui.showLoading("登录中...", "div");
                    this.$axios({
                        method: "post",
                        url: "http://47.107.138.115:8081/Pyramid/user/register.do",
                        data: {
                            invitecode: this.invitecode,
                            password:this.password,
                            phone:this.phone,
                            username: this.username
                        }
                    }).then(response => {
                        console.log(response);
                        this.mui.hideLoading(null);
                        switch (response.data.code) {
                            case 1001:
                                this.mui.toast("用户名重复，请重新输入");
                                break
                            case 1000:
                                this.$router.push('/login');
                            default:
                                break;
                        }
                    }).catch(()=>{
                        this.mui.hideLoading(null);
                        this.mui.toast('网络异常')
                    });
                } else {
                    this.mui.toast("请输入正确的手机号或邀请码");
                }
            }
        },
        mounted() {}
    };
</script>

<style scoped="">
    img {
        display: block;
        width: 100%;
        height: 200px;
    }
    .mui-input-group {
        background: #efeff5;
        margin-top: 45px;
    }
    .mui-btn {
        width: 150px;
    }
    .mui-card {
        background: #efeff5;
    }
</style>
