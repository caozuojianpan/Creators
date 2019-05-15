<template>
  <div>
    <Head :title="title" :leftShow="leftShow"></Head>
    <section class=" mui-content">
      <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell mui-media">
            <a class="mui-navigate-right" href="javascript:;">
              <img class="mui-media-object mui-pull-left head-img" id="head-img" src="http://www.dcloud.io/hellomui/images/shuijiao.jpg">
              <div class="mui-media-body">
                创客高级用户
                <p class="mui-ellipsis">账号:XXXXXX</p>
              </div>
            </a>
          </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">账号与安全</a>
          </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">新消息通知</a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">隐私</a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">通用</a>
          </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right">关于创客 <i class="mui-pull-right update">V1.0.0</i></a>
          </li>
        </ul>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" style="text-align: center;">
            <a>退出登录</a>
          </li>
        </ul>
      </div>
    </section>

  </div>


</template>

<script>
  import Head from "@/components/Head"

  export default {
    name: "User",
    data() {
      return {
        title: "我的",
        leftShow:true
      }
    },
    components: {
      Head
    },
    created() {
    }
  }
</script>

<style scoped>
  .mui-table-view {
    margin-top: 20px;
  }
</style>
