<template>
  <div class="mui-content-padded" style="margin: 5px">
    <div class="mui-input-row mui-password" style="margin: 0 5px;">
      <h4 style="margin-bottom:5px;">投诉人</h4>
      <input type="text" style="margin-top:5px;">
    </div>
    <div class="mui-input-row" style="margin: 10px 5px;">
      <h4 >投诉理由</h4>
      <textarea id="textarea" rows="8" placeholder="请输入您要投诉的内容" style="margin-top:5px;"></textarea>
    </div>
    <div class="mui-button-row" style="margin: 50px 5px;">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block">投诉</button>
    </div>
  </div>

</template>

<script>
    export default {
        name: "MakeComplain"
    }
</script>

<style scoped>

</style>
