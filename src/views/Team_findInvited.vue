<template>
  <div >
    <Head :title="title" :leftShow="leftShow"></Head>
    <section class=" mui-content">
    	<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell mui-media">
            <a  href="javascript:;"> <!-- class="mui-navigate-right" 右箭头-->
              <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="['http://47.107.138.115:8081/file//'+user.headpic]" v-img-error="'../../static/img/head.png'">
              <div class="mui-media-body">
                {{user.username}}
                <p class="mui-ellipsis">个性签名：{{user.infomation}}</p>
              </div>
            </a>
          </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            手机号：{{user.phone}}
          </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;" >是否内部人员:&nbsp;&nbsp;&nbsp;&nbsp;{{user.infomation == 0?"不是":"是"}}</a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" >邀请人:&nbsp;&nbsp;&nbsp;&nbsp;{{user.inviterid}}</a>
          </li>
         
        </ul>
        <!--<ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;">关于创客 <i class="mui-pull-right update">V1.0.0</i></a>
          </li>
        </ul>-->
        
      </div>
     </section>
  </div>
</template>

<script>
  import Head from '@/components/Head'
	import axios from 'axios'
  
  export default {
    name: "Team_findInvited",
    data() {
      return {
        title: "我的审核",
        leftShow:true,
        id:"",
        info:'',
        user:''
      }
    },
    components: {
      Head,
    },
    
    methods:{
    	
    },
	 mounted(){
	 	this.id = this.$route.params.id;
     var _this = this
	 	//我的审核
	    axios({
	        method:'post',
	        url:'http://47.107.138.115:8081/Pyramid/user/findInvited.do',
	        params:{limit:9999,page:1,token:localStorage.getItem("token")}
	    }).then((data)=>{
	        console.log(data.data.data.records);
	        _this.info = data.data.data.records;
	        console.log(_this.info)		
					_this.info.map(function(item,i){
						if(item.id == _this.id){
							_this.user = item
						}
					})
	    })
			
	    
	 }
  }
</script>

<style scoped>
	.mui-table-view {
    margin-top: 20px;
  }
</style>
