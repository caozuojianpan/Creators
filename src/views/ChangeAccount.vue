<template>
    <div class="container">
        <header id="header" class="mui-bar mui-bar-nav">

            <h1 class="mui-title">修改用户名</h1>
            <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="true" @click="back"></span>
        </header>
        <div class="wrapper">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>用户名</label>
                    <input type="text" v-model="username" class="mui-input" placeholder="请输入用户名">
                </div>
                <div class="mui-button-row">
                    <button type="button" @click="changeAccount" class="mui-btn mui-btn-primary" >修改</button>
                </div>
            </form>
        </div>

    </div>

</template>

<script>
    import  axios from  'axios'
    import qs from  'qs'
    export default {

        name: "ChangeAccount",
        data:function () {
           return {
               username:'',
               token:''
           }
        },
        methods:{
            back(){
                this.$router.push('/userInfo')
            },
            changeAccount(){
                var uPattern = /^[a-zA-Z]{6,16}$/;
                if(!this.username){
                    this.mui.toast('用户名不能为空');
                    return false
                }
                if(!uPattern.test(this.username)){
                    this.mui.toast('用户名格式不正确')
                    return  false
                }
                console.log({fUserBasic:{username:this.username},token:this.token})
               axios({
                   url:'http://47.107.138.115:8081/Pyramid/user/updateInfo.do',
                   method:'put',
                   headers: {
                       'Content-Type':'application/json;charset=UTF-8'
                   },
                   params:{token:this.token},
                   data:{username:this.username}
               }).then(function (data) {
                   var code = data.data.code;
                   if(code == 1000){
                       _this.mui.toast('修改成功')
                   }else{
                       _this.mui.toast('网络繁忙请稍后重试')
                   }
               })




            }
        },
        mounted() {
            this.username = this.$route.query.username;
            console.log(this.$route.query)
            var token = localStorage.getItem('token');
            if(!token){
                this.$router.push('/login');
            }
            this.token = token;
        }

    }
</script>

<style scoped>
 .container {
     height: 100vh;
     background: #FFFFFF;
 }
.wrapper{
    margin-top: 44px;
}
</style>
