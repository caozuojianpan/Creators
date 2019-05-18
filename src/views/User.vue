<template>
  <div>
      <header id="header" class="mui-bar mui-bar-nav">

          <h1 class="mui-title">我的</h1>
          <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="leftShow" @click="back"></span>
      </header>
    <section class=" mui-content">
      <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell mui-media">
            <a class="mui-navigate-right" href="javascript:;" @click="goUserInfo" >
              <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="userInfo.gravatar">
              <div class="mui-media-body">
                创客高级用户
                <p class="mui-ellipsis">账号:{{userInfo.username}}</p>
              </div>
            </a>
          </li>
        </ul>
       <!-- <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">账号与安全</a>
          </li>
        </ul>-->
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell" @click="goMyReward">
            <a href="javascript:;" class="mui-navigate-right">奖励</a>
          </li>
          <li class="mui-table-view-cell" @click="goMyPunish">
            <a href="javascript:;" class="mui-navigate-right">处罚</a>
          </li>
          <!--<li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">通用</a>
          </li>-->
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">关于创客 <i class="mui-pull-right update">V1.0.0</i></a>
          </li>
        </ul>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" style="text-align: center;">
            <a @click="logout">退出登录</a>
          </li>
        </ul>
      </div>

    </section>


  </div>


</template>

<script>
    import axios from 'axios'
  import Head from "@/components/Head"

  export default {
    name: "User",
    data() {
      return {
        title: "我的",
        leftShow:true,
        userInfo:{},
          token:''
      }
    },
    components: {
      Head
    },
    created() {
    },
      methods:{
        back(){
         this.$router.push('/home')
        },

          goUserInfo(){
              this.$router.push('/userInfo');
          },
          goMyReward(){
              this.$router.push('/myReward');
          },
          goMyPunish(){
              this.$router.push('/myPunish');
          },
        logout(){
            var _this = this;
            axios({
                url:'http://47.107.138.115:8081/Pyramid/user/userexit.do',
                method:'get',
            }).then(function (data) {
              if(data.status){
                 localStorage.removeItem('token');
                    _this.$router.push('/login')
              }
            })
        }
      },
    mounted() {
        var token = localStorage.getItem('token');
        this.token = token
        if(!token){
            this.$router.push('/login')
        }
        var _this = this;

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
               username:result.username
           }
           console.log(_this.userInfo)

        })
    }
  }
</script>

<style scoped>
  .mui-table-view {
    margin-top: 20px;
  }

</style>
