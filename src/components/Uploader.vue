<template>
<div>
  <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
  <div class="add" @click="chooseType">
    <div class="add-image" align="center">
      <i class="icon-camera"></i> //按钮中的图片是一个icon字体图标
      <p class="font13">添加图片</p>
    </div>
  </div>
  <div class="add-img" v-show="imgList.length">
    <p class="font14">图片(最多6张，还可上传<span v-text="6-imgList.length"></span>张)</p>
    <ul class="img-list">
      <li v-for="(url,index) in imgList">
        <img class="del" src="" @click.stop="delImg(index)"/>
        //del删除样式，icon字体图标需要自己找哦
        <img :src="url.file.src">
      </li>
    </ul>
  </div>
  <div @click="tap">
    ddddd
  </div>
</div>

</template>

<script>
  export default {
    name: "Uploader",
    data() {
      return {
        showFace: false,
        imgList: [],
        size: 0,
        limit:6, //限制图片上传的数量
        tempImgs:[]
      }
    },
    methods: {

      tap(){
        var _this = this
        plus.gallery.pick( function(e){
          for(var i in e.files){
            var fileSrc = e.files[i];
            // 其他操作,比如预览展示
          }
        }, function ( e ) {
          console.log( "取消选择图片" );
        },{
          filter: "image",
          multiple: true,
          maximum: 5,
          system: false,
          onmaxed: function() {
            plus.nativeUI.alert('最多只能选择5张图片');
          }
        });

      },
      chooseType() {
        document.getElementById('upload_file').click();
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        });

      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          this.$dialog.toast({mes: '请选择图片文件'});
        } else {
          let reader = new FileReader();
          let image = new Image();
          let _this = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            console.log(this.result)
            file.src = this.result;
            image.onload = function(){
              let width = image.width;
              let height = image.height;
              file.width = width;
              file.height = height;
              _this.imgList.push({
                file
              });
            };
            image.src= file.src;
          }
        }
      },
      delImg(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        if (this.limit !== undefined) this.limit = 6-this.imgList.length;
      },
      displayImg() {

      }
    }
  }
</script>

<style scoped>
  .app-bg img{
    width: 100%;
    height: 100%;
    -webkit-transform: scale(1.03);
    -moz-transform: scale(1.03);
    -ms-transform: scale(1.03);
    -o-transform: scale(1.03);
    transform: scale(1.03);
  }
  textarea {
    padding: 10px;
  }

  .text-length {
    font-size: 14px;
    z-index: 999;
    width: 100%;
    text-align: right;
    margin-bottom: 10px;
    color: #e4e4e4;
  }

  .warning {
    color: #fe9900;
  }

  .add-img {
    width: 100%;
    padding: 10px;
  }

  .add-img p {
    color: #999;
  }

  .mui-content {
    padding-bottom: 60px;
  }

  .mui-content .idea {
    margin-top: 8px;
    background-color: #FFFFFF;
  }

  .good-item {
    text-align: center;
    width: 33%;
    max-width: 100%;
    overflow: hidden;
    padding-right: 10px;
    padding-bottom: 10px;
    float: left;
  }

  .good-item span {
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 50px;
    display: block;
    width: 100%;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid #CCCCCC;
  }

  .mui-table {
    padding-top: 10px;
    color: #333;
    padding-left: calc(0.5% + 10px);
  }

  .h-line-behind {
    line-height: 40px;
    padding-left: 10px;
  }

  .question {
    border: 0;
    margin-bottom: 10px;
  }

  .add {
    display: inline-block;
    margin-bottom: 20px;
  }

  .add-image {
    padding-top: 15px;
    margin-left: 10px;
    width: 80px;
    top: 20px;
    height: 80px;
    border: 1px dashed rgba(0, 0, 0, .2);
  }

  .add-image .icon-camera {
    font-size: 24px;
  }

  .good-item .choose {
    color: #fff;
    background-color: #87582E;
    color: #FFF;
    border: 0;
  }

  .mui-btn-block {
    border: 0;
    border-radius: 0;
    background-color: #87582E;
    color: #fff;
    margin-bottom: 0;
    bottom: 0;
  }

  .mui-buttom {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;

  }

  /*九宫格*/
  .img-list {
    overflow: hidden;
  }

  .img-list > li {
    float: left;
    width: 32%;
    text-align: center;
    padding-top: 31%;
    margin-left: 1%;
    margin-top: 1%;
    position: relative;
  }

  .img-list > li > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .img-list > li > div .app-bg {
    width: 100%;
    height: 100%;
  }

  .mui-fullscreen {
    z-index: 9999;
  }

  .del {
    position: absolute;
    width: 18px;
    top: 0;
    right: 0;
    z-index: 999
  }
</style>
