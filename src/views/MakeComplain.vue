<template>
  <div>
    <Head :title="title" :leftShow="leftShow"></Head>
    <div class="mui-content-padded mui-content" style="margin: 5px">
      <div class="mui-input-row mui-password" style="margin: 0 5px;">
        <h4 style="margin-bottom:5px;">投诉人</h4>
        <input type="text" style="margin-top:5px;">
      </div>
      <div class="mui-input-row" style="margin: 10px 5px;">
        <h4>投诉理由</h4>
        <textarea id="textarea" rows="8" placeholder="请输入您要投诉的内容" style="margin-top:5px;" v-model="content"></textarea>
      </div>
      <div class="mui-button-row" style="margin: 50px 5px;">
        <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="submit">投诉</button>
      </div>
    </div>
    <input type="file" ref="file"/>
  </div>
</template>

<script>
  import Head from "@/components/Head"

  export default {
    name: "MakeComplain",
    data() {
      return {
        title: "投诉",
        leftShow: true,
        content:""
      }
    },
    methods: {
      submit() {
        let datas = new FormData();
        datas.append('content',this.content);
        datas.append('rid',2);
        datas.append('token',localStorage.getItem("token"));
          datas.append('imglist', this.$refs.file.files[0]);// 将文件存入file下面
          datas.append('imglist', this.$refs.file.files[0]);// 将文件存入file下面
          this.$axios({
            method: 'post',
            url: 'http://47.107.138.115:8081/Pyramid/complain/photoupload.do',
            // url: 'http://10.8.159.21:8086/complain/photoupload.do',
            headers: {"token": localStorage.getItem("token"),'Content-Type': 'multipart/form-data'},
            data: datas
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })

      }
    }
    ,
    components: {
      Head
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
