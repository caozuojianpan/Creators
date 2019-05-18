<template>
    <div>
        <Head :title="title" :leftShow="leftShow"></Head>
        <div class="mui-content-padded mui-content" style="margin: 5px">
            <div class="mui-input-row mui-password" style="margin: 0 5px;">
                <h4 style="margin-bottom:5px;">投诉人</h4>
                <input type="text" v-model="user" style="margin-top:5px;" placeholder="请输入您要投诉用户的电话或用户名">
            </div>
            <div class="mui-input-row" style="margin: 10px 5px;">
                <h4>投诉理由</h4>
                <textarea id="textarea" rows="8" placeholder="请输入您要投诉的内容" style="margin-top:5px;"
                          v-model="content"></textarea>
            </div>
            <div style="margin: 0 5px">
                <input @change="fileChange($event)" type="file" ref="upload_file" multiple style="display: none"/>
                <p>最多可以上传5张照片</p>
                <div class="img-box">

                    <div class="add-img img-sty" v-for="(item,index) in imglist" :key="index">
                        <img :src="item.src" alt="">
                        <i class="mui-icon mui-icon-close" @click="deleteImg(index)"></i>
                    </div>
                    <div class="add-img" @click="chooseType" v-show="imglist.length<5">
                        <i class="mui-icon mui-icon-image"></i>
                        <p class="font13">添加图片</p>
                    </div>

                </div>
            </div>

            <div class="mui-button-row" style="margin: 50px 5px;">
                <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="verifyUser">投诉</button>
            </div>
        </div>
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
                imgReg: (/.(gif|jpg|jpeg|png|gif|jpg|png)$/),
                user: "",
                rid: "",
                content: "",
                imglist: []
            }
        },
        methods: {
            verifyUser() {
                if (this.user.trim().length === 0) {
                    this.mui.toast("输入正确的投诉人信息");
                    return;
                }
                var _this = this;
                this.$axios({
                    method: 'get',
                    url: 'http://47.107.138.115:8081/Pyramid/complain/find.do',
                    headers: {"token": localStorage.getItem("token")},
                    params: {"info": this.user}
                }).then(res => {
                    if (res.data.code === 1000) {
                        _this.rid = res.data.data.id
                        _this.submit()
                    } else {
                        this.mui.alert("您要投诉的人不存在", "提示", "确认", null, "div")
                    }
                    console.log(res)
                }).catch(err => {
                })
            },
            chooseType() {
                this.$refs.upload_file.click()
            },
            fileChange(el) {
                var _this = this;
                if (!el.target.files[0]) {
                    return;
                }
                if (!this.imgReg.test(el.target.files[0].name)) {
                    this.mui.alert("请选择图片", "提示", "确认", null, "div")
                    return;
                }
                var file = el.target.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = function () {
                        _this.imglist.push({file: file, src: this.result})
                        el.target.value = ''
                    }
                }

            },
            deleteImg(index) {
                this.imglist.splice(index, 1)
            }
            ,
            submit() {
                if (this.content.length < 12) {
                    this.mui.toast("输入内容不能少于12个字")
                    return;
                }
                this.mui.showLoading("提交中...", "div");
                this.mui.hideLoading(null);
                let datas = new FormData();
                datas.append('content', this.content);
                datas.append('rid', this.rid);
                datas.append('token', localStorage.getItem("token"));
                this.imglist.map((item) => {
                    datas.append('imglist', item.file);// 将文件存入file下面
                });
                this.$axios({
                    method: 'post',
                    url: 'http://47.107.138.115:8081/Pyramid/complain/photoupload.do',
                    headers: {"token": localStorage.getItem("token"), 'Content-Type': 'multipart/form-data'},
                    data: datas
                }).then(res => {
                    this.mui.hideLoading(null);
                    this.mui.alert("投诉提交成功", "提示", "确认", null, "div")
                    this.user = "";
                    this.rid = "";
                    this.content = "";
                    this.imglist = [];
                    console.log(res)
                }).catch(err => {
                    this.mui.hideLoading(null);
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
    .img-box {
        display: flex;
        margin-left: -10px;
    }

    .img-sty {
        position: relative;
    }

    .img-sty .mui-icon-close {
        font-size: 24px;
        position: absolute;
        right: -6px;
        top: -6px;
    }

    .img-sty img {
        height: 60px;
        width: 60px;
    }

    .add-img {
        width: 62px;
        height: 62px;
        margin-left: 10px;
        text-align: center;
        border: 1px dashed rgba(0, 0, 0, .2);
    }

    .add-img p {
        line-height: 20px;
    }

    .add-img .mui-icon-image {
        font-size: 40px;
    }
</style>
