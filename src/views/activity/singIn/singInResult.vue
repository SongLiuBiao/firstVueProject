<template>
    <div class="singInResult">
        <router-link class="rule" to="singinRule"></router-link>
        <div v-if="type=='success'" class="success">
            <p class="txt">恭喜您连续打卡<span class="color1 fs65">30</span>天</p>
            <p class="txt color1">获得<span class="color2 fs65">30</span>元红包奖励</p>
            <div class="reward">
                <img class="successImg" src="https://f.weijinshi.com/myoss/data/4805C8F6C8B53E35A79309A1961823B9.png" alt="">
                <div v-show="!isGet" class="btn" @click="getMoney">立即领取</div>
                <div v-show="isGet" class="btn isget">已领取</div>
            </div>
            <p class="tip">打卡30天活动已经结束</p>
            <p class="tip">敬请期待下一期打卡活动</p>
        </div>
        <div v-if="type=='fail'" class="fail">
            <p class="txt">您未能连续打卡<span class="fs65 color1">30</span>天</p>
            <p class="txt color1">很抱歉未能获得<span class="fs65 color2">30</span>元红包奖励</p>
            <img src="https://f.weijinshi.com/myoss/data/A6EEFCFF68AB1752DA460A9663DF3043.png" alt="">
            <p class="tip">打卡30天活动已经结束</p>
            <p class="tip">敬请期待下一期打卡活动</p>
        </div>
        <div v-if="type=='end'" class="end">
            <p class="txt">很抱歉～</p>
            <p class="txt">活动已结束～</p>
            <img src="https://f.weijinshi.com/myoss/data/A6EEFCFF68AB1752DA460A9663DF3043.png" alt="">
            <p class="tip">打卡30天活动报名已经结束</p>
            <p class="tip">敬请期待下一期打卡活动</p>
        </div>
        <div class="alert" v-show="alert">
            <div class="tip">
                <p class="tipTxt">请先注册并绑定银行卡哦～</p>
                <div class="btn" @click="alert=false">我知道了</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "singInResult",
        data(){
            return{
                type:this.$route.query.type,
                alert:false,
                isGet:false,
                userId: this.$route.query.userId, //用户ID
                pending:true
            }
        },
        mounted(){
            this.isgetMoney();
        },
        methods:{
            isgetMoney(){
                if(this.type!=='success'){
                    return;
                }
                this.$http.POST("/app/isGetRespacket",{userId:this.userId}).then(res => {
                    if (res.code == -2) {
                        this.isGet = true;
                    } else if (res.code == 0){
                        this.isGet = false;
                    } else {
                        this.$toast({message:res.msg,delay:1500});
                    }
                });
            },
            getMoney(){
                if(!this.pending){
                    return;
                }
                this.pending = false;
                this.$http.POST("/app/sendRedpacket",{userId:this.userId}).then(res => {
                    this.pending = true;
                    if (res.code == -1) {
                        this.alert = true;
                    } else if (res.code == 1){
                        this.$toast({message:'领取成功',delay:1500});
                        this.isgetMoney();
                    } else {
                        this.$toast({message:res.msg,delay:1500});
                    }
                });
            }
        },
    }
</script>

<style lang="less" scoped>
.singInResult{
    min-height: 100%;
    background: url("https://f.weijinshi.com/myoss/data/8639DB3B7898B817B2226A984D97A1F0.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .rule{
        position: absolute;
        display: block;
        top: -4px;
        right: 5%;
        width: 110px;
        height: 105px;
        background: url("https://f.weijinshi.com/myoss/data/FC59D3A8868360BD10F42A26FAF70F6E.png") no-repeat;
        background-size: 100%;
    }
    .fail,
    .success,
    .end{
        padding-top: 167px;
        .txt{
            color: #ffffff;
            font-size: 49px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .reward{
            margin: 121px auto 80px;
            position: relative;
            .successImg{
                width: 464px;
                display: block;
                margin: 0 auto;
            }
            .btn{
                position: absolute;
                bottom: 70px;
                left: 50%;
                margin-left: -170px;
                border-radius: 45px;
                line-height: 90px;
                width: 341px;
                height: 90px;
                background: #FEC844;
                color: #FE1653;
                font-size: 42px;
                font-weight: bold;
                text-align: center;
            }
            .isget{
                color: #abaaaa;
            }
        }
        &>img{
            display: block;
            width: 90%;
            margin: 121px auto 80px;
        }
        .tip{
            color: #ffffff;
            font-size: 30px;
            text-align: center;
            line-height: 42px;
        }
        .fs65{
            font-size: 65px;
        }
        .color1{
            color: #FFD81B;
        }
        .color2{
            color: #FE0064;
        }
    }
    .alert{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        .tip{
            width: 652px;
            height: 349px;
            margin: 450px auto;
            background: url("https://f.weijinshi.com/myoss/data/FF027FF931B3EB63F6AE781C50ED0360.png") no-repeat;
            background-size: 100%;
            padding-top: 95px;
            .tipTxt{
                color: #633577;
                font-size: 36px;
                text-align: center;
            }
            .btn{
                width: 320px;
                height: 70px;
                text-align: center;
                color: #ffffff;
                font-size: 30px;
                background: url("https://f.weijinshi.com/myoss/data/0C4D0586331FCF2F3114006D80DFAD71.png") no-repeat;
                background-size: 100%;
                line-height: 70px;
                margin: 82px auto 0;
            }
        }
    }
}
</style>