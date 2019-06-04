<template>
    <div >
        <header id="header" class="mui-bar mui-bar-nav">

            <h1 class="mui-title">我的邀请码</h1>
            <span class=" mui-icon mui-icon-left-nav mui-pull-left" v-if="true" @click="back"></span>
        </header>
        <div class="container">

                <canvas style="margin-left: 35vw" id="canvas"></canvas>

        </div>

    </div>
</template>

<script>
    import QRCode from 'qrcode'
    export default{
        name:'QRCode',
        data(){
            return {
                msg: 'hello vue',
                codes:'',
                code:''

            }
        },

        components: {
            QRCode: QRCode
        },

        methods: {
            useqrcode(){
                var canvas = document.getElementById('canvas')
                QRCode.toCanvas(canvas, this.code, function (error) {
                    if (error) console.error(error)
                })
            },
            back(){
                this.$router.push('/userInfo')
            }
        },

        mounted(){
            var code = this.$route.query.code;
            this.code = code
            this.useqrcode();
        }
    }
</script>

<style scoped>
    .container{
        margin-top: 100px;
        width: 100vw;
    }

</style>

