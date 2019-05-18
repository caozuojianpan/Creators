<template>
  <div>
    <Head :title="title" :leftShow="leftShow"></Head>

    <div class="mui-content">
      <div id="slider" class="mui-slider" >
        <div class="mui-slider-group mui-slider-loop">
          <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../../static/img/banner.png">
            </a>
          </div>
          <!-- 第一张 -->
          <div class="mui-slider-item">
            <a href="#">
              <img src="../../static/img/banner.png">
            </a>
          </div>
          <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../../static/img/banner.png">
            </a>
          </div>
        </div>
        <div class="mui-slider-indicator">

        </div>
      </div>

      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="item in gridList">
          <router-link :to="item.url">
            <span :class="item.icon"></span>
            <div class="mui-media-body">{{item.name}}</div>
            </router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import Head from "@/components/Head"
  export default {
    name: "Home",
    data() {
      return {
        title: "创客",
        leftShow:false,
        gridList:[
          {name:"我的",url:"/user",icon:"mui-icon mui-icon-contact"},
          {name:"团队",url:"/team",icon:"mui-icon mui-icon-personadd"},
          {name:"审核",url:"/audit",icon:"mui-icon mui-icon-checkmarkempty"},
          {name:"投诉",url:"/make_complain",icon:"mui-icon mui-icon-compose"},
          {name:"升级",url:"/update",icon:"mui-icon mui-icon-upload"},
          {name:"投诉历史",url:"/complain_history",icon:"mui-icon mui-icon-list"},
          {name:"消息",url:"/message",icon:"mui-icon mui-icon-chat"},

        ]
      }
    },
    methods:{
    },
    components:{
      Head
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
