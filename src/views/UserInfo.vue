<template>
    <div class="content">
        <header id="header" class="mui-bar mui-bar-nav">

            <h1 class="mui-title">基本信息</h1>
            <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="true" @click="back"></span>
        </header>
        <section class=" mui-content">
            <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
                <ul class="mui-table-view mui-table-view-chevron">

                </ul>
                <!-- <ul class="mui-table-view mui-table-view-chevron">
                   <li class="mui-table-view-cell">
                     <a href="javascript:;" class="mui-navigate-right">账号与安全</a>
                   </li>
                 </ul>-->
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell ">
                       <span style="display: block;height: 42px;line-height: 42px" href="javascript:;" class="mui-pull-left" >头像</span>
                        <a href="javascript:;" class="mui-navigate-right mui-pull-right">
                        <img class="mui-media-object mui-pull-right " id="head-img" :src="userInfo.gravatar" v-img-error="'../../static/img/head.png'">
                        </a>
                    </li>
                    <li class="mui-table-view-cell"  @click="changeAccount">
                        <a href="javascript:;" class="mui-pull-left">账号</a>
                        <a href="javascript:;" class="mui-pull-right mui-navigate-right">{{userInfo.username}}</a>
                    </li>
                    <li class="mui-table-view-cell" @click="changePhone">
                        <a href="javascript:;" class="mui-pull-left">手机号</a>
                        <a href="javascript:;" class="mui-pull-right mui-navigate-right">{{userInfo.mobile}}</a>
                    </li>
                    <li class="mui-table-view-cell" @click="goCode">
                        <a href="javascript:;" class="mui-pull-left">我的邀请码</a>
                        <a href="javascript:;" class="mui-pull-right mui-navigate-right">{{invitecode}}</a>
                    </li>

                    <!--<li class="mui-table-view-cell">
                      <a href="javascript:;" class="mui-navigate-right">通用</a>
                    </li>-->
                </ul>


            </div>
            <input ref="files" type="file" name="avatar" id="avatar" v-on:change="upload">
        </section>
    </div>

</template>

<script>
    import qs from 'qs'
    import axios from 'axios';
    export default {

        name: "UserInfo",
        methods:{
            upload: function(e) {
                var _this = this;
                e.preventDefault();
                //var files = this.$refs.files;
                var files = e.target.files;
                var data = new FormData();
                data.append('headpic', files[0]);
                console.log(data);
                axios({
                    url:'http://47.107.138.115:8081/Pyramid/user/updatehead.do',
                    method:'put',
                    data:data,
                    params: {token:_this.token}
                }).then(function (data) {
                   location.reload()
                })

                /*this.$http.post('/avatars/upload', data, function (data, status, request) {
                    //handling
                }).error(function (data, status, request) {
                    //handling
                });*/
            },
            back(){
                this.$router.push('/user')
            },
            changeAccount(){
                this.$router.push({path:'/changeAccount',query:{username:this.userInfo.username}})
            },
            changePhone(){
                this.$router.push({path:'/changePhone',query:{phone:this.userInfo.mobile}})
            },
            goCode(){
                this.$router.push({path:'/qrCode',query:{code:this.invitecode}})
            }
        },
        data(){
            return {
               userInfo:{},
               token:'',
                invitecode:''
            }
        },
        mounted() {
            var token = localStorage.getItem('token');
            this.token = token
            if(!token){
                this.$router.push('/login')
            }
            var _this = this;
                //http://47.107.138.115:8081/Pyramid/icode/geticode.do
            axios({
                url:'http://47.107.138.115:8081/Pyramid/user/info.do',
                method:'get',
                params:{
                    token:token
                }
            }).then(function (data) {

                var result = data.data.data;
                console.log(result)
                _this.userInfo = {
                    gravatar:'http://47.107.138.115:8081/file/'+result.headpic,
                    username:result.username,
                    mobile:result.phone
                }
                console.log(_this.userInfo)

            })

            axios({
                url:'http://47.107.138.115:8081/Pyramid/icode/geticode.do',
                method:'post',

                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    token:token
                })
            }).then(function (data) {
              console.log(data.data.data.invitecode);
              _this.invitecode = data.data.data.invitecode

            })
        }

    }
</script>

<style scoped>
    .content{
        background: #FFFFFF;
        height: 100vh;
    }
    #avatar{
        position: absolute;
        z-index: 10000000000;
        outline: none;

        display: block;
        height: 64px;
        width: 100%;
        opacity: 0;
    }
</style>
