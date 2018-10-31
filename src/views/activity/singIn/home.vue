<template>
    <div class="home">
        <router-link class="rule" to="singinRule"></router-link>
        <div class="info">
            <p class="blod">参与活动第</p>
            <div class="infoDay">
                {{joinDays}}<span>天</span>
            </div>
            <p class="infoTxt"><span>{{noSignDays}}</span>天未签到</p>
            <router-link v-if="isStart" class="infoTxt" :to="{path:'/supplement',query:{userId:userId,time:singInDayArr[0],appInfo:appInfo}}">您还有<span>{{supplement}}</span>次补签机会>></router-link>
            <a v-if="!isStart" href="javaScript:void (0);" class="infoTxt">您还有<span>{{supplement}}</span>次补签机会>></a>
        </div>
        <div class="bottom">
            <div class="calendar clearfix" id="schedule-box"></div>
        </div>
    </div>
</template>

<script>
    import Schedule from "../js/schedule";
    export default {
        name: "home",
        data(){
            return{
                userId: this.$route.query.userId, //用户ID
                appInfo: this.$route.query._appInfo,
                mySchedule:'',
                singInDayArr: [],
                noSignDays:0,
                joinDays:0,
                supplement:0,
                isStart:true,
            }
        },
        mounted(){
            this.checkLogin()
            this.scheduleInit(this.singInDayArr);
            this.getData();
        },
        methods:{
            //实例化日历
            scheduleInit(arr) {
                this.mySchedule = new Schedule({
                    el: '#schedule-box',
                    singInDayArr: arr,
                });
            },
            checkLogin(){
                if(!this.userId){
                    window.location.href = "/opennative?name=APP_LOGIN" + "&params=";
                }
            },
            //获取签到信息
            getData(){
                this.$http.POST("/app/qiandaoActivity",{userId:this.userId}).then(res => {
                    if (res.code == 1) {
                        this.singInDayArr = res.signList;
                        this.noSignDays = res.noSignDays;
                        this.joinDays = res.joinDays;
                        this.supplement = res.supplement;
                        this.scheduleInit(this.singInDayArr);
                        this.$toast({message: '签到成功', delay:2000});
                    }else if(res.code == 2){
                        this.singInDayArr = res.signList;
                        this.noSignDays = res.noSignDays;
                        this.joinDays = res.joinDays;
                        this.supplement = res.supplement;
                        this.scheduleInit(this.singInDayArr);
                    }else if (res.code == -2){
                        this.$router.push({
                            path: "/singinResult",
                            query: {
                                close:"activity-default",
                                type: "fail",
                            }
                        });
                    }else if (res.code == -1){
                        this.$router.push({
                            path: "/singinResult",
                            query: {
                                type: "end",
                                close:"activity-default",
                            }
                        });
                    } else if (res.code == 3){
                        this.$router.push({
                            path: "/singinResult",
                            query: {
                                close:"activity-default",
                                type: "success",
                                userId:this.userId
                            }
                        });
                    } else {
                        this.isStart = false;
                        this.$toast({message:res.msg,delay:1500});
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    .home{
        width: 100%;
        min-height: 100%;
        background:#5a4ccf url("https://f.weijinshi.com/myoss/data/B051ADFB1B11A4F6976C1C5AF57AE0D7.png") no-repeat;
        background-size: 100%;
        padding-top: 60%;
        padding-bottom: 50px;
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
        .info{
            text-align: center;
            width: 300px;
            margin: 0 auto;
            &>p{
                color: #ffffff;
                font-size: 30px;
                margin-bottom: 15px;
            }
            .blod{
                font-size: 36px;
                font-weight: bold;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .infoDay{
                width: 177px;
                height: 130px;
                background: url("https://f.weijinshi.com/myoss/data/6FAF91B468B7F6930AC8D28FFB15FDB4.png") no-repeat;
                background-size: 100%;
                margin: 0 auto 15px;
                font-size: 72px;
                color: #333333;
                font-weight: bold;
                padding-top: 40px;
                span{
                    font-size: 18px;
                }
            }
            .infoTxt{
                color: #ffffff;
                font-size: 30px;
                margin-bottom: 10px;
                span{
                    color: #FFD81B;
                }
            }
        }
        /*日历样式*/
        .bottom{
            margin-top: 5%;
            background: url("https://f.weijinshi.com/myoss/data/C28B34C33D6B2E460520BC82AA5DE765.png") no-repeat;
            background-size: 100% auto;
            padding-top:26%;
            .calendar{
                width: 90%;
                margin: 0 auto;
            }
        }
    }
</style>