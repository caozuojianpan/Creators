<template>
    <div>
        <Head :title="title" :leftShow="leftShow"></Head>
    	<div style="padding: 10px 10px;" class="tab">
			<div id="segmentedControl" class="mui-segmented-control">
				<a class="mui-control-item mui-active" href="#item1">
					全部消息
				</a>
				<a class="mui-control-item" href="#item2">
					未读消息
				</a>
				<a class="mui-control-item" href="#item3">
					已读消息
				</a>
			</div>
		</div>
	    <div>
	    	<div id="item1" class="mui-control-content mui-active">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-collapse" v-for="(item,i) in records">
						<a class="mui-navigate-right" href="#">{{item.title}}<span style="float: right;">{{item.createtime}}</span></a>
						<div class="mui-collapse-content">
							<p style="color: #101010;font-size: 16px;font-weight: bold">{{item.discription}}</p>
							<p>
								{{item.createtime}}
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div id="item2" class="mui-control-content">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-collapse" v-for="(item,i) in records1">
						<a class="mui-navigate-right" href="#">{{item.title}}<span style="float: right;">{{item.createtime}}</span></a>
						<div class="mui-collapse-content">
							<p style="color: #101010;font-size: 16px;font-weight: bold">{{item.discription}}</p>
							<p>
								{{item.createtime}}
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div id="item3" class="mui-control-content">
				<ul class="mui-table-view">
		        	<!--<li class="mui-table-view-cell mui-media mui-table-view-cell mui-collapse" v-for="(item,i) in records2">
						<a href="/complain"  class="mui-navigate-right">
							{{item.title}}
						</a>
						
						<ul class="mui-table-view mui-table-view-chevron">
							<li class="mui-table-view-cell">
								<a class="mui-navigate-right">
									<span>{{item.discription}}</span>
									<span style="color: #cecece;font-size: 2.4vh;float: right;">{{item.createtime}}</span>
								</a>
							</li>
						</ul>
						</li>-->
					<li class="mui-table-view-cell mui-collapse" v-for="(item,i) in records2">
						<a class="mui-navigate-right" href="#">{{item.title}}<span style="float: right;">{{item.createtime}}</span></a>
						<div class="mui-collapse-content">
							<p style="color: #101010;font-size: 16px;font-weight: bold">{{item.discription}}</p>
							<p>
								{{item.createtime}}
							</p>
						</div>
					</li>
				</ul>
			</div>	
	    </div>
    </div>
</template>
<script>
import axios from 'axios'
import Head from '@/components/Head'
//import MediaList from '@/components/MediaList'
  export default {
    name: "Message",
    data() {
      return {
        title: "消息",
        leftShow:true,
        records:'',
        records1:'',
        records2:'',
        tyep:'',
        message:'',
      }
    },
    components: {
      Head
    },
    methods:{
//  	turn(id){
//  		this.type = id;
//  		axios({
//		        method:'get',
//		        url:'http://47.107.138.115:8081/Pyramid/message/checkmessage.do',
//		        params:{messageId:this.type}
//		    }).then((data)=>{
//		        this.message = data.data.data
//		        console.log(this.message)
//		    })
//  	}
    	
    },
    mounted(){
    	//http://47.107.138.115:8081/Pyramid/message/mymessage.do
    	//uid查询者ID系统为0 type查询类型0全部1未读2已读3发送的消息规定类型外会出错
    	axios({
	        method:'get',
	        url:'http://47.107.138.115:8081/Pyramid/message/mymessage.do',
	        params:{token:localStorage.getItem("token"),type:0	}
	    }).then((data)=>{
	        this.records = data.data.data
	    })
	    axios({
	        method:'get',
	        url:'http://47.107.138.115:8081/Pyramid/message/mymessage.do',
	        params:{token:localStorage.getItem("token"),type:1	}
	    }).then((data)=>{
	        this.records1 = data.data.data
	        console.log(this.records1)
	    })
	    axios({
	        method:'get',
	        url:'http://47.107.138.115:8081/Pyramid/message/mymessage.do',
	        params:{token:localStorage.getItem("token"),type:2	}
	    }).then((data)=>{
	        this.records2 = data.data.data
	    })
	    //查看消息详情
	    //http://47.107.138.115:8081/Pyramid/message/checkmessage.do
	    
    }
}
</script>
<style scoped>
	.tab{margin-top: 44px;touch-action: none;}

</style>

