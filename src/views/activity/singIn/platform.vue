<template>
    <div class="platform">
        <swiper :options="swiperOption" ref="mySwiper" class="some-swiper">
            <swiper-slide class="swiper-slide">
              <img src="https://www.weijinshi.com/public/front/images/news/p_info_img2.png" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide">
              <img src="https://www.weijinshi.com/public/front/images/news/p_info_img1.png" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" ></div>
        </swiper>
        <div class="content">
            <p class="title">什么是P2P</p>
            <p class="txt">P2P是英文person-to-person（或peer-to-peer）的缩写，意即个人对个人(伙伴对伙伴)。又称点对点网络借款，是一种将小额资金聚集起来借贷给有资金需求人群的一种民间小额借贷模式。属于互联网金融（ITFIN）产品的一种。属于民间小额借贷，借助互联网、移动互联网技术的网络信贷平台及相关理财行为、金融服务。</p>
            <p class="title">平台简介</p>
            <p class="txt">杭州金石互联网金融服务有限公司(简称:微金石)成立于2015年，注册资金实缴5000万元，是一家由国资企业实力打造、上市公司强力支持的互联网金融服务平台。微金石已获得杭州市西湖区区金融办、区财政局、区商务局以及区市场监督管理局联合审核同意意见书。</p>
            <p class="txt">微金石作为杭州市金融办审核批准成立的首批互联网金融平台，以普惠金融、改善民生、提高金融资产流动性为旨要；与消费金融、租赁贷、仓单质押贷、供应链金融等产业链的投融资需求深度融合；构建“互联网金融+服务实体经济+促进商品流通”的生态创新模式；在符合国家方针及法律法规的情况下，为出借人提供“高透明、稳安全、低风险”的多样化出借产品。</p>
            <img src="https://f.weijinshi.com/myoss/data/457B945C49055425D674E06913109380.png" alt="">
            <p class="tip">西湖区“互联网金融”企业设立认定部门</p>
            <p class="tip">联合审核意见书</p>
            <img src="https://f.weijinshi.com/myoss/data/8DC2FA1F107E1C3497B18BC0026EC626.png" alt="">
        </div>
        <div v-show="countDown" class="canvasRound">
            <div class="center">{{countDown}}</div>
            <div class="round">
                <div class="leftbox">
                    <div class="leftclr" :style="{transform:leftRound}"></div>
                </div>
                <div class="rightbox">
                    <div class="rightclr" :style="{transform:rightRound}"></div>
                </div>
            </div>
        </div>
        <img class="finshed" v-show="!countDown" src="https://f.weijinshi.com/myoss/data/E0F32FCFD50B02FE41F756AF388D18DD.png" alt="">
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from "vue-awesome-swiper";
    export default {
        name: "platform",
        data(){
            return{
                timer:null,
                countDown:60,
                leftRound:"rotate(180deg)",
                rightRound:"rotate(180deg)",
                swiperOption: {
                    observeParents: true,
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        bulletClass: 'my-bullet',
                        bulletActiveClass: 'my-bullet-active',
                    },
                },
                userId:this.$route.query.userId,
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        methods:{
            getcount(){
                this.timer = setInterval(()=>{
                    this.countDown--;
                    let index = 60 - this.countDown;
                    if(index>30){
                        this.leftRound = "rotate("+(180+(index-30)*6)+"deg)";
                    }else {
                        this.rightRound = "rotate("+(180+index*6)+"deg)";
                    }
                    if(this.countDown===0){
                        clearInterval(this.timer);
                        this.timer = null;
                        this.$http.POST("/app/readArticle",{userId:this.userId}).then(res => {
                            if (res.code == 1) {

                            }else {
                                this.$toast({
                                    message:res.msg,
                                    delay:1500
                                })
                            }
                        });
                    }
                },1000);
            }
        },
        mounted(){
            this.getcount();
        }
    }
</script>

<style lang="less" scoped>
    .platform{
        padding-bottom: 60px;
        .some-swiper {
            width: 100%;
            .swiper-slide {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .content{
            width: 90%;
            margin: 0 auto;
            p{
                line-height: 48px;
            }
            .title{
                font-size: 32px;
                color: #666666;
                margin-top: 50px;
            }
            .txt{
                margin-top: 16px;
                font-size: 28px;
                color: #555555;
            }
            img{
                width: 100%;
                margin-top: 64px;
                margin-bottom: 20px;
            }
            .tip{
                text-align: center;
                color: #888888;
                font-size: 28px;
            }
        }
        .finshed{
            position: fixed;
            bottom: 20%;
            right: 5%;
            border-radius: 50%;
            width: 140px;
            height: 140px;
        }
        .canvasRound{
            position: fixed;
            bottom: 20%;
            right: 5%;
            border-radius: 50%;
            background: #f7f7f7;
            width: 140px;
            height: 140px;
            .center{
                width: 100px;
                height: 100px;
                position: absolute;
                line-height: 100px;
                text-align: center;
                font-size: 42px;
                left: 50%;
                top: 50%;
                border-radius: 50%;
                transform: translate(-50%,-50%);
                background: #ffffff;
                z-index: 9;
            }
            .round{
                width: 120px;
                height: 120px;
                position: absolute;
                left: 50%;
                top: 50%;
                border-radius: 50%;
                transform: translate(-50%,-50%);
                overflow: hidden;
                .leftbox{
                    width: 50%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    background: #e3e3e3;
                    .leftclr{
                        width: 100%;
                        height: 100%;
                        border-top-left-radius: 50%;
                        border-bottom-left-radius: 50%;
                        -webkit-transform-origin: right center;
                        transform-origin: right center;
                        transform: rotate(180deg);
                        background: red;
                    }
                }
                .rightbox{
                    width: 50%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    right: 0;
                    overflow: hidden;
                    background: #e3e3e3;
                    .rightclr{
                        width: 100%;
                        height: 100%;
                        border-top-right-radius: 50%;
                        border-bottom-right-radius: 50%;
                        -webkit-transform-origin: left center;
                        transform-origin: left center;
                        transform: rotate(180deg);
                        background: red;
                    }
                }
            }
        }

    }

</style>
<style>
    .my-bullet {
        background: rgba(255,255,255,0.4);
        margin: 0 5px;
        display: inline-block;
        width:30px;
        height: 6px;
        border-radius: 3px;
    }
    .my-bullet-active{
        background: rgba(255,255,255,1);
        width: 50px;
    }
</style>