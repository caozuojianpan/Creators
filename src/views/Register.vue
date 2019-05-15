<template>
	<div id="">
		<Head :message="title"/>
		<form class="mui-input-group">
		    <div class="mui-input-row">
		        <label>用户名</label>
		    <input type="text" class="mui-input-clear" placeholder="请输入用户名" v-model="username" @change="change">
		    </div>
		    <div class="mui-input-row">
		        <label>密码</label>
		        <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
		    </div>
		     <div class="mui-input-row">
        		<label>手机号</label>
        		<input type="text" class="mui-input-clear" placeholder="请输入手机号" v-model="phone">
        		 
    		</div>
    		<div class="mui-input-row">
        		<label>邀请码</label>
        		<input type="text" class="mui-input-clear" placeholder="请输入邀请码" v-model="invitecode">
        		 
    		</div>
		    
		</form>
		<!--<div class="mui-card">
	页眉，放置标题
			<div class="mui-card-header">请上传身份证正面</div>
	
			<div class="mui-card-content">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556541505143&di=0f85dc709d5324e74f0a010b09471fc1&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180802%2F2472edda760f4150a33b40cfacb96ace.jpeg"/>
			</div>
	
			<div class="mui-card-footer">
				<input type="file" id="" value=""  @change="change"/>			
			</div>
		</div>
		<div class="mui-card">
	页眉，放置标题
			<div class="mui-card-header">请上传身份证反面</div>
	内容区
			<div class="mui-card-content">
				<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2819524451,1151553941&fm=26&gp=0.jpg"/>
			</div>
	页脚，放置补充信息或支持的操作
			<div class="mui-card-footer">
				<input type="file" id="" value="" @change="change"/>
				
			</div>
		</div>-->
		<div class="mui-button-row">
		        <button type="button" data-loading-icon-position="right" class="mui-btn btn" @click="tap">已有账号？返回登录</button>
		        
		        <button type="button" class="mui-btn mui-btn-danger " @click="reg">注册为准创客</button>
		</div>
	</div>
</template>

<script>
	import Head from '@/components/Head'
		export default {
    name: 'Register',
    data(){
    	return{
    		title:"注册",
			username:'',
			password:'',
			invitecode:'',
			phone:'',
			user:{
				 "invitecode": "",
				 "password": "",
				 "phone": "",
				 "username": ""
			}
    	}
    },
    components:{
          Head  
    },
    methods:{
    	tap(){
    		this.mui('.btn').button('loading')
    		this.$router.go(-1)
    		//this.$router.push('/home')
    	},
    	change(){
    		if (this.username.length>=20) {
				mui.alert("用户名长度不能超过20位")
			}
    	},
    	reg(){
    		
			
			this.user.username = this.username,
			this.user.password = this.$md5(this.password),
			this.user.invitecode = this.invitecode,
			this.user.phone = this.phone
			if (this.username!=""&&this.password!='') {
				this.$axios({
				method:'post',
				url:'http://47.107.138.115:8081/Pyramid/user/register.do',
				data:this.user
			}).then((res)=>{
				console.log(res.data.msg)
          this.$router.push('/zchuangk')
				if (res.data.msg=="注册失败，用户名重复") {
					mui.toast('注册失败，用户名重复')
				} else if(res.data.msg=='注册失败，邀请码不存在'){
					mui.toast('邀请码不存在')
				}else if(res.data.msg=="注册成功!"){
					
					this.$router.push('/zchuangk')
				}
			})
			} else {
				mui.toast('用户名和密码不能为空')
			}
		}
    },
    mounted(){
    	
		
		
    }

}
</script>

<style scoped="">
	img{
		display: block;
		width: 100%;
		height: 200px;
	}
	.mui-input-group{
		background: #efeff5;
		margin-top: 45px;
	}
	.mui-btn{
		width: 150px;
	}
	.mui-card{
		background: #efeff5;
	}
</style>
