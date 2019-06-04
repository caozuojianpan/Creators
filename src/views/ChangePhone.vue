<template>
    <div class="container">
        <header id="header" class="mui-bar mui-bar-nav">

            <h1 class="mui-title">修改手机号</h1>
            <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="true" @click="back"></span>
        </header>
        <div class="wrapper">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>手机号</label>
                    <input type="text" v-model="mobile" class="mui-input" placeholder="请输入手机号">
                </div>
                <div class="mui-button-row">
                    <button type="button" @click="changePhone" class="mui-btn mui-btn-primary" >修改</button>
                </div>
            </form>
        </div>

    </div>

</template>

<script>
    import  axios from  'axios'
    import qs from  'qs'
    export default {

        name: "ChangePhone",
        data:function () {
           return {
               mobile:'',
               token:''
           }
        },
        methods:{
            back(){
                this.$router.push('/userInfo')
            },
            changePhone(){
                var mobilePattern =  /^1[0-9]{10}$/;
                if(!this.mobile){
                    this.mui.toast('手机号不能为空');
                    return false
                }
                if(!mobilePattern.test(this.mobile)){
                    this.mui.toast('请输入正确的手机号')
                    return  false
                }
                var _this = this;
               axios({
                   url:'http://47.107.138.115:8081/Pyramid/user/updateInfo.do',
                   method:'put',
                   headers: {
                       'Content-Type':'application/json;charset=UTF-8'
                   },
                   params:{token:this.token},
                   data:{phone:this.mobile}
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
            this.mobile = this.$route.query.phone;
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
